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
import { CreateSong } from "./CreateSong";

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

  // Effect when clicking follow / unfollow
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
      // Set the following count
      setFollowingCount(
        userView._id,
        document.getElementById("following-count") as HTMLParagraphElement
      );

      // Get the following status
      if (user._id !== userView._id) {
        setFollowing(await isFollowing(token, userView._id));
      }

      // Get the user role
      setRole(await getRole(token));
    };
    if (!role) {
      updateStates();
    }
  }),
    [];

  return (
    <div className="user-interface">
      {/* User interface */}
      <div className="user-view">
        <div
          className="user-view-header"
          style={{ backgroundColor: userView.profile_color }}
        >
          <div className="user-view-header-user">
            {/* Profile picture and name */}
            <img
              className="user-view-profile"
              src={
                userView.profile ? userView.profile : "profile-placeholder.png"
              }
            />
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

          {/* User profile control */}
          <UserOptions
            // Variables
            token={token}
            user={user}
            role={role}
            userView={userView}
            // State Controllers
            editing={editing}
            setEditing={setEditing}
            following={following}
            setFollowing={setFollowing}
          />
        </div>

        {/* Follower / Following fields */}
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
          <UserEdit userView={userView} />
        ) : (
          <UserContent user={userView} />
        )}
        <div className="user-view-big-spacing" />

        {/* Save changes button */}
        {editing ? (
          <p
            className="save-input"
            style={{ backgroundColor: userView.profile_color }}
            onClick={() => {
              let userModify: UserModify = {};
              userModify.nickname = (
                document.getElementById("nicknameInput") as HTMLInputElement
              ).value;

              try {
                userModify.favorite_song = (
                  document.getElementById(
                    "favoriteSongInput"
                  ) as HTMLParagraphElement
                ).innerHTML;
              } catch (error) {}

              userModify.profile_color = (
                document.getElementById(
                  "changeProfileColor"
                ) as HTMLSelectElement
              ).value;

              console.log(userModify);

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

      {/* Admin Change Role Form */}
      {["admin", "root"].indexOf(role) > -1 && userView._id != user._id ? (
        <ChangeRole token={token} user={userView} role={role} />
      ) : (
        <></>
      )}

      {/* Creator Song Create Form */}
      {role === "creator" && user._id === userView._id ? (
        <CreateSong token={token} user={user} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default UserView;
