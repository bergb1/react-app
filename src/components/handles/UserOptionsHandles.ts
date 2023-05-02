import { User } from "../interfaces/User";
import { followerAdd, followerRemove } from "../request/followRequests";
import { userGetRole, userIsFollowing } from "../request/userRequests";
import { setUser } from "./IndexHandles";

const getRole = async (token: string): Promise<string> => {
  try {
    return await userGetRole(token);
  } catch (err) {
    console.log((err as Error).message);
    return "user";
  }
};

const isFollowing = async (token: string, _id: string): Promise<boolean> => {
  try {
    return (await userIsFollowing(token, _id)) === true;
  } catch (err) {
    console.log((err as Error).message);
    return false;
  }
};

const follow = async (
  setUserView: (userView: User) => void,
  token: string,
  _id: string
) => {
  try {
    const resp = (await followerAdd(token, _id)) === true;
    if (resp) {
      setUser(setUserView, _id);
    }
  } catch (err) {
    console.log((err as Error).message);
    return false;
  }
};

const unfollow = async (
  setUserView: (userView: User) => void,
  token: string,
  _id: string
) => {
  try {
    const resp = (await followerRemove(token, _id)) === true;
    if (resp) {
      setUser(setUserView, _id);
    }
  } catch (err) {
    console.log((err as Error).message);
  }
};

export { getRole, isFollowing, follow, unfollow };
