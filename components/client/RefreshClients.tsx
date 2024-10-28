import { findAll } from "@/actions/mesh/FindAll";
import { clientStore } from "@/store/store";
import { RefreshCwIcon } from "lucide-react";
import { revalidatePath } from "next/cache";

const RefreshClients = () => {
  const refresh = async () => {
    "use server";
    clientStore.getState().setFiltrados([]);
    await findAll();
  };
  return (
    <form action={refresh}>
      <button className="p-2 text-lime-500">
        <RefreshCwIcon size={30} />
      </button>
    </form>
  );
};

export default RefreshClients;
