import { setCookie } from "../../App";
import { UserLogin } from "../interfaces/User";
import { userLogin } from "../request/userRequests";

const login = async (auth: (token: string) => void, user: UserLogin) => {
  try {
    const response = await userLogin(user);
    if (response.token) {
      setCookie("token", response.token);
      auth(response.token);
    }
  } catch (err) {
    console.log((err as Error).message);
  }
};

export { login };
