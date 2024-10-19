"use server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const getData = async (base64Image: string) => {
  const image = base64Image.split(",")[1];
  const imagePart = {
    inlineData: {
      data: image,
      mimeType: "image/*",
    },
  };
  const prompt =
    "Escreva o conteudo  de uma ordem de serviço de forma resumida com nada em negrito no texto informando o problema e os procedimento que o técnico deve fazer com base no que lê na imagem. obs: se na imagem não tiver o conteudo de uma mensagem informe que não há conteudo para gerar a ordem de serviço";
  const result = await model.generateContent([prompt, imagePart]);
  return result.response.text();
};
