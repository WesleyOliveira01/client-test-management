
import { findAll } from "@/actions/mesh/FindAll";
import AddClient from "@/components/AddClient";
import Container from "@/components/Container";
import RefreshClients from "@/components/RefreshClients";
import RenderClients from "@/components/ui/RenderClients";
import Searchbar from "@/components/ui/Searchbar";
import { clientStore } from "@/store/store";
import { revalidatePath } from "next/cache";

const Home = async () => {
  revalidatePath("/");
  clientStore.getState().resetClients();
  await findAll();
  const {
    emTeste,
    testeFinalizado,
    testeExpirado,
    contratoAssinado,
    retirados,
    clientesFiltrados,
  } = clientStore.getState();
  return (
    <Container className="flex flex-col gap-4">
      <section className=" p-2 flex items-center justify-between gap-2">
        <AddClient />
      </section>
      <Container>
        <div className="flex justify-between gap-2 items-center">
          <RefreshClients />
          <Searchbar />
        </div>
        <section className="  flex flex-col  gap-2 p-4 ">
          {clientesFiltrados.length > 0 ? (
            <RenderClients
              data={clientesFiltrados}
              box_cn="border-zinc-400"
              title_cn="text-zinc-400"
            />
          ) : (
            <>
              <RenderClients
                data={emTeste}
                title="Em teste"
                box_cn="border-zinc-400"
                title_cn="text-zinc-400"
              />
              <RenderClients
                data={testeFinalizado}
                title="Teste finalizado"
                box_cn="border-yellow-400"
                title_cn="text-yellow-400"
              />
              <RenderClients
                data={testeExpirado}
                title="Teste expirado"
                box_cn="border-rose-500"
                title_cn="text-rose-500"
              />
              <RenderClients
                data={contratoAssinado}
                title="Contrato assinado"
                box_cn="border-green-400"
                title_cn="text-green-400"
              />
              <RenderClients
                data={retirados}
                title="Mesh retirado"
                box_cn="border-blue-500"
                title_cn="text-blue-500"
              />
            </>
          )}
        </section>
      </Container>
    </Container>
  );
};

export default Home;
