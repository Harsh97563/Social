'use client'
import { useToast } from '@/hooks/use-toast'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function ConnectToTwitterBtn() {

    const router = useRouter()
    const searchParams = useSearchParams()
    const oauthAccessToken = searchParams.get('oauth_token')
    const oauthAccessVerifier = searchParams.get('oauth_verifier')
    const [isConnecting, setIsConnecting] = useState(false)
    const { toast } = useToast()

    async function RedirectToTwitter() {
        
        try {
            setIsConnecting(true)
            const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/connecttwitter`, {
                oauthAccesstoken: null,
                oauthAccessSecret: null
            }) 
            
            router.push(`https://api.x.com/oauth/authorize?oauth_token=${response.data.oauth_token}`)
            
        } catch (error) {
            toast({
                description: "Twitter connection failed.",
                className: "bg-gray-950 text-white border-red-500",
                duration: 2000
            })
        } finally {
            setIsConnecting(false)
        }
        
        
    }

    useEffect(() => {
        if(!oauthAccessToken || !oauthAccessVerifier) return 
        
        async function sendCode() {
            
            try {
                setIsConnecting(true)
                const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/connecttwitter`, {
                    oauthAccessToken,
                    oauthAccessVerifier

                }) 
                
                if(response.status === 200) {
                    toast({
                        description: "Twitter connected successfully.",
                        className: "bg-gray-950 text-white border-green-500",
                        duration: 2000
                    })
                }

            } catch (error) {
                
                console.log(error);
                toast({
                    description: "Twitter connection failed.",
                    className: "bg-gray-950 text-white border-red-500",
                    duration: 2000
                })
                
            } finally {
                setIsConnecting(false)
            }

        }

        sendCode()
    }, [oauthAccessToken, oauthAccessVerifier, toast])
    

  return (
    <button
    onClick={RedirectToTwitter}
    disabled={isConnecting}
    className='bg-backgroundFirst p-2 border-2 border-black rounded-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer disabled:opacity-70'
    >{isConnecting ? <Loader2 className='animate-spin mx-auto'/> : "Connect to twitter"}</button>
  )
}

export default ConnectToTwitterBtn