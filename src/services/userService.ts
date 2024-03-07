import pool from "../database";
import { User } from "../controller/userController";

export const getUsers: () => Promise<User[]> = async (): Promise<User[]> => {
  const client = await pool.connect();

  try {
    const result = await client.query("SELECT * FROM public.user");
    console.log(result.rows);
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

    console.log("User created:", result.rows[0]);
    return result.rows[0];
  } finally {
    client.release();
  }
};
