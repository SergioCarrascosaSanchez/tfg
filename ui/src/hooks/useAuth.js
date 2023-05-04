import { useState, useEffect } from "react";

export const useAuth = ()  => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");
    if (username !== null && token !== null) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return isAuthenticated;
}
