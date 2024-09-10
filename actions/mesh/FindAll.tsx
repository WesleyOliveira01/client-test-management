"use server";
import { MeshService } from "@/service/MeshService";
import { setClientsByStatus, formatStatus } from "./lib/meshUtils";
import { clientStore } from "@/store/store";
import { revalidatePath } from "next/cache";

const service = new MeshService();

export async function findAll() {

  try {
    const res = await service.findAll();
    const clients = res.data;
    for (const client of clients) {
      client.status != "CONTRATO_ASSINADO" &&
        client.status != "RETIRADO" &&
        (client.status = await formatStatus(client.prazoFinal, client.id));
      setClientsByStatus(client);
    }
    clientStore.getState().setClients(clients);
    revalidatePath("/");
  } catch (error) {
    console.error(error);
    return [];
  }
}
