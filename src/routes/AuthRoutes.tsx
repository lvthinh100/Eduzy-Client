import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import RegisterPages from "../pages/RegisterPages";

const AuthRoutes = () => {
  return (
    <Fragment>
      <Route path="/register" element={<RegisterPages />} />;
    </Fragment>
  );
};

export default AuthRoutes;
