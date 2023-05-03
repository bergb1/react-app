import PostCreate from "./PostCreate";
import { User, UserWebsite } from "./interfaces/User";
import "./stylesheets/PostsView.css";

// Component properties
interface Props {
  token: string;
  user: UserWebsite;
  userView: User;
}

// Component
const PostsView = ({ token, user, userView }: Props) => {
  return (
    <div
      className="posts-view"
      style={
        userView.username ? { width: "50%" } : { width: "calc(100% - 300px)" }
      }
    >
      {user._id === userView._id ? <PostCreate token={token} user={user} /> : <></>}
      <p>Posts View</p>
    </div>
  );
};

export default PostsView;
