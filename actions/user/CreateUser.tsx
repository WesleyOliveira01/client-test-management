"use server";

import { UserService } from "@/service/UserService";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const service = new UserService();

export const createUser = async (data: FormData) => {
  const user = {
    name: data.get("name"),
    login: data.get("login"),
    password: data.get("password"),
    role: data.get("role"),
  };
  await service.CreateUser(user);
  revalidatePath("/users");
  redirect("/users");
};
