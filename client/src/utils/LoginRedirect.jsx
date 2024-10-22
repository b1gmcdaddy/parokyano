import {Navigate} from "react-router-dom";

const getUserData = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("accessToken");
  return {user, token};
};

export const StaffRoute = ({children}) => {
  const {user, token} = getUserData();

  if (!token || (user?.role !== "staff" && user?.role !== "admin")) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export const AdminRoute = ({children}) => {
  const {user, token} = getUserData();

  if (!token || user?.role !== "admin") {
    if (token) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    }
    return <Navigate to="/login" replace />;
  }

  return children;
};
