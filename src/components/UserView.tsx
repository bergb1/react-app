import "./stylesheets/UserView.css";
import { useState, useEffect } from "react";
import UserOptions from "./UserOptions";
import { User, UserModify, UserWebsite } from "./interfaces/User";
import UserContent from "./UserContent";
import { UserEdit } from "./UserEdit";
import { ChangeRole } from "./ChangeRole";
import { getRole, isFollowing } from "./handles/UserOptionsHandles";
import {
  setFollowerCount,
  setFollowingCount,
  update,
  updateByID,
} from "./handles/UserViewHandles";

// Component properties
interface Props {
  token: string;
  user: UserWebsite;
  userView: User;
  setUserView: (user: User) => void;
}

// Component
const UserView = ({ token, user, userView, setUserView }: Props) => {
  const [role, setRole] = useState("");
  const [following, setFollowing] = useState(false);
  const [editing, setEditing] = useState(false);

  // Effect when clicking follow / unfollow after the first render
  useEffect(() => {
    if (role) {
      setFollowerCount(
        userView._id,
        document.getElementById("follower-count") as HTMLParagraphElement
      );
    }
  }),
    [following];

  // Effect when rendering this element the first time
  useEffect(() => {
    const updateStates = async () => {
      setFollowingCount(
        userView._id,
        document.getElementById("following-count") as HTMLParagraphElement
      );

      if (user._id !== userView._id) {
        setFollowing(await isFollowing(token, userView._id));
        setRole(await getRole(token));
      } else {
        setRole('user');
      }
    };
    if (!role) {
      updateStates();
    }
  }),
    [];

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
            token={token}
            user={user}
            role={role}
            userView={userView}
            editing={editing}
            setEditing={setEditing}
            following={following}
            setFollowing={setFollowing}
          />
        </div>
        <div className="user-view-body">
          <div className="user-view-big-spacing" />
          <div className="property">
            <div className="property-name">Followers</div>
            <div className="property-value">
              <div className="property-background"></div>
              <p className="property-value-text" id="follower-count"></p>
            </div>
          </div>
          <div className="user-view-small-spacing" />
          <div className="property">
            <div className="property-name">Following</div>
            <div className="property-value">
              <div className="property-background"></div>
              <p className="property-value-text" id="following-count"></p>
            </div>
          </div>
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
              let userModify: UserModify = {};
              userModify.nickname = (
                document.getElementById("nicknameInput") as HTMLInputElement
              ).value;

              ["admin", "root"].indexOf(role) > -1 && user._id !== userView._id
                ? updateByID(
                    setUserView,
                    setEditing,
                    token,
                    userView._id,
                    userModify
                  )
                : update(setUserView, setEditing, token, userModify);
            }}
          >
            Save Changes
          </p>
        ) : (
          <></>
        )}
      </div>
      {["admin", "root"].indexOf(role) > -1 && userView._id != user._id ? (
        <ChangeRole token={token} user={userView} role={role} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default UserView;
