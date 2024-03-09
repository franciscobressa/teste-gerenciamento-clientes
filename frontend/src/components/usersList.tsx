import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useAppSelector } from "../hooks/useAppSelector";
import { User } from "../store/actions/user";

const UsersList = () => {
  const users: User[] = useAppSelector((state) => state.user.list);

  if (!users) {
    return (
      <Typography color={"white"} textAlign={"center"}>
        Nenhum Cliente encontrado
      </Typography>
    );
  }

  return (
    <Box p={1} borderRadius={2} sx={{ backgroundColor: "#2f3349" }}>
      <List>
        {users.map((user) => {
          return (
            <ListItem color={"white"} key={user.id}>
              <ListItemText>
                <Typography color={"white"}>{user.nome}</Typography>
              </ListItemText>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default UsersList;
