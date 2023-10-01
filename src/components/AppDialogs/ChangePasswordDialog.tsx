import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Dialog,
  Button,
  Stack,
  Theme,
  Typography,
} from '@mui/material';
import landscape from '../../assets/landscape.jpg';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// RHF
import FormProvider from '../RHF/FormProvider';
import RHFInput from '../RHF/RHFTextField';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';

// App Component
import { StyledPaper } from './style';
import Crown from '../Crown';

// Data
import { StudentInfo, ChangePasswordData } from '../../model/Student';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { MODAL, appActions } from '../../redux/slices/appSlice';
import { changePassword } from '../../api';
import { authActions } from '../../redux/slices/authSlice';
import Coins from '../Coins';
// Redux

type PropsType = {
  user: StudentInfo;
};

const ChangePasswordDialog: React.FC<PropsType> = ({ user }) => {
  const dispatch = useAppDispatch();

  const [selectedAvatarImg, setSelectedAvatarImg] = useState<null | string>(
    null
  );
  const { showChangePasswordModal } = useAppSelector((state) => state.app);

  const handleCloseModal = () => {
    dispatch(appActions.closeModal(MODAL.CHANGE_PASSWORD));
  };

  const schema = yup.object().shape({
    password: yup
      .string()
      .min(6, 'Mật khẩu phải ít nhất 6 ký tự')
      .required('Vui lòng nhập mật khẩu mới'),
    password2: yup
      .string()
      .required('Vui lòng nhập lại mật khẩu mới')
      .oneOf([yup.ref('password'), ''], 'Mật khẩu không trùng khớp'),
  });

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      password: '',
      password2: '',
    },
    resolver: yupResolver(schema),
  });

  const submitFormHandler: SubmitHandler<ChangePasswordData> = async (
    data: ChangePasswordData
  ) => {
    try {
      const formData = {
        password: data.password, // Make sure the field name matches the server's expectation
      };
      const { data: response } = await changePassword(formData);
      dispatch(authActions.setUser({ user: response.data.user }));
      dispatch(appActions.closeModal(MODAL.CHANGE_PASSWORD));
      dispatch(
        appActions.showNotification({
          variant: 'success',
          message: 'Đổi mật khẩu thành công',
        })
      );
      setSelectedAvatarImg(null);
    } catch (err) {
      dispatch(appActions.closeModal(MODAL.CHANGE_PASSWORD));
      dispatch(
        appActions.showNotification({
          variant: 'success',
          message: 'Đổi mật khẩu thất bại',
        })
      );
    }
  };

  return (
    <Dialog open={showChangePasswordModal} onClose={handleCloseModal}>
      <StyledPaper
        sx={{
          backgroundImage: `url(${landscape})`,
          backgroundSize: '400px 400px',
          backgroundPosition: 'center top',
        }}
      >
        <Typography
          variant="h4"
          sx={{ padding: (theme: Theme) => theme.spacing(1, 3) }}
          textAlign="center"
        >
          Đổi mật khẩu
        </Typography>
        <Stack direction="column" alignItems="center" mb={1}>
          <Box position="relative">
            <Avatar
              sx={{
                width: 80,
                height: 80,
                border: '3px solid',
                borderColor: (theme: Theme) => theme.palette.highlighter.main,
              }}
              src={selectedAvatarImg ? selectedAvatarImg : user.avatar}
            >
              <AccountCircleIcon />
            </Avatar>
          </Box>

          <Typography
            fontSize="14px"
            fontFamily="SegoeUISemiBold"
            color="#472422"
          >
            {user.fullName}
          </Typography>
          <Typography
            fontSize="10px"
            fontFamily="SegoeUISemiBold"
            color="#472422"
          >
            #{user.studentCode}
          </Typography>
          <Stack direction="row" spacing={1} mb={0.5}>
            <Crown quantity={user.crowns1} variant="first" />
            <Crown quantity={user.crowns2} variant="second" />
            <Crown quantity={user.crowns3} variant="third" />
          </Stack>

          <Coins variant="first" value={user.coins} />
        </Stack>
        <Box
          sx={{ p: 3, backgroundColor: 'white', borderRadius: '30px 30px 0 0' }}
        >
          <FormProvider<ChangePasswordData>
            methods={methods}
            handler={submitFormHandler}
          >
            <RHFInput fullWidth name="password" label="Mật khẩu mới" />
            <RHFInput
              fullWidth
              name="password2"
              label="Nhập lại mật khẩu mới"
            />
            <Button
              variant="gradient"
              type="submit"
              sx={{ display: 'block', mx: 'auto' }}
            >
              Xác nhận
            </Button>
          </FormProvider>
        </Box>
      </StyledPaper>
    </Dialog>
  );
};

export default ChangePasswordDialog;
