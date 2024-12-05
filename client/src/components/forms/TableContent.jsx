import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, fetchProducts } from "features/tableSlice";
import EditModal from "../EditModal";
import edit from "assets/pencil.svg";
import trash from "assets/trash.svg";

const TableContent = () => {
  const [currentRow, setCurrentRow] = useState(null);
  const rows = useSelector((state) => state.productos.rows);
  const dispatch = useDispatch();
  const modalRef = useRef(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const deleteHandler = async (id) => {
    try {
      await dispatch(deleteProduct(id));
      window.location.reload(); 
    } catch (error) {
      console.error("Error al eliminar el producto", error);
    }
  };

  const editHandler = (id) => {
    const selectedRow = rows.find((item) => item?.id === id);
    setCurrentRow(selectedRow);
    modalRef.current.showModal();
  };

  if (rows?.length) {
    return (
      <div className="overflow-x-auto mx-auto mt-14 mb-24 max-w-[800px] rounded-2xl shadow-2xl">
        <div className="tbl-header">
          <table cellPadding="0" cellSpacing="0" border="0">
            <thead className="bg-blue-200 ">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Fecha de creación</th>
                <th>Acciones</th>
              </tr>
            </thead>
          </table>
        </div>

        <div className="tbl-content">
          <table cellPadding="0" cellSpacing="0" border="0">
            <tbody>
              {rows?.map((row) => (
                <tr key={row?.id} className="even">
                  <td className="text-gray-500">{row?.id}</td>
                  <td>{row?.nombre}</td>
                  <td>{row?.descripcion}</td>
                  <td>{row?.precio}</td>
                  <td>{row?.fecha_creacion ? new Date(row?.fecha_creacion).toLocaleDateString() : "Fecha inválida"}</td>
                  <td>
                    <span
                      onClick={() => editHandler(row?.id)}
                      className="btn btn-sm btn-circle btn-ghost"
                    >
                      <img src={edit} alt="edit" />
                    </span>

                    <span
                      onClick={() => deleteHandler(row?.id)}
                      className="btn btn-sm btn-circle btn-ghost"
                    >
                      <img src={trash} alt="trash" />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <dialog ref={modalRef} className="rounded-xl p-5 max-w-md w-full">
          <EditModal currentRow={currentRow} />
          <button onClick={() => modalRef.current.close()} className="btn btn-secondary mt-3 w-full">
            Cerrar
          </button>
        </dialog>
      </div>
    );
  }
  return null;
};

export default TableContent;