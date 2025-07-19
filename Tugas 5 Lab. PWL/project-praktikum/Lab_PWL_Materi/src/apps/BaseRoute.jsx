// src/apps/BaseRoute.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../modules/chapter-2/widgets/auth/Login";
import ChapterOne from "../modules/chapter-1/ChapterOne";
import ChapterTwo from "../modules/chapter-2/ChapterTwo";
import { NotFound } from "../errors/404"; // gunakan NotFound karena ekspor-nya named export

export default function BaseRoute() {
  return (
    <Routes>
      <Route path="/sign-in" element={<Login />} />
      <Route path="/sign-out" element={<Login />} />
      <Route path="/chapter-1" element={<ChapterOne />} />
      <Route path="/chapter-2" element={<ChapterTwo />} />
      <Route path="/home" element={<ChapterTwo />} />
      <Route path="/" element={<Navigate to="/chapter-1" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
