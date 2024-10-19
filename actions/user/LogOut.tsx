"use server";

import { revalidatePath } from "next/cache";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const logOut = async () => {
    cookies().delete("token");
    revalidatePath("/home");
    redirect("/");
};
