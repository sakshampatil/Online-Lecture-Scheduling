import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/auth/login";
import { ProtectedRoute } from "./protectedRoute";
import CoursesPage from "../pages/adminPanel/courses/courses";
import InstructorsPage from "../pages/adminPanel/instructors/instructors";
import AddCoursePage from "../pages/adminPanel/courses/addCourse";

const RootRoute = () => {
  return (
    <Routes>
      <Route
        path="/courses"
        element={
          <ProtectedRoute>
            <CoursesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/instructors"
        element={
          <ProtectedRoute>
            <InstructorsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/addCourse"
        element={
          <ProtectedRoute>
            <AddCoursePage />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

export default RootRoute;
