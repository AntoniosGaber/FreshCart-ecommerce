import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

export default function Login() {
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setUserToken } = useContext(UserContext);

  async function login(values) {
    setApiError(null);
    setLoading(true);

    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );

      // ✅ store token with ONE key only
      localStorage.setItem("userToken", data.token);
      setUserToken(data.token);

      console.log("TOKEN:", data.token);
      console.log("LS:", localStorage.getItem("userToken"));

      navigate("/");
    } catch (error) {
      console.log(error);
      setApiError(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Password must be minimum eight characters, at least one letter and one number"
      ),
  });

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: login,
  });

  return (
    <>
      <form className="md:w-1/2 mx-auto" onSubmit={formik.handleSubmit}>
        {apiError && <p className="text-red-600 text-sm mt-1">{apiError}</p>}

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

        <div className="mb-5">
          <label htmlFor="password" className="block mb-1 text-sm text-main">
            Enter your password :
          </label>

          <input
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="password"
            name="password"
            id="password"
            className="block w-full py-2.5 px-0 text-sm bg-transparent border-0 border-b-2 border-default-medium focus:outline-none focus:border-main"
            placeholder="Enter your password"
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-600 text-sm mt-1">{formik.errors.password}</p>
          )}
        </div>

        <div className="mt-6 flex items-center justify-between gap-3">
          <Link
            to="/forgotpassword"
            className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition"
          >
            Forgot password
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center text-white bg-main hover:bg-green-600 transition-all duration-200 shadow-md font-medium leading-5 rounded-lg text-sm px-6 py-2.5 focus:outline-none focus:ring-4 focus:ring-green-200 disabled:opacity-60"
          >
            {loading ? <i className="fas fa-spinner fa-spin"></i> : "Submit"}
          </button>
        </div>
      </form>
    </>
  );
}
