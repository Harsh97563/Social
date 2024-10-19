'use client'
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

function Verify() {
    const [code, setcode] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const router = useRouter();
    const { update } = useSession()

    async function handleVerification() {
        try {
            setIsLoading(true)
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify?code=${code}`)

            if(response.data.status !== 200) {
                if(response.status == 400) {
                    throw new Error("Wrong Verification code.")
                }

            }
            
            toast({
                description: "Verification complete.",
                className: "bg-gray-950 text-white border-green-500",
                duration: 2000
            })
            await update({isVerified: true})
            router.push('/')

        } catch (error: any) {
            
            toast({
                description: error.response.data.message || "Unexpected error occured.",
                className: "bg-gray-950 text-white border-red-500",
                duration: 2000
            })

        } finally {
            setIsLoading(false)
        }
    }

  return (
    <div className='flex w-full mt-32 items-center justify-center'>
        <div className=' min-w-[30vw] flex flex-col space-y-8 text-center justify-center m-2 bg-[#384B70] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-5'>
            <div className='text-3xl font-bold text-white'>Check your email for verification code.</div>
            <input className='bg-backgroundSecond shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-5 w-full rounded-sm text-xl outline-none disabled:cursor-not-allowed disabled:opacity-70 placeholder:text-black placeholder:opacity-60 text-center' type="text"
            maxLength={6}
            placeholder='000000'
            disabled={isLoading}
            onChange={(e) => setcode(e.target.value)}
            />
            <button className='bg-backgroundSecond shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-5 w-full rounded-sm text-xl mb-5 disabled:opacity-70'
            onClick={handleVerification}
            disabled={isLoading}
            >{isLoading? <Loader2 className='mx-auto animate-spin'/> : "Verify!"}</button>
        </div>
    </div>
  )
}

export default Verify