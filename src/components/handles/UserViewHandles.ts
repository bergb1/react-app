import { Song, SongCreate } from "../interfaces/Song";
import { User, UserModify, UserWebsite } from "../interfaces/User";
import { followers, following } from "../request/followRequests";
import { songCreate, songDelete, songsUser } from "../request/songRequests";
import {
  userDelete,
  userDeleteByID,
  userUpdate,
  userUpdateByID,
} from "../request/userRequests";

// Function to append a div with post information in an element
const appendSong = async (
  token: string,
  user: UserWebsite,
  role: string,
  song: Song,
  element: HTMLDivElement
) => {
  // Create a song post
  const output = document.createElement("div");
  output.id = song._id;
  output.className = "song";
  element.prepend(output);

  // Create a header
  const header = document.createElement("div");
  header.style.backgroundColor = song.creator.profile_color;
  header.className = "song-header";
  output.appendChild(header);

  // Create header information
  const songHeader = document.createElement("div");
  songHeader.className = "song-header-information";
  header.appendChild(songHeader);

  // Populate the header with the song profile
  const cover = document.createElement("img");
  cover.src = song.cover ? song.cover : "music-placeholder.png";
  cover.className = "song-header-information-cover";
  songHeader.appendChild(cover);

  // Populate the header with the song name
  const name = document.createElement("p");
  name.innerHTML = song.name;
  name.className = "song-header-information-name";
  songHeader.appendChild(name);

  // Create header options
  const options = document.createElement("div");
  options.className = "song-header-options";
  header.appendChild(options);

  // Add delete button
  if (["admin", "root"].indexOf(role) > -1 || user._id === song.creator._id) {
    const deleteSong = document.createElement("p");
    deleteSong.className = "song-header-options-delete";
    deleteSong.innerHTML = "Delete";
    deleteSong.onclick = () => {
      songDelete(token, song._id);
      output.remove();
      try {
        let element = document.getElementById(song._id);
        while (element) {
          element.remove();
          element = document.getElementById(song._id);
        }
      } catch (error) {}
    };
    options.appendChild(deleteSong);
  }

  // Create a song body
  const body = document.createElement("div");
  body.className = "song-body";
  output.appendChild(body);

  // Add the song description
  const description = document.createElement("p");
  description.innerHTML = song.description
    ? song.description
    : `A song created by ${
        song.creator.nickname ? song.creator.nickname : song.creator.username
      }`;
  description.className = "song-body-description";
  body.appendChild(description);
};

// Update a user as themselves
const update = async (
  setUserView: (user: User) => void,
  setEditing: (editing: boolean) => void,
  token: string,
  user: UserModify
) => {
  try {
    const resp = await userUpdate(token, user);
    if (resp) {
      setUserView(resp.user);
      setEditing(false);
    }
  } catch (err) {
    console.log((err as Error).message);
  }
};

// Update a user as an admin
const updateByID = async (
  setUserView: (user: User) => void,
  setEditing: (editing: boolean) => void,
  token: string,
  _id: string,
  user: UserModify
) => {
  const resp = await userUpdateByID(token, _id, user);
  if (resp) {
    setUserView(resp.user);
    setEditing(false);
  }
};

// Delete a user as themselves
const deleteUser = async (token: string, setToken: (token: string) => void) => {
  try {
    const resp = await userDelete(token);
    if (resp.user._id) setToken("");
  } catch (error) {
    console.log((error as Error).message);
  }
};

// Delete a user as an admin
const deleteUserByID = async (
  token: string,
  _id: string,
  setToken: (token: string) => void,
  user: UserWebsite
) => {
  try {
    const resp = await userDeleteByID(token, _id);
    if (resp.user._id === user._id) setToken("");
  } catch (error) {
    console.log((error as Error).message);
  }
};

// Setting an element as the number of followers
const setFollowerCount = async (_id: string, element: HTMLParagraphElement) => {
  try {
    const resp = await followers(_id);
    element.innerHTML = resp.length.toString();
  } catch (error) {
    console.log((error as Error).message);
  }
};

// Setting an element as the number of users someone is following
const setFollowingCount = async (
  _id: string,
  element: HTMLParagraphElement
) => {
  try {
    const resp = await following(_id);
    element.innerHTML = resp.length.toString();
  } catch (error) {
    console.log((error as Error).message);
  }
};

// Creating a song in the database
const createSong = async (
  token: string,
  user: UserWebsite,
  role: string,
  song: SongCreate,
  outputElement: HTMLDivElement
) => {
  try {
    const resp = await songCreate(token, song);
    if (!resp) {
      throw new Error("song not created");
    } else {
      appendSong(token, user, role, resp, outputElement);
    }
  } catch (error) {
    console.log((error as Error).message);
  }
};

// Getting all songs of a user from the database
const getUserSongs = async (
  token: string,
  user: UserWebsite,
  role: string,
  creator: string,
  outputElement: HTMLDivElement
) => {
  try {
    const resp = await songsUser(creator);
    outputElement.innerHTML = "";
    if (resp.length > 0) {
      resp.forEach((song) => {
        appendSong(token, user, role, song, outputElement);
      });
    }
  } catch (error) {
    console.log((error as Error).message);
  }
};

export {
  update,
  updateByID,
  deleteUser,
  deleteUserByID,
  setFollowerCount,
  setFollowingCount,
  createSong,
  getUserSongs,
};
