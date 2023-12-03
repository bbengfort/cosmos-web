import axios, { axiosProtected } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosProtected = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {

    const requestIntercept = axiosProtected.interceptors.request.use(
      config => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      }, (error) => Promise.reject(error)
    );

    const responseIntercept = axiosProtected.interceptors.response.use(
      response => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axiosProtected(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosProtected.interceptors.request.eject(requestIntercept);
      axiosProtected.interceptors.response.eject(responseIntercept);
    }

  }, [auth, refresh]);

  return axiosProtected;
};

export default useAxiosProtected;