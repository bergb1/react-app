interface User {
  username: string;
  email: string;
  nickname?: string;
  profile?: string;
  profile_color: string;
  favorite_song?: any;
  favorite_album?: any;
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
  username: string;
  profile?: string;
  nickname?: string;
  profile_color: string;
}

export type { User, UserLogin, UserRegister, UserWebsite };
