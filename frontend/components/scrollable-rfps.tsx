"use client"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "./ui/separator"
import { ProposalHoverCard } from "./proposal-hover"
import { Button } from "./ui/button"
import { CheckIcon, CircleIcon, TrashIcon } from "lucide-react"

export interface Proposal {
  title: string
  href: string
}

export const proposals: Proposal[] = [
  {
    title: "2015_RFPWebsiteRedesignRepost.pdf",
    href: "https://github.com/TELIT-Hackathon2023/6-null.checked/blob/main/ai_backend/data/rfps/2015_RFPWebsiteRedesignRepost.pdf",  
  },
  {
    title: "5308.pdf",
    href: "https://github.com/TELIT-Hackathon2023/6-null.checked/blob/main/ai_backend/data/rfps/5308.pdf",
  },
  {
    title: "170609_student.pdf",
    href: "https://github.com/TELIT-Hackathon2023/6-null.checked/blob/main/ai_backend/data/rfps/170609_student.pdf",
  },
  {
    title: "DRA-0131_2015_08_04_09_40_16_KHV9j_Af8vT_59n8t.pdf",
    href: "https://github.com/TELIT-Hackathon2023/6-null.checked/blob/main/ai_backend/data/rfps/DRA-0131_2015_08_04_09_40_16_KHV9j_Af8vT_59n8t.pdf",
  },
  {
    title: "RequestforInformation_Wastewater_RFP.pdf",
    href: "https://github.com/TELIT-Hackathon2023/6-null.checked/blob/main/ai_backend/data/rfps/RequestforInformation_Wastewater_RFP.pdf",
  },
  {
    title: "RFP 32101-2023-002 Access Control.pdf",
    href: "https://github.com/TELIT-Hackathon2023/6-null.checked/blob/main/ai_backend/data/rfps/https://github.com/TELIT-Hackathon2023/6-null.checked/blob/main/ai_backend/data/rfps/RFP%2032101-2023-002%20Access%20Control.pdf",
  },
  {
    title: "RFP 32901-31328-23 Final.pdf",
    href: "https://github.com/TELIT-Hackathon2023/6-null.checked/blob/main/ai_backend/data/rfps/https://github.com/TELIT-Hackathon2023/6-null.checked/blob/main/ai_backend/data/rfps/RFP%2032901-31328-23%20Final.pdf",
  },
  {
    title: "RFP Empanelment_SW_2022.pdf",
    href: "https://github.com/TELIT-Hackathon2023/6-null.checked/blob/main/ai_backend/data/rfps/RFP%20Empanelment_SW_2022.pdf",
  },
  {
    title: "rfp for software development resources 2023-24 final.pdf",
    href: "https://github.com/TELIT-Hackathon2023/6-null.checked/blob/main/ai_backend/data/rfps/rfp%20for%20software%20development%20resources%202023-24%20final.pdf",
  },
  {
    title: "RFP2203_Software_Development_Services-Final.pdf",
    href: "https://github.com/TELIT-Hackathon2023/6-null.checked/blob/main/ai_backend/data/rfps/RFP2203_Software_Development_Services-Final.pdf",
  },
  {
    title: "RFPDOC_43752.pdf",
    href: "https://github.com/TELIT-Hackathon2023/6-null.checked/blob/main/ai_backend/data/rfps/RFPDOC_43752.pdf",
  },
  {
    title: "UNDPSO-RFP-2015-019.pdf",
    href: "https://github.com/TELIT-Hackathon2023/6-null.checked/blob/main/ai_backend/data/rfps/UNDPSO-RFP-2015-019.pdf",
  }
]

interface Props {
  currentProposal: { title: string; href: string;} | null;
  setCurrentProposal: any;
}

export function ScrollAreaProposal({ currentProposal, setCurrentProposal }: Props) {
  return (
    <ScrollArea className="w-96 h-screen whitespace-nowrap rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Requests for proposals</h4>
        {proposals.map((proposal) => (
          <>
          <div key={proposal.href} className="group flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Button onClick={() => setCurrentProposal(proposal)} variant="ghost" size="sm" className="relative w-fit p-2">
                {currentProposal?.title === proposal.title ? (
                  <>
                    <CircleIcon size={22} className="text-secondary"/>
                    <CheckIcon size={14} className="absolute text-secondary"/>
                  </>
                ) : (
                  <>
                    <CircleIcon size={22} />
                  </>
                )}
              </Button>
              {proposal.title.length > 20 ? (
                <div key={proposal.href} onClick={() => setCurrentProposal(proposal)} className="w-fit text-sm ">
                  <ProposalHoverCard title={proposal.title} sliced_title={proposal.title.slice(0, 20) + "..."} />
                </div>
                ) : (
                <div key={proposal.href} className="w-fit text-sm">
                  <button onClick={() => setCurrentProposal(proposal)} >{proposal.title}</button>
                </div>
              )}
              </div>
              <div className="hidden group-hover:flex w-fit space-x-4">
                <Button variant="ghost" size="sm" className="flex-1 text-muted-foreground hover:text-primary">
                  <TrashIcon size={16}/>
                </Button>
              </div>
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