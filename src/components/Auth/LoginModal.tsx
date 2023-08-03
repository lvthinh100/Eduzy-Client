import React from "react";
import {
  Dialog,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  Stack,
  FormControlLabel,
  Checkbox,
  Link,
  Button,
  Divider,
  IconButton,
} from "@mui/material";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CloseIcon from "@mui/icons-material/Close";

// Data
import { useForm, SubmitHandler } from "react-hook-form";
import { appActions } from "../../redux/slices/appSlice";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";

type FormValues = {
  username: string;
  password: string;
};

const LoginModal = () => {
  const open = useAppSelector((state) => state.app.showLoginModal);
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<FormValues>();

  const handleClose = () => {
    dispatch(appActions.toggleShowLoginModal());
  };

  const handleSubmitForm: SubmitHandler<FormValues> = (data: FormValues) => {
    console.log(data);
    dispatch(
      appActions.showNotification({
        variant: "success",
        message: data.username,
      })
    );
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <Paper sx={{ padding: 3, backgroundColor: "white", minWidth: 360 }}>
        <Typography variant="h4" fontWeight="bolder" textAlign="center" mb={3}>
          Login
        </Typography>
        <Stack component="form" onSubmit={handleSubmit(handleSubmitForm)}>
          <FormControl variant="standard" sx={{ mb: 1 }}>
            <InputLabel htmlFor="input-with-icon-adornment">
              Tài khoản
            </InputLabel>
            <Input
              id="input-with-icon-adornment"
              startAdornment={
                <InputAdornment position="start">
                  <PersonOutlinedIcon fontSize="small" />
                </InputAdornment>
              }
              placeholder="Nhập tên tài khoản"
              {...register("username")}
            />
          </FormControl>
          <FormControl variant="standard">
            <InputLabel htmlFor="input-with-icon-adornment">
              Mật khẩu
            </InputLabel>
            <Input
              id="input-with-icon-adornment"
              startAdornment={
                <InputAdornment position="start">
                  <LockOutlinedIcon fontSize="small" />
                </InputAdornment>
              }
              placeholder="Nhập mật khẩu"
              {...register("password")}
            />
          </FormControl>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Ghi nhớ đăng nhập"
              sx={{
                "& .MuiSvgIcon-root": { fontSize: 14 },
                "& .MuiTypography-root": { fontSize: 14 },
                opacity: 0.6,
              }}
            />

            <Link
              sx={{
                fontSize: 14,
                "&:hover": {
                  opacity: 0.8,
                  cursor: "pointer",
                },
                textDecoration: "none",
              }}
            >
              Quên mật khẩu
            </Link>
          </Stack>

          <Stack mt={4} alignItems="center">
            <Button variant="gradient2" sx={{ width: "100%" }} type="submit">
              Đăng nhập
            </Button>
            <Divider flexItem>Hoặc</Divider>
            <Button variant="gradient" sx={{ width: 250 }} type="submit">
              Đăng nhập dùng thử
            </Button>
          </Stack>
        </Stack>
        <IconButton
          aria-label="close"
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
          onClick={handleClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Paper>
    </Dialog>
  );
};

export default LoginModal;
