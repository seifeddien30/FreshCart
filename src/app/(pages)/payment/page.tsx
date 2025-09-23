"use client"
import React, { useContext, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { orderFormType, orderSchema } from '@/schema/order.schema'
import { payCashAction } from '@/paymendAction/payCash'
import { OrderError } from '@/types/orderError.type'
import { toast } from 'react-toastify'
import { cartContext } from '@/context/contextCartProvider'
import { ScaleLoader } from 'react-spinners'
import { useRouter } from 'next/navigation'
import { payOnlineAction } from '@/paymendAction/payOnline'
const Payment = () => {
    const [pay, setPay] = useState("cash")
    const [isLoading, setIsLoading] = useState(false)
    const { data: cartData, refetch } = useContext(cartContext)!
    const route = useRouter()
    // validation==========================================================
    const form = useForm<orderFormType>({
        defaultValues: {
            shippingAddress: {
                details: "",
                phone: "",
                city: ""
            }
        }
        ,
        mode: "onTouched",
        resolver: zodResolver(orderSchema),
    })
    // pay cash ===============================================================

    async function payCash(id: string, values: orderFormType) {
        try {
            const data = await payCashAction(id, values)
            toast.success(data?.status || "success"
                , {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            refetch()
            route.push('/allorders')
        } catch (err) {
            const error = err as OrderError
            toast.error(error?.message || "Something went wrong"
                , {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
        } finally {
            setIsLoading(false)
        }
    }
    // pay online===========================================
    async function payOnline(id: string, values: orderFormType) {
        try {
            const data = await payOnlineAction(id, values)
            location.href = data.session.url
        } catch (err) {
            const error = err as OrderError
            toast.error(error?.message || "Something went wrong"
                , {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
        } finally {
            setIsLoading(false)
        }
    }

    // payment==================================================================
    function payment(values: orderFormType) {
        setIsLoading(true)
        if (pay == "payOnline") {
            if (cartData) {
                payOnline(cartData.cartId, values)
            }
        } else {
            if (cartData) {
                payCash(cartData.cartId, values)
            }
        }

    }

    // change text payment================================
    let text;
    if (pay == "payOnline") {
        text = "pay online"
    } else {
        text = "pay cash"
    }

    return (
        <main className=' min-h-dvh flex items-center justify-center  px-5  pt-[4rem]'>
            <section className='w-full  md:w-2/3 mx-auto rounded-[8px] overflow-hidden  shadow-2xl'>
                <section className='mb-4 bg-main p-4'>
                    <h2 className='capitalize text-white text-[1.5rem]'>Complete Your Payment</h2>
                    <p className='capitalize text-[#c5c3c3]'>Choose a payment method below</p>
                </section>
                <section className="px-5 flex items-center gap-4">
                    <button type='button' onClick={() => setPay("cash")} className={`${pay == "cash" ? "bg-main text-white" : " hover:bg-[#ECFDF5]"} cursor-pointer rounded-[8px] px-4 py-2 border capitalize transition-all duration-300 b`}>cash on delivery</button>
                    <button type='button' onClick={() => setPay("payOnline")} className={`${pay == "payOnline" ? "bg-main text-white" : " hover:bg-[#ECFDF5]"} cursor-pointer rounded-[8px] px-4 py-2 border capitalize transition-all duration-300 b`}>pay online</button>
                </section>
                <section className="px-5">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(payment)} className="space-y-8 py-7">
                            {/* email */}
                            <FormField
                                control={form.control}
                                name="shippingAddress.details"
                                render={({ field }) => (
                                    <FormItem className="mb-4 gap-0">
                                        <FormLabel className="mb-[.7rem]">Details</FormLabel>
                                        <FormControl >
                                            <Input className=" mb-2 focus-visible:ring-0 focus-visible:outline-none focus-visible:border-main focus:border-main focus:outline-main focus:shadow-[0_0_0_3px_rgba(34,197,94,0.5)]" type="text" placeholder="Details....." {...field} />
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage className="bg-[#F8D7DA] px-3 py-1 rounded-[8px] text-[#581528] text-[1rem] border-1 border-[#f7bfc4]" />
                                    </FormItem>
                                )}
                            />
                            {/* phone */}
                            <FormField
                                control={form.control}
                                name="shippingAddress.phone"
                                render={({ field }) => (
                                    <FormItem className="mb-4 gap-0">
                                        <FormLabel className="mb-[.7rem]">Phone</FormLabel>
                                        <FormControl >
                                            <Input className=" mb-2 focus-visible:ring-0 focus-visible:outline-none focus-visible:border-main focus:border-main focus:outline-main focus:shadow-[0_0_0_3px_rgba(34,197,94,0.5)]" type="tel" placeholder="01000000000" {...field} />
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage className="bg-[#F8D7DA] px-3 py-1 rounded-[8px] text-[#581528] text-[1rem] border-1 border-[#f7bfc4]" />
                                    </FormItem>
                                )}
                            />
                            {/* city */}
                            <FormField
                                control={form.control}
                                name="shippingAddress.city"
                                render={({ field }) => (
                                    <FormItem className="mb-4 gap-0">
                                        <FormLabel className="mb-[.7rem]">City</FormLabel>
                                        <FormControl >
                                            <Input className=" mb-2 focus-visible:ring-0 focus-visible:outline-none focus-visible:border-main focus:border-main focus:outline-main focus:shadow-[0_0_0_3px_rgba(34,197,94,0.5)]" type="text" placeholder="Ex:cairo" {...field} />
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage className="bg-[#F8D7DA] px-3 py-1 rounded-[8px] text-[#581528] text-[1rem] border-1 border-[#f7bfc4]" />
                                    </FormItem>
                                )}
                            />
                            <section >
                                <Button disabled={isLoading} type="submit" className=" focus-visible:ring-0 focus-visible:outline-none focus-visible:border-main focus:border-main focus:outline-main focus:shadow-[0_0_0_3px_rgba(34,197,94,0.5)] bg-main cursor-pointer hover:bg-green-500 px-7 capitalize text-[1rem]" >  {isLoading ? <ScaleLoader height={20}
                                    width={4} color="#fff" /> : text}  </Button>
                            </section>
                        </form>
                    </Form>
                </section>


            </section>
            <title>Payment</title>
        </main>
    )
}

export default Payment
