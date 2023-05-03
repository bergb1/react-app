import { handleFetch, setupFetch, url } from "./globals";

// Request to follow a user
const followerAdd = async (token: string, _id: string) => {
  // Define the query
  const query = `mutation FollowAdd($targetId: ID!) {
    followAdd(target_id: $targetId) {
      user
      target
    }
  }`;

  // Define the query variables
  const variables = {
    targetId: _id,
  };

  // Process the request
  return await fetch(url, setupFetch(query, token, variables)).then(
    async (response) => {
      const resp = (await handleFetch(response)).followAdd;
      if (resp) return true;
      else return false;
    }
  );
};

// Request to unfollow a user
const followerRemove = async (token: string, _id: string) => {
  // Define the query
  const query = `mutation FollowRemove($targetId: ID!) {
    followRemove(target_id: $targetId) {
      acknowledged
      deletedCount
    }
  }`;

  // Define the query variables
  const variables = {
    targetId: _id,
  };

  // Process the request
  return await fetch(url, setupFetch(query, token, variables)).then(
    async (response) => {
      const resp = (await handleFetch(response)).followRemove;
      if (resp) return true;
      else return false;
    }
  );
};

// Request to get the followers of a user
const followers = async (_id: string): Promise<string[]> => {
  // Define the query
  const query = `query Query($id: String!) {
    followers(_id: $id)
  }`;

  // Define the variables
  const variables = {
    id: _id,
  };

  // Process the request
  return await fetch(url, setupFetch(query, undefined, variables)).then(
    async (response) => {
      return (await handleFetch(response)).followers as string[];
    }
  );
};

// Request to get the users ID's a user is following
const following = async (_id: string): Promise<string[]> => {
  // Define the query
  const query = `query Query($id: String!) {
    following(_id: $id)
  }`;

  // Define the variables
  const variables = {
    id: _id,
  };

  // Process the request
  return await fetch(url, setupFetch(query, undefined, variables)).then(
    async (response) => {
      return (await handleFetch(response)).following as string[];
    }
  );
};

export { followerAdd, followerRemove, followers, following };
