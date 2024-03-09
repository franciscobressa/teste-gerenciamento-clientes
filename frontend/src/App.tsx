import { useEffect } from "react";
import "./style.css";
import { Container, Stack } from "@mui/material";
import getUsers from "./store/actions/user";
import Header from "./components/header";
import UsersList from "./components/usersList";
import { useAppDispatch } from "./hooks/useAppDispatch";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleGetUsers = async () => {
      dispatch(await getUsers());
    };

    handleGetUsers();
  }, []);

  return (
    <Container>
      <Stack spacing={2}>
        <Header />
        <UsersList />
      </Stack>
    </Container>
  );
}

export default App;
