import React, { ChangeEvent, LegacyRef, useRef, useState } from "react";
import {
  Avatar,
  Box,
  Dialog,
  Button,
  Stack,
  Theme,
  Typography,
  IconButton,
} from "@mui/material";
import landscape from "../../assets/landscape.jpg";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
// RHF
import FormProvider from "../RHF/FormProvider";
import RHFInput from "../RHF/RHFTextField";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";

// App Component
import { StyledPaper } from "./style";
import Crown from "../Crown";

// Data
import { SignUpData } from "../../model/Student";
import { Gender } from "../../model/Standard";
// Redux

const UpdateProfileDialog = () => {
  const avatarRef = useRef(null);
  const [selectedAvatarImg, setSelectedAvatarImg] = useState<null | string>(
    null
  );

  const handleChangeAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && event.target.files) {
      setSelectedAvatarImg(URL.createObjectURL(event.target.files[0]));
    }
  };

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

  return (
    <Dialog open={true}>
      <StyledPaper
        sx={{
          backgroundImage: `url(${landscape})`,
          backgroundSize: "400px 400px",
          backgroundPosition: "center top",
        }}
      >
        <Typography
          variant="h4"
          sx={{ padding: (theme: Theme) => theme.spacing(1, 3) }}
          textAlign="center"
        >
          Chỉnh sửa thông tin
        </Typography>
        <Stack direction="column" alignItems="center" mb={3}>
          <Box position="relative">
            <Avatar
              sx={{
                width: 80,
                height: 80,
                border: "3px solid",
                borderColor: (theme: Theme) => theme.palette.highlighter.main,
              }}
              src={selectedAvatarImg ? selectedAvatarImg : "nah"}
            >
              T
            </Avatar>
            <IconButton
              component="label"
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                padding: "3px",
                backgroundColor: (theme: Theme) =>
                  `${theme.palette.highlighter.main} !important`,
                "&:hover": {
                  opacity: 0.8,
                },
              }}
            >
              <CameraAltIcon sx={{ width: 25, height: 25, color: "black" }} />
              <input
                type="file"
                hidden
                accept="image/*"
                ref={avatarRef}
                onChange={handleChangeAvatar}
              />
            </IconButton>
          </Box>

          <Typography fontWeight="bold" fontSize={12}>
            Lê Văn Thịnh
          </Typography>
          <Typography fontSize={12}>#000009</Typography>
          <Stack direction="row" spacing={1}>
            <Crown quantity={1} variant="first" />
            <Crown quantity={1} variant="second" />
            <Crown quantity={1} variant="third" />
          </Stack>
        </Stack>
        <Box
          sx={{ p: 3, backgroundColor: "white", borderRadius: "30px 30px 0 0" }}
        >
          <FormProvider<SignUpData> methods={methods} handler={() => {}}>
            <RHFInput fullWidth name="name" label="Tên" />
            <RHFInput fullWidth name="birth" label="Ngày sinh" />
            <RHFInput fullWidth name="gender" label="Giới tính" />
            <Button
              variant="gradient"
              type="submit"
              sx={{ display: "block", mx: "auto" }}
            >
              Xác nhận
            </Button>
          </FormProvider>
        </Box>
      </StyledPaper>
    </Dialog>
  );
};

export default UpdateProfileDialog;
