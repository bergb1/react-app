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

export { songCreate, songSearch };
