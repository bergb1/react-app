import { Album } from "./Album";
import { User } from "./User";

interface Song {
  _id: string;
  name: string;
  cover: string;
  description?: string;
  creator: User;
  album?: Album;
}

export type { Song };
