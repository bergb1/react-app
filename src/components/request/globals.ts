import GraphQLResponse from "../interfaces/GraphQLResponse";

const url = "https://soundbuds.azurewebsites.net/graphql";

// Function to setup graphql fetch request
const setupFetch = (
  query: string,
  token?: string,
  variables?: any
): RequestInit => {
  return {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token as string}` : "",
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

export { url, setupFetch, handleFetch };
