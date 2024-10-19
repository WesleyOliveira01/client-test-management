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
  return new Date(data)
    .toISOString()
    .split("T")[0]
    .split("-")
    .reverse()
    .join("/");
}

export function setClientsByStatus(item: Projeto.Client) {
  const statusActions: { [key: string]: (item: Projeto.Client) => void } = {
    EM_TESTE: clientStore.getState().addClientEmTeste,
    TESTE_FINALIZADO: clientStore.getState().addClientTesteFinalizado,
    TESTE_EXPIRADO: clientStore.getState().addClientTesteExpirado,
    CONTRATO_ASSINADO: clientStore.getState().addClientContratoAssinado,
    RETIRADO: clientStore.getState().addClientRetirado,
  };
  const action = statusActions[item.status];
  if (action) {
    action(item);
  }
}
