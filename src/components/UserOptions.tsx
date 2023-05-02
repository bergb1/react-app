import "./UserOptions.css";
import { User, UserWebsite } from "./interfaces/User";

// Component properties
interface Props {
  user: UserWebsite;
  userView: User;
}

// Component
const UserOptions = ({}: Props) => {
  return <div className="user-view-header-options"></div>;
};

export default UserOptions;
