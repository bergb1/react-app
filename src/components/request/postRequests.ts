import { Post, PostInput } from "../interfaces/Post";
import { handleFetch, setupFetch, url } from "./globals";

// Request to create a song
const postCreate = async (token: string, post: PostInput): Promise<Post> => {
  // Define the query
  const query = `mutation PostCreate($post: PostInput!) {
    postCreate(post: $post) {
      _id
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

export { postCreate };
