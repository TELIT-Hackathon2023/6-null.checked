import ContentBox from "@/components/content-box";
import { FeaturesMenu } from "@/components/features-menu";
import { ScrollAreaProposal } from "@/components/scrollable-rfps";
import ToolbarRFP from "@/components/toolbar-rfps";


export default function Dashboard() {
  return (
  <main className="flex w-full h-screen mx-auto flex-grow space-x-4">
   {/* Left side */}
    <section className="flex-1 max-w-md h-full pl-12 py-8">
      <div className="flex flex-col h-full">
        <ToolbarRFP />
        <ScrollAreaProposal />
      </div>
    </section>
    {/* Right side */}
    <section className="flex-1 h-screen pr-12 py-8">
      <div className="flex flex-col h-screen">
        <FeaturesMenu />
        <div className="w-full h-full rounded-b-lg">
          <ContentBox />
        </div>
      </div>
    </section>
  </main>
  )
}
