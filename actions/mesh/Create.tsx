"use server";
import { MeshService } from "@/service/MeshService";
import { revalidatePath } from "next/cache";
import { formatStatus } from "./lib/meshUtils";

const service = new MeshService();

export async function create(data: FormData) {

  const client = {
    id_client: data.get("id_client"),
    name: data.get("name"),
    prazoFinal: data.get("prazo"),
    status: await formatStatus(data.get("prazo") as string),
  };

  await service.create(client);
  revalidatePath("/");
}
