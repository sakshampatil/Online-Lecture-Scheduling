import { Navigate } from "react-router-dom";

import { useAppSelector } from "../store/hooks";

export const ProtectedRoute = ({ children }: any) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  //   if (!isAuthenticated) {
  //     // user is not authenticated
  //     return <Navigate to="/login" />;
  //   }
  return children;
};
