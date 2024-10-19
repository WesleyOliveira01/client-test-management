import { AuthService } from "@/service/AuthService";
import { userStore } from "@/store/store";
import { cookies } from "next/headers";

const AuthServicee = new AuthService();

export const getUserDetails = async () => {
  const token = cookies().get("token");
  if (!token) {
    throw new Error("Token not found");
  }
  try {
    const user = await AuthServicee.getUser(token.value);
    userStore.getState().setUser(user.data);
  } catch (error) {
    console.error(error);
    return null;
  }
};
