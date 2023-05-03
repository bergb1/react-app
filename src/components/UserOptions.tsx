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
  setFollowing,
}: Props) => {
  return (
    <div className="user-options">
      {user._id === userView._id ? (
        <p
          className="user-options-item"
          onClick={() => {
            setEditing(!editing);
          }}
        >
          Settings
        </p>
      ) : ["admin", "root"].indexOf(role) > -1 ? (
        <>
          <p
            className="user-options-item"
            onClick={() => {
              setEditing(!editing);
            }}
          >
            Settings
          </p>
          <p
            className="user-options-item"
            onClick={() => {
              following
                ? unfollow(setFollowing, token, userView._id)
                : follow(setFollowing, token, userView._id);
            }}
          >
            {following ? "Unfollow" : "Follow"}
          </p>
        </>
      ) : (
        <p
          className="user-options-item"
          onClick={() => {
            following
              ? unfollow(setFollowing, token, userView._id)
              : follow(setFollowing, token, userView._id);
          }}
        >
          {following ? "Unfollow" : "Follow"}
        </p>
      )}
    </div>
  );
};

export default UserOptions;
