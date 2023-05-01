import "./App.css";
import Home from "./Home";
import Auth from "./Auth";
import { useState } from "react";

// Cookie setter
function setCookie(cname: string, cvalue: string) {
  document.cookie = cname + "=" + cvalue + "; SameSite=Strict";
}

// Cookie getter
function getCookie(cname: string) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// Main application
const app = () => {
  const token = getCookie("token");
  const [auth, setAuth] = useState(token);

  return <>{auth ? <Home auth={setAuth} /> : <Auth callback={setAuth} />}</>;
};

export default app;

export { setCookie };
