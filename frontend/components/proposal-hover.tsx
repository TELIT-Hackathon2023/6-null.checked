import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import Image from "next/image";

interface Props {
  title: string;
  sliced_title?: string;
}

export function ProposalHoverCard({ title, sliced_title }: Props) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <button>{sliced_title ? sliced_title : title}</button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <p className="text-sm">
              {title}
            </p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
