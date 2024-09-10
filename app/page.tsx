import LoginForm from "@/components/LoginForm";
import Image from "next/image";

const App = () => {
  return (
    <div className="grid grid-cols-2 h-[100vh]">
      <div className="flex flex-col gap-2 justify-center items-center">
        <Image src="/users.svg" alt="users" width={100} height={100} />
        <LoginForm />
      </div>
      <div className="bg-sky-500 flex flex-col justify-center items-center">
        <Image src="/logo.svg" alt="users" width={200} height={200} />
      </div>
    </div>
  );
};

export default App;
