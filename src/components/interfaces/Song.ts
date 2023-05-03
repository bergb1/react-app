import { Album } from "./Album";
import { User } from "./User";

interface Song {
  _id: string;
  name: string;
  cover?: string;
  description?: string;
  creator: User;
  album?: Album;
}

interface SongCreate {
  name: string;
  cover?: string;
  description?: string;
  album?: Album;
}

export type { Song, SongCreate };
