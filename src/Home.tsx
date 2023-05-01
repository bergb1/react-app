import "./Home.css";
import { UserWebsite } from "./components/interfaces/User";

interface Props {
  user: UserWebsite
}

const Home = ({ user }: Props) => {
  return (
    <>
      <h1>{user.nickname ? user.nickname : user.username}</h1>
    </>
  );
};

export default Home;
