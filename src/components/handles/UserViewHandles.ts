import { User, UserModify } from "../interfaces/User";
import { userUpdate } from "../request/userRequests";

const update = async (
  setUserView: (user: User) => void,
  setEditing: (editing: boolean) => void,
  token: string,
  user: UserModify
) => {
  try {
    const resp = await userUpdate(token, user);
    if (!resp) throw new Error("user not created");
    setUserView(resp.user);
    setEditing(false);
  } catch (err) {
    console.log((err as Error).message);
  }
};

export { update };
