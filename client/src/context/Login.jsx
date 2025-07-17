import { createContext, useState } from "react";
import { useEffect } from "react";
export const LoginContext = createContext();

export function LoginProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/check`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoggedIn(data.isLoggedIn);
      })
      .catch((err) => {
        setIsLoggedIn(false);
      });
  }, []);

  return (
    <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </LoginContext.Provider>
  );
}
