// SimpleForm.js
import { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  SxProps,
  Stack,
} from "@mui/material";
import { User, createUser, getUsers } from "../../store/actions/user";
import { useAppDispatch } from "../../hooks/useAppDispatch";

const textFieldStyle: SxProps = {
  "& label.Mui-focused": {
    color: "white",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "white",
  },
  "& .MuiInputLabel-root": {
    color: "white",
  },
  "& .MuiOutlinedInput-input": {
    color: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
};

const CreateUserForm = () => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<User>({
    nome: "",
    email: "",
    telefone: "",
    coordenada_x: 0,
    coordenada_y: 0,
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await createUser(formData).then(async () => {
        dispatch(await getUsers());
      });
    } catch (e) {
      console.error(e);
    }

    setFormData({
      nome: "",
      email: "",
      telefone: "",
      coordenada_x: 0,
      coordenada_y: 0,
    });

    console.log("Form submitted:", formData);
  };

  return (
    <Container>
      <Stack spacing={3}>
        <Typography align="center">Criar Novo Usuário</Typography>

        <TextField
          label="Nome"
          variant="outlined"
          fullWidth
          name="nome"
          value={formData.nome}
          sx={textFieldStyle}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          name="email"
          sx={textFieldStyle}
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          label="Telefone"
          variant="outlined"
          fullWidth
          name="telefone"
          sx={textFieldStyle}
          value={formData.telefone}
          onChange={handleChange}
        />
        <TextField
          label="Coordenada X"
          variant="outlined"
          fullWidth
          name="coordenada_x"
          sx={textFieldStyle}
          value={formData.coordenada_x}
          onChange={handleChange}
        />
        <TextField
          label="Coordenada Y"
          variant="outlined"
          fullWidth
          name="coordenada_y"
          sx={textFieldStyle}
          value={formData.coordenada_y}
          onChange={handleChange}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          fullWidth
        >
          Cadastrar
        </Button>
      </Stack>
    </Container>
  );
};

export default CreateUserForm;
