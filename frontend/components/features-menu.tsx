"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
// import { Icons } from "@/components/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const features: { title: string; href: string; }[] = [
  {
    title: "Summary",
    href: "/getting-started",
  },
  {
    title: "Matching Score",
    href: "/dashboard",
  },
  {
    title: "Matching Dashboard",
    href: "/reviews",
  },
]

export function FeaturesMenu() {
  const [currentFeature, setCurrentFeature] = React.useState(features[0])

  return (
    <div className="flex w-full max-h-lg items-center justify-between border-b cursor-pointer select-none">
      {features.map((feature, index) => (
        <div key={feature.title} 
          className={`
            flex-1 p-4 text-center duration-150 w-full h-full items-center hover:bg-primary/10
            ${currentFeature.title === feature.title ? "bg-primary/10" : ""}
            ${index === 0 ? "rounded-tl-xl" : ""}
            ${index === features.length - 1 ? "rounded-tr-xl" : ""}
          `}
          onClick={() => setCurrentFeature(feature)}
        >
          {feature.title}
        </div>
      ))}
    </div>
  )
}