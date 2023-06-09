import { Post, PostInput } from "../interfaces/Post";
import { User } from "../interfaces/User";
import { postCreate, postsFollowing, postsUser } from "../request/postRequests";
import { songSearch } from "../request/songRequests";

// Function to append a div with post information in an element
const appendPost = async (
  setUserView: (userView: User) => void,
  post: Post,
  element: HTMLDivElement
) => {
  // Create a post
  const output = document.createElement("div");
  output.id = post._id;
  output.className = "post";
  output.id = post.song._id;
  element.prepend(output);

  // Create a post header
  const header = document.createElement("div");
  header.style.backgroundColor = post.creator.profile_color;
  header.className = "post-header";
  output.appendChild(header);

  // Create a user
  const user = document.createElement("div");
  user.className = "post-header-user";
  header.appendChild(user);

  // Populate the user profile
  const profile = document.createElement("img");
  profile.src = post.creator.profile
    ? post.creator.profile
    : "profile-placeholder.png";
  profile.className = "post-header-user-profile";
  profile.onclick = () => {
    setUserView(post.creator);
  };
  user.appendChild(profile);

  // Populate the user name
  const username = document.createElement("p");
  username.innerHTML = post.creator.nickname
    ? post.creator.nickname
    : post.creator.username;
  username.className = "post-header-user-name";
  user.appendChild(username);

  // Create a song
  const song = document.createElement("div");
  song.className = "post-header-song";
  header.appendChild(song);

  // Populate the song name
  const name = document.createElement("p");
  name.innerHTML = post.song.name;
  name.className = "post-header-song-name";
  song.appendChild(name);

  // Populate the song cover
  const cover = document.createElement("img");
  cover.src = post.song.cover ? post.song.cover : "music-placeholder.png";
  cover.className = "post-header-song-cover";
  song.appendChild(cover);

  // Create a post body
  const body = document.createElement("div");
  body.className = "post-body";
  output.appendChild(body);

  // Add the post message
  const message = document.createElement("p");
  message.innerHTML = post.message;
  message.className = "post-body-message";
  body.appendChild(message);

  // Add the post date
  const date = document.createElement("p");
  date.innerHTML = post.date.toString();
  date.className = "post-body-date";
  body.appendChild(date);
};

// Handle to search for songs and output them in an element
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

// Handle to create a post
const createPost = async (
  setUserView: (userView: User) => void,
  token: string,
  post: PostInput,
  outputElement: HTMLDivElement
) => {
  try {
    const resp = await postCreate(token, post);
    if (!resp) {
      console.log("post not created");
    } else {
      appendPost(setUserView, resp, outputElement);
    }
  } catch (error) {
    console.log((error as Error).message);
  }
};

// Handle get user posts
const getUserPosts = async (
  setUserView: (userView: User) => void,
  creator: string,
  outputElement: HTMLDivElement
) => {
  try {
    const resp = await postsUser(creator);
    outputElement.innerHTML = "";
    if (resp.length > 0) {
      resp.forEach((post) => {
        appendPost(setUserView, post, outputElement);
      });
    }
  } catch (error) {
    console.log((error as Error).message);
  }
};

// Handle get following posts
const getFollowingPosts = async (
  setUserView: (userView: User) => void,
  token: string,
  outputElement: HTMLDivElement
) => {
  try {
    const resp = await postsFollowing(token);
    outputElement.innerHTML = "";
    if (resp.length > 0) {
      resp.forEach((post) => {
        appendPost(setUserView, post, outputElement);
      });
    }
  } catch (error) {
    console.log((error as Error).message);
  }
};

export { searchSongs, createPost, getUserPosts, getFollowingPosts };
