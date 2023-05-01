import { useState } from "react";
import Nav from "./components/Nav";
import { UserWebsite } from "./components/interfaces/User";

// Component Properties
interface Props {
  setToken: (page: string) => void;
  user: UserWebsite;
}

// Component
const Index = ({ user, setToken }: Props) => {
  // State hook for updating
  const [page, setPage] = useState("index");

  return (
    <>
      <Nav user={user} setPage={setPage} setToken={setToken}/>
    </>
  );
};

export default Index;
