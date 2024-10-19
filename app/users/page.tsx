import { getAllUsers } from "@/actions/user/GetAllUsers";
import { AlertDialogFooter, AlertDialogHeader } from "@/components/ui/alert-dialog";
import Container from "@/components/ui/Container";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import AddUser from "@/components/user/AddUser";
import Disable from "@/components/user/DisableUser";
import EditUser from "@/components/user/EditUser";
import { userStore } from "@/store/store";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { TabsTrigger } from "@radix-ui/react-tabs";

const Users = async () => {
  await getAllUsers();
  const _user = userStore.getState().user;
  const { users } = userStore.getState();
  const formatRole = (role: string) => {
    if (role === "ADMIN") {
      return "Administrador";
    }
    return "Usuário";
  };
  const formatActive = (active: boolean) => {
    if(active) return "Sim"
    return "Não"
  }
  return (
    <Container>
      <header className="flex flex-col gap-4 p-2">
        <h1 className="text-3xl font-semibold text-lime-500">
          Lista de Usuários
        </h1>
        <div className="w-full flex justify-end">
          <AddUser />
        </div>
      </header>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Login</TableHead>
            <TableHead>Permissão</TableHead>
            <TableHead>Ativo</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              className={!user.enabled ? "opacity-50 cursor-not-allowed" : ""}
            >
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.login}</TableCell>
              <TableCell>{formatRole(user.role)}</TableCell>
              <TableCell>{user.enabled ? "Sim" : "Não"}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger
                    disabled={user?.id === _user?.id}
                    className="disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Detalhes
                  </DialogTrigger>
                  <DialogContent>
                    <Tabs defaultValue="details" className="w-full">
                      <TabsList className="grid w-full grid-cols-2 my-3">
                        <TabsTrigger value="details">Detalhes</TabsTrigger>
                        <TabsTrigger value="edit">Editar</TabsTrigger>
                      </TabsList>
                      <TabsContent value="details">
                        <h1 className="text-lime-500 font-semibold text-3xl text-center m-3">
                          Detalhes do usuario
                        </h1>
                        <ul className="flex flex-col gap-3">
                          <li>Id: {user.id}</li>
                          <li>Nome: {user.name}</li>
                          <li>Login: {user.login}</li>
                          <li>Permissão: {user.role.toLowerCase()}</li>
                        </ul>
                        
                        <Disable id={user.id} />
                      </TabsContent>
                      <TabsContent value="edit">
                        <EditUser user={user} />
                      </TabsContent>
                    </Tabs>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default Users;
