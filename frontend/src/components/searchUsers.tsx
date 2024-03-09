import { Box, InputAdornment, SxProps, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { getUsers } from "../store/actions/user";

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

const SearchUsers = () => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    search: "",
  });

  const handleChange = async (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    dispatch(await getUsers(e.target.value));
  };

  return (
    <Box
      p={2}
      borderRadius={2}
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      sx={{ backgroundColor: "#2f3349" }}
    >
      <TextField
        fullWidth
        sx={textFieldStyle}
        placeholder="Busque por nome, email ou telefone"
        name="search"
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "white" }} />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default SearchUsers;
