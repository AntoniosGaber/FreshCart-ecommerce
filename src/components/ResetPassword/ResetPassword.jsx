import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import * as Yup from "yup";

export default function ResetPassword() {
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  

  async function restpassword(values) {
    setApiError(null);
    setLoading(true);

    try {
      await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", {
        email: values.email,
        newPassword: values.newPassword,
      });

      navigate("/login");
    } catch (error) {
      // اعرض رسالة مفهومة
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong";
      setApiError(msg);
    } finally {
      setLoading(false);
    }
  } 
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    newPassword: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Password must be minimum eight characters, at least one letter and one number"
      ),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: restpassword,
  });

  return (
    <>
      <div>ResetPassword</div>

      <form className="md:w-1/2 mx-auto" onSubmit={formik.handleSubmit}>
        {apiError && <p className="text-red-600 text-sm mt-1">{apiError}</p>}

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

        {/* NEW PASSWORD */}
        <div className="mb-5">
          <label htmlFor="newPassword" className="block mb-1 text-sm text-main">
            Enter your new password :
          </label>

          <input
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="password"
            name="newPassword"
            id="newPassword"
            className="block w-full py-2.5 px-0 text-sm bg-transparent border-0 border-b-2 border-default-medium focus:outline-none focus:border-main"
            placeholder="Enter your new password"
          />

          {formik.touched.newPassword && formik.errors.newPassword && (
            <p className="text-red-600 text-sm mt-1">
              {formik.errors.newPassword}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading || !formik.isValid}
          className="px-4 py-2 rounded bg-main text-white disabled:opacity-50"
        >
          {loading ? "Updating..." : "Reset Password"}
        </button>
      </form>
    </>
  );
}
