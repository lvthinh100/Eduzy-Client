import React from "react";

import { Controller, useFormContext } from "react-hook-form";
import { DateField, DateFieldProps } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import MyTextField from "./TextField";

type MyInputProps = DateFieldProps<Dayjs> & { name: string; label: string };

const RHFDateField: React.FC<MyInputProps> = ({ name, label, InputProps }) => {
  const { control } = useFormContext();
  const [value, setValue] = React.useState<string | null>("");
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <DateField
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
              InputProps: InputProps,
              helperText: error?.message,
              label: label,
              error: !!error,
              defaultValue: null,
            },
          }}
        />
      )}
    />
  );
};

export default RHFDateField;
