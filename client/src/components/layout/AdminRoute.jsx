import {
  Navigate,
} from "react-router-dom";

import useAuth from "../../hooks/useAuth";

const AdminRoute = ({
  children,
}) => {
  const { user } =
    useAuth();

  if (!user) {
    return (
      <Navigate
        to="/login"
      />
    );
  }

  if (
    user.role !== "Admin"
  ) {
    return (
      <Navigate
        to="/dashboard"
      />
    );
  }

  return children;
};

export default AdminRoute;