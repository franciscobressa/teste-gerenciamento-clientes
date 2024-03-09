import { Box, Button, Typography } from "@mui/material";

const Header = () => {
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
      <Button variant="contained" color="success">
        + Adicionar Cliente
      </Button>
    </Box>
  );
};

export default Header;
