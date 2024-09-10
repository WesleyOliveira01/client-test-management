"use server";
import { MeshService } from "@/service/MeshService";
import { revalidatePath } from "next/cache";

const service = new MeshService();

export async function deleteById(data: any) {

  await service.delete(data);
  revalidatePath("/");
}
