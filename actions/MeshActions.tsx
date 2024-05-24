"use server";

import { MeshService } from "@/service/MeshService";
import { clientStore } from "@/store/store";
import { revalidatePath } from "next/cache";

const service = new MeshService();

const formatStatus = async (prazoFinal: string) => {
  const prazo = new Date(prazoFinal);
  const dataAtual = new Date().getUTCDate();
  const dataFinal = prazo.getUTCDate();
  if (dataFinal == dataAtual) {
    return "TESTE_FINALIZADO";
  }
  if (dataFinal < dataAtual) {
    return "TESTE_EXPIRADO";
  }
  if (dataFinal > dataAtual) {
    return "EM_TESTE";
  }
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
}

async function updateClientInFirstRender(client: Projeto.Client) {
  const prazoFinal = new Date(client.prazoFinal);
  const dataAtual = new Date().getUTCDate();
  const dataFinal = prazoFinal.getUTCDate();
  if (dataFinal > dataAtual) {
    if (client.status == "CONTRATO_ASSINADO") {
      await updateStatus({ id: client.id, status: "CONTRATO_ASSINADO" });
      return;
    }
    await updateStatus({ id: client.id, status: "EM_TESTE" });
  }
  if (dataFinal == dataAtual) {
    if (client.status == "CONTRATO_ASSINADO") {
      await updateStatus({ id: client.id, status: "CONTRATO_ASSINADO" });
      return;
    }
    await updateStatus({ id: client.id, status: "TESTE_FINALIZADO" });
  }
  if (dataFinal < dataAtual) {
    if (client.status == "CONTRATO_ASSINADO") {
      await updateStatus({ id: client.id, status: "CONTRATO_ASSINADO" });
      return;
    }
    await updateStatus({ id: client.id, status: "TESTE_EXPIRADO" });
  }
  setClientsByStatus(client);
}

export async function findAll() {
  try {
    revalidatePath("/");
    const res = await service.findAll();
    clientStore.getState().setClients(res.data);
    const clients = clientStore.getState().client;
    clients.forEach((item) => {
      updateClientInFirstRender(item);
      setClientsByStatus(item);
      revalidatePath("/");
    });
  } catch (error) {
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
  updateClientInFirstRender(client);
  if (data.contrato)
    await updateStatus({ id: client.id, status: "CONTRATO_ASSINADO" });
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
