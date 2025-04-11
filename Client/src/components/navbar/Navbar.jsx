import Menu from "./Menu";
import Theme from "./Theme";

const Navbar = () => {
  return (
    <section className="py-3 border-b">
      <div className="flex items-center justify-between maincontainer">
        <div className="">
          <Menu />
        </div>
        <Theme />
      </div>
    </section>
  );
};

export default Navbar;
