import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const location = useLocation();

  const getTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Productos";
      case "/ventas":
        return "Ventas";
      case "/inventario":
        return "Inventario";
      default:
        return "";
    }
  };

  return (
    <>
      <Header />
      <h2 className="text-center text-xl mt-2">Tabla {getTitle()}</h2>
      {children}
      <Footer />
    </>
  );
};

export default Layout;
