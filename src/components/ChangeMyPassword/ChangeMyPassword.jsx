
import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";


export default function ChangeMyPassword() {
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { userToken } = useContext(UserContext);
  

  async function changeMyPassword(values) {
    setApiError(null);
    setLoading(true);

    try {
     const { data } = await axios.put(
      "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
      {
        currentPassword: values.currentPassword,
        password: values.password,
        rePassword: values.rePassword,
      },
      {
        headers: {
          token: userToken, 
        },
      } 
      
    ); 
    localStorage.removeItem("userToken");

    navigate('/login')
      console.log("READY VALUES:", values, data);
    } catch (error) {
      setApiError(
        error?.response?.data?.message || error?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  const validationSchema = Yup.object({
    currentPassword: Yup.string().required("Current password is required"),

    password: Yup.string()
      .required("New password is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Password must be minimum 8 characters, at least one letter and one number"
      ),

    rePassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: changeMyPassword,
  });

  return (
    <form className="md:w-1/2 mx-auto" onSubmit={formik.handleSubmit}>
      {apiError && <p className="text-red-600 text-sm mt-1">{apiError}</p>}

      {/* Current Password */}
      <div className="mb-5">
        <label
          htmlFor="currentPassword"
          className="block mb-1 text-sm text-main"
        >
          Current password:
        </label>

        <input
          value={formik.values.currentPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="password"
          name="currentPassword"
          id="currentPassword"
          className="block w-full py-2.5 px-0 text-sm 
                     bg-transparent border-0 border-b-2 border-default-medium 
                     focus:outline-none focus:border-main"
          placeholder="Enter current password"
        />

        {formik.touched.currentPassword && formik.errors.currentPassword && (
          <p className="text-red-600 text-sm mt-1">
            {formik.errors.currentPassword}
          </p>
        )}
      </div>

      {/* New Password */}
      <div className="mb-5">
        <label htmlFor="password" className="block mb-1 text-sm text-main">
          New password:
        </label>

        <input
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="password"
          name="password"
          id="password"
          className="block w-full py-2.5 px-0 text-sm 
                     bg-transparent border-0 border-b-2 border-default-medium 
                     focus:outline-none focus:border-main"
          placeholder="Enter new password"
        />

        {formik.touched.password && formik.errors.password && (
          <p className="text-red-600 text-sm mt-1">{formik.errors.password}</p>
        )}
      </div>

      {/* Confirm New Password */}
      <div className="mb-5">
        <label htmlFor="rePassword" className="block mb-1 text-sm text-main">
          Confirm new password:
        </label>

        <input
          value={formik.values.rePassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="password"
          name="rePassword"
          id="rePassword"
          className="block w-full py-2.5 px-0 text-sm 
                     bg-transparent border-0 border-b-2 border-default-medium 
                     focus:outline-none focus:border-main"
          placeholder="Re-enter new password"
        />

        {formik.touched.rePassword && formik.errors.rePassword && (
          <p className="text-red-600 text-sm mt-1">
            {formik.errors.rePassword}
          </p>
        )}
      </div>

      {/* Button */}
      {loading ? (
        <button
          type="button"
          disabled
          className="text-white bg-main hover:bg-green-600 transition-all duration-200 
                     shadow-md font-medium leading-5 rounded-lg text-sm px-6 py-2.5 
                     focus:outline-none focus:ring-4 focus:ring-green-200"
        >
          <i className="fas fa-spinner fa-spin"></i>
        </button>
      ) : (
        <button
          type="submit"
          className="text-white bg-main hover:bg-green-600 transition-all duration-200 
                     shadow-md font-medium leading-5 rounded-lg text-sm px-6 py-2.5 
                     focus:outline-none focus:ring-4 focus:ring-green-200"
        >
          Submit
        </button>
      )}
    </form>
  );
}
