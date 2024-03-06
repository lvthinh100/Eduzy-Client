import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../pages/Layout";
import paths from "../constants/paths";
import HomePage from "../pages/Home";
import ExamsPage from "../pages/Exams";
import AnswerSheetPage from "../pages/AnswerSheet";
import NotFoundPage from "../pages/Error/NotFoundPage";
import BioLinkPage from "../pages/Bio";

export default function MyRouter() {
  return (
    <Layout>
      <Routes>
        <Route path={paths.HOME} element={<HomePage />} />
        <Route path={paths.EXAMS} element={<ExamsPage />} />
        <Route path={paths.BIO} element={<BioLinkPage />} />
        <Route path={paths.EXAM_SHEET} element={<AnswerSheetPage />} />
        <Route path={paths.ANSWER_SHEET} element={<AnswerSheetPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}
