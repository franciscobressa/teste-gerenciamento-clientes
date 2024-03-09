import axios, { AxiosResponse } from "axios";
import { setUsersList } from "../reducers/user";
import { PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  coordenada_x: number;
  coordenada_y: number;
}

const getUsers = async (): Promise<PayloadAction<User[]>> => {
  const response: AxiosResponse = await axios({
    method: "get",
    url: "http://localhost:5000/user",
  });

  return setUsersList(response.data);
};

export default getUsers;
