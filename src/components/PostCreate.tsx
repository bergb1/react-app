import { useState } from "react";
import { UserWebsite } from "./interfaces/User";
import "./stylesheets/PostCreate.css";
import "./stylesheets/UserView.css";
import { createPost, searchSongs } from "./handles/PostsViewHandles";
import { PostInput } from "./interfaces/Post";

// Component properties
interface Props {
  token: string;
  user: UserWebsite;
  outputElement: HTMLDivElement;
}

// Component
const PostCreate = ({ token, user, outputElement }: Props) => {
  const [pickedSong, setPickedSong] = useState("");

  return (
    <div className="post-create">
      {/* Form Header */}
      <div
        className="post-create-header"
        style={{ backgroundColor: user.profile_color }}
      >
        <p className="post-create-header-text">Create Post</p>
      </div>

      {/* Form Body */}
      <div className="post-create-background">
        <div className="user-view-big-spacing" />

        {/* Song Picker */}
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
              <p style={{ color: "#f3f3f3" }}>Picked Song ID: {pickedSong}</p>
            </div>
          </>
        ) : (
          <></>
        )}

        {/* Message field */}
        <div className="form-group" id="formGroup">
          <textarea
            className="form-control"
            id="messageInput"
            placeholder="Enter Message"
            name="Text1"
            rows={2}
          ></textarea>
        </div>
        <div className="user-view-big-spacing" />

        {/* Submit Button */}
        <button
          className="btn btn-primary"
          id="post-create-button"
          onClick={() => {
            const post: PostInput = {
              message: (
                document.getElementById("messageInput") as HTMLTextAreaElement
              ).value,
              song: pickedSong,
            };
            createPost(token, post, outputElement);
            (
              document.getElementById("messageInput") as HTMLTextAreaElement
            ).value = "";
            setPickedSong("");
          }}
        >
          Create Post
        </button>
      </div>
    </div>
  );
};

export default PostCreate;
