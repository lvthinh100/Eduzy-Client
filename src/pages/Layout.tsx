import React, { Fragment } from "react";
import Header from "../components/Layouts/Header";
import Footer from "../components/Layouts/Footer";
import LoginModal from "../components/Auth/LoginModal";
import Notification from "../components/Notification";
import RegisterModal from "../components/Auth/RegisterModal";
import useAuth from "../hooks/useAuth";
import OkCancelNotification from "../components/OKCancelNotification";
import AppDialogs from "../components/AppDialogs";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  return (
    <Fragment>
      <Header />
      {children}
      <Footer />
      <Notification />
      <OkCancelNotification />
      {!user && <LoginModal />}
      {!user && <RegisterModal />}
      <AppDialogs />
    </Fragment>
  );
};

export default Layout;
