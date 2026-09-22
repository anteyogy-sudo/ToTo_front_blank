"use client"

import React from "react"
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"
import {ChevronLeft, ChevronRight} from "lucide-react"
// ToDo: Why not using import?: {ArrowLeft, ArrowRight} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    )
    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(false)

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev()
    }, [api])

    const scrollNext = React.useCallback(() => {
      api?.scrollNext()
    }, [api])

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault()
          scrollPrev()
        } else if (event.key === "ArrowRight") {
          event.preventDefault()
          scrollNext()
        }
      },
      [scrollPrev, scrollNext]
    )

    React.useEffect(() => {
      if (!api || !setApi) {
        return
      }

      setApi(api)
    }, [api, setApi])

      React.useEffect(() => {
          if (!api) return

          const update = () => {
              setCanScrollPrev(api.canScrollPrev())
              setCanScrollNext(api.canScrollNext())
          }

          update();

          api.on("reInit", update)
          api.on("select", update)

          return () => {
              api.off("reInit", update)
              api.off("select", update)
          }
      }, [api])

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "" : "mt-0 flex-col",
          className
        )}
        {...props}
      />
    </div>
  )
})
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel()

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0",
        orientation === "horizontal" ? "pl-[0px]" : "pt-4",
        className
      )}
      {...props}
    />
  )
})
CarouselItem.displayName = "CarouselItem"


// PREV BUTTON
const CarouselPrevious = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
    ({ className, variant = "outline", size = "icon", ...props }, ref) => {
        const { orientation, scrollPrev, canScrollPrev } = useCarousel()
        return (
            <Button ref={ref} variant={variant} size={size}
                    className={cn(
                        "flex rounded-full lg:w-[55px] lg:h-[55px] w-[35px] h-[35px] shrink-0 shadow z-10 hover:bg-white-500 bg-white-500 focus:bg-white-500 hover:text-primary-blue transition duration-300",
                        !canScrollPrev && 'hidden',
                        orientation === "horizontal" ? "" : "rotate-90",
                        className
                    )}
                    disabled={!canScrollPrev}
                    onClick={scrollPrev}
                    {...props}
            >
                <ChevronLeft className="!w-[24px] !h-[24px]" />
                <span className="sr-only">Previous slide</span>
            </Button>
        )
    })
CarouselPrevious.displayName = "CarouselPrevious"

// NEXT BUTTON
const CarouselNext = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
    ({ className, variant = "outline", size = "icon", ...props }, ref) => {
        const { orientation, scrollNext, canScrollNext } = useCarousel()

        return (
            <Button ref={ref} variant={variant} size={size}
                    className={cn(
                        "flex rounded-full lg:w-[55px] lg:h-[55px] w-[35px] h-[35px] shrink-0 shadow z-10 items-center justify-center p-2 hover:bg-white-500 bg-white-500 focus:bg-white-500 hover:text-primary-blue transition duration-300",
                        !canScrollNext && 'hidden',
                        orientation === "horizontal" ? "" : "rotate-90",
                        className
                    )}
                    disabled={!canScrollNext}
                    onClick={scrollNext}
                    {...props}
            >
                <ChevronRight className="!w-[24px] !h-[24px]" />
                {/*<span className="sr-only">Next slide</span>*/}
            </Button>
        )
    })
CarouselNext.displayName = "CarouselNext"

export {
    type CarouselApi,
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
}
