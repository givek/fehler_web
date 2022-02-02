import { useAuth } from '../contexts/auth/authContext';
import fehlerApi from '../utils/fehlerApi';

// hook returns an axios instance with Authorization header set with Token,
// which should be use to make authenticated requests to fehler_core api.
function useAuthFehlerApi() {
  const { userToken } = useAuth().userData;

  // add Token to Authorization header.
  fehlerApi.defaults.headers.common['Authorization'] = `Token ${userToken}`;

  return fehlerApi;
}

export default useAuthFehlerApi;
