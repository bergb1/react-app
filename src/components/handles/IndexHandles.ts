import { User } from "../interfaces/User";
import { userById, userSearch } from "../request/userRequests";

const setUser = async (setUserView: (user: User) => void, _id: string) => {
  try {
    const resp = await userById(_id);
    if (!resp) throw new Error("user not found");
    setUserView(resp);
  } catch (err) {
    console.log((err as Error).message);
  }
};

const searchUsers = async (
  setUserView: (userView: User) => void,
  username: string,
  resultElement: HTMLDivElement
) => {
  try {
    const resp = await userSearch(username);
    resultElement.innerHTML = "";
    resp.forEach((user) => {
      const e = document.createElement("p");
      e.setAttribute("class", "search-result-entry");
      e.onclick = () => {
        setUser(setUserView, user._id);
      };
      e.innerHTML = user.username;
      resultElement.appendChild(e);
    });
  } catch (err) {
    console.log((err as Error).message);
  }
};

export { setUser, searchUsers };
