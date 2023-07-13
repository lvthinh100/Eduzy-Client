import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../pages/Layout";
import paths from "../constants/paths";
import AuthPages from "../pages/AuthPages";
import RegisterPages from "../pages/RegisterPages";
import HomePage from "../pages/Home";

export default function MyRouter() {
  return (
    <Layout>
      <Routes>
        <Route path={paths.AUTH} element={<AuthPages />}>
          <Route path="register" element={<RegisterPages />} />
        </Route>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Layout>
  );
}
