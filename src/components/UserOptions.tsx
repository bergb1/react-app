import "./stylesheets/UserOptions.css";
import {
  follow,
  isAdmin,
  isFollowing,
  unfollow,
} from "./handles/UserOptionsHandles";
import { User, UserWebsite } from "./interfaces/User";
import { useState, useEffect } from "react";

// Component properties
interface Props {
  token: string;
  user: UserWebsite;
  userView: User;
  editing: boolean;
  setEditing: (edit: boolean) => void;
}

// Component
const UserOptions = ({ setEditing, token, user, userView }: Props) => {
  const [admin, setAdmin] = useState(false);
  const [following, setFollowing] = useState(false);
  useEffect(() => {
    // Check if the user is an admin
    const checkAdmin = async () => {
      setAdmin(await isAdmin(token));
    };
    checkAdmin();

    // Check if the user is following the viewed user
    const checkFollowing = async () => {
      setFollowing(await isFollowing(token, userView._id));
    };
    if (userView._id) {
      checkFollowing();
    }
  }),
    [admin, following];

  return (
    <div className="user-options">
      {user._id === userView._id ? (
        <img
          className="user-options-item"
          src="settings.png"
          onClick={() => {
            setEditing(true);
          }}
        />
      ) : admin ? (
        <>
          <img
            className="user-options-item"
            src="settings.png"
            onClick={() => {
              setEditing(true);
            }}
          />
          <img
            className="user-options-item"
            src={following ? "unfollow.png" : "follow.png"}
            onClick={() => {
              following
                ? unfollow(token, userView._id)
                : follow(token, userView._id);
            }}
          />
        </>
      ) : (
        <img
          className="user-options-item"
          src={following ? "unfollow.png" : "follow.png"}
          onClick={() => {
            following
              ? unfollow(token, userView._id)
              : follow(token, userView._id);
          }}
        />
      )}
    </div>
  );
};

export default UserOptions;
