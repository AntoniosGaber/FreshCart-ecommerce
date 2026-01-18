import axios from "axios";
import { createContext, useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [cart, setCart] = useState(null);

  
  const buildHeaders = useCallback(() => {
    const token = localStorage.getItem("token");
    return { token };
  }, []);

  const getproductsCart = useCallback(async () => {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { headers: buildHeaders() }
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
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login first");
        return null;
      }

      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        { headers: buildHeaders() }
      );

     
      setCart(data);

      toast.success(data.message, { duration: 2000 });
      return data;
    } catch (error) {
      console.log(error);
      toast.error("Failed to add to cart");
      return null;
    }
  }

  async function updateCartProductQuantitiy(productId, count) {
    try {
      if (count < 1) return null;

      const { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count },
        { headers: buildHeaders() }
      );

      setCart(data);
      toast.success(data.message, { duration: 2000 });
      return data;
    } catch (error) {
      console.log(error);
      toast.error("Failed to update quantity", { duration: 2000 });
      return null;
    }
  }

  async function romoveItem(productId) {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { headers: buildHeaders() }
      );

      setCart(data);
      toast.success(data.message, { duration: 2000 });
      return data;
    } catch (error) {
      console.log(error);
      toast.error("Failed to remove item", { duration: 2000 });
      return null;
    }
  }

 
  useEffect(() => {
    if (localStorage.getItem("token")) {
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
