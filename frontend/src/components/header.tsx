import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import { useState } from "react";
import CreateUserForm from "./form/createUserForm";
import { useAppSelector } from "../hooks/useAppSelector";
import { User } from "../store/actions/user";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#2f3349",
  boxShadow: 24,
  minWidth: "50%",
  p: 4,
  color: "white",
  borderRadius: "0.5em",
};

function calcularDistancia(x: number, y: number): number {
  return Math.sqrt(x * x + y * y);
}

function ordenarPorProximidadeAoCentro(users: User[]): User[] {
  return users.slice().sort((userA, userB) => {
    const distanciaA = calcularDistancia(
      userA.coordenada_x,
      userA.coordenada_y
    );
    const distanciaB = calcularDistancia(
      userB.coordenada_x,
      userB.coordenada_y
    );

    return distanciaA - distanciaB;
  });
}

const Header = () => {
  const users: User[] = useAppSelector((state) => state.user.list);
  const [usersOrdenados, setUsersOrdenados] = useState(users);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openRota, setOpenRota] = useState(false);
  const handleOpenRota = () => setOpenRota(true);
  const handleCloseRota = () => setOpenRota(false);

  const ordenarUsuarios = () => {
    handleOpenRota();
    setUsersOrdenados(ordenarPorProximidadeAoCentro(users));
  };

  return (
    <Box
      p={2}
      borderRadius={2}
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      flexWrap={"wrap"}
      sx={{ backgroundColor: "#2f3349" }}
    >
      <Typography color={"white"} fontWeight={"bold"} mb={2}>
        Clientes
      </Typography>
      <Stack direction="row" spacing={2}>
        <Button onClick={ordenarUsuarios} variant="contained" color="info">
          Calcular Rota
        </Button>
        <Button onClick={handleOpen} variant="contained" color="success">
          + Adicionar Cliente
        </Button>
      </Stack>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CreateUserForm />
        </Box>
      </Modal>

      <Modal
        open={openRota}
        onClose={handleCloseRota}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack spacing={3}>
            <Typography align="center">Ordem Visitação</Typography>

            {usersOrdenados.map((user, index) => (
              <Typography key={index}>
                {index + 1}. {user.nome} ({user.coordenada_x} ,{" "}
                {user.coordenada_y})
              </Typography>
            ))}
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
};

export default Header;
