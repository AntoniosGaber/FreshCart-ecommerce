import axios from "axios";
import { createContext, useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [cart, setCart] = useState(null);

  const buildHeaders = useCallback(() => {
    const token = localStorage.getItem("userToken");
    return { token };
  }, []);

  const getproductsCart = useCallback(async () => {
    try {
      const headers = buildHeaders();

      // ✅ not logged in => no cart
      if (!headers.token) {
        setCart(null);
        return null;
      }

      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { headers }
      );

      setCart(data);
      return data;
    } catch (error) {
      const status = error?.response?.status;
      const msg = (error?.response?.data?.message || "").toLowerCase();

      // ✅ treat as empty cart
      if (status === 401 || msg.includes("no cart exist")) {
        setCart(null);
        return null;
      }

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
      if (!productId) {
        toast.error("Invalid product id");
        return null;
      }

      await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        { headers }
      );

      // ✅ always refresh from server
      const fresh = await getproductsCart();
      toast.success("Added to cart", { duration: 2000 });
      return fresh;
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to add to cart", {
        duration: 2000,
      });
      return null;
    }
  }

  async function updateCartProductQuantitiy(productId, count) {
    try {
      if (!productId) {
        toast.error("Invalid product id");
        return null;
      }
      if (count < 1) return null;

      const headers = buildHeaders();
      if (!headers.token) {
        toast.error("Please login first");
        return null;
      }

      await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count },
        { headers }
      );

      // ✅ always refresh from server
      const fresh = await getproductsCart();
      return fresh;
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
      if (!productId) {
        toast.error("Invalid product id");
        return null;
      }

      const headers = buildHeaders();
      if (!headers.token) {
        toast.error("Please login first");
        return null;
      }

      await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { headers }
      );

      // ✅ always refresh from server
      const fresh = await getproductsCart();
      return fresh;
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to remove item", {
        duration: 2000,
      });
      return null;
    }
  }

  useEffect(() => {
    getproductsCart();
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
