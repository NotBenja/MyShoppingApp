import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateProduct } from "features/tableSlice";
import editSchema from "utils/validations/edit";
import axiosInstance from "../axiosConfig";
import toast from "react-hot-toast";

const EditModal = ({ currentRow }) => {
  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid, isSubmitting },
    setValue,
  } = useForm({
    resolver: yupResolver(editSchema),
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentRow) {
      setValue("id", currentRow.id);
      setValue("nombre", currentRow.nombre);
      setValue("descripcion", currentRow.descripcion);
      setValue("precio", currentRow.precio);
      setValue("fecha_creacion", currentRow.fecha_creacion.split("T")[0]); 
    }
  }, [currentRow, setValue]);

  const submitHandler = async (data) => {
    const formattedData = {
      ...data,
      fecha_creacion: new Date(data.fecha_creacion).toISOString(),
    };

    try {
      await axiosInstance.post("/products", formattedData);
      dispatch(updateProduct(formattedData));
      toast.success("Producto actualizado correctamente");
      window.location.reload(); 
    } catch (error) {
      toast.error("Error al actualizar el producto");
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="bg-blue-200 w-full max-w-md p-5 rounded-xl shadow-xl m-auto relative">
      <label className="input input-bordered input-sm flex items-center gap-2 my-3">
        ID:
        <input type="text" {...register("id")} disabled className="grow input input-bordered input-sm" />
      </label>
      <label className="input input-bordered input-sm flex items-center gap-2 my-3">
        Nombre:
        <input type="text" {...register("nombre")} className="grow input input-bordered input-sm" />
      </label>
      <label className="input input-bordered input-sm flex items-center gap-2 my-3">
        Descripción:
        <input type="text" {...register("descripcion")} className="grow input input-bordered input-sm" />
      </label>
      <label className="input input-bordered input-sm flex items-center gap-2 my-3">
        Precio:
        <input type="number" step="0.01" {...register("precio")} className="grow input input-bordered input-sm" />
      </label>
      <label className="input input-bordered input-sm flex items-center gap-2 my-3">
        Fecha de creación:
        <input type="date" {...register("fecha_creacion")} className="grow input input-bordered input-sm" />
      </label>
      <button type="submit" disabled={!isDirty || !isValid || isSubmitting} className="btn btn-primary w-full">
        Actualizar
      </button>
    </form>
  );
};

export default EditModal;