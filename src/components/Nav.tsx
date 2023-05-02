import { userPlaceholder } from "../Index";
import "./Nav.css";
import { setCookie } from "./functions/cookies";
import { setUser } from "./handles/IndexHandles";
import { User, UserWebsite } from "./interfaces/User";

// Component properties
interface Props {
  setUserView: (user: User) => void;
  setToken: (token: string) => void;
  user: UserWebsite;
}

// Component
const Nav = ({ setUserView, setToken, user }: Props) => {
  return (
    <>
      <div className="nav-block"></div>
      <nav className="nav-bar">
        {/* Website logo and index page */}
        <div
          className="website-logo"
          onClick={() => {
            setUserView(userPlaceholder);
          }}
        >
          <img className="website-logo-image" src="soundbuds-icon.png" />
          <p className="website-title">Soundbuds</p>
        </div>

        {/* User */}
        <div
          className="user"
          onClick={() => {
            setUser(setUserView, user._id);
          }}
        >
          {/* Profile */}
          <img
            className="user-profile"
            src="profile-placeholder.png"
            alt="Profile"
          />

          {/* Username */}
          <p className="user-name">
            {user.nickname ? user.nickname : user.username}
          </p>
        </div>

        {/* Logout */}
        <div
          className="user-logout"
          onClick={() => {
            setCookie("token", "");
            setToken("");
          }}
        >
          <p className="logout">Logout</p>
        </div>
      </nav>
    </>
  );
};

export default Nav;
