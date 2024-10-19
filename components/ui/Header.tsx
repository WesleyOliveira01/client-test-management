import { getUserDetails } from "@/actions/user/GetUserDetails";
import MenuBar from "../Menu";
import { ModeToggle } from "./ToogleTheme";

const Header = async () => {
  
  return (
    <header className="p-3 bg-lime-500 flex justify-between items-center">
      <MenuBar/>
      <ModeToggle />
    </header>
  );
};

export default Header;
