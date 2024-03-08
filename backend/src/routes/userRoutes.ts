import express, { Router, Request, Response } from "express";

const userRoutes: Router = express.Router();

import { getUsers, createUser } from "../controller/userController";

userRoutes.get("/", getUsers);
userRoutes.post("/", createUser);

export default userRoutes;
