import { login } from "./handles/LoginHandles";

// Component properties
interface Props {
  setToken: (token: string) => void;
  setPage: (page: string) => void;
}

// Component
const Login = ({ setToken, setPage }: Props) => {
  return (
    <div className="login-window">
      {/* Form for filling in login information */}
      <form className="login-form">
        <div className="form-group">
          <label htmlFor="usernameInput">Username</label>
          <input
            type="text"
            className="form-control"
            id="usernameInput"
            placeholder="Enter Username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="passwordInput">Password</label>
          <input
            type="password"
            className="form-control"
            id="passwordInput"
            placeholder="Enter Password"
          />
        </div>
      </form>

      {/* Button for going to the register page */}
      <button
        className="btn btn-secondary"
        onClick={() => {
          setPage("register");
        }}
      >
        Register
      </button>

      {/* Button for logging in */}
      <button
        className="btn btn-primary"
        onClick={async () => {
          await login(setToken, {
            username: (
              document.getElementById("usernameInput") as HTMLInputElement
            ).value,
            password: (
              document.getElementById("passwordInput") as HTMLInputElement
            ).value,
          });
        }}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
