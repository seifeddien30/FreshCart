import Cart from "@/app/_common/cart/Cart";
import Link from "next/link";
import React from "react";
import { FaStar } from "react-icons/fa6";
import WishList from "../wishList/WishList";
import sale from "@/assets/images/sale.png";
import Image from "next/image";
import { prodcut } from "@/types/product.type";
const MyCard = ({ product } : { product : prodcut }) => {



  return (
    <section className="shadow-xl relative  overflow-hidden">
      {product.priceAfterDiscount !=0 && product.priceAfterDiscount && (
        <Image
          src={sale}
          alt="sale"
          className="w-[80px] absolute top-0 left-0"
        />
      )}

      <Link href={`/prodcutDetails/${product._id}`}>
        <Image
          className="w-[70%] mx-auto sm:w-full  h-[300px] object-cover"
          src={product.imageCover}
          alt={product.title}
          width={500}
          height={500}
        />
        <section className="px-3 py-2 ">
          <section>
            <h3 className="text-main capitalize text-[.9rem] mb-1">
              {product.category.name}
            </h3>
            <h2 className="text-gray-600 line-clamp-1 text-[1.2rem] mb-1">
              {product.title}
            </h2>
          </section>
          <section>
            <section >
              <section className=" gap-1">
                <section className=" flex items-center gap-1 md:block xl:flex">
                  {product.priceAfterDiscount !=0  && product.priceAfterDiscount && (
                    <p className="font-[600] text-green-600 items-center">
                      {product.priceAfterDiscount} EGP
                    </p>
                  )}
                  <p
                    className={`text-[.9rem] ${
                      product.priceAfterDiscount
                        ? "line-through"
                        : "text-green-600"
                    }  items-center ${
                      product.priceAfterDiscount ? "font-[300]" : "font-[600]"
                    }`}
                  >
                    {product.price} EGP
                  </p>
                </section>
                <p className="flex items-center gap-1">
                  <span className="text-yellow-400">
                    <FaStar />
                  </span>
                  <span>{product.ratingsAverage}</span>
                </p>
              </section>
            </section>
          </section>
        </section>
      </Link>
      <Cart id={product.id} />
      <WishList prop={"absolute"} productId={product.id} />
    </section>
  );
};

export default MyCard;
