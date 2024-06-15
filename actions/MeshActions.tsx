"use server";

import { MeshService } from "@/service/MeshService";
import { clientStore } from "@/store/store";
import { revalidatePath } from "next/cache";

const service = new MeshService();

const formatStatus = async (prazoFinal: string) => {
  const prazo = new Date(prazoFinal).getUTCDate();
  const dataAtual = new Date().getUTCDate();
  if (prazo === dataAtual) {
    return "TESTE_FINALIZADO";
  }
  if (prazo < dataAtual) {
    return "TESTE_EXPIRADO";
  }
  return "EM_TESTE";
};

export async function formataData(data: string) {
  var d = new Date(data),
    dia = "" + d.getUTCDate(),
    mes = "" + (d.getMonth() + 1),
    ano = d.getFullYear();
  if (dia.length < 2) dia = "0" + dia;
  if (mes.length < 2) mes = "0" + mes;
  return [dia, mes, ano].join("/");
}

function setClientsByStatus(item: Projeto.Client) {
  if (item.status == "EM_TESTE") clientStore.getState().addClientEmTeste(item);
  if (item.status == "TESTE_FINALIZADO")
    clientStore.getState().addClientTesteFinalizado(item);
  if (item.status == "TESTE_EXPIRADO")
    clientStore.getState().addClientTesteExpirado(item);
  if (item.status == "CONTRATO_ASSINADO")
    clientStore.getState().addClientContratoAssinado(item);
  if (item.status == "RETIRADO") clientStore.getState().addClientRetirado(item);
}

export async function findAll() {
  try {
    const res = await service.findAll();
    const clients = res.data;
    for (const client of clients) {
      client.status != "CONTRATO_ASSINADO" && client.status != "RETIRADO"
        ? (client.status = await formatStatus(client.prazoFinal))
        : "";
      setClientsByStatus(client);
    }
    clientStore.getState().setClients(clients);
    revalidatePath("/");
  } catch (error) {
    console.error(error);
    return [];
  }
}

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

export async function update(data: any) {
    const res = await service.update(data);
    const client = res.data;
    const prazoFinal = new Date(client.prazoFinal);
    const dataAtual = new Date().getUTCDate();
    const dataFinal = prazoFinal.getUTCDate();
    if (dataFinal > dataAtual) {
      await updateStatus({ id: client.id, status: "EM_TESTE" });
    } else if (dataFinal === dataAtual) {
      await updateStatus({ id: client.id, status: "TESTE_FINALIZADO" });
    } else if (dataFinal < dataAtual) {
      await updateStatus({ id: client.id, status: "TESTE_EXPIRADO" });
    }
    
    if (data.contrato)
      await updateStatus({ id: client.id, status: "CONTRATO_ASSINADO" });
    if (data.retirado)
      await updateStatus({ id: client.id, status: "RETIRADO" });
    revalidatePath("/");
  
}

export async function deleteById(data: any) {
  await service.delete(data);
  revalidatePath("/");
}

export async function updateStatus(data: any) {
  await service.updateStaus(data);
  revalidatePath("/");
}
