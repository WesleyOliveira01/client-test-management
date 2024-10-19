"use server";
import { UserService } from "@/service/UserService";
import { userStore } from "@/store/store";
import { cookies } from "next/headers";

export const getAllUsers = async () => {
  const token = cookies().get("token");
  if (!token) {
    throw new Error("Token not found");
  }
  const _UserService = new UserService(token.value);
  try {
    const users = await _UserService
      .GetAllUser()
      .then((response) => response.data);
    userStore.getState().setUsers(users);
  } catch (error) {
    console.error(error);
    return null;
  }
};
