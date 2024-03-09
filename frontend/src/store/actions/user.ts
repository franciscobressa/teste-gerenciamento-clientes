import axios, { AxiosResponse } from "axios";
import { setUsersList } from "../reducers/user";
import { PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id?: number;
  nome: string;
  email: string;
  telefone: string;
  coordenada_x: number;
  coordenada_y: number;
}

const getUsers = async (
  search: string = ""
): Promise<PayloadAction<User[]>> => {
  const response: AxiosResponse = await axios({
    method: "get",
    url: `http://localhost:5000/user?nome=${search}&email=${search}&telefone=${search}`,
  });

  return setUsersList(response.data);
};

const createUser = async (newUser: User) => {
  try {
    await axios({
      method: "post",
      url: "http://localhost:5000/user",
      data: {
        ...newUser,
        coordenada_x: Number(newUser.coordenada_x),
        coordenada_y: Number(newUser.coordenada_y),
      },
    });
  } catch (e) {
    console.error(e);
  }

  await getUsers();
};

const deleteUser = async (id: number) => {
  try {
    await axios({
      method: "delete",
      url: `http://localhost:5000/user/${id}`,
    });
  } catch (e) {
    console.error(e);
  }

  await getUsers();
};

export { getUsers, createUser, deleteUser };
