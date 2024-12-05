import * as yup from "yup";

const inventarioFormSchema = yup
  .object({
    id: yup.string().required("ID is required!"),
    producto_id: yup.number().required("Product ID is required!"),
    cantidad: yup.number().required("Quantity is required!"),
    ultima_actualizacion: yup.date().required("Last update is required!"),
  })
  .required();

export default inventarioFormSchema;