import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formataData(data: string) {
  let d = new Date(data);
  let dia = "" + d.getUTCDate();
  let mes = "" + d.getUTCMonth() + 1;
  let ano = d.getUTCFullYear();

  if (dia.length < 2) dia = "0" + dia;
  if (mes.length < 2) mes = "0" + mes;

  return `${dia}/${mes}/${ano}`;
}

export function formatStatus(status: string) {
  switch (status) {
    case "EM_TESTE":
      return "Em teste";
    case "TESTE_FINALIZADO":
      return "Teste finalizado";
    case "TESTE_EXPIRADO":
      return "Teste expirado";
    case "CONTRATO_ASSINADO":
      return "Contrato assinado";
    case "RETIRADO":
      return "Mesh retirado";
    default:
      break;
  }
}

export const schema = z.object({
  id_client: z
    .string({ required_error: "Id do client obrigatório" })
    .min(1, { message: "Id do client obrigatório" }),
  name: z
    .string({ required_error: "Nome obrigatório" })
    .min(1, { message: "Nome obrigatório" }),
  prazo: z.string({ required_error: "Prazo obrigatório" }).date(),
});

export const loginSchema = z.object({
  login: z.string().min(1, { message: "O nome de usuario é obrigatório" }),
  password: z.string().min(1, { message: "A senha é obrigatório" }),
});
