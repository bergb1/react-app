import { followerAdd, followerRemove } from "../request/followRequests";
import { userGetRole, userIsFollowing } from "../request/userRequests";

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
  setFollowing: (following: boolean) => void,
  token: string,
  _id: string
) => {
  try {
    const resp = (await followerAdd(token, _id)) === true;
    if (resp) {
      setFollowing(true);
    }
  } catch (err) {
    console.log((err as Error).message);
    return false;
  }
};

const unfollow = async (
  setFollowing: (following: boolean) => void,
  token: string,
  _id: string
) => {
  try {
    const resp = (await followerRemove(token, _id)) === true;
    if (resp) {
      setFollowing(false);
    }
  } catch (err) {
    console.log((err as Error).message);
  }
};

export { getRole, isFollowing, follow, unfollow };
