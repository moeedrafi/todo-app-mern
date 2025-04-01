import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router";

import Login from "@/pages/Login";
import Register from "@/pages/Register";

import { Navbar } from "@/components/Navbar";

const AppLayout = () => {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/register"];

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
};

export default App;
