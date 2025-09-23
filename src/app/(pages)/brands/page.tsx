import BrandsApi from "@/Apis/brands";
import BrandsData from "@/app/_components/BrandsData/BrandsData";
import Loading from "@/app/_components/loding/Loading";
import React, { Suspense } from "react";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Brands",
  description: "buy by brands",
};
const Brands = async () => {
const data = await BrandsApi()
  return (
    <>
      <main className="pt-[5.4rem]">
        <section className="w-full md-[85%] px-3 md:px-7 lg:px-10">
          <h2 className="text-center mb-5 relative capitalize text-main text-[1.4rem] after:absolute after:bg-gray-400 after:h-[1px] after:w-full after:bottom-[-5px] after:left-0     before:absolute       before:bg-gray-400 before:h-[1px] before:w-full before:top-[-5px] before:left-0">
            shop by brand
          </h2>
          <Suspense fallback={<Loading/>}>
          <BrandsData initData={data}/>
          </Suspense>
        </section>
      </main>
    </>
  );
};

export default Brands;
