import { useAuthContext } from "./useAuthcontext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    //to remove user from local storage
    localStorage.removeItem("user");

    // dispatch logout action
    dispatch({ type: "LOGOUT" });
    window.location = "/";
  };

  return { logout };
};
