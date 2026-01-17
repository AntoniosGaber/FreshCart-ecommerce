
import React, { useContext, useState } from "react";
import style from "./Navbar.module.css";
import logo from "../../assets/images/freshcart-logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { CartContext } from "../../context/CartConText";

export default function Navbar() {
  let navigate = useNavigate();
  let { userToken, setUserToken } = useContext(UserContext);
  let { cart } = useContext(CartContext);

  const [isOpen, setIsOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  function logout() {
    localStorage.removeItem("userToken");
    setUserToken(null);
    setIsOpen(false);
    setAccountOpen(false);
    navigate("/login");
  }

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <header className="bg-gray-200 fixed inset-x-0 top-0 z-50 capitalize">
        <nav
          className="flex items-center justify-between px-4 py-2 lg:px-6"
          aria-label="Global"
        >
          {/* Logo */}
          <div className="flex me-4">
            <Link to="/" className="lg:pe-4" onClick={closeMenu}>
              <img src={logo} width={120} alt="FreshCart" />
            </Link>
          </div>

          {/* Hamburger */}
          <div
            onClick={() => {
              setIsOpen(true);
              setAccountOpen(false);
            }}
            className="flex lg:hidden"
          >
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 bg-gray-200 hover:bg-gray-100"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="size-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>

          {/* Desktop Links */}
          {userToken && (
            <div className="hidden lg:flex lg:gap-x-3 items-center">
              <NavLink to="/" className="text-gray-600 text-sm/6">
                Home
              </NavLink>

              <NavLink to="/brands" className="text-gray-600 text-sm/6">
                Brands
              </NavLink>

              <NavLink to="/categories" className="text-gray-600 text-sm/6">
                Categories
              </NavLink>

              <NavLink to="/products" className="text-gray-600 text-sm/6">
                Products
              </NavLink>
            </div>
          )}

          {/* Desktop Auth */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-3">
            {userToken ? (
              <>
                {/* Cart */}
                <NavLink to="/cart" className="text-gray-600 text-sm/6">
                  <div className="relative inline-flex items-center">
                    <i className="fas fa-shopping-cart text-xl"></i>

                    {!!cart?.numOfCartItems && (
                      <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 rounded-full bg-red-600 text-white text-xs flex items-center justify-center">
                        {cart.numOfCartItems}
                      </span>
                    )}
                  </div>
                </NavLink>

                {/* Account Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setAccountOpen((v) => !v)}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-100 text-gray-600"
                  >
                    <i className="fa-solid fa-user text-base"></i>
                    <span className="hidden md:inline text-sm font-medium">
                      Account
                    </span>
                    <i className="fa-solid fa-chevron-down text-xs"></i>
                  </button>

                  {accountOpen && (
                    <ul
                      className="absolute right-0 mt-2 w-48 rounded-lg border bg-white shadow-md overflow-hidden"
                      onMouseLeave={() => setAccountOpen(false)}
                    >
                      

                      <li>
                        <NavLink
                          to="/changeMyPassword"
                          onClick={() => setAccountOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 text-[13px] text-gray-700 hover:bg-gray-50"
                        >
                          <i className="fa-solid fa-lock text-sm"></i>
                          Change Password
                        </NavLink>
                      </li>

                      <li>
                        <NavLink
                          to="/upDateProfile"
                          onClick={() => setAccountOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 text-[13px] text-gray-700 hover:bg-gray-50"
                        >
                          <i className="fa-solid fa-pen text-sm"></i>
                          Update Profile
                        </NavLink>
                      </li>

                      <li className="border-t">
                        <button
                          type="button"
                          onClick={logout}
                          className="flex w-full items-center gap-2 px-3 py-2 text-[13px] text-red-600 hover:bg-red-50"
                        >
                          <i className="fa-solid fa-right-from-bracket text-sm"></i>
                          Log out
                        </button>
                      </li>
                    </ul>
                  )}
                </div>
              </>
            ) : (
              <>
                <NavLink to="/register" className="text-sm/6 text-gray-600">
                  Register
                </NavLink>

                <NavLink to="/login" className="text-sm/6 text-gray-600">
                  Login <span aria-hidden="true">→</span>
                </NavLink>
              </>
            )}
          </div>
        </nav>

        {/* Mobile menu */}
        <div className={isOpen ? "lg:hidden" : "hidden"} role="dialog" aria-modal="true">
          <div className="fixed inset-0 z-50" />

          {/* ✅ smaller mobile drawer */}
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-4 py-4 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <NavLink to="/" onClick={closeMenu} className="-m-1.5 p-1.5">
                <img src={logo} width={110} alt="FreshCart" />
              </NavLink>

              <button
                onClick={closeMenu}
                type="button"
                className="rounded-md p-2 text-gray-700 hover:bg-gray-100"
              >
                <span className="sr-only">Close menu</span>
                <svg
                  className="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="mt-4 flow-root">
              <div className="divide-y divide-gray-200">
                {userToken && (
                  <div className="py-4 space-y-1">
                    <NavLink
                      to="/"
                      onClick={closeMenu}
                      className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Home
                    </NavLink>

                    <NavLink
                      to="/brands"
                      onClick={closeMenu}
                      className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Brands
                    </NavLink>

                    <NavLink
                      to="/categories"
                      onClick={closeMenu}
                      className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Categories
                    </NavLink>

                    <NavLink
                      to="/products"
                      onClick={closeMenu}
                      className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Products
                    </NavLink>
                  </div>
                )}

                <div className="py-4 space-y-1">
                  {userToken ? (
                    <>
                      <NavLink
                        to="/cart"
                        onClick={closeMenu}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        <i className="fas fa-shopping-cart text-base"></i>
                        <span>Cart</span>

                        {cart?.numOfCartItems > 0 && (
                          <span className="ml-auto min-w-[18px] h-[18px] rounded-full bg-red-600 text-white text-[11px] flex items-center justify-center">
                            {cart.numOfCartItems}
                          </span>
                        )}
                      </NavLink>

                      
                      <NavLink
                        to="/changeMyPassword"
                        onClick={closeMenu}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        <i className="fa-solid fa-lock text-base"></i>
                        <span>Change Password</span>
                      </NavLink>

                      <NavLink
                        to="/upDateProfile"
                        onClick={closeMenu}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        <i className="fa-solid fa-pen text-base"></i>
                        <span>Update Profile</span>
                      </NavLink>

                      <button
                        type="button"
                        onClick={logout}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                      >
                        <i className="fa-solid fa-right-from-bracket text-base"></i>
                        <span>Log Out</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <NavLink
                        onClick={closeMenu}
                        to="/register"
                        className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        Register
                      </NavLink>

                      <NavLink
                        onClick={closeMenu}
                        to="/login"
                        className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        Log in <span aria-hidden="true">→</span>
                      </NavLink>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

