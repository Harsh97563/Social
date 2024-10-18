"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function StreakModal() {

    const [streakData, setStreakData] = useState<{streakCount: number} | null>(null)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        

        async function getStreakDetails() {
            
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/streak`)

                setStreakData(response.data.streakData);
                const startTime = new Date().setHours(0, 0, 0, 0);
                const endTime = new Date().setHours(23, 59, 59, 999);
                const updatedAt = new Date(response.data.streakData.updatedAt);
                updatedAt.setDate(updatedAt.getDate() + 1);
                
                if(startTime <= updatedAt.getTime() && updatedAt.getTime() <=endTime ) {
                    setIsOpen(false)
                    

                } else {
                    const updatedAt = new Date(response.data.streakData.updatedAt);
                    const todayDate = new Date();
                    if(updatedAt.getDate() !== todayDate.getDate() && response.data.streakData.seen === false) {
                        setIsOpen(true)
                    }
                }

                
            } catch (error) {
                console.log(error);
                
            }
            
        }

        getStreakDetails()

    }, [])
    

  return (
    <div className={`${isOpen ? "flex" : "hidden"} z-50 items-center justify-center fixed w-screen h-screen top-0 left-0 bg-gray-700 bg-opacity-35`}>
        <div className='flex flex-col items-center justify-center space-y-2 rounded-sm p-4 bg-backgroundFirst mx-2 w-[420px] border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'>
            <div className='text-lg text-center'>Your failed to continue your last streak.</div>
            <div className='text-2xl font-semibold text-center'>You can always start a new one.</div>
            <div className='mb-4 text-xl'>It last&apos;s for {streakData?.streakCount} days.</div>
            <button className='p-2 bg-backgroundSecond px-5 text-md border rounded-sm border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
            onClick={() => setIsOpen(false)}
            >Close</button>
        </div>
    </div>
  )
}

export default StreakModal