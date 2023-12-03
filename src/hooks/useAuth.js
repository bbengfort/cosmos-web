import { useContext, useDebugValue } from "react";
import AuthContext, { isLoggedIn } from "../context/AuthProvider";

const useAuth = () => {
  const { auth } = useContext(AuthContext);
  useDebugValue(auth, auth => isLoggedIn(auth) ? "Logged In" : "Logged Out");
  return useContext(AuthContext);
}

export default useAuth;