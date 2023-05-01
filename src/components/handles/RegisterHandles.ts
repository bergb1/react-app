import { UserRegister } from "../interfaces/User";
import { userRegister } from "../request/userRequests";

const register = async (
  setPage: (page: string) => void,
  user: UserRegister
) => {

  try {
    const resp = await userRegister(user);
    if (resp) console.log("user created");
    setPage("login");
  } catch (err) {
    console.log((err as Error).message);
  }
};

export { register };
