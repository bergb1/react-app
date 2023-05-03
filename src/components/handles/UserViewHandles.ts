import { User, UserModify } from "../interfaces/User";
import { followers, following } from "../request/followRequests";
import { userUpdate, userUpdateByID } from "../request/userRequests";

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

// Setting an element as the number of followers
const setFollowerCount = async (
  _id: string,
  element: HTMLParagraphElement
) => {
  try {
    const resp = await followers(_id);
    element.innerHTML = resp.length.toString();
  } catch (error) {
    console.log((error as Error).message);
  }
}

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
}

export { update, updateByID, setFollowerCount, setFollowingCount };
