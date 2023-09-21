import React, { useRef, useState } from "react";
import {
  Avatar,
  Box,
  Dialog,
  Button,
  Stack,
  InputAdornment,
  Theme,
  Typography,
  IconButton,
} from "@mui/material";
import landscape from "../../assets/landscape.jpg";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CakeIcon from "@mui/icons-material/Cake";

// RHF
import FormProvider from "../RHF/FormProvider";
import RHFInput from "../RHF/RHFTextField";
import RHFRadioGroup from "../RHF/RHFRadioGroup";
import RHFDateField from "../RHF/RHFDateField";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";

// App Component
import { StyledPaper } from "./style";
import Crown from "../Crown";

// Data
import { StudentInfo } from "../../model/Student";
import { Gender } from "../../model/Standard";
import dayjs, { Dayjs } from "dayjs";
import content from "../../constants/content";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { MODAL, appActions } from "../../redux/slices/appSlice";
// Redux

type PropsType = {
  user: StudentInfo;
};

type UpdateFormType = {
  name: string;
  birth: Date;
  gender: Gender;
};

const UpdateProfileDialog: React.FC<PropsType> = ({ user }) => {
  const dispatch = useAppDispatch();

  const avatarRef = useRef(null);
  const [selectedAvatarImg, setSelectedAvatarImg] = useState<null | string>(
    null
  );
  const { showUpdateProfileModal } = useAppSelector((state) => state.app);

  const handleCloseModal = () => {
    dispatch(appActions.closeModal(MODAL.UPDATE_PROFILE));
  };

  const handleChangeAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && event.target.files) {
      setSelectedAvatarImg(URL.createObjectURL(event.target.files[0]));
    }
  };

  const submitFormHandler: SubmitHandler<UpdateFormType> = (
    data: UpdateFormType
  ) => {
    console.log(data);
  };

  const schema = yup.object().shape({
    name: yup.string().required("Vui lòng nhập tên"),
    birth: yup
      .date()
      .typeError("Vui lòng nhập ngày sinh hợp lệ")
      .required("Vui lòng chọn ngày sinh")
      .max(new Date(), "Vui lòng nhập ngày sinh ở quá khứ"),
    gender: yup.mixed<Gender>().required("Vui lòng chọn giới tính"),
  });

  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      name: user.fullName,
      birth: new Date(
        dayjs(user.dateOfBirth, content.birthFormat).toISOString()
      ),
      gender: user.gender,
    },
    resolver: yupResolver(schema),
  });

  return (
    <Dialog open={showUpdateProfileModal} onClose={handleCloseModal}>
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
              src={selectedAvatarImg ? selectedAvatarImg : user.avatar}
            >
              <AccountCircleIcon />
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
            {user.fullName}
          </Typography>
          <Typography fontSize={12}>#{user.studentCode}</Typography>
          <Stack direction="row" spacing={1}>
            <Crown quantity={1} variant="first" />
            <Crown quantity={1} variant="second" />
            <Crown quantity={1} variant="third" />
          </Stack>
        </Stack>
        <Box
          sx={{ p: 3, backgroundColor: "white", borderRadius: "30px 30px 0 0" }}
        >
          <FormProvider<UpdateFormType>
            methods={methods}
            handler={submitFormHandler}
          >
            <RHFInput fullWidth name="name" label="Tên" />
            <RHFDateField
              name="birth"
              label="Ngày sinh"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CakeIcon />
                  </InputAdornment>
                ),
              }}
              disableFuture
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
