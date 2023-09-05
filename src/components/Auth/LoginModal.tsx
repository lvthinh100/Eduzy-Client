import React from "react";
import {
  Dialog,
  Paper,
  Typography,
  InputAdornment,
  Stack,
  FormControlLabel,
  Checkbox,
  Link,
  Button,
  Divider,
  IconButton,
  Box,
} from "@mui/material";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CloseIcon from "@mui/icons-material/Close";

// Data
import { useForm, SubmitHandler } from "react-hook-form";
import { appActions } from "../../redux/slices/appSlice";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import RHFTextField from "../RHF/RHFTextField";
import FormProvider from "../RHF/FormProvider";

import { LoginData } from "../../model/Student";
import { login } from "../../api";
import { authActions } from "../../redux/slices/authSlice";
import MESSAGE from "../../constants/message";

const LoginModal = () => {
  const open = useAppSelector((state) => state.app.showLoginModal);
  const dispatch = useAppDispatch();
  const schema = yup.object().shape({
    username: yup.string().required("Vui lòng nhập tài khoản"),
    password: yup
      .string()
      .min(6, "Mật khẩu phải ít nhất 6 ký tự")
      .required("Vui lòng nhập mật khẩu"),
  });
  const methods = useForm({
    mode: "onChange",
    defaultValues: { username: "", password: "" },
    resolver: yupResolver(schema),
  });

  const handleClose = () => {
    dispatch(appActions.toggleShowLoginModal());
  };

  const handleSubmitForm: SubmitHandler<LoginData> = async (
    data: LoginData
  ) => {
    try {
      const { data: response } = await login(data);
      dispatch(
        appActions.showNotification({
          variant: "success",
          message: "Đăng nhập thành công",
        })
      );
      dispatch(
        authActions.setUser({
          user: response.data.user,
          // token: response.token,
          // tokenExpires: response.tokenExpires,
        })
      );
      dispatch(appActions.toggleShowLoginModal());
    } catch (err) {
      dispatch(
        appActions.showNotification({
          variant: "error",
          message: MESSAGE.WRONG_AUTH_INFO,
        })
      );
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <Paper sx={{ padding: 3, backgroundColor: "white", maxWidth: 360 }}>
        <Typography
          fontSize="30px"
          color="#39393A"
          fontFamily="_SegoeUIBold"
          fontWeight="bold"
          textAlign="center"
          mb={3}
        >
          Login
        </Typography>
        <FormProvider<LoginData> methods={methods} handler={handleSubmitForm}>
          <RHFTextField
            name="username"
            label="Tài khoản"
            startAdornment={
              <InputAdornment position="start">
                <PersonOutlinedIcon fontSize="small" />
              </InputAdornment>
            }
            placeholder="Tài khoản"
          />
          <RHFTextField
            name="password"
            label="Mật khẩu"
            placeholder="Mật khẩu"
            startAdornment={
              <InputAdornment position="start">
                <LockOutlinedIcon fontSize="small" />
              </InputAdornment>
            }
          />
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mt={0.5}
          >
            <FormControlLabel
              control={<Checkbox defaultChecked sx={{ p: 1, pr: 0.5 }} />}
              label="Ghi nhớ đăng nhập"
              sx={{
                "& .MuiSvgIcon-root": { fontSize: 14 },
                "& .MuiTypography-root": { fontSize: 12 },
                opacity: 0.6,
                fontFamily: "_SegoeUINormal",
              }}
            />

            <Link
              sx={{
                fontSize: 12,
                fontFamily: "_SegoeUINormal",
                "&:hover": {
                  opacity: 0.8,
                  cursor: "pointer",
                },
                textDecoration: "none",
              }}
            >
              Quên mật khẩu?
            </Link>
          </Stack>

          <Stack mt={4} alignItems="center">
            <Button
              variant="gradient2"
              sx={{ p: 1.25, width: "100%", fontSize: "12px" }}
              type="submit"
            >
              Đăng nhập
            </Button>
            {/* <Divider flexItem>Hoặc</Divider>
            <Button variant="gradient" sx={{ width: 250 }} type="submit">
              Đăng nhập dùng thử
            </Button> */}
          </Stack>
        </FormProvider>
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
