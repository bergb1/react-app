import "./components/stylesheets/Index.css";
import { useState, useEffect } from "react";
import Nav from "./components/Nav";
import { User, UserWebsite } from "./components/interfaces/User";
import UserView from "./components/UserView";
import { searchUsers } from "./components/handles/IndexHandles";
import PostsView from "./components/PostsView";
import { getUserSongs } from "./components/handles/UserViewHandles";

// Component Properties
interface Props {
  token: string;
  setToken: (page: string) => void;
  user: UserWebsite;
  setUser: (user: UserWebsite) => void;
  role: string;
}

// User placeholder
const userPlaceholder: User = {
  _id: "",
  username: "",
  email: "",
  profile_color: "",
};

// Component
const Index = ({ token, setToken, user, setUser, role }: Props) => {
  // State hook for updating
  const [userView, setUserView] = useState(userPlaceholder);
  useEffect(() => {
    const updateUser = async () => {
      setUser(userView);
    };
    if (
      userView._id === user._id &&
      (userView.nickname !== user.nickname ||
        userView.profile_color !== user.profile_color)
    ) {
      updateUser();
    }
  }),
    [userView];

  // Load in songs on user load
  useEffect(() => {
    if (userView._id) {
      let element = document.getElementById("songs-list") as HTMLDivElement;

      getUserSongs(
        token,
        user,
        role,
        userView._id,
       element
      );
    }
  }),
    [userView];

  return (
    <>
      <Nav user={user} setUserView={setUserView} setToken={setToken} />
      <div className="body">
        {userView.username ? (
          <div className="user-interface">
            <UserView
              setUserView={setUserView}
              token={token}
              setToken={setToken}
              user={user}
              userView={userView}
            />
            <div id="songs-list"></div>
          </div>
        ) : (
          <div className="user-search">
            <p className="user-search-header">Search for Users</p>
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
        <PostsView
          token={token}
          user={user}
          userView={userView}
          setUserView={setUserView}
        />
      </div>
    </>
  );
};

export default Index;

export { userPlaceholder };
