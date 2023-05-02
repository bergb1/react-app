import "./stylesheets/UserOptions.css";
import { follow, unfollow } from "./handles/UserOptionsHandles";
import { User, UserWebsite } from "./interfaces/User";

// Component properties
interface Props {
  token: string;
  user: UserWebsite;
  role: string;
  userView: User;
  editing: boolean;
  setEditing: (edit: boolean) => void;
  following: boolean;
  setFollowing: (following: boolean) => void;
}

// Component
const UserOptions = ({
  token,
  user,
  role,
  userView,
  editing,
  setEditing,
  following,
  setFollowing
}: Props) => {
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
      ) : ["admin", "root"].indexOf(role) > -1 ? (
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
                ? unfollow(setFollowing, token, userView._id)
                : follow(setFollowing, token, userView._id);
            }}
          />
        </>
      ) : (
        <img
          className="user-options-item"
          src={following ? "unfollow.png" : "follow.png"}
          onClick={() => {
            following
              ? unfollow(setFollowing, token, userView._id)
              : follow(setFollowing, token, userView._id);
          }}
        />
      )}
    </div>
  );
};

export default UserOptions;
