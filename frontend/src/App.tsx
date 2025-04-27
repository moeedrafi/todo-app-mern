import { Toaster } from "react-hot-toast";
import { Route, Routes, useLocation } from "react-router";

import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import NotFound from "@/pages/NotFound";
import EmailVerify from "@/pages/EmailVerify";
import ResetPassword from "@/pages/ResetPassword";
import ForgotPassword from "@/pages/ForgotPassword";

import { Navbar } from "@/components/navbar/Navbar";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { PublicRoute } from "./components/PublicRoute";

const App = () => {
  const hideNavbarRoutes = [
    "/login",
    "/register",
    "/email-verify",
    "/reset-password",
    "/forgot-password",
  ];
  const location = useLocation();

  return (
    <div>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/email-verify" element={<EmailVerify />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Toaster position="top-right" />
    </div>
  );
};

export default App;
