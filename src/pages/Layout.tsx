import React, { Fragment } from "react";
import Header from "../components/Layouts/Header";
import Footer from "../components/Layouts/Footer";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Fragment>
      <Header />
      {children}
      <Footer />
    </Fragment>
  );
};

export default Layout;
