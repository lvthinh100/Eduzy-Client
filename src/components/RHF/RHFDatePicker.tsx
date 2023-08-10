import React from "react";

import { Controller, useFormContext } from "react-hook-form";
import CakeIcon from "@mui/icons-material/Cake";
//Mui
import { TextFieldProps, InputAdornment } from "@mui/material";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { StyledDateTextField } from "./style";

const MyTextField = React.forwardRef(
  (props: TextFieldProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const { ...rest } = props;

    return (
      <StyledDateTextField fullWidth variant="standard" ref={ref} {...rest} />
    );
  }
);

type MyInputProps = DatePickerProps<Dayjs> & { name: string; label: string };

const RHFDatePicker: React.FC<MyInputProps> = ({ name, label, ...other }) => {
  const { control } = useFormContext();
  const [value, setValue] = React.useState<string | null>("");
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <DatePicker
          disableFuture
          value={value}
          format="DD/M/YYYY"
          defaultValue=""
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

            // this puts the date picker icon at the end
            inputAdornment: {
              position: "end",
            },
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
