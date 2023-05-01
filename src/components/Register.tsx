import { register } from "./handles/RegisterHandles";

interface Props {
  setPage: (page: string) => void;
}

const Register = ({ setPage }: Props) => {
  return (
    <div className="background">
      <div className="register-window">
        {/* Form for filling in login information */}
        <form className="register-form">
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
            <label htmlFor="emailInput">Email address</label>
            <input
              type="text"
              className="form-control"
              id="emailInput"
              placeholder="Enter Email"
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

        {/* Button for going to the login page */}
        <button
          className="btn btn-secondary"
          onClick={() => {
            setPage("login");
          }}
        >
          Login
        </button>

        {/* Button for registering */}
        <button
          className="btn btn-primary"
          onClick={async () => {
            register(setPage, {
              username: (
                document.getElementById("usernameInput") as HTMLInputElement
              ).value,
              email: (document.getElementById("emailInput") as HTMLInputElement)
                .value,
              password: (
                document.getElementById("passwordInput") as HTMLInputElement
              ).value,
            });
          }}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
