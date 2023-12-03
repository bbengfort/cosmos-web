import { createContext, useState } from "react";
import useSessionStorage from "../hooks/useSessionStorage";

export const ANONYMOUS = {accessToken: "", refreshToken: "", claims: {exp: 0, role: "", email: ""}};
const AUTH_SESSION_KEY = "cosmos_auth_claims";
const AuthContext = createContext({});

export const isLoggedIn = auth => {
  if (!auth.accessToken) {
    return false;
  }

  if (auth?.claims) {
    return auth.claims?.email != "" && auth.claims?.role != "" && !isExpired(auth)
  }

  return false;
}

export const isExpired = auth => {
  if (auth?.claims && auth?.claims?.exp > 0) {
    if (Date.now() < (auth.claims?.exp * 1000)) {
      return false;
    }
  }
  return true;
}

export const AuthProvider = ({ children }) => {
  const [ auth, setAuthSession ] = useSessionStorage(AUTH_SESSION_KEY, ANONYMOUS);

  // Do not set expired claims
  const setAuth = auth => {
    if (isLoggedIn(auth)) {
      setAuthSession(auth);
    } else {
      setAuthSession(ANONYMOUS);
    }
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;