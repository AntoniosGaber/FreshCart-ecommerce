
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import Categories from '../components/Categories/Categories'

export default function useCategories() { 
  
  function getAllCategories() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  }

  const res =  useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategories,
    select: (res) => res.data.data , 
    
    
  }) 
  return res ;
}
 

  
  
  
  
  
  
  
  
  

