import { useEffect, useState } from "react";
import "./style.css";
import {
  Box,
  Container,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import getUsers from "./services/getUsers";

function App() {
  interface User {
    id: number;
    nome: string;
    email: string;
    telefone: string;
    coordenada_x: number;
    coordenada_y: number;
  }

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const handleGetUsers = async () => {
      const data: User[] = await getUsers();
      setUsers(data);
    };

    handleGetUsers();
  }, []);

  if (!users) {
    return (
      <Typography color={"white"} textAlign={"center"}>
        Nenhum Cliente encontrado
      </Typography>
    );
  }

  return (
    <Container>
      <Stack spacing={2}>
        <Header />
        <Box p={1} borderRadius={2} sx={{ backgroundColor: "#2f3349" }}>
          <List>
            {users.map((user) => {
              return (
                <>
                  <ListItem color={"white"} key={user.id}>
                    <ListItemText>
                      <Typography color={"white"}>{user.nome}</Typography>
                    </ListItemText>
                  </ListItem>
                </>
              );
            })}
          </List>
        </Box>
      </Stack>
    </Container>
  );
}

const Header = () => {
  return (
    <Box p={2} borderRadius={2} sx={{ backgroundColor: "#2f3349" }}>
      <Typography color={"white"} fontWeight={"bold"}>
        Clientes
      </Typography>
    </Box>
  );
};

export default App;
