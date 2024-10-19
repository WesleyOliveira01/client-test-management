import { formataData } from "@/actions/mesh/lib/meshUtils";
import { formatStatus } from "@/lib/utils";
import { userStore } from "@/store/store";
import EditClient from "./EditClient";
import RemoveClient from "./RemoveClient";

const CardClient = async ({ client }: { client: Projeto.Client }) => {
  const { user } = userStore.getState();
  const prazo = formataData(client.prazoFinal);
  let corCard;
  switch (client.status) {
    case "EM_TESTE":
      corCard = "bg-zinc-100 text-zinc-950";
      break;
    case "TESTE_FINALIZADO":
      corCard = "bg-yellow-400 text-yellow-700";
      break;
    case "TESTE_EXPIRADO":
      corCard = "bg-rose-400 text-red-700";
      break;
    case "CONTRATO_ASSINADO":
      corCard = "bg-lime-500 text-green-700";
      break;
    case "RETIRADO":
      corCard = "bg-sky-400 text-blue-600";
      break;
    default:
      break;
  }
  const status = formatStatus(client.status);
  return (
    <li
      className={`flex justify-between p-4 rounded-xl ${corCard} shadow-md w-[100%] lg:w-[30%]`}
    >
      <section className="p-4">
        <ul className="flex flex-col gap-2 font-semibold">
          <li>ID: {client.id_client}</li>
          <li>Nome: {client.name}</li>
          {client.status == "CONTRATO_ASSINADO" ? (
            <li>Status: {status} </li>
          ) : (
            <>
              <li>Prazo: {prazo}</li>
              <li>Status: {status} </li>
            </>
          )}
        </ul>
      </section>
      <section className="flex flex-col  justify-between gap-2 p-2">
        {client.status == "CONTRATO_ASSINADO" ? (
          <>
            {user.role == "ADMIN" && (
              <>
                <EditClient client={client} />
                <RemoveClient data={client} />
              </>
            )}
          </>
        ) : (
          <>
            <EditClient client={client} />
            <RemoveClient data={client} />
          </>
        )}
      </section>
    </li>
  );
};

export default CardClient;
