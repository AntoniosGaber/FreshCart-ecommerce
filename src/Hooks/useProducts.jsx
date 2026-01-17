
import { useQuery } from '@tanstack/react-query'; 
import Axios from 'axios'; 


export default function useProducts() { 


  function getAllProducts() {
    return Axios.get('https://ecommerce.routemisr.com/api/v1/products')
  }

  const res =  useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
    select: (res) => res.data.data , 
    
    
  }) 

 
  return res ; 
 
}
