import React from "react";
import { Outlet } from "react-router-dom";

const AuthPages = () => {
  return (
    <div>
      <h1> AuthPages </h1>
      <Outlet />
    </div>
  );
};

export default AuthPages;
