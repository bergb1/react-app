import "./App.css";
import Index from "./Home";
import Auth from "./Auth";
import Cookie from "./interfaces/cookie";
import { useState } from "react";

const app = () => {
  const cookie = JSON.parse(document.cookie) as Cookie;
  console.log(`session: ${cookie.token}`);

  const [auth, setAuth] = useState(cookie.token);

  return <>{auth ? <Index auth={setAuth} /> : <Auth callback={setAuth} />}</>;
};

export default app;
