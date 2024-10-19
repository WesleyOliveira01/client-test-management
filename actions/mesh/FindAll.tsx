"use server";
import { MeshService } from "@/service/MeshService";
import { clientStore } from "@/store/store";
import { revalidatePath } from "next/cache";
import { formatStatus, setClientsByStatus } from "./lib/meshUtils";

const service = new MeshService();

export async function findAll() {
  try {
    const { data } = await service.findAll();
    for (const client of data) {
      client.status != "CONTRATO_ASSINADO" &&
        client.status != "RETIRADO" &&
        (client.status = await formatStatus(client.prazoFinal, client.id));
      setClientsByStatus(client);
    }
    clientStore.getState().setClients(data);
    revalidatePath("/home");
  } catch (error) {
    console.error(error);
    return [];
  }
}
