import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosConfig";

export const fetchProducts = createAsyncThunk("productos/fetchProducts", async () => {
  const response = await axiosInstance.get("/products");
  return response.data.data; 
});

export const addProduct = createAsyncThunk("productos/addProduct", async (product) => {
  const response = await axiosInstance.post("/products", product); 
  return response.data.data;
});

export const updateProduct = createAsyncThunk("productos/updateProduct", async (product) => {
  const response = await axiosInstance.post("/products", product); 
  return response.data.data;
});

export const deleteProduct = createAsyncThunk("productos/deleteProduct", async (id) => {
  const response = await axiosInstance.put("/products", { id }); 
  return response.data.data;
});

const magic_table_data =
  localStorage.getItem("magic-table-data") != null
    ? JSON.parse(localStorage.getItem("magic-table-data"))
    : [];

export const tableSlice = createSlice({
  name: "crud-table",
  initialState: {
    rows: magic_table_data,
    status: 'idle',
    error: null
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.rows = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.rows.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.rows.findIndex((row) => row.id === action.payload.id);
        if (index !== -1) {
          state.rows[index] = action.payload;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.rows = state.rows.filter((row) => row.id !== action.payload.id);
      });
  }
});

export default tableSlice.reducer;
export const { addRows, deleteRows, editRows } = tableSlice.actions;