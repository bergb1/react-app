import { userChangeRole } from "../request/userRequests";

const changeRole = async (token: string, _id: string, role: string) => {
  try {
    // Execute the handler
    const resp = await userChangeRole(token, _id, role);

    if (!resp) throw new Error("role not updated");
  } catch (err) {
    console.log((err as Error).message);
  }
};

export { changeRole };
