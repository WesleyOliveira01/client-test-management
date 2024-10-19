import LoginForm from "@/components/LoginForm";
import { UsersRound } from "lucide-react";
import Image from "next/image";

const App = () => {
  return (
    <div className="grid grid-cols-2 h-[100vh]">
      <div className="flex flex-col gap-2 justify-center items-center text-lime-500 ">
        <UsersRound size={100} />
        <LoginForm />
      </div>
      <div className="bg-lime-500 flex flex-col justify-center items-center">
        <Image src="/logo.svg" alt="users" width={200} height={200} />
      </div>
    </div>
  );
};

export default App;
