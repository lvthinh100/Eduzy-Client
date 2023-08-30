import React from "react";
import { ButtonProps, Button } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import { useAppDispatch } from "../../hooks/redux";
import { appActions } from "../../redux/slices/appSlice";
import MESSAGE from "../../constants/message";

const ProtectedButton: React.FC<ButtonProps> = ({ onClick, ...props }) => {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const handleClick: React.MouseEventHandler = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (!user)
      dispatch(
        appActions.showNotification({
          variant: "success",
          message: MESSAGE.NOT_AUTH,
        })
      );
    if (!onClick) return;
    onClick(e);
  };

  return <Button {...props} onClick={handleClick} />;
};

export default ProtectedButton;
