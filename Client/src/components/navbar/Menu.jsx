import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Link } from "react-router";

const Menu = () => {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger asChild>
          <Link to="/">Home</Link>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer">New Employees</MenubarTrigger>
        <MenubarContent>
          <MenubarSub>
            <MenubarSubTrigger className="cursor-pointer">
              Function
            </MenubarSubTrigger>
            <MenubarSubContent>
              <Link to="/employee/create">
                <MenubarItem className="cursor-pointer">Register</MenubarItem>
              </Link>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <Link to="/employee/newemployees">
            <MenubarItem className="cursor-pointer">Table</MenubarItem>
          </Link>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer">Employees</MenubarTrigger>
        <MenubarContent>
          <Link to="/employee/employees">
            <MenubarItem className="cursor-pointer">
              Table <MenubarShortcut>⌘N</MenubarShortcut>
            </MenubarItem>
          </Link>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer">Salary</MenubarTrigger>
        <MenubarContent>
          <MenubarSub>
            <MenubarSubTrigger className="cursor-pointer">
              Function
            </MenubarSubTrigger>
            <MenubarSubContent>
              <Link to="/salary/addsalary">
                <MenubarItem className="cursor-pointer">Add Salary</MenubarItem>
              </Link>
              <Link to="/salary/calsalary">
                <MenubarItem className="cursor-pointer">Calsalary</MenubarItem>
              </Link>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <Link to="/salary/salarys">
            <MenubarItem className="cursor-pointer">Table</MenubarItem>
          </Link>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default Menu;
