import { useEffect } from "react";
import PostCreate from "./PostCreate";
import { User, UserWebsite } from "./interfaces/User";
import "./stylesheets/PostsView.css";
import { getFollowingPosts, getUserPosts } from "./handles/PostsViewHandles";

// Component properties
interface Props {
  token: string;
  user: UserWebsite;
  userView: User;
  setUserView: (userView: User) =>  void;
}

// Component
const PostsView = ({ token, user, userView, setUserView }: Props) => {
  // Generate posts for the viewed user
  useEffect(() => {
    const element = document.getElementById("posts-list") as HTMLDivElement;
    element.innerHTML = "";
    if (userView._id) {
      getUserPosts(setUserView, userView._id, element);
    } else {
      getFollowingPosts(setUserView, token, element);
    }
  }), [userView]

  return (
    <div
      className="posts-view"
      style={
        userView.username ? { width: "50%" } : { width: "calc(100% - 300px)" }
      }
    >
      {user._id === userView._id ? (
        <PostCreate
          outputElement={
            document.getElementById("posts-list") as HTMLDivElement
          }
          token={token}
          user={user}
          setUserView={setUserView}
        />
      ) : (
        <></>
      )}
      <div id="posts-list"></div>
    </div>
  );
};

export default PostsView;
