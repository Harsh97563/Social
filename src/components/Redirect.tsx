'use client';
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

export function Redirect({ to }: {to: string}) {
    const router = useRouter()
    useEffect(() => {
        console.log("run");
        router.push(to)
    }, [to, router])
    
  return (
    <div></div>
  )
}
