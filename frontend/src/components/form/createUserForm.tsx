import {
  TextField,
  Button,
  Container,
  Typography,
  SxProps,
  Stack,
} from "@mui/material";
import { createUser, getUsers } from "../../store/actions/user";
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
    coordenada_x: Yup.number()
      .integer("Deve ser um número inteiro")
      .required("Campo obrigatório"),
    coordenada_y: Yup.number()
      .integer("Deve ser um número inteiro")
      .required("Campo obrigatório")
      .typeError("Deve ser um número inteiro"),
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
                error={formik.touched.nome && Boolean(formik.errors.nome)}
                helperText={formik.touched.nome && formik.errors.nome}
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
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
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
                error={
                  formik.touched.telefone && Boolean(formik.errors.telefone)
                }
                helperText={formik.touched.telefone && formik.errors.telefone}
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
                error={
                  formik.touched.coordenada_x &&
                  Boolean(formik.errors.coordenada_x)
                }
                helperText={
                  formik.touched.coordenada_x && formik.errors.coordenada_x
                }
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
                error={
                  formik.touched.coordenada_y &&
                  Boolean(formik.errors.coordenada_y)
                }
                helperText={
                  formik.touched.coordenada_y && formik.errors.coordenada_y
                }
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
