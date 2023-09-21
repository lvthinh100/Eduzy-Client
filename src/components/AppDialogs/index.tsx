import React, { Fragment } from "react";
import UpdateProfileDialog from "./UpdateProfileDialog";
import useAuth from "../../hooks/useAuth";

const AppDialogs = () => {
  const { user } = useAuth();
  return <Fragment>{user && <UpdateProfileDialog user={user} />}</Fragment>;
};

export default AppDialogs;
