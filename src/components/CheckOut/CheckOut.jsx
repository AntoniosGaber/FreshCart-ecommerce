
import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { CartContext } from "../../context/CartConText";
import toast from "react-hot-toast";

export default function CheckOut() {
  const { cart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);

  async function checkout(shippingAddress) {
    const token = localStorage.getItem("userToken");
    if (!token) {
      toast.error("Please login first");
      return;
    }

    if (!cart?.cartId) {
      toast.error("Cart not found");
      return;
    }

    const returnUrl = `${window.location.origin}/allorders`;

    try {
      setLoading(true);

      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.cartId}?url=${encodeURIComponent(
          returnUrl
        )}`,
        { shippingAddress },
        { headers: { token } }
      );

      toast.success("Redirecting to payment...");
      window.location.href = data.session.url;
    } catch (error) {
      console.log("Checkout error:", error?.response?.data || error);
      toast.error("Checkout failed");
    } finally {
      setLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: { city: "", details: "", phone: "" },
    onSubmit: checkout,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="w-75 mx-auto py-5">
      <div className="mb-5">
        <label htmlFor="city" className="block mb-1 text-sm text-main">
          Enter your city :
        </label>
        <input
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="text"
          name="city"
          id="city"
          className="block w-full py-2.5 px-0 text-sm bg-transparent border-0 border-b-2 border-default-medium focus:outline-none focus:border-main"
          placeholder="Enter your city "
        />
      </div>

      <div className="mb-5">
        <label htmlFor="details" className="block mb-1 text-sm text-main">
          Enter your details:
        </label>
        <input
          value={formik.values.details}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="text"
          name="details"
          id="details"
          className="block w-full py-2.5 px-0 text-sm bg-transparent border-0 border-b-2 border-default-medium focus:outline-none focus:border-main"
          placeholder="Enter your details "
        />
      </div>

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
          placeholder="Enter your phone "
        />
      </div>

      <button
        type="submit"
        disabled={!cart || loading}
        className="text-white bg-main hover:bg-green-600 transition-all duration-200 shadow-md font-medium leading-5 rounded-lg text-sm px-6 py-2.5 focus:outline-none focus:ring-4 focus:ring-green-200"
      >
        {loading ? <i className="fas fa-spinner fa-spin"></i> : "Submit"}
      </button>
    </form>
  );
}
