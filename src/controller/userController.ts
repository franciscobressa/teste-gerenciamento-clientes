import express, { Router, Request, Response } from "express";

const userService = require("../services/userService");

export interface User {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  coordenada_x: number;
  coordenada_y: number;
}

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  const users = await userService.getUsers();
  res.send(users);
};

export const createUser = async (req: Request, res: Response) => {
  const newUser: User = {
    ...req.body,
  };

  const user = await userService.createUser(newUser);

  res.send(user);
};
