import React from 'react'
import { motion } from 'framer-motion';
import { StreakTypes } from '@prisma/client';

interface DaysOptionBtn {
    days: StreakTypes
    selectedDays: StreakTypes | null,
    setSelectedDays: any,

}

function DaysOptionBtn({days, selectedDays, setSelectedDays}: DaysOptionBtn) {

  return (
    <motion.div className='bg-backgroundFirst p-2 border-2 border-black rounded-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer font-semibold'
    animate= {{
        scale: selectedDays === days ? 1.1 : 1,
        backgroundColor: selectedDays === days ? "#257180" : "",
        border: selectedDays === days ? "2px solid #000000" : ""
    }}
    onClick={() => setSelectedDays(selectedDays !== days ? days : null)}
    >{days.slice(4)} Days</motion.div>
  )
}

export default DaysOptionBtn