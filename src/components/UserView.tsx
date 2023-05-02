import Property from "./Property";
import "./UserView.css";
import { User } from "./interfaces/User";

// Component properties
interface Props {
  setUserView: (user: User) => void;
  user: User;
}

// Component
const UserView = ({ user }: Props) => {
  return (
    <div className="user-view">
      <div
        className="user-view-header"
        style={{ backgroundColor: user.profile_color }}
      >
        <div className="user-view-header-user">
          <img className="user-view-profile" src="profile-placeholder.png" />
          <p className="user-view-username">
            {user.nickname ? user.nickname : user.username}
          </p>
        </div>
      </div>
      <div className="user-view-body">
        <div className="user-view-header-spacing" />
        <Property name="Followers" value="no_Followers" />
        <Property name="Following" value="no_Following" />
        <div className="user-view-header-spacing" />
      </div>
    </div>
  );
};

export default UserView;
