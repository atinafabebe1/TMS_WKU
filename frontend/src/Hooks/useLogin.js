import { useState } from "react";
import { useAuthContext } from "./useAuthcontext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    // const response = await fetch(
    //   "/user/login",
    //   { mode: "no-cors" },
    //   {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ email, password }),
    //   },
    //   []
    // );
    const stateFields = { email, password };
    const response = await fetch("/user/login", {
      method: "POST",
      body: JSON.stringify(stateFields),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();
    console.log(json.error);
    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));

      dispatch({ type: "LOGIN", payload: json });

      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
