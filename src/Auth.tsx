import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";

// Component Properties
interface Props {
  setToken: (token: string) => void;
}

// Component
const Auth = ({ setToken }: Props) => {
  // State hook for updating
  const [page, setPage] = useState("login");

  // Redirection
  return page === "login" ? (
    <Login setToken={setToken} setPage={setPage} />
  ) : (
    <Register setPage={setPage} />
  );
};

export default Auth;
