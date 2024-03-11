import express, { Router, Request, Response } from "express";

const userRoutes: Router = express.Router();

import {
  getUsers,
  createUser,
  deleteUser,
  calcularRota,
} from "../controller/userController";

userRoutes.get("/", getUsers);
userRoutes.post("/", createUser);
userRoutes.delete("/:id", deleteUser);
userRoutes.get("/calcular-rota", calcularRota);

export default userRoutes;
