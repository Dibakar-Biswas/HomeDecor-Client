import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const Decorator = () => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const handleDecoratorApplication = data => {
    console.log(data);
    axiosSecure.post('/decorators', data)
    .then(res => {
        if(res.data.insertedId){
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your application has been submitted. Please wait",
                showConfirmButton: false,
                timer: 2000
            })
        }
    })
  }

  return (
    <div>
      <h2 className="text-3xl text-primary font-bold text-center">Become a Decorator</h2>
      <form
        onSubmit={handleSubmit(handleDecoratorApplication)}
        className="mt-12 px-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-8">
          <fieldset className="fieldset">
            <label className="label">Decorator Name</label>
            <input
              type="text"
              {...register("decoratorName")}
              defaultValue={user?.displayName}
              className="input w-full"
              placeholder="Decorator Name"
            />
          </fieldset>
          <div>
            <label className="label">Decorator Email</label>
            <input
              type="text"
              {...register("decoratorEmail")}
              defaultValue={user?.email}
              className="input w-full"
              placeholder="Decorator Email"
            />
          </div>
        </div>

        <input
          type="submit"
          className="btn btn-primary "
          value="Be a Decorator"
        />
      </form>
    </div>
  );
};

export default Decorator;
