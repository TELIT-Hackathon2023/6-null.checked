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
  const [currentFeature, setCurrentFeature] = useState(features[0])
  const [currentProposal, setCurrentProposal] = useState(null);

  return (
  <>
  <Navbar />
  <main className="flex w-full mx-auto flex-grow space-x-4">
   {/* Left side */}
    <section className="hidden md:block flex-1 max-w-md h-full pl-12 py-8">
      <div className="flex flex-col h-full">
        <ToolbarRFP />
        <ScrollAreaProposal currentProposal={currentProposal} setCurrentProposal={setCurrentProposal} router={router}/>
      </div>
    </section>
    {/* Right side */}
    <section className="flex-1 pr-12 py-8">
      <div className="flex flex-col ">
        <FeaturesMenu 
          currentFeature={currentFeature} 
          setCurrentFeature={setCurrentFeature}
        />
        <div className="w-full h-full rounded-b-lg pt-4">
          <ContentBox currentFeature={currentFeature}/>
        </div>
      </div>
    </section>
  </main>
  <Footer />
  </>
  )
}
