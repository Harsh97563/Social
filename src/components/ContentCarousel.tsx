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
    <div className="">
      <Carousel setApi={setApi} className="w-full relative ">
        <CarouselContent>
          {files.map((file, index) => (
            <CarouselItem key={index}>
              <div className="flex flex-col relative w-full h-full items-center justify-center">
                <div className="max-h-[375px]">
                  <Image
                  src={file instanceof File ? URL.createObjectURL(file) : file}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full"
                  />
                  <Image
                  src={file instanceof File ? URL.createObjectURL(file) : file}
                  alt={`Background ${index + 1}`} 
                  className="absolute top-0 left-0 w-full h-full object-cover object-center rounded-3xl bg-black opacity-30 -z-10 blur-xl"
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute right-5 bottom-1 py-2 text-center text-sm text-muted-foreground">
          {current}/{count}
        </div>
        <CarouselPrevious className="absolute"/>
        <CarouselNext className="absolute" />
      </Carousel>
    </div>
  )
}
