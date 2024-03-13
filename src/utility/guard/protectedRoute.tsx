import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import BackgroundLoader from "../../components/portal/backgroundLoader";
import "./protectedRoute.scss";

const ProtectedRoute = ({ children }: { children: any }) => {
  const [accessible, setAccessible] = useState<boolean>(false);
  const [cookies] = useCookies();
  const navigate = useNavigate();
  useEffect(() => {
    if (cookies.jwt) {
      // authenticateUser(cookies.jwt)
      //   .then(() => {
      //     setAccessible(true);
      //     console.log("auth done");
      //   })
      //   .catch(() => {
      //     navigate("/login");
      //   });
      setAccessible(true);
    } else {
      navigate("/login");
    }
  }, []);

  return accessible === false ? (
    <BackgroundLoader />
  ) : (
    accessible === true && children
  );
};

export default ProtectedRoute;
