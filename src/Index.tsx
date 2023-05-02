import "./components/stylesheets/Index.css";
import { useState, useEffect } from "react";
import Nav from "./components/Nav";
import { User, UserWebsite } from "./components/interfaces/User";
import UserView from "./components/UserView";
import { searchUsers } from "./components/handles/IndexHandles";

// Component Properties
interface Props {
  token: string;
  setToken: (page: string) => void;
  user: UserWebsite;
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
const Index = ({ token, setToken, user, setUser }: Props) => {
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
          <div className="user-search">
            <input
              type="text"
              className="user-search-input"
              id="userSearchInput"
              placeholder="username"
            />
            <p
              className="user-search-button"
              onClick={() => {
                const username = (
                  document.getElementById("userSearchInput") as HTMLInputElement
                ).value;
                const resultElement = document.getElementById(
                  "searchResult"
                ) as HTMLDivElement;
                searchUsers(setUserView, username, resultElement);
              }}
            >
              Search
            </p>
            <div className="search-result" id="searchResult" />
          </div>
        )}
        <div className="posts-view">Posts</div>
      </div>
    </>
  );
};

export default Index;

export { userPlaceholder };
