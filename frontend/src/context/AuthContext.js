import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  console.log(user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedAuth = Cookies.get("accessToken");
    if (storedAuth) {
      try {
        const decodedToken = jwtDecode(storedAuth);
        // Validate the JWT token before setting the user
        if (decodedToken) {
          setAccessToken(storedAuth);
          setUser(decodedToken);
        } else {
          console.error("Invalid access token");
        }
      } catch (err) {
        console.error(err);
      }
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    // Set HttpOnly and Secure cookies with the "secure" flag
    Cookies.set("accessToken", token);
    setAccessToken(token);
    const decodedToken = jwtDecode(token);
    setUser(decodedToken);
  };

  const logout = () => {
    Cookies.remove("accessToken");
    setAccessToken(null);
    setUser(null);
  };

  // Memoize the value object to avoid re-rendering
  const value = useMemo(
    () => ({ accessToken, login, logout, user }),
    [accessToken, user]
  );

  if (loading) {
    // Show a loading spinner or message
    return <div>Loading...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
