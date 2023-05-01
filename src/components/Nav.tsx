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
    <div className="nav-bar">
      {/* Website logo and index page */}
      <div
        className="website-logo"
        onClick={() => {
          setPage("index");
        }}
      >
        <img src="soundbuds-icon.png" />
      </div>

      {/* Website title */}
      <div
        className="website-title"
        onClick={() => {
          setPage("index");
        }}
      >
        <h1>Soundbuds</h1>
      </div>

      {/* User */}
      <div
        className="user"
        onClick={() => {
          setPage("user");
        }}
      >
        <p className="user-name">
          {user.nickname ? user.nickname : user.username}
        </p>
        <img
          className="user-profile"
          src="profile-placeholder.png"
          alt="Profile"
        />
        <div
          className="user-logout"
          onClick={() => {
            setCookie("token", "");
            setToken("");
          }}
        >
          <p className="logout">Logout</p>
          <span className="material-symbols-outlined">logout</span>
        </div>
      </div>
    </div>
  );
};

export default Nav;
