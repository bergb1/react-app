import { UserWebsite } from "./components/interfaces/User";

// Component Properties
interface Props {
  user: UserWebsite;
}

// Component
const Index = ({ user }: Props) => {
  return (
    <>
      <h1>{user.nickname ? user.nickname : user.username}</h1>
    </>
  );
};

export default Index;
