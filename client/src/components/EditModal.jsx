import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editRows } from "features/tableSlice";
import edit from "assets/pencilSquare.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import editSchema from "utils/validations/form";
import toast from "react-hot-toast";

const EditModal = ({ currentRow }) => {
  const rows = useSelector((state) => state.rows);
  const {
    register,
    getValues,
    handleSubmit,
    formState: { isDirty, isValid, isSubmitting },
    setValue,
  } = useForm({
    resolver: yupResolver(editSchema),
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (currentRow && currentRow.length > 0) {
      const { id, nombre, descripcion, precio, fecha_creacion } = currentRow[0];
      setValue("id", id);
      setValue("nombre", nombre);
      setValue("descripcion", descripcion);
      setValue("precio", precio);
      setValue("fecha_creacion", new Date(fecha_creacion).toISOString().split('T')[0]);
    }
  }, [currentRow]);
  const submitHandler = () => {
    if (currentRow) {
      const { id } = currentRow[0];
      let nombre = getValues("nombre");
      let descripcion = getValues("descripcion");
      let precio = +getValues("precio");
      let fecha_creacion = getValues("fecha_creacion");
      dispatch(editRows({ id, nombre, descripcion, precio, fecha_creacion }));
      document.getElementById("my_modal_1").close();
    }
  };
  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <div className="flex gap-2 items-center">
          <h3 className="font-bold text-lg">Edit</h3>
          <img src={edit} alt="edit" />
        </div>
        <p>Press ESC key or click the button below to close</p>
        <div className="modal-action">
          <form method="dialog" className="m-auto">
            <div className="flex flex-col m-auto">
              <label className="input input-bordered input-sm flex items-center gap-2 my-3">
                <input
                  placeholder="ID"
                  type="number"
                  className="grow"
                  {...register("id")}
                  disabled
                />
              </label>
              <label className="input input-bordered input-sm flex items-center gap-2 my-3">
                <input
                  placeholder="Name"
                  type="text"
                  className="grow"
                  {...register("nombre")}
                />
              </label>
              <label className="input input-bordered input-sm flex items-center gap-2 my-3">
                <input
                  placeholder="Description"
                  type="text"
                  className="grow"
                  {...register("descripcion")}
                />
              </label>
              <label className="input input-bordered input-sm flex items-center gap-2 my-3">
                <input
                  placeholder="Price"
                  type="number"
                  className="grow"
                  {...register("precio")}
                />
              </label>
              <label className="input input-bordered input-sm flex items-center gap-2 my-3">
                <input
                  placeholder="Creation Date"
                  type="date"
                  className="grow"
                  {...register("fecha_creacion")}
                />
              </label>
            </div>
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 hover:bg-red-500 hover:text-white">
              ✕
            </button>
            <button
              disabled={!isDirty || !isValid || isSubmitting}
              className="btn btn-wide btn-sm btn-primary"
              onClick={handleSubmit(submitHandler)}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default EditModal;
