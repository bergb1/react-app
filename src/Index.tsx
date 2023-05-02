import "./Index.css";
import { useState } from "react";
import Nav from "./components/Nav";
import { User, UserWebsite } from "./components/interfaces/User";
import UserView from "./components/UserView";

// Component Properties
interface Props {
  token: string;
  user: UserWebsite;
  setToken: (page: string) => void;
}

// User placeholder
const userPlaceholder: User = {
  _id: "",
  username: "",
  email: "",
  profile_color: ""
};

// Component
const Index = ({ token, user, setToken }: Props) => {
  // State hook for updating
  const [userView, setUserView] = useState(userPlaceholder);

  return (
    <>
      <Nav user={user} setUserView={setUserView} setToken={setToken}/>
      <div className="body">
        {userView.username ? <UserView token={token} user={user} userView={userView}/> : <></>}
        <div className="posts-view">Posts</div>
      </div>
    </>
  );
};

export default Index;

export { userPlaceholder };
