
import React from "react";

import useProducts from "../../Hooks/useProducts";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";

export default function Products() {
  const { data, error, isLoading } = useProducts();

  if (isLoading) return <Loading />;
  if (error) return <p className="p-4 text-red-600">Failed to load products</p>;

return (
  <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6 py-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
      {data?.map((product) => (
        <div
          key={product._id}
          className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
        >
          {/* image wrapper */}
          <div className="relative aspect-[4/3] bg-gray-100">
            <Link
              to={`/specificproduct/${product._id}`}
              className="block h-full w-full"
            >
              <img
                src={product.imageCover}
                alt={product.title}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </Link>

            {/* price badge */}
            <div className="absolute left-2 top-2 rounded-full bg-white/90 px-3 py-1 text-sm font-semibold shadow">
              {product.price}
            </div>
          </div>

          {/* content */}
          <div className="p-3 sm:p-4">
            <Link to={`/specificproduct/${product._id}`}>
              <h3 className="line-clamp-2 text-sm sm:text-base font-semibold text-gray-900 hover:underline">
                {product.title}
              </h3>
            </Link>

            {/* thumbnails */}
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {product.images?.slice(0, 4).map((url, i) => (
                <img
                  key={url || i}
                  src={url}
                  alt={`${product.title} ${i + 1}`}
                  className="h-12 w-12 flex-none rounded-lg object-cover ring-1 ring-gray-200 transition group-hover:ring-gray-300"
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);


}
