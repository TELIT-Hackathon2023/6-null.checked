"use client"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "./ui/separator"

export interface Proposal {
  title: string
  href: string
}

export const proposals: Proposal[] = [
  {
    title: "rSDw2F.pdf",
    href: "some link",  
  },
  {
    title: "asldj2F.pdf",
    href: "some link",
  },
  {
    title: "sjdQ3D.pdf",
    href: "some link",
  },
  {
    title: "rSDw2F.pdf",
    href: "some link",  
  },
  {
    title: "asldj2F.pdf",
    href: "some link",
  },
  {
    title: "sjdQ3D.pdf",
    href: "some link",
  },
  {
    title: "rSDw2F.pdf",
    href: "some link",  
  },
  {
    title: "asldj2F.pdf",
    href: "some link",
  },
  {
    title: "sjdQ3D.pdf",
    href: "some link",
  },
  {
    title: "rSDw2F.pdf",
    href: "some link",  
  },
  {
    title: "asldj2F.pdf",
    href: "some link",
  },
  {
    title: "sjdQ3D.pdf",
    href: "some link",
  },
  {
    title: "rSDw2F.pdf",
    href: "some link",  
  },
  {
    title: "asldj2F.pdf",
    href: "some link",
  },
  {
    title: "sjdQ3D.pdf",
    href: "some link",
  },
  {
    title: "rSDw2F.pdf",
    href: "some link",  
  },
  {
    title: "asldj2F.pdf",
    href: "some link",
  },
  {
    title: "sjdQ3D.pdf",
    href: "some link",
  },
  {
    title: "rSDw2F.pdf",
    href: "some link",  
  },
  {
    title: "asldj2F.pdf",
    href: "some link",
  },
  {
    title: "sjdQ3D.pdf",
    href: "some link",
  },
  {
    title: "rSDw2F.pdf",
    href: "some link",  
  },
  {
    title: "asldj2F.pdf",
    href: "some link",
  },
  {
    title: "sjdQ3D.pdf",
    href: "some link",
  },
]

export function ScrollAreaProposal() {
  return (
    <ScrollArea className="w-96 whitespace-nowrap rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Requests for proposals</h4>
        {proposals.map((proposal, index) => (
          <>
            <div key={index} className="text-sm">
              {proposal.title}
            </div>
            <Separator className="my-2" />
          </>
        ))}
        <p className="text-muted-foreground">No more files.</p>
      </div>
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  )
}