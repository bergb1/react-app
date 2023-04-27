import "./Auth.css"

interface Props {
  callback: (token: string) => void;
}

const Auth = ({}: Props) => {
  return (
    <>
      <h1>Login</h1>
    </>
  );
};

export default Auth;
