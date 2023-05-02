import { followerAdd, followerRemove } from "../request/followRequests";
import { userGetRole, userIsFollowing } from "../request/userRequests";

const getRole = async (token: string): Promise<string> => {
  try {
    return await userGetRole(token);
  } catch (err) {
    console.log((err as Error).message);
    return 'user';
  }
}

const isFollowing = async (token: string, _id: string): Promise<boolean> => {
  try {
    return (await userIsFollowing(token, _id)) === true;
  } catch (err) {
    console.log((err as Error).message);
    return false;
  }
};

const follow = async (token: string, _id: string): Promise<boolean> => {
  try {
    return (await followerAdd(token, _id)) === true;
  } catch (err) {
    console.log((err as Error).message);
    return false;
  }
}

const unfollow = async (token: string, _id: string): Promise<boolean> => {
  try {
    return (await followerRemove(token, _id)) === true;
  } catch (err) {
    console.log((err as Error).message);
    return false;
  }
}

export { getRole, isFollowing, follow, unfollow };
