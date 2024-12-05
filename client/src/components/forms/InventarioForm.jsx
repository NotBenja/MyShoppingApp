import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { addInventario, fetchInventario } from "features/inventarioSlice";
import inventarioFormSchema from "utils/validations/inventarioForm";
import toast from "react-hot-toast";
import SubmitButton from "../common/SubmitButton";
import InventarioTableContent from "./InventarioTableContent";
import axiosInstance from "../../axiosConfig";

const InventarioForm = () => {
  const rows = useSelector((state) => state.inventario.rows);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, isValid, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(inventarioFormSchema),
  });

  useEffect(() => {
    dispatch(fetchInventario());
  }, [dispatch]);

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful]);

  const submitHandler = async (data) => {
    const formattedData = {
      id: 0, 
      ...data,
      ultima_actualizacion: new Date(data.ultima_actualizacion).toISOString(),
    };

    try {
      await axiosInstance.post("/inventory", formattedData);
      toast.success("Inventario agregado correctamente");
      window.location.reload();
    } catch (error) {
      toast.error("Error al agregar el inventario");
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
            type="number"
            {...register("producto_id")}
            className="grow"
            placeholder="Product ID"
          />
        </label>
        <label className="input input-bordered input-sm flex items-center gap-2 my-3">
          <input
            type="number"
            {...register("cantidad")}
            className="grow"
            placeholder="Quantity"
          />
        </label>
        <label className="input input-bordered input-sm flex items-center gap-2 my-3">
          <input
            type="date"
            {...register("ultima_actualizacion")}
            className="grow"
            placeholder="Last Update"
          />
        </label>
        <SubmitButton
          title={"Agregar"}
          isDirty={isDirty}
          isValid={isValid}
          isSubmitting={isSubmitting}
        />
      </form>
      <InventarioTableContent />
    </>
  );
};

export default InventarioForm;