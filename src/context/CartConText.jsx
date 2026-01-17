import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { initFlowbite } from "flowbite"; 

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [cart, setCart] = useState(null);
   let headers = { token: localStorage.getItem("userToken") }; 
  async function addToCart(productId) {
    try { 
       

      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId },
        { headers }
      );

      console.log(data);
      getproductsCart();

      toast.success(data.message, { duration: 2000 });
      
      return data;

    } catch (error) {
      console.log(error);
      toast.error("Failed to add to cart");
      return null;
    }
  }
   async function getproductsCart() {
    try { 
       

      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        
        { headers }
      );

      console.log(data);
      setCart(data);
      
      return data;

    } catch (error) {
      console.log(error);
    
      return null;
    }
  } 
  
  async function updateCartProductQuantitiy(productId, count) {
  try {
    if (count < 1) return null;

    let { data } = await axios.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      { count },
      { headers }
    );

    console.log(data);

    setCart(data);
    toast.success(data.message, { duration: 2000 });

    return data;
  } catch (error) {
    console.log(error);
    toast.error("Failed to update quantity", { duration: 2000 });
    return null;
  }
}
  
  async function romoveItem (productId) {
  try {
    

    let { data } = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      
      { headers }
    );  
    

    console.log(data);

    setCart(data);
    toast.success(data.message, { duration: 2000 });

    return data;
  } catch (error) {
    console.log(error);
    toast.error("Failed to update quantity", { duration: 2000 });
    return null;
  }
}

  
  

  return (
    <>
      <CartContext.Provider value={{ cart, addToCart, setCart , updateCartProductQuantitiy , getproductsCart , romoveItem  }}>
        {children}
      </CartContext.Provider>
      

    </>
  );
}
