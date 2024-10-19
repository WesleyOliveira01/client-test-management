"use client";
import { getData } from "@/actions/extractData/getData";
import Container from "@/components/ui/Container";
import { useToast } from "@/hooks/use-toast";
import { CloudUpload, Copy, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const ExtractData = () => {
  const [image, setImage] = useState(null);
  const [base64Image, setBase64Image] = useState<string>("");
  const [data, setData] = useState<string>();

  const { toast } = useToast();
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setBase64Image(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImage(null);
    setBase64Image("");
  };

  const copyOs = () => {
    toast({
      title: "Copiado!",
      description:
        "A ordem de serviço foi copiada para a área de transferência",
    });
    navigator.clipboard.writeText(data);
  };

  return (
    <Container>
      <div className="w-[70%] mx-auto mt-3 mb-5 leading-7">
        <h1 className="text-lime-500 font-semibold text-2xl">
          Gerador de ordem de serviço
        </h1>
        <h2 className="text-lime-500 font-semibold text-xl">Instruções</h2>
        <p className="font-semibold w-[50%]">
          Tire um print do trecho da conversa onde há uma explicação do problema
          do cliente e anexe abaixo
        </p>
      </div>

      <label
        htmlFor="file"
        className="flex justify-center w-[70%] h-[20vh] mx-auto p-2 border-2 border-dashed rounded-lg border-zinc-400 text-zinc-400 font-semibold text-2xl cursor-pointer"
      >
        <span className="flex items-center justify-center gap-2 font-semibold">
          <CloudUpload size={25} />
          Selecione o arquivo
        </span>
        <input
          id="file"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

      {image && (
        <div className="mt-4 text-center w-[70%] mx-auto">
          <h1 className="text-2xl text-lime-500 font-semibold mb-4">
            Arquivo selecionado
          </h1>
          <div className="flex bg-zinc-300 text-zinc-500 font-semibold px-4 py-2 items-center rounded-lg justify-between">
            <section className="flex gap-2 items-center w-[70%]">
              <Image
                src={base64Image}
                alt="Preview"
                className="w-[10%] max-h-[70px] object-contain"
                width={100}
                height={100}
              />
              <p>{image.name}</p>
            </section>
            <button
              className="font-bold hover:text-red-500 transition duration-150"
              onClick={() => removeImage()}
            >
              <X size={25} />
            </button>
          </div>
        </div>
      )}

      <div className="w-full flex items-center justify-center">
        <form
          action={async () => {
            const _data = await getData(base64Image);
            setData(_data);
          }}
          className="w-[70%]"
        >
          <button
            disabled={!image}
            className="w-full my-2 p-2 rounded-xl font-semibold bg-lime-500 text-zinc-50 disabled:opacity-50"
            type="submit"
          >
            Gerar Ordem de Serviço
          </button>
        </form>
      </div>
      {data && (
        <section className="w-[70%] mx-auto ">
          <h1 className="text-lime-500 text-xl font-semibold mb-3">
            Resultado:
          </h1>
          <div className="font-semibold rounded-xl bg-zinc-300 text-zinc-600 p-3">
            <button onClick={copyOs} className="">
              <Copy size={20} />
            </button>
            <p>{data}</p>
          </div>
        </section>
      )}
    </Container>
  );
};

export default ExtractData;
