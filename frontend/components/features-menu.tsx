"use client"

import * as React from "react"

import { BarChart3Icon, ClipboardListIcon, GaugeIcon, LucideIcon } from "lucide-react";


export const features: { title: string; description: string; icon: LucideIcon;}[] = [
  {
    title: "Summary",
    description: "Summary of the matching process",
    icon: ClipboardListIcon,
  },
  {
    title: "Matching Score",
    description: "Shows how relevant RFP is to your company",
    icon: GaugeIcon,
  },
  {
    title: "Matching Dashboard",
    description: "Shows dashboard of RFP influence to your company",
    icon: BarChart3Icon,
  },
]

interface Props {
  currentFeature: { title: string; description: string; icon: LucideIcon;}, 
  setCurrentFeature: any
  isLoading: boolean
}

export function FeaturesMenu({ 
  currentFeature, 
  setCurrentFeature,
  isLoading, 
}: Props
) {
  return (
    <div className={`${isLoading ? "pointer-events-none opacity-50" : ""} flex w-full max-h-lg items-center justify-between border-b cursor-pointer select-none`}>
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