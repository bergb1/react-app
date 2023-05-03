import { User, UserModify } from "../interfaces/User";
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

export { update, updateByID };
