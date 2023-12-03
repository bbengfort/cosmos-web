import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
import { ANONYMOUS } from '../context/AuthProvider';
import { useState, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";

const Logout = () => {
  const [ loggedOut, setLoggedout ] = useState(false);
  const { setAuth } = useAuth();

  const location = useLocation();
  const redirect = location.state?.from?.pathname || "/";

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const logout = async () => {
      const rep = await axios.post('logout', { signal: controller.signal });
      isMounted && setLoggedout(true);
      isMounted && setAuth(ANONYMOUS);
    }

    logout();

    return () => {
      isMounted = false;
      controller.abort();
    }
  }, []);

  return (
    loggedOut
    ? <Navigate to="/login" state={{ from: redirect }} replace />
    : <div className="container my-5 text-center"><p>Hold: logging player out &hellip;</p></div>
  );
}

export default Logout;