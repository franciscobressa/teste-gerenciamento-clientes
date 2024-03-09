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
import { Formik } from "formik";
import * as Yup from "yup";

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

  const validationSchema = Yup.object({
    nome: Yup.string().required("Campo obrigatório"),
    email: Yup.string().email("Email inválido").required("Campo obrigatório"),
    telefone: Yup.string().required("Campo obrigatório"),
    coordenada_x: Yup.number().required("Campo obrigatório"),
    coordenada_y: Yup.number().required("Campo obrigatório"),
  });

  return (
    <Container>
      <Typography mb={3} align="center">
        Criar Novo Usuário
      </Typography>
      <Formik
        initialValues={{
          nome: "",
          email: "",
          telefone: "",
          coordenada_x: 0,
          coordenada_y: 0,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            await createUser(values).then(async () => {
              dispatch(await getUsers());
              resetForm();
            });
          } catch (e) {
            console.error(e);
          }
        }}
      >
        {(formik) => (
          <form>
            <Stack spacing={3}>
              <TextField
                label="Nome"
                variant="outlined"
                fullWidth
                name="nome"
                sx={textFieldStyle}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.nome}
                error={Boolean(formik.errors.nome)}
                helperText={formik.errors.nome}
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                name="email"
                sx={textFieldStyle}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                error={Boolean(formik.errors.email)}
                helperText={formik.errors.email}
              />
              <TextField
                label="Telefone"
                variant="outlined"
                fullWidth
                name="telefone"
                sx={textFieldStyle}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.telefone}
                error={Boolean(formik.errors.telefone)}
                helperText={formik.errors.telefone}
              />
              <TextField
                label="Coordenada X"
                variant="outlined"
                fullWidth
                name="coordenada_x"
                sx={textFieldStyle}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.coordenada_x}
                error={Boolean(formik.errors.coordenada_x)}
                helperText={formik.errors.coordenada_x}
              />
              <TextField
                label="Coordenada Y"
                variant="outlined"
                fullWidth
                name="coordenada_y"
                sx={textFieldStyle}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.coordenada_y}
                error={Boolean(formik.errors.coordenada_y)}
                helperText={formik.errors.coordenada_y}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => formik.submitForm()}
                fullWidth
              >
                Cadastrar
              </Button>
            </Stack>
          </form>
        )}
      </Formik>
    </Container>
  );
};

export default CreateUserForm;
