import { userLogin } from "../request/userRequests";
import "./Login.css";

interface Props {
  auth: (token: string) => void;
  setPage: (page: string) => void;
}

const Login = ({ setPage }: Props) => {
  return (
    <div className="background">
      <div className="login-window">
        
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

            console.log(await userLogin(credentials));
          }}
        >
          Login
        </button>
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
