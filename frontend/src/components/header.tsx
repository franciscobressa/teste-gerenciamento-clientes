import { Box, Button, Modal, Typography } from "@mui/material";
import { useState } from "react";
import CreateUserForm from "./form/createUserForm";

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

const Header = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box
      p={2}
      borderRadius={2}
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      sx={{ backgroundColor: "#2f3349" }}
    >
      <Typography color={"white"} fontWeight={"bold"}>
        Clientes
      </Typography>
      <Button onClick={handleOpen} variant="contained" color="success">
        + Adicionar Cliente
      </Button>
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
    </Box>
  );
};

export default Header;
