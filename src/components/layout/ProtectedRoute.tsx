import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { logout, useCurrentToken } from "../../redux/features/auth/authSlice";
import { Navigate } from "react-router-dom";
import { verifyToken } from "../../utils/verifyToken";

type TProtectedRoute = {
  children: ReactNode;
  role: string | string[] | undefined;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  //console.log(role);
  const token = useAppSelector(useCurrentToken);
  let user;

  if (token) {
    user = verifyToken(token);
  }
  //console.log(user);
  const dispatch = useAppDispatch();

  if (
    role &&
    (!user?.role ||
      (Array.isArray(role) ? !role.includes(user.role) : user.role !== role))
  ) {
    dispatch(logout());
    return <Navigate to="/login" replace />;
  }

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }
  return children;
};

export default ProtectedRoute;
