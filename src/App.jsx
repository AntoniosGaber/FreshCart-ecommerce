

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
import ProductDetails from './components/ProductDetails/ProductDetails'
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import SpecificBrand from "./components/SpecificBrand/SpecificBrand";






import CartContextProvider from './context/CartConText'
import { Toaster } from 'react-hot-toast'
import AllOrders from './components/AllOrders/AllOrders'
import CheckOut from './components/CheckOut/CheckOut'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import SpecificProduct from "./components/SpecificProduct/SpecificProduct";
import CategoriesDatails from './components/CategoriesDatails/CategoriesDatails';
import ForgotPassword from './components/ForgotPassword/ForgotPassword'
import VerifyCode from './components/VerifyCode/VerifyCode'
import ResetPassword from './components/ResetPassword/ResetPassword'
import UpdataUserData from './components/UpdateUserData/UpdataUserData'
import ChangeMyPassword from './components/ChangeMyPassword/ChangeMyPassword'
import Account from './components/Account/Account'
import UpateProfile from './components/UpdateProfile/UpDateProfile'




const routers = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "register", element: <Register /> },

      { path: "home", element: <Navigate to="/" replace /> },
      { index: true, element: <ProductRoute><Home /></ProductRoute> },

      { path: "checkout", element: <ProductRoute><CheckOut /></ProductRoute> },
      { path: "allorders", element: <ProductRoute><AllOrders /></ProductRoute> },

      { path: "specificbrand/:brandId", element: <ProductRoute><SpecificBrand /></ProductRoute> },

      { path: "specificproduct/:productId", element: <ProductRoute><SpecificProduct /></ProductRoute> },

      { path: "brands", element: <ProductRoute><Brands /></ProductRoute> },
      { path: "cart", element: <ProductRoute><Cart /></ProductRoute> },
      { path: "categories", element: <ProductRoute><Categories /></ProductRoute> },

      { path: "categoriesdetails/:id", element: <ProductRoute><CategoriesDatails /></ProductRoute> },

      { path: "products", element: <ProductRoute><Products /></ProductRoute> },
      { path: "productdetails/:id", element: <ProductRoute><ProductDetails /></ProductRoute> },
      {path:"forgotPassword" , element: <ForgotPassword/>} , 
      {path:"verifyCode" , element: <VerifyCode/>},
      {path:"resetPassword" , element:<ResetPassword/>}, 
      {path:"updataUserData" , element:<UpdataUserData/>}, 
      {path:"changeMyPassword" ,element : <ProductRoute> <ChangeMyPassword/>
        </ProductRoute> },
        {path: "account" , element:<ProductRoute> <Account/></ProductRoute> }, 
        {path : "UpdateProfile" , element: <ProductRoute>  <UpateProfile/></ProductRoute> }, 
         

      { path: "login", element: <Login /> },
      { path: "*", element: <Notfound /> },
      
    ],
  },
]);

const query = new QueryClient(); 

export default function App() { 
  return ( 
    
     <QueryClientProvider client={query}>
      <UserContextProvider>
        <CartContextProvider>
          
          <ReactQueryDevtools></ReactQueryDevtools>
          <Toaster />
          <RouterProvider router={routers} />
        </CartContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  
   
  
);

  
}
