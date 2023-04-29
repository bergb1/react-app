import "./Login.css";

interface Props {
  auth: (token: string) => void;
  setPage: (page: string) => void;
}

const Login = ({}: Props) => {
  return (
    <div className="background">
      <div className="login-window">
        <form className="login-form">
          <div className="form-group">
            <label htmlFor="emailInput">Email address</label>
            <input
              type="email"
              className="form-control"
              id="emailInput"
              placeholder="Enter email"
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
          <div>
            <button className="btn btn-primary">
              Login
            </button>
            <button className="btn btn-secondary">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
