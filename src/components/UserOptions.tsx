import "./stylesheets/UserOptions.css";
import {
  follow,
  isFollowing,
  unfollow,
} from "./handles/UserOptionsHandles";
import { User, UserWebsite } from "./interfaces/User";
import { useState, useEffect } from "react";

// Component properties
interface Props {
  token: string;
  user: UserWebsite;
  role: string;
  userView: User;
  editing: boolean;
  setEditing: (edit: boolean) => void;
}

// Component
const UserOptions = ({ setEditing, editing, token, user, role, userView }: Props) => {
  const [following, setFollowing] = useState(false);
  useEffect(() => {
    // Check if the user is following the viewed user
    const checkFollowing = async () => {
      setFollowing(await isFollowing(token, userView._id));
    };
    if (userView._id) {
      checkFollowing();
    }
  }),
    [following];

  return (
    <div className="user-options">
      {user._id === userView._id ? (
        <img
          className="user-options-item"
          src="settings.png"
          onClick={() => {
            setEditing(!editing);
          }}
        />
      ) : ['admin', 'root'].indexOf(role) > -1 ? (
        <>
          <img
            className="user-options-item"
            src="settings.png"
            onClick={() => {
              setEditing(!editing);
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
