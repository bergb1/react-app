import { User } from "./User";

interface Album {
  _id: string;
  name: string;
  cover: string;
  description?: string;
  creator: User;
}

export type { Album };
