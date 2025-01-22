import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChatPage from "../pages/chat/ChatPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import LandingPage from "../pages/LandingPage";
import ProfilePage from "../pages/profile/ProfilePage";
import SignupPage from "../pages/signup/SignupPage";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
