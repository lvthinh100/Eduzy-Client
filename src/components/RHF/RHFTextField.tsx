import React from "react";

import { Controller, useFormContext } from "react-hook-form";
import {
  Input,
  styled,
  FormControl,
  FormHelperText,
  InputProps,
  InputLabel,
} from "@mui/material";
import { Theme } from "@mui/material/styles/createTheme";

const StyledInput = styled(Input)(({ theme }) => ({
  // margin: theme.spacing(1.2, 0),
  // position: "relative",
  // "& .MuiOutlinedInput-notchedOutline": {
  //   borderColor: theme.palette.primary.main,
  //   padding: 2,
  // },
  // "& input": {
  //   padding: theme.spacing(0.8, 1),
  // },
  // "& label": {
  //   fontSize: "1.1rem",
  //   top: -10,
  //   left: -4,
  // },
  // "& label.MuiInputLabel-shrink ": {
  //   top: -2,
  //   left: -6,
  // },
}));

type MyInputProps = InputProps & { name: string; label: string };

const RHFInput: React.FC<MyInputProps> = ({ name, label, ...other }) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <FormControl variant="standard" fullWidth sx={{ my: 1 }}>
            <InputLabel htmlFor={name}>{label}</InputLabel>
            <StyledInput
              fullWidth
              error={!!error}
              inputProps={{ style: { fontSize: "1.2rem" } }}
              sx={{
                svg: (theme: Theme) => ({
                  color: error
                    ? theme.palette.error.main
                    : theme.palette.primary.main,
                }),
              }}
              onChange={onChange}
              value={value}
              {...other}
            />
            <FormHelperText
              error={!!error}
              sx={{ m: 0, position: "absolute", top: -12, right: 0 }}
            >
              {error?.message}
            </FormHelperText>
          </FormControl>
        );
      }}
    />
  );
};
export default RHFInput;
