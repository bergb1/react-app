import "./Nav.css";
import { setCookie } from "./functions/cookies";
import { UserWebsite } from "./interfaces/User";

// Component properties
interface Props {
  setPage: (page: string) => void;
  setToken: (token: string) => void;
  user: UserWebsite;
}

// Component
const Nav = ({ setPage, setToken, user }: Props) => {
  return (
    <nav className="nav-bar">
      {/* Website logo and index page */}
      <div
        className="website-logo"
        onClick={() => {
          setPage("index");
        }}
      >
        <img className="website-logo-image" src="soundbuds-icon.png" />
        <p className="website-title">Soundbuds</p>
      </div>

      {/* User */}
      <div
        className="user"
        onClick={() => {
          setPage("user");
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
  );
};

export default Nav;
