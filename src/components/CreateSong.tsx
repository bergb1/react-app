import { createSong } from "./handles/UserViewHandles";
import { SongCreate } from "./interfaces/Song";
import { UserWebsite } from "./interfaces/User";
import "./stylesheets/CreateSong.css";
import "./stylesheets/UserView.css";

// Component properties
interface Props {
  token: string;
  user: UserWebsite;
}

// Component
const CreateSong = ({token, user}: Props) => {
  return (
    <div className="create-song">
      <div className="create-song-header" style={{backgroundColor: user.profile_color}}>
        <p className="create-song-header-text">Create Song</p>
      </div>
      <div className="create-song-background">
      <div className="user-view-big-spacing" />
      <div className="form-group" id="formGroup">
        <input
          type="text"
          className="form-control"
          id="songNameInput"
          placeholder="Enter Song Name"
        />
      </div>
      <div className="user-view-small-spacing" />
      <div className="form-group" id="formGroup">
        <input
          type="text"
          className="form-control"
          id="songDescInput"
          placeholder="Enter Description"
        />
      </div>
      <div className="user-view-big-spacing" />
      <button
        className="btn btn-primary"
        id="create-song-button"
        onClick={() => {
          const song: SongCreate = {
            name: (document.getElementById('songNameInput') as HTMLInputElement).value,
            description: (document.getElementById('songDescInput') as HTMLInputElement).value,
          };
          createSong(token, song);
          (document.getElementById('songNameInput') as HTMLInputElement).value = "";
          (document.getElementById('songDescInput') as HTMLInputElement).value = "";
        }}
      >
        Create Song
      </button>
      </div>
    </div>
  );
};

export { CreateSong };
