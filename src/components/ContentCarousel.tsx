'use client'
import * as React from "react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import Image from "next/image"

export function ContentCarousel({files}: {files: File[] | string[]}) {

    const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }
 
    setCount(files.length)
    setCurrent(api.selectedScrollSnap() + 1)
 
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api, files])


  return (
      <Carousel setApi={setApi} className="">
        <CarouselContent>
          {files.map((file, index) => (
            <CarouselItem key={index}>
              <div className="flex flex-col h-[375px] relative w-full">
                  <Image
                  src={file instanceof File ? URL.createObjectURL(file) : file}
                  alt={`Preview ${index + 1}`}
                  className=" object-contain z-0"
                  fill
                  />
                  <Image
                  src={file instanceof File ? URL.createObjectURL(file) : file}
                  alt={`Background ${index + 1}`}
                  fill 
                  className=" object-cover rounded-3xl bg-black -z-10 blur-xl opacity-30"
                  />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute right-5 bottom-1 p-0.5 rounded-lg px-2 text-center text-sm bg-gray-900 ">
          {current}/{count}
        </div>
        <CarouselPrevious className="absolute invisible md:visible"/>
        <CarouselNext className="absolute invisible md:visible" />
      </Carousel>
  )
}
