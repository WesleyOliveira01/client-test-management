import { getUserDetails } from "@/actions/user/GetUserDetails";
import { logOut } from "@/actions/user/LogOut";
import { userStore } from "@/store/store";
import { BrainCircuit, Database, FolderCog, LogOut, Menu, UserCog } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const MenuBar = async () => {
  await getUserDetails();
  const { user } = userStore.getState();

  return (
    <Sheet>
      <SheetTrigger className="text-zinc-900 dark:text-zinc-100 hover:bg-transparent hover:scale-110">
        <Menu size={30} />
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader className="mb-5">
          <SheetDescription className="flex items-center justify-between text-xl font-semibold ">
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <h2 className="cursor-pointer">Olá {user.name}</h2>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem className="flex gap-1">
                    <UserCog size={20} />
                    <Link href={`/users/${user.id}`}>ver perfil</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <form action={logOut}>
                      <button
                        type="submit"
                        className="text-red-600 font-bold flex items-center gap-1"
                      >
                        <LogOut size={20} /> Sair
                      </button>
                    </form>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </SheetDescription>
        </SheetHeader>
        <section>
          <ul className="flex flex-col gap-5 m-2 font-semibold">
            {user.role == "ADMIN" && (
              <li className="transition duration-150 hover:text-zinc-400 cursor-pointer flex items-center gap-1">
                <UserCog size={20} />
                <Link href="/users">Gerenciamento de Usuarios</Link>
              </li>
            )}
            <li className="transition duration-150 hover:text-zinc-400 cursor-pointer flex items-center gap-1">
              <FolderCog size={20} />
              <Link href="/home">Gerenciamento de Mesh</Link>
            </li>
            <li className="transition duration-150 hover:text-zinc-400 cursor-pointer flex items-center gap-1">
              <BrainCircuit size={20} />
              <Link href="/gerarOS">Gerador de OS</Link>
            </li>
          </ul>
        </section>
      </SheetContent>
    </Sheet>
  );
};

export default MenuBar;
