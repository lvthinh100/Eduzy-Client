import React from "react";
import { Dialog, Stack, Typography, Button } from "@mui/material";

import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { appActions } from "../redux/slices/appSlice";

const Notification = () => {
  const state = useAppSelector((state) => state.app.notification);
  const dispatch = useAppDispatch();
  const handleClose = () => {
    dispatch(appActions.hideNotification());
  };
  return (
    <Dialog open={state.open} onClose={handleClose}>
      <Stack alignItems="center" padding={2} bgcolor="white">
        <ErrorOutlineOutlinedIcon
          sx={{ color: "red", width: 60, height: 60 }}
        />
        <Typography variant="h4">Sai Tài Khoản: {state.message}</Typography>
        <Button variant="gradient2" sx={{ width: 120 }} onClick={handleClose}>
          OK
        </Button>
      </Stack>
    </Dialog>
  );
};

export default Notification;
