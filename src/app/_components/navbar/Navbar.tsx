"use client";
import React, { useState, useContext } from "react";
import Image from "next/image";
import logo from "@/assets/images/freshcart-logo.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiMiniBars3 } from "react-icons/hi2";
import { GoX } from "react-icons/go";
import { useSession } from "next-auth/react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Avatar } from "@radix-ui/react-avatar";
import { FaRegUser } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import { MdOutlineShoppingCart } from "react-icons/md";
import { signOut } from "next-auth/react"
import { SyncLoader } from "react-spinners";
import { ScaleLoader } from "react-spinners";
import { LuUser } from "react-icons/lu";
import { FaKey } from "react-icons/fa";
import { Badge } from "@/components/ui/badge"
import { cartContext } from '@/context/contextCartProvider'
import { wishlistContext } from "@/context/contextWishListProvider";
const Navbar = () => {
  const pathName = usePathname();
  const [nav, setNav] = useState("h-0");
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession()
  const { data } = useContext(cartContext)!
  const { data: wishData } = useContext(wishlistContext)!
  // handle navbar======================================================
  function handleNav() {
    if (nav == "h-0") {
      setNav("h-[250px]");
    } else {
      setNav("h-0");
    }
  }

  // log out==========================
  async function logOut() {
    setLoading(true)
    await signOut({
      callbackUrl: "/login"
    })
    setLoading(false)
  }

  // ?jsx code ==========================================================
  return (
    <>
      <nav className="bg-[#F0F3F2] fixed top-0 left-0 right-0 z-20">
        <section className=" w-full md-[85%] px-3 md:px-7 lg:px-10 flex flex-wrap md:flex-nowrap items-center justify-between mx-auto p-4">
          {/* logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Image src={logo} alt="fresh  cart logo" className="w-[140px] sm:w-[150px]" />
          </Link>
          {/* right side */}
          <section className="flex md:order-2">
            <section className="relative flex items-center ">
              {status == "loading" && <SyncLoader color="#a1a1a1" margin={3}
                size={9} />}
              {status == "authenticated" && <>
                <section >
                  <Link
                    href="/cart"
                    className="block p-1 px-1 text-[1.4rem] relative  text-[#404247] font-[400]   transition-all duration-300 capitalize rounded-sm "
                  >
                    <Badge className=" absolute rounded-full left-[-4px] top-[-2px] w-[15px] h-[15px] bg-red-600" >
                      {data?.numOfCartItems}
                    </Badge>
                    <MdOutlineShoppingCart />
                  </Link>
                </section>
                <section>
                  <Link
                    href="/wishList"
                    className="block relative p-1 px-1 text-[1.4rem]  text-[#404247] font-[400]   transition-all duration-300 capitalize rounded-sm "
                  >
                    <Badge className=" absolute rounded-full left-[-3px] top-[-2px] w-[15px] h-[15px] bg-red-600" >
                      {wishData?.count}
                    </Badge>
                    <CiHeart />
                  </Link>
                </section>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar className="w-[40px] h-[40px]  cursor-pointer mr-2 md:mr-0">
                      <section className="w-full text-[1.7rem] text-[#404247]"> <FaRegUser /></section>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white shadow-[8px] p-2 -translate-x-7 translate-y-2 w-[150px] rounded-[8px]">

                    <h3 className="text-center capitalize mb-1">hi <span className="text-main">{session.user.name}</span></h3>
                    <Link
                      href="/updateUser"
                      className="flex items-center gap-1 mb-2  p-1 px-2 text-[1rem]  text-[#404247]  hover:bg-main hover:text-white transition-all duration-300 capitalize rounded-sm "
                    >
                      <LuUser className="w-[20px] h-[20px]" /> update user
                    </Link>
                    <Link
                      href="/changePassword"
                      className="flex items-center gap-1 mb-2  p-1 px-2 text-[1rem]  text-[#404247]  hover:bg-main hover:text-white transition-all duration-300 capitalize rounded-sm "
                    >
                      <FaKey className="w-[20px] h-[20px]" /> update pass
                    </Link>


                    <button
                      type="button"
                      onClick={logOut}
                      className="block mb-2 p-1 px-2 text-[1rem] w-full text-left cursor-pointer text-[#404247] font-[400] hover:bg-red-500 hover:text-white transition-all duration-300 capitalize rounded-sm "
                    >
                      {loading ? <ScaleLoader height={20}
                        width={2} color="#0AAD0A" /> : "log out"}
                    </button>
                  </DropdownMenuContent>
                </DropdownMenu>

              </>}

              {status == "unauthenticated" && <>
                <Link
                  href="/login"
                  className={`${pathName == "/login" && "active"} block text-[#404247]  p-2  text-[1rem] sm:text-[1rem]  font-[400]  transition-all duration-300 hover:text-main  capitalize rounded-sm `}
                >
                  login
                </Link>
                <Link
                  href="/register"
                  className={`${pathName == "/register" && "active"} block text-[#404247]  p-2  text-[1rem] sm:text-[1rem]  font-[400]  transition-all duration-300 hover:text-main  capitalize rounded-sm `}
                >
                  register
                </Link>
              </>}
            </section>
            {status == "authenticated" && <button
              data-collapse-toggle="navbar-search"
              onClick={handleNav}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-[3rem] cursor-pointer text-gray-500 rounded-lg md:hidden "
              aria-controls="navbar-search"
              aria-expanded="false"
            >
              {nav == "h-0" ? <HiMiniBars3 /> : <GoX />}
            </button>}

          </section>
          {/* nav */}
          {status == "authenticated" && <section
            className={`items-center   ${nav}  overflow-hidden transition-all duration-300 md:overflow-visible  justify-between  w-full md:flex md:w-auto md:order-1 bg-[#F0F3F2]`}
            id="navbar-search"
          >
            <ul className="flex text-center flex-col p-2 md:p-0 mt-4 font-medium   rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0   ">
              <li className="!mx-4">
                <Link
                  href="/"
                  onClick={() => setNav("h-0")}
                  className={` ${pathName == "/" && "active"
                    }  block text-[1.1rem] py-2 md:py-0 text-[#404247] font-[400] hover:text-main transition-all duration-300 capitalize rounded-sm `}
                >
                  home
                </Link>
              </li>
              <li className="!mx-4">

                <Link
                  href="/products"
                  onClick={() => setNav("h-0")}
                  className={` ${pathName == "/products" && "active"
                    }  block text-[1.1rem] py-2 md:py-0 text-[#404247] font-[400] hover:text-main transition-all duration-300 capitalize rounded-sm `}
                >
                  products
                </Link>
              </li>
              <li className="!mx-4">

                <Link
                  href="/brands"
                  onClick={() => setNav("h-0")}
                  className={` ${pathName == "/brands" && "active"
                    }  block text-[1.1rem] py-2 md:py-0 text-[#404247] font-[400] hover:text-main transition-all duration-300 capitalize rounded-sm `}
                >
                  brands
                </Link>
              </li>
              <li className="!mx-4">

                <Link
                  href="/category"
                  onClick={() => setNav("h-0")}
                  className={` ${pathName == "/category" && "active"
                    }  block text-[1.1rem] py-2 md:py-0 text-[#404247] font-[400] hover:text-main transition-all duration-300 capitalize rounded-sm `}
                >
                  category
                </Link>
              </li>
              <li className="!mx-4">

                <Link
                  href="/allorders"
                  onClick={() => setNav("h-0")}
                  className={` ${pathName == "/orders" && "active"
                    }  block text-[1.1rem] py-2 md:py-0 text-[#404247] font-[400] hover:text-main transition-all duration-300 capitalize rounded-sm `}
                >
                  orders
                </Link>
              </li>
            </ul>
          </section>}

        </section>
      </nav>
    </>
  );
};

export default Navbar;
