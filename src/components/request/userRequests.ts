import Credentials from "../interfaces/Credentials";
import GraphQLResponse from "../interfaces/GraphQLResponse";
import TokenMessageResponse from "../interfaces/TokenMessageResponse";
import { UserInput } from "../interfaces/User";
import { url } from "./globals";

// Function to setup graphql fetch request
const setupFetch = (
  query: string,
  variables?: any,
  token?: string
): RequestInit => {
  return {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: token as string,
    },
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
  };
};

// Function to handle a fetch response
const handleFetch = async (response: Response): Promise<any> => {
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  // Handle the graphql response
  const resp = (await response.json()) as GraphQLResponse;
  if (resp.errors) {
    throw new Error(resp.errors[0].message);
  } else {
    return resp.data;
  }
};

// Request to login a user
const userLogin = async (
  credentials: Credentials
): Promise<TokenMessageResponse> => {
  // Define the query
  const query = `mutation Login($credentials: Credentials!) {
    login(credentials: $credentials) {
      token
      message
      user {
        _id
        username
        nickname
        profile_color
      }
    }
  }`;

  // Define the query variables
  const variables = {
    credentials: credentials,
  };

  // Process the request
  return await fetch(url, setupFetch(query, variables)).then(
    async (response) => {
      return (await handleFetch(response)).login as TokenMessageResponse;
    }
  );
};

// Request to register a user
const userRegister = async (user: UserInput): Promise<TokenMessageResponse> => {
  // Define the query
  const query = `mutation Register($user: UserInput!) {
    register(user: $user) {
      token
      message
      user {
        username
        _id
      }
    }
  }
  `;

  // Define the query variables
  const variables = {
    user: user,
  };

  // Process the request
  return await fetch(url, setupFetch(query, variables)).then(
    async (response) => {
      return (await handleFetch(response)).register as TokenMessageResponse;
    }
  );
};

export { userLogin, userRegister };
