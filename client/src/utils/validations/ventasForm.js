import * as yup from "yup";

const ventasFormSchema = yup
  .object({
    id: yup.string().required("ID is required!"),
    producto_id: yup.number().required("Product ID is required!"),
    cantidad: yup.number().required("Quantity is required!"),
    total: yup.number().required("Total is required!"),
    fecha_venta: yup.date().required("Sale date is required!"),
  })
  .required();

export default ventasFormSchema;