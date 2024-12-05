import { createSlice } from "@reduxjs/toolkit";

const ventas_data =
  localStorage.getItem("ventas-data") != null
    ? JSON.parse(localStorage.getItem("ventas-data"))
    : [];

export const ventasSlice = createSlice({
  name: "ventas",
  initialState: {
    rows: ventas_data,
  },
  reducers: {
    addVenta: (state, action) => {
      state.rows.push(action.payload);
      localStorage.setItem("ventas-data", JSON.stringify(state.rows));
    },
    deleteVenta: (state, action) => {
      let filteredRows = state.rows.filter((row) => row.id !== action.payload);
      state.rows = filteredRows;
      localStorage.setItem("ventas-data", JSON.stringify(state.rows));
    },
    editVenta: (state, action) => {
      const { id, producto_id, cantidad, total, fecha_venta } = action.payload;
      const currentVenta = state.rows.find((item) => item.id === id);
      if (currentVenta) {
        currentVenta.producto_id = producto_id;
        currentVenta.cantidad = cantidad;
        currentVenta.total = total;
        currentVenta.fecha_venta = fecha_venta;
      }
      localStorage.setItem("ventas-data", JSON.stringify(state.rows));
    },
  },
});

export default ventasSlice.reducer;
export const { addVenta, deleteVenta, editVenta } = ventasSlice.actions;