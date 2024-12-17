import {FunctionComponent, useEffect} from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTopOnRouteChange: FunctionComponent = () => {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);
  
  return null;
};
