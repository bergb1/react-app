import { User } from "../interfaces/User";
import { userById } from "../request/userRequests";

const setUser = async (setUser: (user: User) => void, _id: string) => {
    try {
      const resp = await userById(_id);
      if (!resp) throw new Error("user not found");
      setUser(resp);
    } catch (err) {
      console.log((err as Error).message);
    }
  };
  
  export { setUser };
  