import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-200 py-3 mb-14">
      <div className="flex gap-9 ml-5">
        <h1 className="text-2xl">MyShoppingApp</h1>
        <Link to={"/"}>Productos</Link>
        <Link to={"/ventas"}>Ventas</Link>
        <Link to={"/inventario"}>Inventario</Link>
      </div>
    </header>
  );
};

export default Header;
