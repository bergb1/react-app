import { useState, useEffect } from "react";
import Property from "./Property";
import UserOptions from "./UserOptions";
import "./stylesheets/UserView.css";
import { User, UserModify, UserWebsite } from "./interfaces/User";
import UserContent from "./UserContent";
import { UserEdit } from "./UserEdit";
import { ChangeRole } from "./ChangeRole";
import { getRole } from "./handles/UserOptionsHandles";
import { update } from "./handles/UserViewHandles";

// Component properties
interface Props {
  token: string;
  user: UserWebsite;
  userView: User;
  setUserView: (user: User) => void;
}

// Component
const UserView = ({ token, user, userView, setUserView }: Props) => {
  const [role, setRole] = useState("user");
  const [editing, setEditing] = useState(false);
  useEffect(() => {
    // Check if the user is an admin
    const checkRole = async () => {
      setRole(await getRole(token));
    };
    checkRole();
  }),
    [role];

  return (
    <div className="user-interface">
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
                defaultValue={
                  userView.nickname ? userView.nickname : userView.username
                }
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
            role={role}
            userView={userView}
          />
        </div>
        <div className="user-view-body">
          <div className="user-view-big-spacing" />
          <Property name="Followers" value="no_Followers" />
          <div className="user-view-small-spacing" />
          <Property name="Following" value="no_Following" />
        </div>
        {editing ? (
          <UserEdit user={userView} />
        ) : (
          <UserContent user={userView} />
        )}
        <div className="user-view-big-spacing" />
        {editing ? (
          <p
            className="save-input"
            style={{ backgroundColor: userView.profile_color }}
            onClick={() => {
              let user: UserModify = {};
              user.nickname = (
                document.getElementById("nicknameInput") as HTMLInputElement
              ).value;

              update(setUserView, setEditing, token, user);
            }}
          >
            Save Changes
          </p>
        ) : (
          <></>
        )}
      </div>
      {["admin", "root"].indexOf(role) > -1 /*&& userView._id != user._id*/ ? (
        <ChangeRole token={token} user={userView} role={role} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default UserView;
