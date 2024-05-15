import { formataData } from "@/actions/MeshActions";
import { formatStatus } from "@/lib/utils";
import EditClient from "./EditClient";
import RemoveClient from "./RemoveClient";

const CardClient = async ({ client }: { client: Projeto.Client }) => {
  const prazo = formataData(client.prazoFinal);
  const prazoFinal = new Date(client.prazoFinal);
  const dataAtual = new Date().getUTCDate();
  const dataFinal = prazoFinal.getUTCDate();

  let corCard = "bg-zinc-100 text-zinc-950";
  if (dataFinal == dataAtual) {
    corCard = "bg-yellow-400 text-yellow-700";
  }
  if (dataFinal < dataAtual) {
    corCard = "bg-rose-400 text-red-700";
  }
  if (client.status == "CONTRATO_ASSINADO")
    corCard = "bg-green-400 text-green-700";
  const status = formatStatus(client.status);
  return (
    <div
      className={`flex justify-between p-4 rounded-xl ${corCard} shadow-md w-[30%]`}
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
          ""
        ) : (
          <>
            <EditClient client={client} />
            <RemoveClient data={client} />
          </>
        )}
      </section>
    </div>
  );
};

export default CardClient;
