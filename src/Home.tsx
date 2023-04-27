import "./Home.css";

interface Props {
  auth: (token: string) => void;
}

const Index = ({}: Props) => {
  return (
    <>
      <h1>Index</h1>
    </>
  );
};

export default Index;
