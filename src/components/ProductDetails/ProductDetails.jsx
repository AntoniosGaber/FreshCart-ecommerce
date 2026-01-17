


import React, { useContext, useEffect, useState } from "react";
import styles from "./ProductDetails.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import Loading from "../Loading/Loading";
import { CartContext } from "../../context/CartConText";

export default function ProductDetails() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2500,
    adaptiveHeight: false,
    responsive: [
      {
        breakpoint: 768, // mobile/tablet
        settings: {
          dots: true,
        },
      },
    ],
  };

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true); 
   let { cart, addToCart, setCart } = useContext(CartContext);

  const { id } = useParams();

  async function getProductDetails(productId) {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${productId}`
      );
      setProduct(data.data);
     
     //console.log(data.data);

    } catch (err) {
      console.error(err);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProductDetails(id);
  }, [id]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : !product ? (
        <div className="p-6 text-center">Product not found.</div>
      ) : (
        <div className="flex flex-col md:flex-row gap-6 md:gap-10 p-4 md:p-8 md:items-start">
          {/* Images */}
          <div className="w-full md:w-2/5 lg:w-1/3">
            <div className="rounded-xl overflow-hidden">
              <Slider {...settings}>
                {(product.images || []).map((image, index) => (
                  <div key={index} className="h-[260px] sm:h-[320px] md:h-[360px]">
                    <img
                      src={image}
                      alt={product.title}
                      className="w-full h-full object-contain bg-white"
                      loading="lazy"
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>

          {/* Content */}
          <div className="w-full md:w-3/5 lg:w-2/3">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold">
              {product.title}
            </h2>

            <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
              {product.description}
            </p>

            <p className="mt-2 text-sm sm:text-base text-gray-600">
              Category: <span className="font-medium">{product.category?.name}</span>
            </p>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-base sm:text-lg font-semibold">
                {product.price} EGP
              </span>

              <span className="flex items-center gap-2">
                <i className="fas fa-star rating-color"></i>
                <span className="font-medium">{product.ratingsAverage}</span>
              </span>
            </div>

            <button onClick={() => addToCart(product._id)} className="btn w-full mt-6">Add to Cart</button>
          </div>
        </div>
      )}
    </>
  );
}


