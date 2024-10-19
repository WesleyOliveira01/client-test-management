"use client";
import { userSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Input from "../ui/Input";
import Select from "../ui/Select";

const EditUser = ({ user }: { user: Projeto.User }) => {
  const {
    register,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });
  return (
    <>
      <h1 className="text-lime-500 font-semibold text-3xl text-center m-3">
        Editar usuario
      </h1>
      <form action="">
        <Input
          {...register("name")}
          defaultValue={user.name}
          error_message={errors?.name?.message}
          label="Nome"
          placeholder="Nome"
          forElement="nome"
        />
        <Input
          {...register("login")}
          defaultValue={user.login}
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
          value={user.role}
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
        <button
          disabled={!isValid}
          type="submit"
          className="w-full bg-lime-500 rounded-xl font-semibold text-zinc-50 hover:bg-lime-600 hover:text-zinc-100 shadow-md p-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Salvar
        </button>
      </form>
    </>
  );
};

export default EditUser;
