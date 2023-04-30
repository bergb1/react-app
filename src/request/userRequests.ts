import Credentials from "../interfaces/Credentials";
import GraphQLResponse from "../interfaces/GraphQLResponse";
import { url } from "./globals";

// Request to login a user
const userLogin = async (credentials: Credentials) => {
  return await fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `mutation Login($credentials: Credentials!) {
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
      }`,
      variables: {
        credentials: credentials,
      },
    }),
  }).then(async (response) => {
    // Handle the fetch response
    if (!response.ok) {
        return response.status;
    }

    // Handle the graphql response
    const resp = await response.json() as GraphQLResponse;
    if (resp.errors) {
        return resp.errors[0].message;
    } else {
        return resp.data;
    }
  });
};

export { userLogin };
