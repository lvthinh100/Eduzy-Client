import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogProps,
  FormControl,
  FormHelperText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { StyledInput, StyledLabel } from "../../components/RHF/style";

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
      <Paper sx={{ padding: 3, backgroundColor: "white", maxWidth: 360 }}>
        <Stack direction="column" alignItems="center">
          {/* <TextField
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
        /> */}
          <Typography
            fontSize="30px"
            color="#39393A"
            fontFamily="_SegoeUIBold"
            fontWeight="bold"
            textAlign="center"
            mb={3}
          >
            Enter Your Name
          </Typography>
          <FormControl variant="standard" fullWidth sx={{ my: 1 }}>
            <StyledLabel htmlFor={name}>Họ và tên</StyledLabel>

            <StyledInput
              fullWidth
              error={!!error}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setName(event.target.value);
                setError(null);
              }}
              value={name}
            />
            <FormHelperText
              error={!!error}
              sx={{ m: 0, position: "absolute", top: 0, right: 0 }}
            >
              {error ? error : ""}
            </FormHelperText>
          </FormControl>
          <Button
            variant="gradient2"
            sx={{ p: 1.25, width: "100%", fontSize: "12px", mt: 4 }}
            type="submit"
            onClick={handleSubmitName}
          >
            Đồng ý
          </Button>
        </Stack>
      </Paper>
    </Dialog>
  );
};

export default NameDialog;
