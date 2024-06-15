import { findAll } from "@/actions/MeshActions";
import AddClient from "@/components/AddClient";
import ClientCards from "@/components/ClientCard";
import Container from "@/components/Container";
import RefreshClients from "@/components/RefreshClients";
import { clientStore } from "@/store/store";
import { revalidatePath } from "next/cache";

const Home = async () => {
  revalidatePath("/");
  clientStore.getState().resetClients();
  await findAll();
  const emTeste = clientStore.getState().emTeste;
  const testeFinalizado = clientStore.getState().testeFinalizado;
  const testeExpirado = clientStore.getState().testeExpirado;
  const contratoAssinado = clientStore.getState().contratoAssinado;
  const retirados = clientStore.getState().retirados;
  return (
    <Container className="flex flex-col gap-4">
      <section className=" p-2 flex items-center justify-between gap-2">
        <AddClient />
      </section>
      <Container>
        <RefreshClients />
        <section className="  flex flex-col  gap-2 p-4 ">
          {emTeste.length > 0 && (
            <Container className="border-2 border-dotted border-zinc-400 rounded-xl">
              <h1 className="text-xl font-semibold text-zinc-400">Em teste</h1>
              <section className="  flex flex-wrap gap-2 p-4 justify-evenly">
                {emTeste.map((item) => (
                  <ClientCards key={item.id} client={item} />
                ))}
              </section>
            </Container>
          )}
          {testeFinalizado.length > 0 && (
            <Container className="border-2 border-dotted border-zinc-400 rounded-xl">
              <h1 className="text-xl font-semibold text-yellow-400">
                Teste finalizado
              </h1>
              <section className="  flex flex-wrap gap-2 p-4 justify-evenly">
                {testeFinalizado.map((item) => (
                  <ClientCards key={item.id} client={item} />
                ))}
              </section>
            </Container>
          )}
          {testeExpirado.length > 0 && (
            <Container className="border-2 border-dotted border-zinc-400 rounded-xl">
              <h1 className="text-xl font-semibold text-rose-500">
                Teste expirado
              </h1>
              <section className="  flex flex-wrap gap-2 p-4 justify-evenly">
                {testeExpirado.map((item) => (
                  <ClientCards key={item.id} client={item} />
                ))}
              </section>
            </Container>
          )}
          {contratoAssinado.length > 0 && (
            <Container className="border-2 border-dotted border-zinc-400 rounded-xl">
              <h1 className="text-xl font-semibold text-green-400">
                Contrato assinado
              </h1>
              <section className="  flex flex-wrap gap-2 p-4 justify-evenly">
                {contratoAssinado.map((item) => (
                  <ClientCards key={item.id} client={item} />
                ))}
              </section>
            </Container>
          )}
          {retirados.length > 0 && (
            <Container className="border-2 border-dotted border-zinc-400 rounded-xl">
              <h1 className="text-xl font-semibold text-blue-500">
                Mesh retirado
              </h1>
              <section className="  flex flex-wrap gap-2 p-4 justify-evenly">
                {retirados.map((item) => (
                  <ClientCards key={item.id} client={item} />
                ))}
              </section>
            </Container>
          )}
        </section>
      </Container>
    </Container>
  );
};

export default Home;
