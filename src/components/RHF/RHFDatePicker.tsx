import React from "react";

import { Controller, useFormContext } from "react-hook-form";
import CakeIcon from "@mui/icons-material/Cake";
//Mui
import {
  TextFieldProps,
  InputAdornment,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { DateField, DateFieldProps } from "@mui/x-date-pickers";

import { StyledDateTextField, StyledLabel } from "./style";

import dayjs, { Dayjs } from "dayjs";

const MyTextField = React.forwardRef(
  (props: TextFieldProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const { label, name, error, helperText, ...rest } = props;
    return (
      <FormControl variant="standard" fullWidth>
        <StyledLabel htmlFor={name}>{label}</StyledLabel>
        <StyledDateTextField fullWidth variant="standard" ref={ref} {...rest} />
        {error && (
          <FormHelperText
            error={!!error}
            sx={{ m: 0, position: "absolute", top: 0, right: 0 }}
          >
            {"Ngày sinh không hợp lệ"}
          </FormHelperText>
        )}
      </FormControl>
    );
  }
);

type MyInputProps = DateFieldProps<Dayjs> & { name: string; label: string };

const RHFDatePicker: React.FC<MyInputProps> = ({ name, label, ...other }) => {
  const { control } = useFormContext();
  const [value, setValue] = React.useState<Dayjs | null>(dayjs("2006-01-01"));

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <DateField
          disableFuture
          value={value}
          format="DD/MM/YYYY"
          defaultValue={dayjs("2006-01-01")}
          onChange={(newValue) => {
            field.onChange(newValue);
            setValue(newValue);
          }}
          slots={{
            textField: MyTextField,
          }}
          slotProps={{
            // this adds my start icon
            textField: {
              InputProps: {
                startAdornment: (
                  <InputAdornment position="start">
                    <CakeIcon />
                  </InputAdornment>
                ),
                placeholder: "Nhập ngày sinh",
              },
              helperText: error?.message,
              label: label,
              error: !!error,
              defaultValue: null,
            },

            // // this puts the date picker icon at the end
            // inputAdornment: {
            //   position: "end",
            // },
          }}
          // renderInput={(props) => (
          //   <StyledTextField
          //     {...props}
          //     color="primary"
          //     sx={{
          //       svg: (theme) => ({ color: theme.palette.primary.main }),
          //     }}
          //   />
          // )}
        />
      )}
    />
  );
};
export default RHFDatePicker;
