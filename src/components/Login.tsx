import { setCookie } from "../App";
import { userLogin } from "./request/userRequests";
import "./Login.css";

interface Props {
  auth: (token: string) => void;
  setPage: (page: string) => void;
}

const Login = ({ auth, setPage }: Props) => {
  return (
    <div className="background">
      <div className="login-window">
        {/* Form for filling in logging information */}
        <form className="login-form">
          <div className="form-group">
            <label htmlFor="usernameInput">Email address</label>
            <input
              type="username"
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

        {/* Button for logging in */}
        <button
          className="btn btn-primary"
          onClick={async () => {
            const credentials = {
              username: (
                document.getElementById("usernameInput") as HTMLInputElement
              ).value,
              password: (
                document.getElementById("passwordInput") as HTMLInputElement
              ).value,
            };

            // Try and perform the log in
            try {
              const response = await userLogin(credentials);
              if (response.token) {
                setCookie("token", response.token);
                auth(response.token);
              }
            } catch (err) {
              console.log((err as Error).message);
            }
          }}
        >
          Login
        </button>

        {/* Button for going to the register page */}
        <button
          className="btn btn-secondary"
          onClick={() => {
            setPage("register");
          }}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Login;
