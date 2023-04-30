import { User } from "./User";

export default interface TokenMessageResponse {
  token?: string;
  message: string;
  user: User;
}
