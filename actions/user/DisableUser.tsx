"use server";
import { UserService } from "@/service/UserService";
import { userStore } from "@/store/store";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const token = cookies().get("token").value;

const service = new UserService(token);

export const DisableUser = async (id: number) => {
  await service.DisableUser(id);
  userStore.getState().setUsers(userStore.getState().users.filter((user) => user.id !== id));
  revalidatePath("/users");
  redirect("/users");
};
