import React from "react";

import { Controller, useFormContext } from "react-hook-form";
import CakeIcon from "@mui/icons-material/Cake";
//Mui

import { InputAdornment } from "@mui/material";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers";
import MyTextField from "./TextField";
import { Dayjs } from "dayjs";

type MyInputProps = DatePickerProps<Dayjs> & { name: string; label: string };

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
        />
      )}
    />
  );
};
export default RHFDatePicker;
