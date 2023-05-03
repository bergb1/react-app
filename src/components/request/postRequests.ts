import { Post, PostInput } from "../interfaces/Post";
import { handleFetch, setupFetch, url } from "./globals";

// Request to create a song
const postCreate = async (token: string, post: PostInput): Promise<Post> => {
  // Define the query
  const query = `mutation PostCreate($post: PostInput!) {
    postCreate(post: $post) {
      _id
      creator {
        nickname
        profile
        profile_color
        username
      }
      date
      message
      song {
        cover
        name
      }
    }
  }`;

  // Define the query variables
  const variables = {
    post: post,
  };

  // Process the request
  return await fetch(url, setupFetch(query, token, variables)).then(
    async (response) => {
      return (await handleFetch(response)).postCreate as Post;
    }
  );
};

// Request to fetch a user's posts
const postsUser = async (creator: string): Promise<Post[]> => {
  // Define the query
  const query = `query PostsUser($creator: ID!) {
    postsUser(creator: $creator) {
      _id
      creator {
        nickname
        profile
        profile_color
        username
      }
      date
      message
      song {
        cover
        name
      }
    }
  }`;

  // Define the variables
  const variables = {
    creator: creator,
  };

  // Process the request
  return await fetch(url, setupFetch(query, undefined, variables)).then(
    async (response) => {
      return (await handleFetch(response)).postsUser as Post[];
    }
  );
};

// Request to fetch all followed user's posts
const postsFollowing = async (token: string): Promise<Post[]> => {
  // Define the query
  const query = `query PostsFollowing {
    postsFollowing {
      _id
      creator {
        nickname
        profile
        profile_color
        username
      }
      date
      message
      song {
        cover
        name
      }
    }
  }`;

  // Process the request
  return await fetch(url, setupFetch(query, token)).then(
    async (response) => {
      return (await handleFetch(response)).postsFollowing as Post[];
    }
  );
};

export { postCreate, postsUser, postsFollowing };
