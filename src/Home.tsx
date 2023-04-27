import "./Home.css";

interface Props {
  auth: (token: string) => void;
}

const Home = ({}: Props) => {
  return (
    <>
      <h1>Home</h1>
    </>
  );
};

export default Home;
