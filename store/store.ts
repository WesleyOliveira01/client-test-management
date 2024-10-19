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

type userStore = {
  user: Projeto.User | null;
  users: Projeto.User[];
  setUser: (user: Projeto.User) => void;
  setUsers: (users: Projeto.User[]) => void;
};

export const userStore = create<userStore>((set) => ({
  user: null,
  users: [],
  setUsers: (users) => set({ users }),
  setUser: (user) => set({ user }),
}));

type dataStore = {
  image: any | null;
  base64Image: string | null;
  data: any;
  setImage: (image: string) => void;
  setBase64Image: (base64: string) => void;
  setData: (data: any) => void;
};

export const dataStore = create<dataStore>((set) => ({
  image: null,
  base64Image: null,
  data: null,
  setImage: (image) => set({ image }),
  setBase64Image: (base64) => set({ base64Image: base64 }),
  setData: (data) => set({ data }),
}));
