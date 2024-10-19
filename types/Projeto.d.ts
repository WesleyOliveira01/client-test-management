namespace Projeto {
  interface Client {
    id: number;
    id_client: number;
    name: string;
    prazoFinal: string;
    status: string;
    retirado?: boolean;
    contrato?: boolean;
  }

  interface User {
    id: number;
    name: string;
    login: string;
    role: string;
    enabled?: boolean;
  }
}
