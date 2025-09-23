"use client"
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import BrandAndCategoryCard from '../brandAndCategoryCard/brandAndCategoryCard'
import { brandData } from '@/types/brands.type'

const Brands = ({initData} : {initData:brandData}) => {


  const {data} = useQuery({
    queryKey:["brands"],
    queryFn:()=>initData,
    initialData:initData
  })

  
  return (
    <>
      <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5 gap-4  py-7'>
        {data?.data.map(brand=> <BrandAndCategoryCard check={"brands"} key={brand._id} result={brand}/>)}
      </section>
    </>
  )
}

export default Brands
