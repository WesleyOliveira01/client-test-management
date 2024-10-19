"use client";
import { login } from "@/actions/user/Login";
import { loginSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Input from "./ui/Input";

const LoginForm = () => {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setIsLoading(true);
    try {
      await login(formData);
      setError("");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="w-[70%] flex flex-col gap-2" onSubmit={handleSubmit}>
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
        disabled={!isValid || isLoading}
        className="bg-lime-500 w-full mt-3 text-white p-2 rounded-xl shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isLoading ? (
            <LoaderCircle className="animate-spin mx-auto" size={25} color="#ffffff" />
        ) : (
          "Entrar"
        )}
      </button>
    </form>
  );
};

export default LoginForm;
