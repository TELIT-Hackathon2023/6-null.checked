import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "./ui/separator"
import { ProposalHoverCard } from "./proposal-hover"
import { Button } from "./ui/button"
import { ArrowDownWideNarrowIcon, ArrowUpWideNarrowIcon, CheckIcon, CircleIcon, TrashIcon } from "lucide-react"
import axios from "axios"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { ColorRanges } from "./content-box"

export interface Proposal {
  title: string
  href: string
  overall: number
}

export let proposals: Proposal[] = [
  {
    title: "2015_RFPWebsiteRedesignRepost.pdf",
    href: "https://github.com/TELIT-Hackathon2023/6-null.checked/blob/main/ai_backend/data/rfps/2015_RFPWebsiteRedesignRepost.pdf",  
    overall: 7.5,
  },
  {
    title: "5308.pdf",
    href: "https://github.com/TELIT-Hackathon2023/6-null.checked/blob/main/ai_backend/data/rfps/5308.pdf",
    overall: 5,
  },
  {
    title: "170609_student.pdf",
    href: "https://github.com/TELIT-Hackathon2023/6-null.checked/blob/main/ai_backend/data/rfps/170609_student.pdf",
    overall: 8,
  },
  {
    title: "DRA-0131_2015_08_04_09_40_16_KHV9j_Af8vT_59n8t.pdf",
    href: "https://github.com/TELIT-Hackathon2023/6-null.checked/blob/main/ai_backend/data/rfps/DRA-0131_2015_08_04_09_40_16_KHV9j_Af8vT_59n8t.pdf",
    overall: 9,
  },
  {
    title: "RequestforInformation_Wastewater_RFP.pdf",
    href: "https://github.com/TELIT-Hackathon2023/6-null.checked/blob/main/ai_backend/data/rfps/RequestforInformation_Wastewater_RFP.pdf",
    overall: 6,
  },
  {
    title: "RFP 32101-2023-002 Access Control.pdf",
    href: "https://github.com/TELIT-Hackathon2023/6-null.checked/blob/main/ai_backend/data/rfps/https://github.com/TELIT-Hackathon2023/6-null.checked/blob/main/ai_backend/data/rfps/RFP%2032101-2023-002%20Access%20Control.pdf",
    overall: 10,
  },
  {
    title: "RFP 32901-31328-23 Final.pdf",
    href: "https://github.com/TELIT-Hackathon2023/6-null.checked/blob/main/ai_backend/data/rfps/https://github.com/TELIT-Hackathon2023/6-null.checked/blob/main/ai_backend/data/rfps/RFP%2032901-31328-23%20Final.pdf",
    overall: 7,
  },
  {
    title: "RFP Empanelment_SW_2022.pdf",
    href: "https://github.com/TELIT-Hackathon2023/6-null.checked/blob/main/ai_backend/data/rfps/RFP%20Empanelment_SW_2022.pdf",
    overall: 6,
  },
  {
    title: "rfp for software development resources 2023-24 final.pdf",
    href: "https://github.com/TELIT-Hackathon2023/6-null.checked/blob/main/ai_backend/data/rfps/rfp%20for%20software%20development%20resources%202023-24%20final.pdf",
    overall: 4,
  },
  {
    title: "RFP2203_Software_Development_Services-Final.pdf",
    href: "https://github.com/TELIT-Hackathon2023/6-null.checked/blob/main/ai_backend/data/rfps/RFP2203_Software_Development_Services-Final.pdf",
    overall: 2,
  },
  {
    title: "RFPDOC_43752.pdf",
    href: "https://github.com/TELIT-Hackathon2023/6-null.checked/blob/main/ai_backend/data/rfps/RFPDOC_43752.pdf",
    overall: 3,
  },
  {
    title: "UNDPSO-RFP-2015-019.pdf",
    href: "https://github.com/TELIT-Hackathon2023/6-null.checked/blob/main/ai_backend/data/rfps/UNDPSO-RFP-2015-019.pdf",
    overall: 1,
  }
]

interface Props {
  currentProposal: { title: string; href: string;} | null;
  setCurrentProposal: any;
  router: any;
  setData: any;
  isLoading: boolean;
  setIsLoading: any;
}

export function ScrollAreaProposal({ currentProposal, setCurrentProposal, router, setData, isLoading, setIsLoading }: Props) {
  const [isAscending, setIsAscending] = useState(false);
  const deleteItem = (proposal: any) => {    
    proposals.splice(proposals.indexOf(proposal ), 1);
    router.refresh();
  }

  const url = 'http://127.0.0.1:8080/';
  async function getAnalysedProposal(proposal: Proposal) {
    try {
      setIsLoading(true);
      setCurrentProposal(proposal);

      const response = await axios.get(`${url}api/analyse`, { params: { href: proposal.href } });
      
      const data = response.data ? response.data : [];
      setTimeout(() => {console.log(), 5000});

      setData(data);
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ScrollArea className={`w-96 h-screen whitespace-nowrap rounded-md border ${isLoading ? "pointer-events-none opacity-50" : ""}`}>
      <div className="p-4">
        <div className="flex items-center justify-between pb-2">
          <h4 className="font-medium leading-none">Requests for proposals</h4>
          {isAscending ? (
            // sort proposals "overall" field by ascending order
            <Button onClick={() => {setIsAscending(false);proposals.sort((a,b) => 0 - (a.overall > b.overall ? -1 : 1));router.refresh()}} variant="ghost" size="sm" className="flex text-muted-foreground hover:text-primary">
              <ArrowDownWideNarrowIcon size={16}/>
            </Button>
          ) : (
            <Button onClick={() => {setIsAscending(true);proposals.sort((a,b) => 0 - (a.overall > b.overall ? 1 : -1));router.refresh()}} variant="ghost" size="sm" className="flex text-muted-foreground hover:text-primary">
              <ArrowUpWideNarrowIcon size={16} />
            </Button>
          )}
        </div>
        {proposals.map((proposal) => (
          <>
          <div key={proposal.href} className="group flex items-center justify-between">
            <div className="flex items-center space-x-1">
            <Button onClick={() => getAnalysedProposal(proposal)} variant="ghost" size="sm" className="w-fit p-2">
                {currentProposal?.title === proposal.title ? (
                  <>
                    <CircleIcon  size={22} className="text-secondary"/>
                    <CheckIcon size={14} className="absolute text-secondary"/>
                  </>
                ) : (
                  <>
                    <CircleIcon size={22} />
                  </>
                )}
              </Button>
              {proposal.title.length > 20 ? (
                <div key={proposal.href} onClick={() => getAnalysedProposal(proposal)} className="w-fit text-sm ">
                  <ProposalHoverCard title={proposal.title} sliced_title={proposal.title.slice(0, 20) + "..."} />
                </div>
                ) : (
                <div key={proposal.href} className="w-fit text-sm">
                  <button onClick={() => getAnalysedProposal(proposal)} >{proposal.title}</button>
                </div>
              )}
              </div>
              <div className="flex w-fit">
                <div className={cn("flex transition duration-200 items-center justify-center w-10 h-10 rounded-full", ColorRanges.find((range) => range.value >= proposal.overall)?.color)}>
                  <div className="text text-lg font-bold">
                    {proposal.overall}
                  </div>
                </div>
                <div className="flex w-fit space-x-4">
                  <Button onClick={() => deleteItem(proposal)} variant="ghost" size="sm" className="flex-1 text-muted-foreground hover:text-primary">
                    <TrashIcon size={16}/>
                  </Button>
                </div>
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