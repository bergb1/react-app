import { User, UserModify } from "../interfaces/User";
import { followers, following } from "../request/followRequests";
import { userUpdate, userUpdateByID } from "../request/userRequests";

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

// Set the inner html of an element as the follower count
const setFollowerCount = async (
  token: string,
  element: HTMLParagraphElement
): Promise<void> => {
  try {
    const resp = await followers(token);
    element.innerHTML = resp.length.toString();
  } catch (error) {
    console.log((error as Error).message);
  }
};

// Set the inner html of an element as the following count
const setFollowingCount = async (
  token: string,
  element: HTMLParagraphElement
): Promise<void> => {
  try {
    const resp = await following(token);
    element.innerHTML = resp.length.toString();
  } catch (error) {
    console.log((error as Error).message);
  }
};

export { update, updateByID, setFollowerCount, setFollowingCount };
