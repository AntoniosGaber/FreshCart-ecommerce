import { Link } from "react-router-dom";
import useCategories from "../../Hooks/useCategories";
import Loading from "../Loading/Loading";

export default function Categories() {
  const { data , isLoading, error } = useCategories(); 

  if (isLoading) return <Loading />;
  if (error) return <p className="p-4 text-red-600">Failed to load categories</p>;

  return <>
  <div className="container mx-auto px-4 py-6">
  <h2 className="text-2xl font-semibold mb-6">Categories</h2>

  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
    {data.map((category) => (
      <Link
        key={category._id}
        to={`/categoriesdetails/${category._id}`}
        className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow block"
      >
        <div className="aspect-square bg-gray-50 flex items-center justify-center">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        <div className="p-3">
          <h3 className="text-sm sm:text-base font-medium text-gray-900 line-clamp-1">
            {category.name}
          </h3>
          <p className="text-xs text-gray-500 mt-1 line-clamp-1">
            {category.slug}
          </p>
        </div>
      </Link>
    ))}
  </div>
</div>

  
  
  
  </>
   
  
}
