import Typography from "@mui/material/Typography";
import { createContext, useState } from "react";
import { useEffect } from "react";

export const LoginContext = createContext();
const [retryCount, setRetryCount] = useState(0);

export function LoginProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkLogin = async () => {
    fetch(`${import.meta.env.VITE_API_URL}/api/check`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoggedIn(data.isLoggedIn);
        setLoading(false);
      })
      .catch(() => {
        if (retryCount < 5) {
          setRetryCount((prev) => prev + 1);
          setTimeout(checkLogin, 3000);
        } else {
          setIsLoggedIn(false);
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {loading ? (
        <div>
          <Typography sx={{ display: "flex", justifyContent: "center" }}>
            Spinning up the server. Please Wait!
          </Typography>
        </div>
      ) : (
        children
      )}
    </LoginContext.Provider>
  );
}
