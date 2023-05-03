import PostCreate from "./PostCreate";
import { User, UserWebsite } from "./interfaces/User";
import "./stylesheets/PostsView.css";

// Component properties
interface Props {
  user: UserWebsite;
  userView: User;
}

// Component
const PostsView = ({ user, userView }: Props) => {
  return (
    <div className="posts-view" style={userView.username ? {width: '50%'} : {width: 'calc(100% - 300px)'}}>
      <PostCreate user={user} />
      <p>Posts View</p>
    </div>
  );
};

export default PostsView;
