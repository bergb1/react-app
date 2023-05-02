import TokenMessageResponse from "../interfaces/TokenMessageResponse";
import { User, UserLogin, UserModify, UserRegister } from "../interfaces/User";
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

// Request to change the role of a user
const userChangeRole = async (
  token: string,
  _id: string,
  role: string
): Promise<TokenMessageResponse> => {
  // Define the query
  const query = `mutation UserChangeRole($id: ID!, $role: String!) {
    userChangeRole(_id: $id, role: $role) {
      message
    }
  }`;

  // Define the query variables
  const variables = {
    id: _id,
    role: role,
  };

  // Process the request
  return await fetch(url, setupFetch(query, token, variables)).then(
    async (response) => {
      return (await handleFetch(response))
        .userChangeRole as TokenMessageResponse;
    }
  );
};

// Request to update a user
const userUpdate = async (
  token: string,
  user: UserModify
): Promise<TokenMessageResponse> => {
  // Define the query
  const query = `mutation UserChangeRole($user: UserModify!) {
    userUpdate(user: $user) {
      token
      message
      user {
        _id
        username
        email
        profile
        nickname
        profile_color
        favorite_song {
          name
          cover
          description
          album {
            cover
          }
        }
        favorite_album {
          name
          cover
          description
        }
      }
    }
  }`;

  // Define the query variables
  const variables = {
    user: user,
  };

  // Process the request
  return await fetch(url, setupFetch(query, token, variables)).then(
    async (response) => {
      return (await handleFetch(response)).userUpdate as TokenMessageResponse;
    }
  );
};

// Request to search users by name
const userSearch = async (username: string): Promise<User[]> => {
  // Define the query
  const query = `query UserSearch($username: String!) {
    userSearch(username: $username) {
      _id
      username
      profile
    }
  }`;

  // Define the query variables
  const variables = {
    username: username,
  };

  // Process the request
  return await fetch(url, setupFetch(query, undefined, variables)).then(
    async (response) => {
      return (await handleFetch(response)).userSearch as User[];
    }
  );
};

// Request to get a user by id
const userById = async (_id: string): Promise<User> => {
  // Define the query
  const query = `query User($id: ID!) {
    user(_id: $id) {
      _id
      username
      profile
      nickname
      profile_color
      favorite_song {
        name
        cover
        description
        album {
          cover
        }
      }
      favorite_album {
        name
        cover
        description
      }
    }
  }`;

  // Define the query variables
  const variables = {
    id: _id,
  };

  // Process the request
  return await fetch(url, setupFetch(query, undefined, variables)).then(
    async (response) => {
      return (await handleFetch(response)).user as User;
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

// Request to check if the user is an admin
const userGetRole = async (token: string): Promise<string> => {
  // Define the query
  const query = `query Query {
    userGetRole
  }`;

  // Process the request
  return await fetch(url, setupFetch(query, token)).then(async (response) => {
    return (await handleFetch(response)).userGetRole as string;
  });
};

// Request to check if the user is following another user
const userIsFollowing = async (token: string, _id: string) => {
  // Define the query
  const query = `query Query($id: ID!) {
    userIsFollowing(_id: $id)
  }`;

  // Define the query variables
  const variables = {
    id: _id,
  };

  // Process the request
  return await fetch(url, setupFetch(query, token, variables)).then(
    async (response) => {
      return (await handleFetch(response)).userIsFollowing as boolean;
    }
  );
};

export {
  userLogin,
  userRegister,
  userChangeRole,
  userUpdate,
  userSearch,
  userById,
  userByToken,
  userGetRole,
  userIsFollowing,
};
