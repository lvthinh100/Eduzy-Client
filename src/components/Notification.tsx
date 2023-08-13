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
          sx={{ color: "#FE6C85", width: 50, height: 50 }}
        />
        <Typography m={3} mx={5} variant="h4" fontFamily="_SegoeUI">
          {state.message}
        </Typography>
        <Button variant="gradient2" sx={{ width: 120 }} onClick={handleClose}>
          OK
        </Button>
      </Stack>
    </Dialog>
  );
};

export default Notification;
