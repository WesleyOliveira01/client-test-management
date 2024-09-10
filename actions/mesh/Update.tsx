"use server";
import { MeshService } from "@/service/MeshService";
import { revalidatePath } from "next/cache";
import { updateStatus } from "./UpdateStatus";

const service = new MeshService();

export async function update(data: any) {

  const res = await service.update(data);
  const client = res.data;
  const prazoFinal = {
    date: new Date(client.prazoFinal).getUTCDate(),
    month: new Date(client.prazoFinal).getUTCMonth() + 1,
  };
  const dataAtual = {
    date: new Date().getUTCDate(),
    month: new Date().getUTCMonth() + 1,
  };

  if (
    prazoFinal.date > dataAtual.date &&
    prazoFinal.month + 1 === dataAtual.month
  ) {
    await updateStatus({ id: client.id, status: "EM_TESTE" });
  } else if (
    prazoFinal.date > dataAtual.date &&
    prazoFinal.month + 1 === dataAtual.month
  ) {
    await updateStatus({ id: client.id, status: "TESTE_FINALIZADO" });
  } else if (
    prazoFinal.date > dataAtual.date &&
    prazoFinal.month >= dataAtual.month
  ) {
    await updateStatus({ id: client.id, status: "TESTE_EXPIRADO" });
  }
  if (data.contrato)
    await updateStatus({ id: client.id, status: "CONTRATO_ASSINADO" });
  if (data.retirado) await updateStatus({ id: client.id, status: "RETIRADO" });
  revalidatePath("/");
}
