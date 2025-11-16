import { Navigate } from "react-router-dom";

interface Props {
  isAuth: boolean;
  children: React.ReactNode;
}

export default function ProtectedRoute({ isAuth, children }: Props) {
  if (!isAuth) return <Navigate to="/" replace />;
  return children;
}
