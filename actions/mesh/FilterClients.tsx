"use server";

import { clientStore } from "@/store/store";
import { revalidatePath } from "next/cache";

export const filteredClients = async (data: FormData) => {
  clientStore.getState().setFiltrados([]);
  if (!data.get("filter")) return;
  const clients = clientStore.getState().client;
  const filter = data.get("filter");
  const results = clients?.filter((client) =>
    client.name.toLowerCase().includes(filter as string)
  );
  clientStore.getState().setFiltrados(results);
  revalidatePath("/home");
};
