import "./components/stylesheets/Index.css";
import { useState, useEffect } from "react";
import Nav from "./components/Nav";
import { User, UserWebsite } from "./components/interfaces/User";
import UserView from "./components/UserView";

// Component Properties
interface Props {
  token: string;
  user: UserWebsite;
  setToken: (page: string) => void;
  setUser: (user: UserWebsite) => void;
}

// User placeholder
const userPlaceholder: User = {
  _id: "",
  username: "",
  email: "",
  profile_color: "",
};

// Component
const Index = ({ token, user, setToken, setUser }: Props) => {
  // State hook for updating
  const [userView, setUserView] = useState(userPlaceholder);
  useEffect(() => {
    const updateUser = async () => {
      setUser(userView);
    };
    if (
      userView.nickname &&
      userView._id === user._id &&
      userView.nickname !== user.nickname
    ) {
      updateUser();
    }
  }),
    [userView];

  return (
    <>
      <Nav user={user} setUserView={setUserView} setToken={setToken} />
      <div className="body">
        {userView.username ? (
          <UserView
            setUserView={setUserView}
            token={token}
            user={user}
            userView={userView}
          />
        ) : (
          <></>
        )}
        <div className="posts-view">Posts</div>
      </div>
    </>
  );
};

export default Index;

export { userPlaceholder };
