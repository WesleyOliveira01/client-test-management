"use client";
import { login } from "@/actions/user/Login";
import { loginSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Input from "./ui/Input";
import Loading from "@/app/loading";

const LoginForm = () => {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });
  return (
    <form
      className="w-[90%]"
      action={async (formData: FormData) => {
        try {
          setIsLoading(true);
          await login(formData);
          setIsLoading(false);
          setError("");
        } catch (error: any) {
          setIsLoading(false);
          setError(error.message);
        }
      }}
    >
      <Input
        {...register("login")}
        forElement="login"
        label="Login"
        error_message={errors.login?.message}
      />
      <Input
        {...register("password")}
        type="password"
        forElement="senha"
        label="Senha"
        error_message={errors.password?.message}
      />
      {error && (
        <p className="text-red-500 m-2 text-center font-semibold">{error}</p>
      )}
      <button
        disabled={!isValid}
        className="bg-sky-500 w-full text-white p-2 rounded-xl shadow-md"
      >
        {isLoading && <Loading />}
        Entrar
      </button>
    </form>
  );
};

export default LoginForm;
