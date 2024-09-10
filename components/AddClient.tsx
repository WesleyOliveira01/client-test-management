"use client";
import { schema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import Input from "./ui/Input";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "./ui/dialog";
import { create } from "@/actions/mesh/Create";

const AddClient = ({ className }: { className?: string }) => {
  const {
    register,
    formState: { errors, isValid },
    control,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });
  return (
    <Dialog>
      <DialogTrigger
        type="submit"
        className={twMerge(
          "w-full p-2 bg-green-400 rounded-xl font-semibold text-zinc-50 hover:bg-green-500 hover:text-zinc-100 shadow-md",
          className
        )}
      >
        Novo
      </DialogTrigger>
      <DialogContent>
        <form action={create}>
          <Controller
            name="id_client"
            control={control}
            render={({ field }) => (
              <PatternFormat
                forElement="id_client"
                customInput={Input}
                format="#####"
                label="Id do client"
                error_message={errors?.id_client?.message}
                valueIsNumericString
                onValueChange={(value) => {
                  field.onChange(value.value);
                }}
              />
            )}
          />

          <Input
            error_message={errors?.name?.message}
            {...register("name")}
            forElement="name"
            label="Nome"
          />
          <Input
            error_message={errors?.prazo?.message}
            {...register("prazo")}
            type="date"
            forElement="prazo"
            label="Prazo"
          />
          <DialogClose
            type="submit"
            disabled={!isValid}
            className="w-full bg-sky-400 rounded-xl font-semibold text-zinc-50 hover:bg-sky-500 hover:text-zinc-100 shadow-md p-2"
          >
            Salvar
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddClient;
