import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteVenta } from "features/ventasSlice";
import EditModal from "../EditModal";
import edit from "assets/pencil.svg";
import trash from "assets/trash.svg";

const VentasTableContent = () => {
  const [currentRow, setCurrentRow] = useState(null);
  const rows = useSelector((state) => state.ventas.rows);
  const dispatch = useDispatch();
  const deleteHandler = (id) => dispatch(deleteVenta(id));
  const editHandler = (id) => {
    document.getElementById("my_modal_1").showModal();
    let selectedRow = rows.filter((item) => item?.id === id);
    setCurrentRow(selectedRow);
  };
  if (rows.length) {
    return (
      <div className="overflow-x-auto mx-auto mt-14 mb-24 max-w-[800px] rounded-2xl shadow-2xl">
        <div className="tbl-header">
          <table cellPadding="0" cellSpacing="0" border="0">
            <thead className="bg-blue-200 ">
              <tr>
                <th>ID</th>
                <th>Product ID</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Sale Date</th>
                <th>Actions</th>
              </tr>
            </thead>
          </table>
        </div>

        <div className="tbl-content">
          <table cellPadding="0" cellSpacing="0" border="0">
            <tbody>
              {rows?.map((row, index) => (
                <tr key={row?.id} className={index % 2 === 0 ? "even" : "odd"}>
                  <td className="text-gray-500">{row?.id}</td>
                  <td>{row?.producto_id}</td>
                  <td>{row?.cantidad}</td>
                  <td>{row?.total}</td>
                  <td>{new Date(row?.fecha_venta).toLocaleDateString()}</td>
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

        <EditModal currentRow={currentRow} />
      </div>
    );
  }
};

export default VentasTableContent;