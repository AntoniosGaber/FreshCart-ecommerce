import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/Loading";
import { useParams } from "react-router-dom";

export default function SpecificBrand() {
  const { brandId } = useParams();

  function specifibrand() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`);
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["SpecificBrand", brandId],
    queryFn: specifibrand,
    enabled: !!brandId,        
    staleTime: 60_000,         
  });

  if (isLoading) return <Loading />;
  if (isError) return <h2>{error?.message}</h2>;

  const brand = data?.data?.data;

  return (
    <div className="flex justify-center py-8">
      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-2 rounded-lg">
        <div className="product text-center">
          <img src={brand?.image} alt={brand?.name} className="w-full" />
          <h3 className="text-xl mt-2">{brand?.name}</h3>
        </div>
      </div>
    </div>
  );
}
