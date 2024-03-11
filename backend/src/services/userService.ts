import pool from "../database";
import { User } from "../controller/userController";
import { QueryResult } from "pg";

interface UserFilter {
  nome?: string;
  email?: string;
  telefone?: string;
}

export const getUsers: (filter?: UserFilter) => Promise<User[]> = async (
  filter?: UserFilter
): Promise<User[]> => {
  const client = await pool.connect();

  try {
    let query = 'SELECT * FROM public."user"';

    if (filter) {
      const conditions: string[] = [];

      if (filter.nome) conditions.push(`nome ILIKE '%${filter.nome}%'`);
      if (filter.email) conditions.push(`email ILIKE '%${filter.email}%'`);
      if (filter.telefone)
        conditions.push(`telefone ILIKE '%${filter.telefone}%'`);

      if (conditions.length > 0) {
        query += ` WHERE ${conditions.join(" OR ")}`;
      }
    }

    const result: QueryResult = await client.query(query);
    return result.rows;
  } finally {
    client.release();
  }
};

export const createUser = async (newUser: User) => {
  const client = await pool.connect();

  try {
    const result = await client.query(
      'INSERT INTO public."user" (nome, email, telefone, coordenada_x, coordenada_y) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [
        newUser.nome,
        newUser.email,
        newUser.telefone,
        newUser.coordenada_x,
        newUser.coordenada_y,
      ]
    );

    return result.rows[0];
  } finally {
    client.release();
  }
};

export const deleteUser = async (id: number) => {
  const client = await pool.connect();

  try {
    const result = await client.query(
      'DELETE FROM public."user" WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      throw new Error(`User with ID ${id} not found`);
    }

    // Return the deleted user
    return result.rows[0];
  } finally {
    client.release();
  }
};

export const calcularRota = async () => {
  const users = await getUsers();

  const usuariosOrdenados = ordenarUsuariosPorMenorCaminho(users);

  return usuariosOrdenados;
};

function calcularDistancia(pontoA: User, pontoB: User) {
  const deltaX = pontoA.coordenada_x - pontoB.coordenada_x;
  const deltaY = pontoA.coordenada_y - pontoB.coordenada_y;
  return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}

function ordenarUsuariosPorMenorCaminho(users: User[]) {
  const resultado: User[] = [];
  const naoVisitados = [...users];

  // Escolher o primeiro usuário como ponto de partida
  let userAtual: User | undefined = naoVisitados.shift();

  while (userAtual) {
    resultado.push(userAtual);

    // Encontrar o vizinho mais próximo até que todos os usuários sejam visitados
    if (naoVisitados.length > 0) {
      let distanciaMinima = Number.MAX_VALUE;
      let nextUser: User | undefined = undefined;

      for (const usuario of naoVisitados) {
        const distancia = calcularDistancia(userAtual, usuario);

        if (distancia < distanciaMinima) {
          distanciaMinima = distancia;
          nextUser = usuario;
        }
      }

      if (nextUser) {
        resultado.push(nextUser);
        userAtual = naoVisitados.splice(naoVisitados.indexOf(nextUser), 1)[0];
      } else {
        userAtual = undefined;
      }
    } else {
      userAtual = undefined;
    }
  }

  return resultado;
}
