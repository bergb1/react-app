import { User } from "../interfaces/User";
import { userUpdate } from "../request/userRequests";

const update = async (setUserView: (user: User) => void, token: string, user: User) => {
  try {
    const resp = await userUpdate(token, user);
    if (!resp) throw new Error("user not created");
    setUserView(resp.user);
  } catch (err) {
    console.log((err as Error).message);
  }
};

export { update };
