import { useQuery } from '@tanstack/react-query'
import Axios from 'axios'

export default function useCategoryDetails(id) {
  function categoryDetails() {
    return Axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
  }

  let res = useQuery({
    queryKey: ['category', id],
    queryFn: categoryDetails,
    enabled: Boolean(id),
    select: (res) => res.data.data,
  })

  return res
}
