import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

export default function UpdateProfile() {
  const [apiError, setApiError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { userToken, setUserToken, userData, setUserData } = useContext(UserContext);

  async function upDateProfile(values) {
    setApiError(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      const { data } = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/users/updateMe",
        {
          name: values.name,
          email: values.email,
          phone: values.phone,
        },
        {
          headers: { token: userToken },
        }
      );

      // ✅ تحديث البيانات محليًا بعد نجاح التعديل
      const updatedUser = {
        ...userData,
        name: values.name,
        email: values.email,
        phone: values.phone,
      };

      setUserData(updatedUser);
      localStorage.setItem("userData", JSON.stringify(updatedUser));

      console.log("READY update profile:", values, data);

      setSuccessMsg("Profile updated successfully ✅");
      setTimeout(() => navigate("/home"), 800);
    } catch (error) {
      console.log("UPDATE PROFILE ERROR:", error?.response?.data);

      // ✅ token invalid -> logout
      if (error?.response?.status === 401) {
        localStorage.removeItem("userToken");
        localStorage.removeItem("userData");
        setUserToken(null);
        setUserData(null);
        navigate("/login");
        return;
      }

      setApiError(
        error?.response?.data?.message ||
          error?.response?.data?.errors?.msg ||
          error?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .max(30, "Name must be at most 30 characters")
      .required("Name is required"),

    email: Yup.string().email("Invalid email").required("Email is required"),

    phone: Yup.string()
      .required("Phone is required")
      .matches(/^01[0125][0-9]{8}$/, "Phone number must be a valid Egyptian number"),
  });

  const formik = useFormik({
    initialValues: {
      name: userData?.name || "",
      email: userData?.email || "",
      phone: userData?.phone || "",
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: upDateProfile,
  });

  return (
    <form className="md:w-1/2 mx-auto" onSubmit={formik.handleSubmit}>
      {apiError && <p className="text-red-600 text-sm mt-2">{apiError}</p>}
      {successMsg && <p className="text-green-600 text-sm mt-2">{successMsg}</p>}

      {/* NAME */}
      <div className="mb-5">
        <label htmlFor="name" className="block mb-1 text-sm text-main">
          Enter your name :
        </label>
        <input
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="text"
          name="name"
          id="name"
          className="block w-full py-2.5 px-0 text-sm bg-transparent border-0 border-b-2 border-default-medium focus:outline-none focus:border-main"
          placeholder="Enter your name"
        />
        {formik.touched.name && formik.errors.name && (
          <p className="text-red-600 text-sm mt-1">{formik.errors.name}</p>
        )}
      </div>

      {/* EMAIL */}
      <div className="mb-5">
        <label htmlFor="email" className="block mb-1 text-sm text-main">
          Enter your email :
        </label>
        <input
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="email"
          name="email"
          id="email"
          className="block w-full py-2.5 px-0 text-sm bg-transparent border-0 border-b-2 border-default-medium focus:outline-none focus:border-main"
          placeholder="Enter your email"
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-red-600 text-sm mt-1">{formik.errors.email}</p>
        )}
      </div>

      {/* PHONE */}
      <div className="mb-5">
        <label htmlFor="phone" className="block mb-1 text-sm text-main">
          Enter your phone :
        </label>
        <input
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="tel"
          name="phone"
          id="phone"
          className="block w-full py-2.5 px-0 text-sm bg-transparent border-0 border-b-2 border-default-medium focus:outline-none focus:border-main"
          placeholder="Enter your phone"
        />
        {formik.touched.phone && formik.errors.phone && (
          <p className="text-red-600 text-sm mt-1">{formik.errors.phone}</p>
        )}
      </div>

      {/* BUTTON */}
      <button
        type="submit"
        disabled={loading}
        className="text-white bg-main hover:bg-green-600 transition-all duration-200 shadow-md font-medium leading-5 rounded-lg text-sm px-6 py-2.5 focus:outline-none focus:ring-4 focus:ring-green-200 disabled:opacity-60"
      >
        {loading ? <i className="fas fa-spinner fa-spin"></i> : "Submit"}
      </button>
    </form>
  );
}
