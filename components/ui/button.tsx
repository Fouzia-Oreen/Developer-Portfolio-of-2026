import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"


const buttonVariants = cva(
  [
    "group/button",
    "flex items-center justify-center",
    "whitespace-nowrap",
    "text-sm font-medium",
    "transition-all duration-300 ease-out",
    "outline-none select-none",
    "disabled:pointer-events-none",
    "disabled:opacity-50",
    "rounded-sm",
    "focus-visible:ring-2",
    "focus-visible:ring-ring",
    "focus-visible:ring-offset-2",
    "[&_svg]:pointer-events-none",
    "[&_svg]:shrink-0",
    "active:scale-[0.98]",
  ],
  {

    variants: {

      variant: {
        /**
         * Primary brand CTA
         * Hero buttons / main actions
         */
        default: [
          "bg-primary",
          "text-primary-foreground",
          "shadow-[0_12px_30px_-12px_rgba(245,78,0,0.45)]",
          "hover:bg-primary-active",
          "hover:shadow-[0_18px_40px_-15px_rgba(245,78,0,0.55)]",
        ].join(" "),


        /**
         * Dark premium CTA
         * Works in light + dark theme
         */
        secondary: [
          "bg-foreground",
          "text-background",
          "shadow-sm",
          "hover:opacity-90",
        ].join(" "),



        /**
         * Editorial outlined button
         */
        outline: [
          "border",
          "border-border",
          "bg-transparent",
          "text-foreground",
          "hover:bg-accent",
          "hover:text-accent-foreground",
        ].join(" "),

        /**
         * Hero glass button
         */
        glass: [
          "border",
          "border-white/20",
          "bg-white/10",
          "text-overlay-cream",
          "backdrop-blur-md",
          "hover:bg-white/20",
        ].join(" "),



        /**
         * Minimal button
         */
        ghost: [
          "text-body",
          "hover:bg-accent",
          "hover:text-foreground",
        ].join(" "),



        /**
         * Text style
         */
        link: [
          "h-auto",
          "rounded-none",
          "p-0",
          "text-primary",
          "underline-offset-4",
          "hover:underline",
        ].join(" "),



        /**
         * Danger
         */
        destructive: [
          "bg-destructive/10",
          "text-destructive",
          "hover:bg-destructive/20",
        ].join(" "),
      },


      size: {
        xs:
          "h-7 px-3 text-xs",
        sm:
          "h-9 px-4",
        default:
          "h-11 px-6",
        lg:
          "h-12 px-8 text-base",
        icon:
          "size-11",
          "icon-sm":
          "size-9",
          "icon-lg":
          "size-12",
      },
    },


    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)



function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {

  const Comp = asChild ? Slot.Root : "button"


  return (
    <Comp
      data-slot="button"
      className={cn(
        buttonVariants({
          variant,
          size,
          className,
        })
      )}
      {...props}
    />
  )
}


export {
  Button,
  buttonVariants,
}