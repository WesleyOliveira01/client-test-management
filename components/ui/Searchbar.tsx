import { clientStore } from "@/store/store";
import { revalidatePath } from "next/cache";

const Searchbar = () => {
  const filteredClients = async (data: FormData) => {
    "use server";
    clientStore.getState().setFiltrados([]);
    if (!data.get("filter")) return;
    const clients = clientStore.getState().client;
    const filter = data.get("filter");
    const results = clients?.filter((client) =>
      client.name.toLowerCase().includes(filter as string)
    );
    clientStore.getState().setFiltrados(results);
    revalidatePath("/");
  };
  return (
    <div className="w-[95%]">
      <form
        action={filteredClients}
        className="shadow-md border-gray-400 rounded-xl flex"
      >
        <input
          name="filter"
          className="w-[90%] p-2 outline-none rounded-l-xl"
          type="text"
          placeholder="Buscar..."
        />
        <button className="w-[10%] bg-green-400 p-2 text-white font-semibold rounded-r-xl shadow-md">
          Buscar
        </button>
      </form>
    </div>
  );
};

export default Searchbar;
