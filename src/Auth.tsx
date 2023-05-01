import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";

interface Props {
  setToken: (token: string) => void;
}

const Auth = ({ setToken }: Props) => {
  const [page, setPage] = useState("login");

  return (
    <>
      {page === "login" ? (
        <Login setToken={setToken} setPage={setPage} />
      ) : (
        <Register setPage={setPage} />
      )}
    </>
  );
};

export default Auth;
