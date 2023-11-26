"use client"

import { cn } from "@/lib/utils";
import { Heading } from "./heading";
import { LucideIcon } from "lucide-react";
import ReactMarkdown from "react-markdown";

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

interface Props {
  currentFeature: { title: string; description: string; icon: LucideIcon;};  
}

export const ColorRanges = [
  {
    color: "from-red-500 to-red-500/80",
    value: 5,
    match: "Bad Match",
  },
  {
    color: "from-red-500 to-orange-500",
    value: 6,
    match: "Low Match",
  },
  {
    color: "from-orange-500 to-yellow-500",
    value: 7,
    matcj: "Medium Match",
  },
  {
    color: "from-yellow-500 to-secondary",
    value: 8,
    match: "High Match",
  },
  {
    color: "from-secondary to-primary/80",
    value: 9,
    match: "Very High Match",
  },
  {
    color: "from-primary to-primary/60",
    value: 10,
    match: "Perfect Match",
  },
]

const ContentBox = ({
  currentFeature, 
}: Props
) => {
  let score = 9;
  const color = ColorRanges.find((range) => range.value >= score)?.color;
  
  var match = ColorRanges.find((range) => range.value >= score)?.match;


  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const text = `T-Systems International GmbH, commonly known as T-Systems, is an international service provider specializing in information technologies and digital transformation. Below is a structured summary of the company:

  1. Company Overview:
     - Name: T-Systems International GmbH.
     - Type: Internationally operating service provider for information technologies and digital transformation.
     - Parent Company: Part of Deutsche Telekom AG.
     - Headquarters: Frankfurt am Main, Germany.
     - Global Presence: Over 20 countries.
     - Employees: Around 28,000 worldwide.
     - Revenue: EUR 4.2 billion in 2020【9†source】【12†source】【13†source】.
  
  2. Services and Fields:
     - End-to-End IT Solutions: Offers integrated solutions for digital transformation across various industries and the public sector.
     - Focus Industries: Automotive, public sector, healthcare, and transport.
     - IT Services: Includes the secure operation of legacy systems, classic information and communication technology services.
     - Cloud-Based Services: Transformation to cloud-based services.
     - New Business Models and Projects: Involves data analytics, internet of things, machine-to-machine (M2M) communication, and industrial internet.
     - Client Industries: Serves automotive, manufacturing, retail, public sector, travel, transportation, logistics, and healthcare industries【19†source】【20†source】【26†source】.
  
  T-Systems' approach to digitalization emphasizes industry-specific solutions, catering to the unique needs of each sector it serves. The company's expertise in both traditional IT services and modern digital transformations positions it as a key player in driving digital innovation across multiple industries.`;
  return (
    <div className="w-full item-start">
      <Heading
        key={currentFeature.title}
        title={currentFeature.title}
        description={currentFeature.description}
        icon={currentFeature.icon}
        iconColor="text-primary"
        bgColor="bg-primary/10"
      />
      {currentFeature.title === "Summary" && (
        <ReactMarkdown className="prose dark:prose-headings:text-white dark:text-white lg:prose-xl text-sm overflow-hidden leading-7"
        >
          {text}
        </ReactMarkdown>
      )}
      {currentFeature.title === "Matching Score" && (
        <div className="flex flex-col items-center justify-center">
          <div className={cn("flex items-center justify-center w-40 h-40 rounded-full bg-gradient-to-r background-animate", color)}>
            <div className="text text-7xl font-bold">
              {score}
            </div>
          </div>
          <div className="text-lg font-bold mt-4">{match}</div>
        </div>
      )}
      {currentFeature.title === "Matching Dashboard" && (
        <div className="flex flex-col items-center justify-center dark:bg-white rounded-xl">
          <Bar
            data={{
              labels: ['Score'],
              datasets: [
                {
                  label: 'Technical Matching Score',
                  data: [score],
                  backgroundColor: 'rgb(224, 99, 132)',
                },
                {
                  label: 'Function Matching Score',
                  backgroundColor: 'rgb(255, 99, 132)',
                  data: [6],
                  borderColor: 'white',
                },
                {
                  label: 'Domain Matching Score',
                  backgroundColor: 'rgb(75, 192, 192)',
                  data: [2],
                }
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top' as const,
                },
                title: {
                  display: true,
                  text: 'Matching Score of following categories',
                }
              }
            }}
          />
        </div>
      )}
    </div>
  )
}

export default ContentBox;