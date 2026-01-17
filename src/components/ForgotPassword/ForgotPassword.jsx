import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  
  async function submit(values) {
    try {
      setLoading(true);
      setApiError(null);

      await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        { email: values.email }
      );

      navigate("/VerifyCode");
    } catch (err) {
      setApiError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  } 
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });


  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema,
    onSubmit: submit,
  });

  return (
    <form className="max-w-md mx-auto mt-10" onSubmit={formik.handleSubmit}>
      <h2 className="text-xl font-semibold mb-4">Forgot Password</h2>

      {apiError && <p className="text-red-600 text-sm mb-3">{apiError}</p>}

      <label htmlFor="email" className="block mb-1 text-sm text-main">
        Enter your email
      </label>

      <input
        id="email"
        name="email"
        type="email"
        placeholder="Enter your email"
        className="w-full border rounded px-3 py-2"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />

      {formik.touched.email && formik.errors.email && (
        <p className="text-red-600 text-sm mt-1">{formik.errors.email}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full mt-5 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
      >
        {loading ? "Sending..." : "Send Reset Code"}
      </button>
    </form>
  );
}
