"use client"

import ContentBox from "@/components/content-box";
import { FeaturesMenu } from "@/components/features-menu";
import { ScrollAreaProposal, proposals } from "@/components/scrollable-rfps";
import ToolbarRFP from "@/components/toolbar-rfps";
import { useState } from "react";
import { features } from "@/components/features-menu";
import { Footer } from "@/components/footer";
import Navbar from "@/components/navbar";
import { useRouter } from "next/navigation";


export default function Dashboard() {
  const router = useRouter();  

  const [data, setData] = useState<{}>({'summary': 'A Request for Proposal (RFP) is a document that outlines the requirements, specifications, and criteria for a project or service that an organization needs. It is used to solicit proposals from potential suppliers or vendors through a competitive bidding process.\n\nKey information to include in an RFP:\n\n1. Project overview: provide a brief background of the organization and the project or service required.\n\n2. Scope of work: describe in detail the specific deliverables, tasks, and objectives that need to be achieved.\n\n3. Technical requirements: list the technology, equipment, software, or any other technical specifications needed for the project.\n\n4. Timeline: specify the project duration, important milestones, and deadlines that suppliers should adhere to.\n\n5. Evaluation criteria: outline the factors that will be considered when evaluating the proposals, such as cost, quality, experience, and timelines.\n\n6. Expected outcomes: clearly define the expected results, outcomes, or solutions that the organization is looking for.\n\n7. Budget: provide a budget range or limitations for the project, including any potential allowances for additional costs or services.\n\n8. Proposal format: outline the required format and structure for the proposals, including sections, word limits, and submission instructions.\n\n9. Contact information: provide contact details for all inquiries and clarification requests regarding the RFP.\n\n10. Proposal submission deadline: specify the deadline by which all proposals must be submitted.\n\n11. Evaluation and selection process: explain how the evaluation and selection process will be conducted, including any interviews, presentations, or demonstrations that may be required.\n\nBy including these key elements, an RFP provides potential suppliers with the necessary information to prepare their proposals accurately and ensures a fair and efficient selection process for the organization.', 'matching_scores': [{'score': 8.0, 'section': 'Technology'}, {'score': 7.0, 'section': 'Functional'}, {'score': 9.0, 'section': 'Compliance'}, {'score': 6.0, 'section': 'Domain'}], "overall_score": 7.5});

  const [isLoading, setIsLoading] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(features[0]);
  const [currentProposal, setCurrentProposal] = useState(null);

  return (
  <>
  <Navbar />
  <main className="flex w-full mx-auto flex-grow space-x-4">
   {/* Left side */}
    <section className="hidden md:block flex-1 max-w-md h-full pl-12 py-8">
      <div className="flex flex-col h-full">
        <ToolbarRFP 
          isLoading={isLoading}
        />
        <ScrollAreaProposal 
          currentProposal={currentProposal} 
          setCurrentProposal={setCurrentProposal} 
          router={router}
          setData={setData}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </div>
    </section>
    {/* Right side */}
    <section className="flex-1 pr-12 py-8">
      <div className="flex flex-col ">
        <FeaturesMenu 
          currentFeature={currentFeature} 
          setCurrentFeature={setCurrentFeature}
          isLoading={isLoading}
        />
        <div className="w-full h-full rounded-b-lg pt-4">
          <ContentBox data={data} currentFeature={currentFeature} isLoading={isLoading}/>
        </div>
      </div>
    </section>
  </main>
  <Footer />
  </>
  )
}
