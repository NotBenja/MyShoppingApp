import { createSlice } from "@reduxjs/toolkit";

const magic_table_data =
  localStorage.getItem("magic-table-data") != null
    ? JSON.parse(localStorage.getItem("magic-table-data"))
    : [];

export const tableSlice = createSlice({
  name: "crud-table",
  initialState: {
    rows: magic_table_data,
  },
  reducers: {
    addRows: (state, action) => {
      state.rows.push(action.payload);
      localStorage.setItem("magic-table-data", JSON.stringify(state.rows));
    },
    deleteRows: (state, action) => {
      let filteredRows = state.rows.filter((row) => row.id !== action.payload);
      state.rows = filteredRows;
      localStorage.setItem("magic-table-data", JSON.stringify(state.rows));
    },
    editRows: (state, action) => {
      const { id, nombre, descripcion, precio, fecha_creacion } = action.payload;
      const currentTodo = state.rows.find((item) => item.id === id);
      if (currentTodo) {
        currentTodo.nombre = nombre;
        currentTodo.descripcion = descripcion;
        currentTodo.precio = precio;
        currentTodo.fecha_creacion = fecha_creacion;
      }
      localStorage.setItem("magic-table-data", JSON.stringify(state.rows));
    },
  },
});

export default tableSlice.reducer;
export const { addRows, deleteRows, editRows } = tableSlice.actions;