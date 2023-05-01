import "./App.css";
import Home from "./Home";
import Auth from "./Auth";
import { useState, useEffect } from "react";
import { userByToken } from "./components/request/userRequests";
import { UserWebsite } from "./components/interfaces/User";

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

// User placeholder
const userPlaceholder: UserWebsite = {
  username: '',
  nickname: '',
  profile_color: ''
}

// Main application
const app = () => {
  const [token, setToken] = useState(getCookie("token"));
  const [user, setUser] = useState(userPlaceholder);

  console.log(token);
  console.log(user);

  useEffect(() => {
    async function getUser() {
      const user = await userByToken(token);
      setUser(user);
    }

    if (!user.username) {
      getUser();
    }
  }, []);

  return <>{user.username ? <Home user={user} /> : <Auth setToken={setToken} />}</>;
};

export default app;

export { setCookie };
