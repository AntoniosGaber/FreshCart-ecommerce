
  
  import React, { useContext, useEffect, useState } from "react";
import styles from "./RecentProducts.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import ProductDetails from "../ProductDetails/ProductDetails";
import Loading from "../Loading/Loading";
import { CartContext } from "../../context/CartConText";
import { useQuery } from "@tanstack/react-query";

export default function RecentProducts() {
 // const [products, setProducts] = useState([]);
 // const [loading, setLoading] = useState(true);
 let { addToCart } = useContext(CartContext);

  //async function getProducts() {
  //  let { data } = await axios.get(
    //  "https://ecommerce.routemisr.com/api/v1/products"
  //  );
  //  setProducts(data.data);
 //   setLoading(false);
 // }
 // useEffect(() => {
 //  getProducts();
//  }, []); 
function getProducts(){
  return axios.get("https://ecommerce.routemisr.com/api/v1/products"); 
} 

 let {data , isLoading ,isFetching , isError} = useQuery({ queryKey:['recentProducts'], 
  queryFn: getProducts , 
  gcTime : 3000 , 

})
console.log(data?.data.data)
 return (
  <>
    {isLoading ? (
      <Loading />
    ) : (
      <div className="flex flex-wrap py-8 gap-y-4 justify-center sm:justify-between">
        {data?.data.data.map((product) => (
          <div
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-2 rounded-lg"
            key={product._id}
          >
            <div className="product">
              <Link to={`ProductDetails/${product._id}`}>
                <img
                  src={product.imageCover}
                  alt={product.title}
                  className="w-full"
                />

                <h3 className="text-main">{product.category?.name}</h3>

                <h3 className="text-xl">
                  {product.title.split(" ").slice(0, 2).join(" ")}
                </h3>

                <div className="flex justify-between">
                  <span>{product.price} EGP</span>
                  <span>
                    <i className="fas fa-star rating-color"></i>
                    {product.ratingsAverage}
                  </span>
                </div>
              </Link>

              <button
                onClick={() => addToCart(product._id)}
                className="btn w-full mt-6"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </>
);
}
