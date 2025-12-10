import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";

const CreateDecoration = () => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();
  const navigate = useNavigate()

  const axiosSecure = useAxiosSecure();

  const { user } = useAuth();

  const handleDecoration = (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are creating a decoration with a cost of ${data.cost} Taka`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, create it!",
    }).then((result) => {
      if (result.isConfirmed) {

        // save the decoration info to the database
        axiosSecure.post('/decorations', data)
        .then(res => {
            console.log('after creating decoration', res.data);
            if(res.data.insertedId){
                navigate('/dashboard/my-decorations')
            }
        })
        // console.log("Form Submitted:", data);

        // Swal.fire({
        //   title: "Created!",
        //   text: "Your decoration has been created.",
        //   icon: "success",
        // });
      }
    });
  };
  return (
    <div>
      <h2 className="text-3xl font-bold">Create Decoration</h2>
      <form
        onSubmit={handleSubmit(handleDecoration)}
        className="mt-12 text-black"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-8">
          <fieldset className="fieldset">
            <label className="label">Service Name</label>
            <input
              type="text"
              {...register("serviceName")}
              className="input w-full"
              placeholder="Service Name"
            />
          </fieldset>
          <fieldset className="fieldset">
            <label className="label">Cost</label>
            <input
              type="number"
              {...register("cost")}
              className="input w-full"
              placeholder="Cost"
            />
          </fieldset>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-8">
          <fieldset className="fieldset">
            <label className="label">Unit</label>
            <input
              type="number"
              {...register("unit")}
              className="input w-full"
              placeholder="Unit"
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Service Category</legend>
            <select
              defaultValue="Pick a browser"
              className="select"
              {...register("serviceCategory")}
            >
              <option disabled={true}>Pick a Service Category</option>
              <option>Home</option>
              <option>Wedding</option>
              <option>Office</option>
              <option>Seminar</option>
              <option>Meeting</option>
            </select>
          </fieldset>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-8">
          <div>
            <label className="label">Admin Email</label>
          <input
            type="text"
            {...register("adminEmail")}
            defaultValue={user?.email}
            className="input w-full"
            placeholder="Admin Email"
          />
          </div>
          <div>
            <label className="label mt-4">Description</label>
          <textarea
            placeholder="Description"
            {...register("description")}
            className="textarea textarea-primary w-full mb-2"
          ></textarea>
          </div>
        </div>

        <input
          type="submit"
          className="btn btn-primary text-black"
          value="Create Decoration"
        />
      </form>
    </div>
  );
};

export default CreateDecoration;
