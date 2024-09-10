import { deleteById } from "@/actions/mesh/Delete";
import { Trash2Icon } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "./ui/dialog";

const RemoveClient = ({ data }: { data: Projeto.Client }) => {
  const removeClient = async () => {
    "use server";
    console.log("deletou");
    await deleteById(data);
  };
  return (
    <Dialog>
      <DialogTrigger className="text-rose-800">
        <Trash2Icon size={23} />
      </DialogTrigger>
      <DialogContent className="p-5">
        <section>Realmente deseja remover este cliente?</section>
        <section className="flex justify-between">
          <DialogClose className="text-xl font-semibold">Não</DialogClose>
          <form action={removeClient}>
            <DialogClose
              type="submit"
              className="text-rose-500 text-xl font-semibold"
            >
              Sim
            </DialogClose>
          </form>
        </section>
      </DialogContent>
    </Dialog>
  );
};

export default RemoveClient;
