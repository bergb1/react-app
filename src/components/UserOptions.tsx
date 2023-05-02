import "./UserOptions.css";
import { isAdmin, isFollowing } from "./handles/UserOptionsHandles";
import { User, UserWebsite } from "./interfaces/User";
import { useState, useEffect } from "react";

// Component properties
interface Props {
  token: string;
  user: UserWebsite;
  userView: User;
}

// Component
const UserOptions = ({ token, user, userView }: Props) => {
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
    }
    if (userView._id) {
        checkFollowing();
    }
  }),
    [admin, following];

  return (
    <div className="user-options">
      {user._id === userView._id ? (
        <div className="user-options-edit">edit</div>
      ) : admin ? (
        <>
          <div className="user-options-edit">edit</div>
          <div className="user-options-follow">follow</div>
        </>
      ) : (
        <div className="user-options-follow">follow</div>
      )}
    </div>
  );
};

export default UserOptions;
