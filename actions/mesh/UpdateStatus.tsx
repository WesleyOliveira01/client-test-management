"use server"
import { MeshService } from "@/service/MeshService";
import { revalidatePath } from "next/cache";

const service = new MeshService();

export async function updateStatus(data: any) {
  await service.updateStaus(data);
  revalidatePath("/");
}
