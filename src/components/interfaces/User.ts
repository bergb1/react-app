interface User {
  username: string;
  email: string;
  nickname?: string;
  profile_color: string;
  favorite_song?: any;
  favorite_album?: any;
}

interface UserInput {
  username: string;
  email: string;
  password: string;
}

export type { User, UserInput };
