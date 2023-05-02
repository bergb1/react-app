import MediaProperty from "./MediaProperty";
import Property from "./Property";
import UserOptions from "./UserOptions";
import "./UserView.css";
import { User, UserWebsite } from "./interfaces/User";

// Component properties
interface Props {
  user: UserWebsite;
  userView: User;
}

// Component
const UserView = ({ user, userView }: Props) => {
  return (
    <div className="user-view">
      <div
        className="user-view-header"
        style={{ backgroundColor: userView.profile_color }}
      >
        <div className="user-view-header-user">
          <img className="user-view-profile" src="profile-placeholder.png" />
          <p className="user-view-username">
            {userView.nickname ? userView.nickname : userView.username}
          </p>
        </div>
        <UserOptions user={user} userView={userView} />
      </div>
      <div className="user-view-body">
        <div className="user-view-big-spacing" />
        <Property name="Followers" value="no_Followers" />
        <div className="user-view-small-spacing" />
        <Property name="Following" value="no_Following" />
        {userView.favorite_song || userView.favorite_album ? (
          <div className="user-view-big-spacing" />
        ) : (
          <></>
        )}
        {userView.favorite_song ? (
          <>
            <MediaProperty
              name="Favorite Song"
              value={userView.favorite_song.name}
              cover={
                userView.favorite_song.album
                  ? userView.favorite_song.album.cover
                  : userView.favorite_song.cover
              }
              info={userView.favorite_song.description}
            />
            {userView.favorite_song ? (
              <div className="user-view-small-spacing" />
            ) : (
              <></>
            )}
          </>
        ) : (
          <></>
        )}
        {userView.favorite_album ? (
          <MediaProperty
            name="Favorite Album"
            value={userView.favorite_album.name}
            cover={userView.favorite_album.cover}
            info={userView.favorite_album.description}
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
