import * as yup from "yup";

const formSchema = yup.object().shape({
  nombre: yup.string().required("Nombre es requerido"),
  descripcion: yup.string().required("Descripción es requerida"),
  precio: yup.number().required("Precio es requerido").positive("El precio debe ser positivo"),
  fecha_creacion: yup.date().required("Fecha de creación es requerida"),
});

export default formSchema;