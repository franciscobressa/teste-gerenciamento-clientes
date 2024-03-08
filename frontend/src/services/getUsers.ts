import axios, { AxiosResponse } from "axios";

const getUsers = async () => {
  const response: AxiosResponse = await axios({
    method: "get",
    url: "http://localhost:5000/user",
  });

  return response.data;
};

export default getUsers;
