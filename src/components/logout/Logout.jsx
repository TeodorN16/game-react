import { useContext, useEffect, useRef } from "react";
import { Navigate } from "react-router";
import AuthContext from "../../contexts/auth-context";

export default function Logout() {
  const { logout } = useContext(AuthContext);
  const called = useRef(false);

  useEffect(() => {
    if (called.current) return;
    called.current = true;
    logout();
  }, [logout]);

  return <Navigate to="/" />;
}
