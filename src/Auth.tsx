import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";

interface Props {
  callback: (token: string) => void;
}

const Auth = ({ callback }: Props) => {
  const [page, setPage] = useState("login");

  return (
    <>
      {page === "login" ? (
        <Login auth={callback} setPage={setPage} />
      ) : (
        <Register setPage={setPage} />
      )}
    </>
  );
};

export default Auth;
