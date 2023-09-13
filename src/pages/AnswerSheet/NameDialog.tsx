import React, { useState } from "react";
import { Button, Dialog, DialogProps, Stack, TextField } from "@mui/material";

type PropsType = {
  onSubmitName: (name: string) => void;
};

const NameDialog: React.FC<PropsType & DialogProps> = ({
  onSubmitName,
  ...dialogProps
}) => {
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const handleSubmitName = () => {
    if (name === "") return setError("Vui lòng nhập tên");
    onSubmitName(name);
  };

  return (
    <Dialog maxWidth="sm" {...dialogProps}>
      <Stack direction="column" alignItems="center" p={1}>
        <TextField
          placeholder="Họ và tên"
          sx={{ marginBottom: 1 }}
          value={name}
          required
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setName(event.target.value);
            setError(null);
          }}
          error={!!error}
          helperText={error}
        />
        <Button type="submit" variant="gradient" onClick={handleSubmitName}>
          Làm bài
        </Button>
      </Stack>
    </Dialog>
  );
};

export default NameDialog;
