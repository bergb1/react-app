import "./stylesheets/ChangeRole.css";
import { User } from "./interfaces/User";
import { setRole } from "./handles/ChangeRoleHandles";

// Component properties
interface Props {
  token: string;
  user: User;
  role: string;
}

// Component
const ChangeRole = ({ token, user, role }: Props) => {
  return (
    <>
      <select name="roles" id="changeRole">
        <option value="user">User</option>
        <option value="creator">Creator</option>
        {role === "root" ? <option value="admin">Admin</option> : <></>}
      </select>
      <p
        className="changeRoleButton"
        style={{ backgroundColor: user.profile_color}}
        onClick={() => {
          const selectedRole = (
            document.getElementById("changeRole") as HTMLInputElement
          ).value;
          setRole(token, user._id, selectedRole);
        }}
      >
        Assign Role
      </p>
    </>
  );
};

export { ChangeRole };
