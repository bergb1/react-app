import { userIsAdmin, userIsFollowing } from "../request/userRequests";

const isAdmin = async (token: string): Promise<boolean> => {
  try {
    return (await userIsAdmin(token)) === true;
  } catch (err) {
    console.log((err as Error).message);
    return false;
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

export { isAdmin, isFollowing };
