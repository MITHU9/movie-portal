import { Navigate } from "react-router-dom";
import { useMovieContext } from "../context/Context";

const AuthRedirect = ({ children }) => {
  const { user, previousRoute } = useMovieContext();

  //console.log(previousRoute);

  if (user) {
    return <Navigate to={previousRoute} replace />;
  }

  return children;
};
export default AuthRedirect;
