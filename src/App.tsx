import Auth from "./Auth";
import { useState, useEffect } from "react";
import { userByToken } from "./components/request/userRequests";
import { UserWebsite } from "./components/interfaces/User";
import Index from "./Index";
import { getCookie } from "./components/functions/cookies";
import { getRole } from "./components/handles/UserOptionsHandles";

// User placeholder
const userPlaceholder: UserWebsite = {
  _id: "",
  username: "",
  nickname: "",
  profile_color: "",
};

const app = () => {
  // State hooks for updating
  const [token, setToken] = useState(getCookie("token"));
  const [user, setUser] = useState(userPlaceholder);
  const [role, setRole] = useState("");

  // Effect hook for async features
  useEffect(() => {
    async function getUser() {
      const user = await userByToken(token);

      // Handle the api response
      if (!user) {
        setToken("");
      } else {
        setRole(await getRole(token));
        setUser(user);
      }
    }

    // Get the user if there is a token
    if (token) {
      getUser();
    } else {
      setUser(userPlaceholder);
    }
  }, [token]);

  // Redirection
  return token ? (
    user.username ? (
      <Index token={token} setToken={setToken} user={user} setUser={setUser} role={role} />
    ) : (
      <></>
    )
  ) : (
    <Auth setToken={setToken} />
  );
};

export default app;
