import React from "react";

import { Controller, useFormContext } from "react-hook-form";
import { FormControl, FormHelperText, InputProps } from "@mui/material";

import { StyledInput, StyledLabel } from "./style";

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
            <StyledLabel htmlFor={name}>{label}</StyledLabel>

            <StyledInput
              fullWidth
              error={!!error}
              onChange={onChange}
              value={value}
              {...other}
            />
            <FormHelperText
              error={!!error}
              sx={{ m: 0, position: "absolute", top: 0, right: 0 }}
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
