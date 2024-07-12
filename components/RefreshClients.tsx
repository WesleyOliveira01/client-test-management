import { clientStore } from "@/store/store";
import { RefreshCwIcon } from "lucide-react";
import { revalidatePath } from "next/cache";

const RefreshClients = () => {
  const refresh = async () => {
    "use server";
    clientStore.getState().setFiltrados([]);
    revalidatePath("/");
  };
  return (
    <form action={refresh}>
      <button className="p-2 text-sky-500">
        <RefreshCwIcon size={25} />
      </button>
    </form>
  );
};

export default RefreshClients;
