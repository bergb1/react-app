import TokenMessageResponse from "../interfaces/TokenMessageResponse";
import { User, UserLogin, UserRegister } from "../interfaces/User";
import { handleFetch, setupFetch, url } from "./globals";

// Request to login a user
const userLogin = async (user: UserLogin): Promise<TokenMessageResponse> => {
  // Define the query
  const query = `mutation Login($credentials: Credentials!) {
    login(credentials: $credentials) {
      token
      message
      user {
        _id
        username
        email
        nickname
        profile_color
      }
    }
  }`;

  // Define the query variables
  const variables = {
    credentials: user,
  };

  // Process the request
  return await fetch(url, setupFetch(query, undefined, variables)).then(
    async (response) => {
      return (await handleFetch(response)).login as TokenMessageResponse;
    }
  );
};

// Request to register a user
const userRegister = async (
  user: UserRegister
): Promise<TokenMessageResponse> => {
  // Define the query
  const query = `mutation Register($user: UserInput!) {
    register(user: $user) {
      message
      user {
        _id
      }
    }
  }`;

  // Define the query variables
  const variables = {
    user: user,
  };

  // Process the request
  return await fetch(url, setupFetch(query, undefined, variables)).then(
    async (response) => {
      return (await handleFetch(response)).register as TokenMessageResponse;
    }
  );
};

// Request to get the logged in user
const userByToken = async (token: string): Promise<User> => {
  // Define the query
  const query = `query UserFromToken {
    userFromToken {
      _id
      username
      email
      nickname
      profile_color
    }
  }`;

  // Process the request
  return await fetch(url, setupFetch(query, token)).then(async (response) => {
    return (await handleFetch(response)).userFromToken as User;
  });
};

export { userLogin, userRegister, userByToken };
