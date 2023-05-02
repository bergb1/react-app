import MediaProperty from "./MediaProperty";
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
        <div className="user-view-big-spacing" />
        <Property name="Followers" value="no_Followers" />
        <div className="user-view-small-spacing" />
        <Property name="Following" value="no_Following" />
        <div className="user-view-big-spacing" />
        <MediaProperty
          name="Favorite Song"
          value="song_name"
          cover=""
          info="Information"
        />
        <div className="user-view-small-spacing" />
        <MediaProperty
          name="Favorite Album"
          value="song_name"
          cover=""
          info="Information"
        />
      </div>
      <div className="user-view-big-spacing" />
    </div>
  );
};

export default UserView;
