import React from "react";
import {
  Dialog,
  Paper,
  Typography,
  InputAdornment,
  Stack,
  Button,
  IconButton,
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
import RHFDatePicker from "../RHF/RHFDatePicker";

type FormValues = {
  name: string;
  password: string;
  birth: Date;
};

const RegisterModal = () => {
  const open = useAppSelector((state) => state.app.showRegisterModal);
  const dispatch = useAppDispatch();
  const schema = yup.object().shape({
    name: yup.string().required("Vui lòng nhập tài khoản"),
    password: yup
      .string()
      .min(8, "Mật khẩu phải ít nhất 8 ký tự")
      .required("Vui long nhap mật khẩu"),
    birth: yup.date().nullable().required("Vui lòng chọn ngày sinh"),
  });
  const methods = useForm({
    mode: "onChange",
    defaultValues: { name: "", password: "", birth: undefined },
    resolver: yupResolver(schema),
  });

  const handleClose = () => {
    dispatch(appActions.toggleShowRegisterModal());
  };

  const handleSubmitForm: SubmitHandler<FormValues> = (data: FormValues) => {
    console.log(data);
    dispatch(
      appActions.showNotification({
        variant: "success",
        message: data.name,
      })
    );
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
          Sign Up
        </Typography>
        <FormProvider<FormValues> methods={methods} handler={handleSubmitForm}>
          <RHFTextField
            name="name"
            label="Họ và tên"
            startAdornment={
              <InputAdornment position="start">
                <PersonOutlinedIcon fontSize="small" />
              </InputAdornment>
            }
            placeholder="Nhập họ và tên"
          />
          <RHFDatePicker name="birth" label="Ngày sinh" />
          <RHFTextField
            name="password"
            label="Mật khẩu"
            startAdornment={
              <InputAdornment position="start">
                <LockOutlinedIcon />
              </InputAdornment>
            }
            placeholder="Nhập mật khẩu"
          />

          <Stack mt={4} alignItems="center">
            <Button
              variant="gradient2"
              sx={{ p: 1.25, width: "100%", fontSize: "12px" }}
              type="submit"
            >
              Đăng ký
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

export default RegisterModal;
