     import { useEffect, useState } from "react";
import { initFlowbite } from "flowbite"; 
import { useContext } from "react";
import { CartContext } from "../../context/CartConText";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
      
      
      
      
      
      
      export default function Cart() { 
     
     
    let { cart, addToCart, setCart , updateCartProductQuantitiy , getproductsCart , romoveItem } = useContext(CartContext);

    console.log(cart);


useEffect(() => {
  if (!cart) getproductsCart();
}, []);


  
  return <>
  
    {cart ? (
      <div>
        <div className="relative bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto sm:overflow-visible">
            <table className="w-full text-xs sm:text-sm text-left rtl:text-right text-gray-500 sm:table">
              <thead className="hidden sm:table-header-group text-sm text-gray-700 bg-gray-50 border-b border-gray-200">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="block sm:table-row-group">
                {cart.data.products.map((item, index) => (
                  <tr
                    key={index}
                    className="block sm:table-row bg-white border border-gray-200 sm:border-0 sm:border-b sm:border-gray-200 rounded-lg sm:rounded-none mb-3 sm:mb-0 overflow-hidden"
                  >
                    <td className="block sm:table-cell p-3 sm:p-4">
                      <img
                        src={item.product.imageCover}
                        className="w-28 sm:w-16 md:w-24 max-w-full max-h-full mx-auto sm:mx-0"
                        alt={item.product.title}
                      />
                    </td>

                    <td className="block sm:table-cell px-3 sm:px-6 py-2 sm:py-4 font-semibold text-gray-900 break-words">
                      {item.product.title}
                    </td>

                    <td className="block sm:table-cell px-3 sm:px-6 py-2 sm:py-4">
                      <form className="max-w-xs mx-0 sm:mx-auto">
                        <label htmlFor="counter-input-1" className="sr-only">
                          Quantity
                        </label>

                        <div className="relative flex items-center justify-start sm:justify-start">
                          <div className="relative flex items-center gap-2">   
                            <div className="relative flex items-center gap-2">
  <button
    type="button"
    disabled={item.count <= 1}
    className="btn text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
    onClick={() => updateCartProductQuantitiy(item.product.id, item.count - 1)}
  >
    -
  </button>

  <span className="min-w-8 text-center text-xs sm:text-sm">{item.count}</span>

  <button
    type="button"
    className="btn text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
    onClick={() => updateCartProductQuantitiy(item.product.id, item.count + 1)}
  >
    +
  </button>
</div>

                           
                           
                          </div>
                        </div>
                      </form>
                    </td>

                    <td className="block sm:table-cell px-3 sm:px-6 py-2 sm:py-4 font-semibold text-gray-900">
                      {item.price * item.count}
                    </td>

                    <td className="block sm:table-cell px-3 sm:px-6 py-2 sm:py-4">
                      <button  onClick={()=> romoveItem( item.product.id)}
                      className="btn mt-1 sm:mt-2 text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2 w-full sm:w-auto">
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div> 
        <div className="cart-summary flex items-center justify-between gap-4 p-4 border rounded-md bg-white">
  <h2 className="text-lg font-semibold text-gray-800">
    Total: 
    <span className="ml-2 font-bold text-emerald-600">
      {cart?.data?.totalCartPrice ?? 0} EGP
    </span>
  </h2>

  <Link to="/checkout">
    <button
      type="button"
      disabled={!cart?.data?.totalCartPrice}
      className={`px-5 py-2 rounded-md text-sm font-semibold text-white transition}
        ${
          cart?.data?.totalCartPrice
            ? "bg-emerald-600 hover:bg-emerald-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
    >
      Checkout
    </button>
  </Link>
</div>

       

      </div>
      
    ) : (
      <Loading />
    )}
  </>


  
  
  
  
 


    
    
    
  
} 