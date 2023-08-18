import React from "react";
import { Controller, useFormContext } from "react-hook-form";

//Mui
import {
  FormControlLabel,
  RadioGroup,
  Radio,
  Typography,
  styled,
  FormControl,
  RadioGroupProps,
} from "@mui/material";
import { StyledLabel } from "./style";

const StyledRadio = styled(Radio)(({ theme }) => ({
  "& .MuiSvgIcon-root": {
    fontSize: "0.8rem",
  },
  "&.Mui-checked~.MuiTypography-root": {
    fontWeight: "bold",
  },
}));

const StyledInput = styled(FormControlLabel)({
  fontSize: "12px",
});

type OptionType = {
  value: string;
  label: string;
};

type PropsType = {
  name: string;
  label: string;
  options: OptionType[];
};

const RHFRadioGroup: React.FC<PropsType & RadioGroupProps> = ({
  name,
  label,
  options,
  ...other
}) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth>
          <StyledLabel>{label}</StyledLabel>
          {error && (
            <Typography sx={{ color: (theme) => theme.palette.error.main }}>
              {error?.message}
            </Typography>
          )}
          <RadioGroup {...field} {...other}>
            {options.map((option, index) => (
              <StyledInput
                key={option.value}
                value={option.value}
                checked={field.value === option.value}
                control={
                  <StyledRadio
                    sx={{
                      color: (theme) => theme.palette.primary.main,
                      "&.Mui-checked": {
                        color: (theme) => theme.palette.highlightText.main,
                      },
                    }}
                  />
                }
                label={
                  <Typography
                    sx={{ fontSize: "14px", fontFamily: "_SegoeUINormal" }}
                  >
                    {option.label}
                  </Typography>
                }
              />
            ))}
          </RadioGroup>
        </FormControl>
      )}
    />
  );
};
export default RHFRadioGroup;
