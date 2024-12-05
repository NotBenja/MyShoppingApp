import { createSlice } from "@reduxjs/toolkit";

const inventario_data =
  localStorage.getItem("inventario-data") != null
    ? JSON.parse(localStorage.getItem("inventario-data"))
    : [];

export const inventarioSlice = createSlice({
  name: "inventario",
  initialState: {
    rows: inventario_data,
  },
  reducers: {
    addInventario: (state, action) => {
      state.rows.push(action.payload);
      localStorage.setItem("inventario-data", JSON.stringify(state.rows));
    },
    deleteInventario: (state, action) => {
      let filteredRows = state.rows.filter((row) => row.id !== action.payload);
      state.rows = filteredRows;
      localStorage.setItem("inventario-data", JSON.stringify(state.rows));
    },
    editInventario: (state, action) => {
      const { id, producto_id, cantidad, ultima_actualizacion } = action.payload;
      const currentInventario = state.rows.find((item) => item.id === id);
      if (currentInventario) {
        currentInventario.producto_id = producto_id;
        currentInventario.cantidad = cantidad;
        currentInventario.ultima_actualizacion = ultima_actualizacion;
      }
      localStorage.setItem("inventario-data", JSON.stringify(state.rows));
    },
  },
});

export default inventarioSlice.reducer;
export const { addInventario, deleteInventario, editInventario } = inventarioSlice.actions;