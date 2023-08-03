import React, { Fragment } from "react";
import Header from "../components/Layouts/Header";
import Footer from "../components/Layouts/Footer";
import LoginModal from "../components/Auth/LoginModal";
import Notification from "../components/Notification";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Fragment>
      <Header />
      {children}
      <Footer />
      <LoginModal />
      <Notification />
    </Fragment>
  );
};

export default Layout;
