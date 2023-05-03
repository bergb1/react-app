import { Song, SongCreate } from "../interfaces/Song";
import { handleFetch, setupFetch, url } from "./globals";

// Request to create a song
const songCreate = async (token: string, song: SongCreate): Promise<Song> => {
  // Define the query
  const query = `mutation SongCreate($song: SongInput!) {
      songCreate(song: $song) {
        _id
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

export { songCreate };
