import "./App.css";
import Home from "./Home";
import Auth from "./Auth";
import { useState } from "react";

const app = () => {
  const [auth, setAuth] = useState('');
  
  return <>{auth ? <Home auth={setAuth} /> : <Auth callback={setAuth} />}</>;
};

export default app;
