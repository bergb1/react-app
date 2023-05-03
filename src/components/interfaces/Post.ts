import { Song } from "./Song";
import { User } from "./User";

interface Post {
  _id: string;
  message: string;
  date: Date;
  creator: User;
  song: Song;
}

interface PostInput {
  message: string;
  song: string;
}

export type { Post, PostInput }
