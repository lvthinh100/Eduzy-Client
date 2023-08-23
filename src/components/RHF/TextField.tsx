import React from "react";

//Mui
import { TextFieldProps, FormControl, FormHelperText } from "@mui/material";
import { StyledDateTextField, StyledLabel } from "./style";

const MyTextField = React.forwardRef(
  (props: TextFieldProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const { label, name, error, helperText, ...rest } = props;

    return (
      <FormControl variant="standard" fullWidth>
        <StyledLabel htmlFor={name}>{label}</StyledLabel>
        <StyledDateTextField
          fullWidth
          variant="standard"
          ref={ref}
          {...rest}
          error={error}
        />
        {error && (
          <FormHelperText
            error={!!error}
            sx={{ m: 0, position: "absolute", top: 0, right: 0 }}
          >
            {helperText}
          </FormHelperText>
        )}
      </FormControl>
    );
  }
);

export default MyTextField;
