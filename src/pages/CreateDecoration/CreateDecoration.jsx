import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import axios from "axios";

const CreateDecoration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const image_hosting_key = import.meta.env.VITE_image_host_key;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const handleDecoration = async (data) => {
    try {
      const imageFile = { image: data.image[0] };
      const res = await axios.post(image_hosting_api, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        const imageUrl = res.data.data.display_url;

        const decorationData = {
          serviceName: data.serviceName,
          cost: parseFloat(data.cost),
          unit: parseInt(data.unit),
          category: data.serviceCategory,
          adminEmail: data.adminEmail,
          description: data.description,
          image: imageUrl,
          decorationStatus: "available",
          createdAt: new Date(),
        };

        Swal.fire({
          title: "Are you sure?",
          text: `You are creating a service for ${decorationData.cost} BDT`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, create it!",
        }).then(async (result) => {
          if (result.isConfirmed) {
            const dbRes = await axiosSecure.post(
              "/decorations",
              decorationData
            );

            if (dbRes.data.insertedId) {
              Swal.fire({
                title: "Created!",
                text: "Your decoration service has been added.",
                icon: "success",
              });
              navigate("/dashboard/my-decorations");
            }
          }
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong during image upload or saving.",
        icon: "error",
      });
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-center text-primary mb-4">Create Decoration Service</h2>

      <form
        onSubmit={handleSubmit(handleDecoration)}
        className="mt-6 text-black bg-base-200 p-8 rounded-xl shadow-lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <fieldset className="fieldset">
            <label className="label font-bold">Service Name</label>
            <input
              type="text"
              {...register("serviceName", { required: true })}
              className="input input-bordered w-full"
              placeholder="e.g. Luxury Wedding Stage"
            />
            {errors.serviceName && (
              <span className="text-red-500 text-sm">Name is required</span>
            )}
          </fieldset>

          <fieldset className="fieldset">
            <label className="label font-bold">Service Image</label>
            <input
              type="file"
              {...register("image", { required: true })}
              className="file-input file-input-bordered file-input-primary w-full"
            />
            {errors.image && (
              <span className="text-red-500 text-sm">Image is required</span>
            )}
          </fieldset>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
         
          <fieldset className="fieldset">
            <label className="label font-bold">Cost (BDT)</label>
            <input
              type="number"
              {...register("cost", {
                required: "Cost is required",
                min: {
                  value: 70,
                  message: "Minimum cost must be 70 BDT",
                },
              })}
              className="input input-bordered w-full"
              placeholder="Amount"
            />
            {errors.cost && (
              <span className="text-red-500 text-sm">
                {errors.cost.message}
              </span>
            )}
          </fieldset>

          <fieldset className="fieldset">
            <label className="label font-bold">Service Category</label>
            <select
              defaultValue=""
              className="select select-bordered w-full"
              {...register("serviceCategory", { required: true })}
            >
              <option value="" disabled>
                Pick a Category
              </option>
              <option value="Home">Home Decoration</option>
              <option value="Wedding">Wedding</option>
              <option value="Birthday">Birthday</option>
              <option value="Office">Corporate/Office</option>
              <option value="Seminar">Seminar</option>
            </select>
            {errors.serviceCategory && (
              <span className="text-red-500 text-sm">Category is required</span>
            )}
          </fieldset>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <fieldset className="fieldset">
            <label className="label font-bold">Unit-per sqrt-ft</label>
            <input
              type="number"
              {...register("unit", { required: true })}
              className="input input-bordered w-full"
              placeholder="e.g. 1"
            />
            {errors.unit && (
              <span className="text-red-500 text-sm">Unit is required</span>
            )}
          </fieldset>

          <fieldset className="fieldset">
            <label className="label font-bold">Admin Email</label>
            <input
              type="text"
              {...register("adminEmail")}
              defaultValue={user?.email}
              readOnly
              className="input input-bordered w-full bg-gray-200"
            />
          </fieldset>
        </div>

        <div className="mb-6">
          <label className="label font-bold">Description</label>
          <textarea
            {...register("description", { required: true })}
            placeholder="Detailed description of the service..."
            className="textarea textarea-bordered h-24 w-full"
          ></textarea>
          {errors.description && (
            <span className="text-red-500 text-sm">
              Description is required
            </span>
          )}
        </div>

        <input
          type="submit"
          className="btn btn-primary w-full text-white font-bold text-lg"
          value="Create Service"
        />
      </form>
    </div>
  );
};

export default CreateDecoration;
