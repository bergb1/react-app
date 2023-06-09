import { Song, SongCreate } from "../interfaces/Song";
import { handleFetch, setupFetch, url } from "./globals";

// Request to create a song
const songCreate = async (token: string, song: SongCreate): Promise<Song> => {
  // Define the query
  const query = `mutation SongCreate($song: SongInput!) {
    songCreate(song: $song) {
      _id
      cover
      creator {
        _id
        nickname
        username
        profile_color
      }
      description
      name
    }
  }`;

  // Define the query variables
  const variables = {
    song: song,
  };

  // Process the request
  return await fetch(url, setupFetch(query, token, variables)).then(
    async (response) => {
      return (await handleFetch(response)).songCreate as Song;
    }
  );
};

// Request to delete a song
const songDelete = async (token: string, _id: string): Promise<string> => {
  // Define the query
  const query = `mutation SongDelete($id: ID!) {
    songDelete(_id: $id)
  }`;

  // Define variables
  const variables = {
    id: _id
  }

  // Process the request
  return await fetch(url, setupFetch(query, token, variables)).then(
    async (response) => {
      return (await handleFetch(response)).songDelete as string;
    }
  );
}

// Request to get all of a user's songs
const songsUser = async (creator: string): Promise<Song[]> => {
  // Define the query
  const query = `query SongsUser($creator: ID!) {
    songsUser(creator: $creator) {
      _id
      cover
      creator {
        _id
        nickname
        username
        profile_color
      }
      description
      name
    }
  }`;

  // Define the query variable
  const variables = {
    creator: creator,
  }

  // Process the request
  return await fetch(url, setupFetch(query, undefined, variables)).then(
    async (response) => {
      return (await handleFetch(response)).songsUser as Song[];
    }
  );
}

// Request to search for songs by name
const songSearch = async (name: string): Promise<Song[]> => {
  // Define the query
  const query = `query SongSearch($name: String!) {
    songSearch(name: $name) {
      _id
      name
    }
  }`;

  // Define the query variables
  const variables = {
    name: name,
  };

  // Process the request
  return await fetch(url, setupFetch(query, undefined, variables)).then(
    async (response) => {
      return (await handleFetch(response)).songSearch as Song[];
    }
  );
};

export { songCreate, songDelete, songsUser, songSearch };
