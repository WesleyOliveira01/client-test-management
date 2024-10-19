"use client";
import { createUser } from "@/actions/user/CreateUser";
import { userSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserPlus2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import Input from "../ui/Input";
import Select from "../ui/Select";

const AddUser = () => {
  const {
    register,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });
  return (
    <Dialog>
      <DialogTrigger className="flex gap-1 border border-lime-500 bg-transparent text-lime-500 hover:text-lime-600 hover:border-lime-600 p-2 rounded-md">
        <UserPlus2 size={20} /> Novo Usuário
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-lime-500 text-xl">
          Novo Usuário
        </DialogTitle>

        <form action={createUser}>
          <Input
            {...register("name")}
            error_message={errors?.name?.message}
            label="Nome"
            placeholder="Nome"
            forElement="nome"
          />
          <Input
            {...register("login")}
            error_message={errors?.login?.message}
            label="Login"
            placeholder="Login"
            forElement="login"
            name="login"
          />
          <Select
            forElement="permission"
            label="Permissão"
            {...register("role")}
            error_message={errors?.role?.message}
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </Select>
          <Input
            {...register("password")}
            error_message={errors?.password?.message}
            label="Senha"
            placeholder="senha"
            type="password"
            forElement="senha"
            name="password"
          />
          <DialogClose
            disabled={!isValid}
            type="submit"
            className="w-full bg-lime-500 rounded-xl font-semibold text-zinc-50 hover:bg-lime-600 hover:text-zinc-100 shadow-md p-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Salvar
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddUser;
