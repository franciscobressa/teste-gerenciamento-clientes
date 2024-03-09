import { Request, Response } from "express";
import * as userService from "../services/userService";

export interface User {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  coordenada_x: number;
  coordenada_y: number;
}

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  const filter = req.query;
  const users = await userService.getUsers(filter);
  res.send(users);
};

export const createUser = async (req: Request, res: Response) => {
  const newUser: User = {
    ...req.body,
  };

  const user = await userService.createUser(newUser);

  res.send(user);
};

// controller
export const deleteUser = async (req: Request, res: Response) => {
  const userId = Number(req.params.id);

  try {
    const deletedUser = await userService.deleteUser(userId);
    res.send(deletedUser);
  } catch (e) {
    res.status(404).send({
      message: `Usuário com ID ${userId} não encontrado`,
    });
  }
};
