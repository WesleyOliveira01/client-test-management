import { filteredClients } from "@/actions/mesh/FilterClients";
import AddClient from "../client/AddClient";


const Searchbar = () => {
  return (
    <div className="w-full flex shadow-md">
      <AddClient className="w-[10%] bg-lime-500" />
      <form action={filteredClients} className="w-full flex">
        <input
          name="filter"
          className="w-full dark:bg-zinc-100 placeholder:text-zinc-900 dark:text-zinc-900 p-2 outline-none"
          type="text"
          placeholder="Buscar..."
        />
        <button className="w-[10%] bg-lime-500 p-2 text-white font-semibold rounded-r-xl shadow-md">
          Buscar
        </button>
      </form>
    </div>
  );
};

export default Searchbar;
