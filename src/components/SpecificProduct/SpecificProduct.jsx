import React, { useContext } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import { CartContext } from "../../context/CartConText";

export default function SpecificProduct() {
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
        breakpoint: 768,
        settings: { dots: true },
      },
    ],
  };

  const { addToCart } = useContext(CartContext);
  const { productId } = useParams();

  function fetchProduct() {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${productId}`
    );
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["SpecificProduct", productId],
    queryFn: fetchProduct,
    enabled: !!productId,
    staleTime: 60_000,
    select: (res) => res.data.data,
  });

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (isError)
    return <div className="p-4 text-red-600">{error.message}</div>;

  return (
    <div className="w-full max-w-none px-3 py-5 sm:mx-auto sm:max-w-6xl sm:px-4 sm:py-6 lg:px-6">
      <div className="grid gap-5 lg:grid-cols-2 lg:gap-8 lg:items-start">
        {/* LEFT: Images */}
        <div className="space-y-3 sm:space-y-4">
          <div className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="relative">
              <img
                src={data.imageCover}
                alt={data.title}
                className="h-[420px] w-full object-cover sm:h-[420px] lg:h-[520px]"
                loading="lazy"
              />

              <div className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs sm:text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-black/5">
                {data.price} EGP
              </div>
            </div>
          </div>

          <div className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="p-3 sm:p-4">
              <Slider {...settings}>
                {(data.images || []).map((image, index) => (
                  <div
                    key={index}
                    className="h-[220px] sm:h-[280px] md:h-[320px]"
                  >
                    <img
                      src={image}
                      alt={`${data.title} ${index + 1}`}
                      className="h-full w-full rounded-xl object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </Slider>

              <p className="mt-2 text-[11px] sm:text-xs text-gray-500">
                Swipe to view more images
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT: Info */}
        <div className="space-y-4 lg:sticky lg:top-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <h1 className="text-base sm:text-xl lg:text-2xl font-semibold leading-snug text-gray-900">
                {data.title}
              </h1>

              <div className="hidden sm:inline-flex w-fit items-center gap-2 rounded-full bg-gray-50 px-3 py-1 text-sm font-semibold text-gray-900 ring-1 ring-gray-200">
                {data.price} EGP
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-gray-600">
              <span className="inline-flex items-center gap-2 rounded-full bg-gray-50 px-3 py-1 ring-1 ring-gray-200">
                <span className="font-medium text-gray-900">Brand</span>
                <span className="text-gray-700">{data.brand?.name}</span>
              </span>

              <span className="inline-flex items-center gap-2 rounded-full bg-gray-50 px-3 py-1 ring-1 ring-gray-200">
                <span className="font-medium text-gray-900">Rating</span>
                <span className="text-gray-700">
                  {data.ratingsAverage} ({data.ratingsQuantity})
                </span>
              </span>
            </div>

            <p className="mt-4 whitespace-pre-line text-sm leading-6 text-gray-600 sm:text-base">
              {data.description}
            </p>

            <button
              onClick={() => addToCart(data._id)}
              className="btn mt-6 w-full"
              type="button"
            >
              Add to Cart
            </button>

            <div className="mt-4 text-[11px] sm:text-xs text-gray-500">
              Product ID: <span className="font-mono">{data._id}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
