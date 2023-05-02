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
        {user.favorite_song || user.favorite_album ? (
          <div className="user-view-big-spacing" />
        ) : (
          <></>
        )}
        {user.favorite_song ? (
          <>
            <MediaProperty
              name="Favorite Song"
              value={user.favorite_song.name}
              cover={user.favorite_song.cover}
              info={user.favorite_song.description}
            />
            {user.favorite_song ? (
              <div className="user-view-small-spacing" />
            ) : (
              <></>
            )}
          </>
        ) : (
          <></>
        )}
        {user.favorite_album ? (
          <MediaProperty
            name="Favorite Album"
            value={user.favorite_album.name}
            cover={user.favorite_album.cover}
            info={user.favorite_album.description}
          />
        ) : (
          <></>
        )}
      </div>
      <div className="user-view-big-spacing" />
    </div>
  );
};

export default UserView;
