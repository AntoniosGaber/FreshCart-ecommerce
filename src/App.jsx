import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Register from './components/Register/Register'
import Home from './components/Home/Home'
import Brands from './components/Brands/Brands'
import Cart from './components/Cart/Cart'
import Categories from './components/Categories/Categories'
import Login from './components/Login/Login'
import Notfound from './components/Notfound/Notfound'
import Products from './components/Products/Products'
import UserContextProvider from './context/UserContext'
import ProductRoute from './components/ProductRoute/ProductRoute'
const  routers = createBrowserRouter([{ 
   path:'/', element:<Layout/> , children:[ 
    {path:'register' , element : <Register/>},
    {index: true, element : <ProductRoute><Home/></ProductRoute> } , 
    {path:'brands',element:   <ProductRoute><Brands/></ProductRoute>} , 
    
    {path : 'cart', element:<ProductRoute><Cart/></ProductRoute>} , 
    {path: 'categories' , element : <ProductRoute> <Categories/></ProductRoute>},
    {path:'login' , element:<Login/>},
    {path:'*' ,element:<Notfound/>},
    {path:'products', element:<ProductRoute> <Products/></ProductRoute>},
    
   ]


}])

export default function App() {
  return <>
  
  <UserContextProvider>
    <RouterProvider router={routers}/>
    </UserContextProvider>
  
  </>
}
