import { clientStore } from "@/store/store";
import { updateStatus } from "../UpdateStatus";

export const formatStatus = async (prazoFinal: string, id?: number) => {
  const prazo = {
    date: new Date(prazoFinal).getUTCDate(),
    month: new Date(prazoFinal).getUTCMonth() + 1,
  };
  const dataAtual = {
    date: new Date().getUTCDate(),
    month: new Date().getUTCMonth() + 1,
  };
  if (prazo.month < dataAtual.month) {
    return "TESTE_EXPIRADO";
  }

  if (prazo.date === dataAtual.date) {
    id && (await updateStatus({ id: id, status: "TESTE_FINALIZADO" }));
    return "TESTE_FINALIZADO";
  } else if (prazo.date < dataAtual.date) {
    id && (await updateStatus({ id: id, status: "TESTE_EXPIRADO" }));
    return "TESTE_EXPIRADO";
  }

  id && (await updateStatus({ id: id, status: "EM_TESTE" }));
  return "EM_TESTE";
};

export async function formataData(data: string) {
  var d = new Date(data),
    dia = "" + d.getUTCDate(),
    mes = "" + (d.getUTCMonth() + 1),
    ano = d.getFullYear();
  if (dia.length < 2) dia = "0" + dia;
  if (mes.length < 2) mes = "0" + mes;
  return [dia, mes, ano].join("/");
}

export function setClientsByStatus(item: Projeto.Client) {
  if (item.status == "EM_TESTE") clientStore.getState().addClientEmTeste(item);
  if (item.status == "TESTE_FINALIZADO")
    clientStore.getState().addClientTesteFinalizado(item);
  if (item.status == "TESTE_EXPIRADO")
    clientStore.getState().addClientTesteExpirado(item);
  if (item.status == "CONTRATO_ASSINADO")
    clientStore.getState().addClientContratoAssinado(item);
  if (item.status == "RETIRADO") clientStore.getState().addClientRetirado(item);
}
