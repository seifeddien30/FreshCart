import { brands } from "@/types/brands.type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BrandAndCategoryCard = ({
  result,
  check
}: {
  result: brands;
  check:string
}) => {
  return (
    <Link
      href={ check =="brands"? `/brandDetails/${result._id}`: `/categoryProducts/${result._id}`}
      className="shadow-2xl bg-[#F0F3F2] group cursor-pointer rounded-2xl overflow-hidden"
    >
      <figure>
        <Image
          width={500}
          height={500}
          src={result.image}
          alt={result.slug}
          className="w-full group-hover:scale-110 transition-all duration-300 object-cover h-[200px]"
        />
      </figure>
      <figcaption className="p-3">
        <p className="text-center text-[1.1rem] font-medium text-main capitalize">
          {result.name}
        </p>
      </figcaption>
    </Link>
  );
};

export default BrandAndCategoryCard;
