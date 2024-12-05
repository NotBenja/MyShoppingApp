import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { addInventario } from "features/inventarioSlice";
import formSchema from "utils/validations/inventarioForm";
import toast from "react-hot-toast";
import { hasDuplicateValues } from "../../utils/hasDuplicateValues";
import SubmitButton from "../common/SubmitButton";
import TableContent from "./InventarioTableContent";

const InventarioForm = () => {
  const rows = useSelector((state) => state.inventario.rows);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, isValid, isSubmitting, isSubmitSuccessful },
    setValue,
  } = useForm({
    resolver: yupResolver(formSchema),
  });
  useEffect(() => {
    reset();
  }, [isSubmitSuccessful]);
  const submitHandler = (data) => {
    if (hasDuplicateValues([...rows, { id: data.id }], "id")) {
      toast.error("Duplicate ID! Please choose a different ID.");
      return;
    }
    const formattedData = {
      ...data,
      ultima_actualizacion: new Date(data.ultima_actualizacion).toISOString(),
    };
    dispatch(addInventario(formattedData));
    reset();
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
            {...register("id")}
            className="grow"
            placeholder="ID"
          />
        </label>
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
          title={"Add"}
          isDirty={isDirty}
          isValid={isValid}
          isSubmitting={isSubmitting}
        />
      </form>
      <TableContent />
    </>
  );
};

export default InventarioForm;