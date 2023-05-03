import PostCreate from "./PostCreate";
import { User } from "./interfaces/User";
import "./stylesheets/PostsView.css";

// Component properties
interface Props {
  userView: User;
}

// Component
const PostsView = ({ userView }: Props) => {
  return (
    <div className="posts-view" style={userView.username ? {width: '50%'} : {width: 'calc(100% - 300px)'}}>
      <PostCreate />
      <p>Posts View</p>
    </div>
  );
};

export default PostsView;
