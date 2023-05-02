import "./UserOptions.css";
import { User, UserWebsite } from "./interfaces/User";

// Component properties
interface Props {
  user: UserWebsite;
  userView: User;
}

// Component
const UserOptions = ({user, userView}: Props) => {
  return <div className="user-view-header-options">
    {user._id === userView._id ? <p>true</p> : <p>false</p>}
  </div>;
};

export default UserOptions;
