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
const CreateSong = ({user}: Props) => {
  return (
    <div className="create-song">
      <div className="create-song-header" style={{backgroundColor: user.profile_color}}>
        <p className="create-song-header-text">Create Song</p>
      </div>
      <div className="form-group">
        <label htmlFor="songNameInput">Song Name</label>
        <input
          type="text"
          className="form-control"
          id="songNameInput"
          placeholder="Enter Song Name"
        />
      </div>
      <div className="form-group">
        <label htmlFor="songDescInput">Description</label>
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
          console.log(song);
        }}
      >
        Create Song
      </button>
    </div>
  );
};

export { CreateSong };
