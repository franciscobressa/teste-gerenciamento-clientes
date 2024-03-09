import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Modal,
  Typography,
} from "@mui/material";
import { useAppSelector } from "../hooks/useAppSelector";
import { User, deleteUser, getUsers } from "../store/actions/user";
import InfoIcon from "@mui/icons-material/Info";
import { useState } from "react";
import { Delete } from "@mui/icons-material";
import { useAppDispatch } from "../hooks/useAppDispatch";

const UsersList = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [selectedUser, selectUser] = useState<number | null>(null);

  const openUserDetails = (index: number) => {
    selectUser(index);
    handleOpen();
  };

  const users: User[] = useAppSelector((state) => state.user.list);

  if (users.length === 0) {
    return (
      <Typography color={"white"} textAlign={"center"}>
        Nenhum usuário cadastrado
      </Typography>
    );
  }

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "#2f3349",
    boxShadow: 24,
    p: 4,
    color: "white",
    borderRadius: "0.5em",
  };

  return (
    <Box p={1} borderRadius={2} sx={{ backgroundColor: "#2f3349" }}>
      <List>
        {users.map((user, index) => {
          return (
            <ListItem color={"white"} key={index}>
              <ListItemText>
                <Typography color={"white"}>{user.nome}</Typography>
              </ListItemText>
              <Button
                onClick={async () =>
                  await deleteUser(Number(user.id)).then(async () => {
                    dispatch(await getUsers());
                  })
                }
                color="error"
              >
                <Delete />
              </Button>
              <Button onClick={() => openUserDetails(index)} color="info">
                <InfoIcon />
              </Button>
            </ListItem>
          );
        })}
      </List>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          {selectedUser !== null && (
            <Box>
              ID: {users[selectedUser].id}
              <br />
              Nome: {users[selectedUser].nome}
              <br />
              Email: {users[selectedUser].email}
              <br />
              Telefone: {users[selectedUser].telefone}
              <br />
              Coordenadas: ({users[selectedUser].coordenada_x},{" "}
              {users[selectedUser].coordenada_y})
            </Box>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default UsersList;
