import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("accessToken");

export const StaffRoute = ({ children }) => {
  if (!token || (user.role != "staff" && user.role != "admin")) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export const AdminRoute = ({ children }) => {
  if (!token || user.role !== "admin") {
    if (token) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    }
    return <Navigate to="/login" replace />;
  }

  return children;
};
