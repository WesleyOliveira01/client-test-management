
import { BoltIcon } from "lucide-react";
import Input from "./ui/Input";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "./ui/dialog";
import { update } from "@/actions/mesh/Update";

const EditClient = ({ client }: { client: Projeto.Client }) => {
  const _update = async (data: FormData) => {
    "use server";
    const _client = {
      id: client.id,
      id_client: data.get("id_client"),
      name: data.get("name"),
      prazoFinal: data.get("prazo") || client.prazoFinal,
      contrato: data.get("contrato"),
      retirado: data.get("retirado"),
    };
    await update(_client);
  };
  return (
    <Dialog>
      <DialogTrigger className="text-zinc-200">
        <BoltIcon size={23} />
      </DialogTrigger>
      <DialogContent>
        <form className="flex flex-col gap-3" action={_update}>
          <Input
            defaultValue={client.id_client}
            forElement="id_client"
            label="Id do client"
          />
          <Input defaultValue={client.name} forElement="name" label="Nome" />
          <Input
            defaultValue={client.prazoFinal}
            type="date"
            forElement="prazo"
            label="Prazo"
          />
          <section className="flex justify-evenly">
              <div className="flex gap-2">
                <label htmlFor="contrato" className="text-sky-500 font-semibold">
                  Contrato assinado?
                </label>
                <input
                  type="checkbox"
                  className="checkbox-lg checkbox-info"
                  id="contrato"
                  name="contrato"
                />
              </div>
              <div className="flex gap-2">
                <label htmlFor="retirado" className="text-sky-500 font-semibold">
                  Mesh retirado?
                </label>
                <input
                  type="checkbox"
                  className="checkbox-lg checkbox-info"
                  id="retirado"
                  name="retirado"
                />
              </div>
          </section>
          <DialogClose
            type="submit"
            className="w-full bg-sky-400 rounded-xl font-semibold text-zinc-50 hover:bg-sky-500 hover:text-zinc-100 shadow-md p-2"
          >
            Salvar
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditClient;
