import { UserWebsite } from "./interfaces/User";

// Component properties
interface Props {
    user: UserWebsite
}

// Component
const Nav = ({ }: Props) => {
  return (
    <div className="nav-bar">
        <div className="website-logo"></div>
        <div className="website-title"></div>
        <div className="user-profile"></div>
    </div>
  );
};

export default Nav;
