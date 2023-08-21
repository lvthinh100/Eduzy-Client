import React from "react";
import { Dialog, Stack, Typography, Button } from "@mui/material";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { appActions } from "../redux/slices/appSlice";

const OKCancelNotification = () => {
  const state = useAppSelector((state) => state.app.okCancelNotification);
  const dispatch = useAppDispatch();

  const handleOk = () => {
    // Handle Ok action here
    dispatch(appActions.hideOKCancelNotification(true));
  };

  const handleCancel = () => {
    // Handle Cancel action here
    dispatch(appActions.hideOKCancelNotification(false));
  };

  return (
    <Dialog open={state.open} onClose={handleCancel}>
      <Stack alignItems="center" padding={2} bgcolor="white">
        <ErrorOutlineOutlinedIcon
          sx={{ color: "#FE6C85", width: 50, height: 50 }}
        />
        <Typography m={3} mx={5} variant="h4" fontFamily="_SegoeUI">
          {state.message}
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button variant="gradient2" sx={{ width: 120 }} onClick={handleOk}>
            OK
          </Button>
          <Button
            variant="outlined"
            color="primary"
            sx={{ width: 120 }}
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default OKCancelNotification;
