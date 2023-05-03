import { songSearch } from "../request/songRequests";

const searchSongs = async (
  setPickedSong: (setPickedSong: string) => void,
  name: string,
  resultElement: HTMLDivElement
) => {
  try {
    const resp = await songSearch(name);
    resultElement.innerHTML = "";
    resp.forEach((song) => {
      const e = document.createElement("p");
      e.setAttribute("class", "search-result-entry");
      e.onclick = () => {
        setPickedSong(song._id);
        resultElement.innerHTML = "";
      };
      e.innerHTML = song.name;
      resultElement.appendChild(e);
    });
  } catch (err) {
    console.log((err as Error).message);
  }
};

export { searchSongs };
