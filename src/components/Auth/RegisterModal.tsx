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
import CakeIcon from "@mui/icons-material/Cake";

// Data
import { useForm, SubmitHandler } from "react-hook-form";
import appSlice, { appActions } from "../../redux/slices/appSlice";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import RHFTextField from "../RHF/RHFTextField";
import FormProvider from "../RHF/FormProvider";
import RHFDatePicker from "../RHF/RHFDatePicker";
import RHFRadioGroup from "../RHF/RHFRadioGroup";

import { SignUpData } from "../../model/Student";
import { Gender } from "../../model/Standard";
import { signup } from "../../api";
import { authActions } from "../../redux/slices/authSlice";
import RHFDateField from "../RHF/RHFDateField";

const RegisterModal = () => {
  const open = useAppSelector((state) => state.app.showRegisterModal);
  const dispatch = useAppDispatch();
  const schema = yup.object().shape({
    name: yup.string().required("Vui lòng nhập tài khoản"),
    password: yup
      .string()
      .min(6, "Mật khẩu phải ít nhất 6 ký tự")
      .required("Vui long nhap mật khẩu"),
    birth: yup
      .date()
      .typeError("Vui lòng nhập ngày sinh hợp lệ")
      .required("Vui lòng chọn ngày sinh")
      .max(new Date(), "Vui lòng nhập ngày sinh ở quá khứ"),
    gender: yup.mixed<Gender>().required("Vui lòng chọn giới tính"),
    expiredTime: yup.date().default(() => new Date("2024-01-01")),
  });
  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      password: "",
      birth: new Date(),
      gender: "Nam" as Gender,
      expiredTime: new Date("2024-01-01"),
    },
    resolver: yupResolver(schema),
  });

  const handleClose = () => {
    dispatch(appActions.toggleShowRegisterModal());
  };

  const handleSubmitForm: SubmitHandler<SignUpData> = async (
    data: SignUpData
  ) => {
    try {
      const { data: response } = await signup(data);
      dispatch(
        appActions.showNotification({
          variant: "success",
          message:
            "Tạo tài khoản thành công!\n" +
            "Tài khoản: " +
            response.data.user.studentCode +
            "\nMật khẩu: " +
            data.password,
        })
      );
      dispatch(
        authActions.setUser({
          user: response.data.user,
          token: response.token,
          tokenExpires: response.tokenExpires,
        })
      );
      dispatch(appActions.toggleShowRegisterModal());
    } catch (err) {
      console.log(err);
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
          Sign Up
        </Typography>
        <FormProvider<SignUpData> methods={methods} handler={handleSubmitForm}>
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
          <RHFDateField
            name="birth"
            label="Nhập ngày sinh"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CakeIcon />
                </InputAdornment>
              ),
            }}
            disableFuture
          />
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
          <RHFRadioGroup
            name="gender"
            label="Giới tính"
            options={[
              { value: "Nam", label: "Nam" },
              { value: "Nữ", label: "Nữ" },
            ]}
            row
          />
          <Stack mt={4} alignItems="center">
            <Button
              variant="gradient2"
              sx={{ p: 1.25, width: "100%", fontSize: "12px" }}
              type="submit"
            >
              Đăng ký
            </Button>
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
