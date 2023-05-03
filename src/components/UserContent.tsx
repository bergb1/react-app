import "./stylesheets/UserView.css";
import MediaProperty from "./MediaProperty";
import { User } from "./interfaces/User";

// Component properties
interface Props {
  user: User;
}

// Component
const UserContent = ({ user }: Props) => {
  return (
    <>
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
            cover={
              user.favorite_song.album
                ? user.favorite_song.album.cover
                : user.favorite_song.cover
                ? user.favorite_song.cover
                : "music-placeholder.png"
            }
            info={user.favorite_song.description}
          />
          {user.favorite_album ? (
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
          cover={
            user.favorite_album.cover
              ? user.favorite_album.cover
              : "music-placeholder.png"
          }
          info={user.favorite_album.description}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default UserContent;
