import { create } from "zustand";

type store = {
  client: Projeto.Client[];
  emTeste: Projeto.Client[];
  testeFinalizado: Projeto.Client[];
  testeExpirado: Projeto.Client[];
  contratoAssinado: Projeto.Client[];
  retirados: Projeto.Client[];
  clientesFiltrados: Projeto.Client[];

  resetClients: () => void;
  addClient: (data: Projeto.Client) => void;
  setClients: (data: Projeto.Client[]) => void;
  addClientEmTeste: (data: Projeto.Client) => void;
  addClientTesteFinalizado: (data: Projeto.Client) => void;
  addClientTesteExpirado: (data: Projeto.Client) => void;
  addClientContratoAssinado: (data: Projeto.Client) => void;
  addClientRetirado: (data: Projeto.Client) => void;
  setFiltrados: (data: Projeto.Client[]) => void;
};

export const clientStore = create<store>((set) => ({
  client: [],
  emTeste: [],
  testeFinalizado: [],
  testeExpirado: [],
  contratoAssinado: [],
  retirados: [],
  clientesFiltrados: [],

  resetClients: () =>
    set({
      client: [],
      emTeste: [],
      testeFinalizado: [],
      testeExpirado: [],
      contratoAssinado: [],
      retirados: [],
    }),
  addClient: (clients) =>
    set((state) => ({ client: [...state.client, clients] })),
  setClients: (clients) =>
    set({
      client: clients,
    }),
  setFiltrados: (clients) =>
    set({
      clientesFiltrados: clients,
    }),
  addClientEmTeste: (client) =>
    set((state) => ({ emTeste: [...state.emTeste, client] })),
  addClientTesteFinalizado: (client) =>
    set((state) => ({ testeFinalizado: [...state.testeFinalizado, client] })),
  addClientTesteExpirado: (client) =>
    set((state) => ({ testeExpirado: [...state.testeExpirado, client] })),
  addClientContratoAssinado: (client) =>
    set((state) => ({ contratoAssinado: [...state.contratoAssinado, client] })),
  addClientRetirado: (client) =>
    set((state) => ({ retirados: [...state.retirados, client] })),
}));
