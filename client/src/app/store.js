import { configureStore } from "@reduxjs/toolkit";
// reducers
import tableReducer from "features/tableSlice";
import ventasReducer from "features/ventasSlice";
import inventarioReducer from "features/inventarioSlice";

export const store = configureStore({
  reducer: {
    productos: tableReducer,
    ventas: ventasReducer,
    inventario: inventarioReducer,
  },
});