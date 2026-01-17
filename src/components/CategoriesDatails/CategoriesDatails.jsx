import React from "react";
import { useParams } from "react-router-dom";
import useCategoryDetails from "../../Hooks/useCategoryDetails";
import Loading from "../Loading/Loading";

export default function CategoriesDetails() {
  const { id } = useParams();
  const { data, error, isLoading } = useCategoryDetails(id);

  if (isLoading) return <Loading />;

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
          Failed to load category details
        </p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="rounded-xl border border-gray-200 bg-white p-4 text-gray-700">
          No category data found
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="mb-6 text-2xl sm:text-3xl font-semibold text-gray-900">
        Category Details
      </h2>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="bg-gray-50 p-4 sm:p-6">
            <div className="aspect-square overflow-hidden rounded-2xl border border-gray-200 bg-white">
              <img
                src={data.image}
                alt={data.name}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Info */}
          <div className="p-5 sm:p-6">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
              {data.name}
            </h3>

            <p className="mt-1 text-sm text-gray-500">{data.slug}</p>

            <div className="mt-5">
              <p className="text-xs font-medium text-gray-600">Category ID</p>
              <p className="mt-1 text-xs text-gray-500 break-all">{data._id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
