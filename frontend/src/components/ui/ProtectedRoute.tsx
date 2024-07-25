import { useRecoilValue, useSetRecoilState } from "recoil";
import { isAuthenticatedState } from "../../store/atom";
import { Navigate, useLocation } from "react-router-dom";
import { ReactNode, useEffect } from "react";
import { AuthSelector } from "../../store/selector";

interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo: string;
}

export const ProtectedRoute = ({
  children,
  redirectTo,
}: ProtectedRouteProps) => {
  const checkAuth = useRecoilValue(AuthSelector);
  const setAuth = useSetRecoilState(isAuthenticatedState);

  useEffect(() => {
    setAuth(checkAuth);
  }, [checkAuth, setAuth]);

  const isAuthenticated = useRecoilValue(isAuthenticatedState);
  const location = useLocation();

  if (isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
