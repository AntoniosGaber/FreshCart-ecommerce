import React, { useContext, useState } from "react";
import styles from "./Register.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

export default function Register() {
 const[apiError, seiApiError]=  useState(null);
 const[loading, seiLoading]=  useState(false); 
  let navigate =useNavigate(); 
  let {userToken, setUserToken }=  useContext(UserContext)
  
  

  async function register(values) { 
     try { seiLoading(true);
      let {data}= await axios .post (`https://ecommerce.routemisr.com/api/v1/auth/signup`,values)
      localStorage.setItem('userToken',data.token) 
      setUserToken(data.token)
      navigate('/')
      console.log(data);
     } catch (error) { 
      console.log(error);
       seiApiError(error.response.data.message);
      seiLoading(false);
    
    }

      
     }
      
      
   
      
     
  

  let validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .max(15, "Name must be at most 15 characters")
      .required("Name is required"),

    email: Yup.string()
      .email("Invalid email")
      .required("Email is required"),

    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Password must be minimum eight characters, at least one letter and one number"
      ),

    rePassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),

    phone: Yup.string()
  .required("Phone is required")
  .matches(/^01[0125][0-9]{8}$/, "Phone number must be a valid Egyptian number"),

  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: register,
  });

  return (
    <>
      <form className="md:w-1/2 mx-auto" onSubmit={formik.handleSubmit}>
      {apiError && (
            <p className="text-red-600 text-sm mt-1">{apiError}</p>
          )}
      
      
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
            className="block w-full py-2.5 px-0 text-sm 
                       bg-transparent border-0 border-b-2 border-default-medium 
                       focus:outline-none focus:border-main"
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
            className="block w-full py-2.5 px-0 text-sm 
                       bg-transparent border-0 border-b-2 border-default-medium 
                       focus:outline-none focus:border-main"
            placeholder="Enter your email"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-600 text-sm mt-1">{formik.errors.email}</p>
          )}
        </div>

        {/* PASSWORD */}
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
            className="block w-full py-2.5 px-0 text-sm 
                       bg-transparent border-0 border-b-2 border-default-medium 
                       focus:outline-none focus:border-main"
            placeholder="Enter your password"
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-600 text-sm mt-1">
              {formik.errors.password}
            </p>
          )}
        </div>

        {/* RE-PASSWORD */}
        <div className="mb-5">
          <label htmlFor="rePassword" className="block mb-1 text-sm text-main">
            Enter your rePassword :
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
            placeholder="Enter your rePassword"
          />
          {formik.touched.rePassword && formik.errors.rePassword && (
            <p className="text-red-600 text-sm mt-1">
              {formik.errors.rePassword}
            </p>
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
            className="block w-full py-2.5 px-0 text-sm 
                       bg-transparent border-0 border-b-2 border-default-medium 
                       focus:outline-none focus:border-main"
            placeholder="Enter your phone"
          />
          {formik.touched.phone && formik.errors.phone && (
            <p className="text-red-600 text-sm mt-1">{formik.errors.phone}</p>
          )}
        </div>

        {/* BUTTON */}
        {loading ? <button
          type="button"
          className="text-white bg-main hover:bg-green-600 transition-all duration-200 
                     shadow-md font-medium leading-5 rounded-lg text-sm px-6 py-2.5 
                     focus:outline-none focus:ring-4 focus:ring-green-200"
        >
          <i className="fas fa-spinner fa-spin"></i>


        </button>: <button
          type="submit"
          className="text-white bg-main hover:bg-green-600 transition-all duration-200 
                     shadow-md font-medium leading-5 rounded-lg text-sm px-6 py-2.5 
                     focus:outline-none focus:ring-4 focus:ring-green-200"
        >
          Submit
        </button> }
       
        
      </form>
    </>
  );
}
