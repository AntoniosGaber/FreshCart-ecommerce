import axios from "axios";
import { createContext, useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [cart, setCart] = useState(null);

  // ✅ One source of truth: userToken
  const buildHeaders = useCallback(() => {
    const token = localStorage.getItem("userToken");
    return { token };
  }, []);

  const getproductsCart = useCallback(async () => {
    try {
      const headers = buildHeaders();
      if (!headers.token) return null;

      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { headers }
      );

      setCart(data);
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }, [buildHeaders]);

  async function addToCart(productId) {
    try {
      const headers = buildHeaders();
      if (!headers.token) {
        toast.error("Please login first");
        return null;
      }

      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        { headers }
      );

      setCart(data);
      toast.success(data.message, { duration: 2000 });
      return data;
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Failed to add to cart",
        { duration: 2000 }
      );
      return null;
    }
  }

  async function updateCartProductQuantitiy(productId, count) {
    try {
      if (count < 1) return null;

      const headers = buildHeaders();
      if (!headers.token) {
        toast.error("Please login first");
        return null;
      }

      const { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count },
        { headers }
      );

      setCart(data);
      toast.success(data.message, { duration: 2000 });
      return data;
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Failed to update quantity",
        { duration: 2000 }
      );
      return null;
    }
  }

  async function romoveItem(productId) {
    try {
      const headers = buildHeaders();
      if (!headers.token) {
        toast.error("Please login first");
        return null;
      }

      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { headers }
      );

      setCart(data);
      toast.success(data.message, { duration: 2000 });
      return data;
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Failed to remove item",
        { duration: 2000 }
      );
      return null;
    }
  }

  // ✅ Also check userToken (NOT "token")
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      getproductsCart();
    }
  }, [getproductsCart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        getproductsCart,
        updateCartProductQuantitiy,
        romoveItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
