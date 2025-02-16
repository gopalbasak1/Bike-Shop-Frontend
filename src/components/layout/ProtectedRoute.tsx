import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { logout, useCurrentToken } from "../../redux/features/auth/authSlice";
import { Navigate } from "react-router-dom";
import { verifyToken } from "../../utils/verifyToken";

// Define a custom type for the JWT payload
interface CustomJwtPayload {
  role?: string; // Include any other fields that you expect from the JWT
}

type TProtectedRoute = {
  children: ReactNode;
  role: string | string[] | undefined;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const token = useAppSelector(useCurrentToken);
  let user: CustomJwtPayload | null = null;

  if (token) {
    user = verifyToken(token); // Decode the token to get user info
  }

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
