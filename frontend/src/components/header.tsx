import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import { useState } from "react";
import CreateUserForm from "./form/createUserForm";
import { useAppSelector } from "../hooks/useAppSelector";
import { User, calcularRota } from "../store/actions/user";

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

const Header = () => {
  const users: User[] = useAppSelector((state) => state.user.list);
  const [usersOrdenados, setUsersOrdenados] = useState(users);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openRota, setOpenRota] = useState(false);
  const handleOpenRota = () => setOpenRota(true);
  const handleCloseRota = () => setOpenRota(false);

  const handleCalcularRota = async () => {
    const visitacaoOrdem: any = await calcularRota();
    console.log(visitacaoOrdem);
    return visitacaoOrdem;
  };

  const ordenarUsuarios = async () => {
    handleOpenRota();
    setUsersOrdenados(await handleCalcularRota());
  };

  return (
    <Box
      py={1}
      px={2}
      borderRadius={2}
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      flexWrap={"wrap"}
      sx={{ backgroundColor: "#2f3349" }}
    >
      <Typography color={"white"} fontWeight={"bold"} my={2}>
        Clientes
      </Typography>
      <Stack direction="row" spacing={2}>
        <Button onClick={ordenarUsuarios} variant="contained" color="info">
          Calcular Menor Rota
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
            <Typography align="center" fontWeight={"bold"} variant={"h5"}>
              Ordem Visitação
            </Typography>
            <Typography align="center" m={"0 !important"}>
              Cálculo da menor rota possível para visitar todos os clientes
            </Typography>
            {usersOrdenados.map(
              (_user, index) =>
                index % 2 === 0 && (
                  <Typography key={index}>
                    {usersOrdenados[index].nome} (
                    {usersOrdenados[index].coordenada_x} ,{" "}
                    {usersOrdenados[index].coordenada_y})
                  </Typography>
                )
            )}
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
};

export default Header;
