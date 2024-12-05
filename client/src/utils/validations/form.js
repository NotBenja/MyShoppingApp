import * as yup from "yup";

const formSchema = yup
  .object({
    id: yup.string().required("ID is required!"),
    nombre: yup.string().trim().required("Name is required!"),
    descripcion: yup.string().trim().required("Description is required!"),
    precio: yup.number().required("Price is required!"),
    fecha_creacion: yup.date().required("Creation date is required!"),
  })
  .required();

export default formSchema;
