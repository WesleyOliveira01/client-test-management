"use server";
import { AuthService } from "@/service/AuthService";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const authService = new AuthService();

export const login = async (formData: FormData) => {
  const login = {
    login: formData.get("login"),
    password: formData.get("password"),
  };

  await authService
    .login(login)
    .then((data) => {
      cookies().set("token", data.data);
    })
    .catch((err) => {
      throw new Error("Usuario ou senha invalidos");
    });
    revalidatePath("/");
    redirect("/home");
};
