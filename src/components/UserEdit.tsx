import "./stylesheets/UserEdit.css";
import { useState } from "react";
import { searchSongs } from "./handles/PostsViewHandles";
import { User } from "./interfaces/User";

// Component properties
interface Props {
  userView: User;
}

// Component
const UserEdit = ({ userView }: Props) => {
  const [pickedSong, setPickedSong] = useState(
    userView.favorite_song ? userView.favorite_song._id : ""
  );

  return (
    <div className="user-edit">
      <p>Favorite Song</p>
      <div className="form-group" id="formGroup">
        <input
          type="text"
          className="song-search-input"
          id="songSearchInput"
          placeholder="song name"
        />
        <p
          className="song-search-button"
          onClick={() => {
            const name = (
              document.getElementById("songSearchInput") as HTMLInputElement
            ).value;
            const resultElement = document.getElementById(
              "songSearchResult"
            ) as HTMLDivElement;
            searchSongs(setPickedSong, name, resultElement);
          }}
        >
          Search
        </p>
        <div className="search-result" id="songSearchResult" />
      </div>

      {/* Picked Song */}
      {pickedSong ? (
        <>
          <div className="form-group" id="formGroup">
            <p id="favoriteSongInput" style={{ color: "#f3f3f3" }}>{pickedSong}</p>
          </div>
        </>
      ) : (
        <></>
      )}
      <p>Profile Color</p>
      <select name="colors" id="changeProfileColor">
        <option value="Tomato">Red</option>
        <option value="Orange">Orange</option>
        <option value="DodgerBlue">Blue</option>
        <option value="MediumSeaGreen">Green</option>
        <option value="Violet">Pink</option>
        <option value="LightGray">Gray</option>
      </select>
    </div>
  );
};

export { UserEdit };
