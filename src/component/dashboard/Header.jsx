import BreadCrumb from "./BreadCrumb";
import BurgerMenu from "./BurgerMenu";
import AuthStatus from "../AuthStatus";

const Header = () => {
  return (
    <nav
      className="relative flex flex-wrap items-center justify-between px-0 py-2 transition-all ease-in shadow-none duration-250 rounded-2xl lg:flex-nowrap lg:justify-start"
      navbar-main=""
      navbar-scroll="false"
    >
      <div className="flex items-center justify-between w-full py-1 mx-auto flex-wrap-inherit">
        <BreadCrumb />
        <div className="flex items-center lg:flex lg:basis-auto justify-between">
          <ul className="flex flex-row justify-end gap-x-3 list-none md-max:w-full">
            <li className="flex items-center gap-x-3.5">
              <AuthStatus />
            </li>
            <li className="flex items-center xl:hidden">
              <BurgerMenu />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
