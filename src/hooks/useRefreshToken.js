import axios from "../api/axios";
import useAuth from "./useAuth";
import { jwtDecode } from 'jwt-decode'

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();

  const refresh = async () => {
    const request = JSON.stringify({ refresh_token: auth?.refreshToken });
    const response = await axios.post('/reauthenticate', request, {
      headers: {
        "Authorization": `Bearer  ${auth?.accessToken}`,
        "Content-Type": "application/json"
      },
      withCredentials: true
    });

    const accessToken = response?.data?.access_token;
    const refreshToken = response?.data?.refresh_token;

    // Parse the access token for the user claims
    const claims = jwtDecode(accessToken);
    setAuth({ claims, accessToken, refreshToken });

    return accessToken;
  };

  return refresh;
};

export default useRefreshToken;