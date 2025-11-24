import React, { useContext, useState } from 'react'
import style from './Navbar.module.css'
import logo from '../../assets/images/freshcart-logo.svg'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'

export default function Navbar() {
  
  let navigate =  useNavigate()
 let{userToken, setUserToken}  = useContext(UserContext)
  const [isOpen, setIsOpen] = useState(false)
  function logout(){
    localStorage.removeItem('userToken')
    setUserToken(null)
    navigate('/login')
  }

  return <>

    <header className="bg-gray-200 fixed inset-x-0 top-0 z-50 capitalize">
      <nav className="flex items-center justify-between px-6 py-3 lg:px-8" aria-label="Global">
        <div className=" flex me-4">
          <Link to={'home'} className="lg:pe-4"></Link>
          
          <img className="" src={logo} width={120} alt="" />
          <Link/>
        

        </div>

        
        <div onClick={() => setIsOpen(true)} className="flex lg:hidden">
          <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 bg-gray-200 hover:bg-gray-100">
            <span className="sr-only">Open main menu</span>
            <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>{userToken && <div className="hidden lg:flex lg:gap-x-3 ">

          <NavLink to={'/'} className= "text-gray-600 text-sm/6">Home</NavLink> 
          <NavLink to={'cart'} className= "text-gray-600 text-sm/6">Cart</NavLink>
          
          <NavLink to={'brands'} className=" text-gray-600 text-sm/6">Brands</NavLink>
          <NavLink to={'categories'} className="text-gray-600 text-sm/6 ">Categories</NavLink>
          <NavLink to={'products'} className=" text-gray-600 text-sm/6">Products</NavLink>
        </div> }
        
        <div className="hidden lg:flex lg:flex-1 lg:justify-end space-x-3">
          {userToken ? < span onClick={() => logout()} className="text-sm/6 text-gray-600 ">Log Out</span> : <>
          <NavLink to={'register'} className="text-sm/6 text-gray-600 ">Register</NavLink>
          <NavLink to={'login'} className=" text-sm/6 text-gray-600">Login <span aria-hidden="true">→</span></NavLink>
          
          </>}
          
          
        </div>
      </nav>
      {/* Mobile menu, show/hide based on menu open state. */}
      <div className={isOpen ? "lg:hidden" : "hidden"} role="dialog" aria-modal="true">
        {/* Background backdrop, show/hide based on slide-over state. */}
        <div className="fixed inset-0 z-50" />
        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <NavLink to={'home'} className="-m-1.5 p-1.5">
              
              <img className="" src={logo} width={120} alt="" />
            </NavLink>
            <button onClick={() => setIsOpen(false)} type="button" className="-m-2.5  bg-white  hover:bg-light  rounded-md p-2.5 text-gray-700">
              <span className="sr-only">Close menu</span>
              <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10"> 
            {userToken &&  <div className="space-y-2 py-6">

                <NavLink to={'/'} className="block rounded-lg  text-base/7 font-medium text-gray-600 hover:bg-gray-50">Home</NavLink>
                <NavLink to={'cart'} className="block rounded-lg  text-base/7 font-medium text-gray-600 hover:bg-gray-50">Cart</NavLink>
                <NavLink to={'brands'} className="block rounded-lg  text-base/7 font-medium text-gray-600 hover:bg-gray-50">Brands</NavLink>
                <NavLink to={'categories'} className="block rounded-lg  text-base/7 font-medium text-gray-600 hover:bg-gray-50">Categories</NavLink>
                <NavLink to={'products'} className="block rounded-lg  text-base/7 font-medium text-gray-600 hover:bg-gray-50">Products</NavLink>
              </div>}
             
              <div className="py-6"> {
                userToken ? <span  onClick={() => logout()} className="block rounded-lg  text-base/7 font-medium text-gray-600 hover:bg-gray-50">Log Out</span> : 
                <> 
                <NavLink onClick={() => setIsOpen(false)}  to={'register'} className="block rounded-lg  text-base/7 font-medium text-gray-600 hover:bg-gray-50">Register</NavLink>
                <NavLink onClick={() => setIsOpen(false)} to={'login'} className="block rounded-lg  text-base/7 font-medium text-gray-600 hover:bg-gray-50">Log in <span aria-hidden="true">→</span></NavLink>
                </>}
                
                             </div>
            </div>
          </div>
        </div>
      </div>
    </header>

  </>
}

  
    
  




  
   
  

