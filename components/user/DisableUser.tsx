import { DisableUser } from "@/actions/user/DisableUser";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

const Disable = ({ id }: { id: number }) => {
  const submit = async () => {
    "use server";
    await DisableUser(id);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger>Desativar</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          Tem certeza que deseja desativar este usuário?
        </AlertDialogHeader>
        <AlertDialogDescription>
          Essa ação não pode ser desfeita.
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction>
            <form action={submit}>
              <button type="submit">Desabilitar</button>
            </form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Disable;
