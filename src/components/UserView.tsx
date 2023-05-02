import { useState } from "react";
import Property from "./Property";
import UserOptions from "./UserOptions";
import "./stylesheets/UserView.css";
import { User, UserWebsite } from "./interfaces/User";
import UserContent from "./UserContent";
import { UserEdit } from "./UserEdit";

// Component properties
interface Props {
  token: string;
  user: UserWebsite;
  userView: User;
}

// Component
const UserView = ({ token, user, userView }: Props) => {
  const [editing, setEditing] = useState(false);

  return (
    <div className="user-view">
      <div
        className="user-view-header"
        style={{ backgroundColor: userView.profile_color }}
      >
        <div className="user-view-header-user">
          <img className="user-view-profile" src="profile-placeholder.png" />
          {editing ? (
            <input
              type="text"
              className="user-view-username-input"
              id="nicknameInput"
              defaultValue={userView.nickname ? userView.nickname : userView.username}
            />
          ) : (
            <p className="user-view-username">
              {userView.nickname ? userView.nickname : userView.username}
            </p>
          )}
        </div>
        <UserOptions
          editing={editing}
          setEditing={setEditing}
          token={token}
          user={user}
          userView={userView}
        />
      </div>
      <div className="user-view-body">
        <div className="user-view-big-spacing" />
        <Property name="Followers" value="no_Followers" />
        <div className="user-view-small-spacing" />
        <Property name="Following" value="no_Following" />
      </div>
      {editing ? <UserEdit user={userView} /> : <UserContent user={userView} />}
      <div className="user-view-big-spacing" />
      {editing ? (
        <p
          className="save-input"
          style={{ backgroundColor: userView.profile_color }}
          onClick={() => {
            let user = userView;
            user.nickname = (document.getElementById('nicknameInput') as HTMLInputElement).value;
            console.log(user);
          }}
        >
          Save Changes
        </p>
      ) : (
        <></>
      )}
    </div>
  );
};

export default UserView;
