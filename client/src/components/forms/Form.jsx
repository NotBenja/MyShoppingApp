import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { addRows, fetchProducts } from "features/tableSlice";
import formSchema from "utils/validations/form";
import toast from "react-hot-toast";
import SubmitButton from "../common/SubmitButton";
import TableContent from "./TableContent";
import axiosInstance from "../../axiosConfig";

const Form = () => {
  const rows = useSelector((state) => state.productos.rows);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, isValid, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful]);

  const submitHandler = async (data) => {
    const formattedData = {
      id: 0, 
      ...data,
      fecha_creacion: new Date(data.fecha_creacion).toISOString(),
    };

    try {
      await axiosInstance.post("/products", formattedData);
      toast.success("Producto agregado correctamente");
      window.location.reload();
    } catch (error) {
      toast.error("Error al agregar el producto");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="bg-blue-200 w-72 p-5 rounded-xl shadow-xl m-auto relative"
      >
        <label className="input input-bordered input-sm flex items-center gap-2 my-3">
          <input
            type="text"
            {...register("nombre")}
            className="grow"
            placeholder="Nombre"
          />
        </label>
        <label className="input input-bordered input-sm flex items-center gap-2 my-3">
          <input
            type="text"
            {...register("descripcion")}
            className="grow"
            placeholder="Descripción"
          />
        </label>
        <label className="input input-bordered input-sm flex items-center gap-2 my-3">
          <input
            type="number"
            step="0.01"
            {...register("precio")}
            className="grow"
            placeholder="Precio"
          />
        </label>
        <label className="input input-bordered input-sm flex items-center gap-2 my-3">
          <input
            type="date"
            {...register("fecha_creacion")}
            className="grow"
            placeholder="Fecha de creación"
          />
        </label>
        <SubmitButton
          title={"Agregar"}
          isDirty={isDirty}
          isValid={isValid}
          isSubmitting={isSubmitting}
        />
      </form>
      <TableContent />
    </>
  );
};

export default Form;