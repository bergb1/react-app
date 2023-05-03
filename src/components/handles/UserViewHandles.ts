import { SongCreate } from "../interfaces/Song";
import { User, UserModify } from "../interfaces/User";
import { followers, following } from "../request/followRequests";
import { songCreate } from "../request/songRequests";
import {
  userDelete,
  userDeleteByID,
  userUpdate,
  userUpdateByID,
} from "../request/userRequests";

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
  setToken: (token: string) => void
) => {
  try {
    const resp = await userDeleteByID(token, _id);
    if (resp.user._id) setToken("");
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
const createSong = async (token: string, song: SongCreate) => {
  try {
    return await songCreate(token, song);
  } catch (error) {
    console.log((error as Error).message);
  }
};

export { update, updateByID, deleteUser, deleteUserByID, setFollowerCount, setFollowingCount, createSong };
