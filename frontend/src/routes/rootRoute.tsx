import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/auth/login";
import HomePage from "../pages/dashboard/home";
import { ProtectedRoute } from "./protectedRoute";

const RootRoute = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

export default RootRoute;
