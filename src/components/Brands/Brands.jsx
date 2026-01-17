import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";

export default function Brands() {
  function getAllBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  

    const { data, isLoading, isError, error } = useQuery({
    queryKey: ["brands"],
    queryFn: getAllBrands,
  });

 

  const brands = data?.data?.data ??[] ; 
  

  return <> 
  {isLoading ? <Loading/> : <div className="flex flex-wrap py-8 gap-y-4 justify-center sm:justify-between">
      {brands.map((brand) => (
        <div
          className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-2 rounded-lg"
          key={brand._id}
        >
          <div className="product">
            <Link to={`/specificbrand/${brand._id}`}>
      
              <img
                src={brand.image}
                alt={brand.name}
                className="w-full"
              /> 
              <h3 className="text-xl mt-2">{brand.slug}</h3>
            
            </Link>
          </div>
        </div>
      ))}
    </div>}
  
  
  
  
  </>
    

  
  
  
  
  
}
