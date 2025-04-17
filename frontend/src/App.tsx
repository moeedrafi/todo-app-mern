import { Toaster } from "react-hot-toast";
import { Route, Routes, useLocation } from "react-router";

import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import NotFound from "@/pages/NotFound";
import EmailVerify from "@/pages/EmailVerify";
import ResetPassword from "@/pages/ResetPassword";

import { Navbar } from "@/components/Navbar";

const App = () => {
  const hideNavbarRoutes = [
    "/login",
    "/register",
    "/email-verify",
    "/reset-password",
  ];
  const location = useLocation();

  return (
    <div>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Toaster position="top-right" />
    </div>
  );
};

export default App;
