import { Album } from "./Album";
import { Song } from "./Song";

interface User {
  _id: string;
  username: string;
  email: string;
  profile?: string;
  nickname?: string;
  profile_color: string;
  favorite_song?: Song;
  favorite_album?: Album;
}

interface UserLogin {
  username: string;
  password: string;
}

interface UserRegister {
  username: string;
  email: string;
  password: string;
}

interface UserWebsite {
  _id: string;
  username: string;
  profile?: string;
  nickname?: string;
  profile_color: string;
}

export type { User, UserLogin, UserRegister, UserWebsite };
