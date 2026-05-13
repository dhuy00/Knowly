import { Navigate, useLocation } from "react-router-dom";

import useAuthStore from "../stores/auth.store";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({
  children,
}: Props) {
  const location = useLocation();

  const accessToken = useAuthStore(
    (state) => state.token
  );

  if (!accessToken) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return children;
}