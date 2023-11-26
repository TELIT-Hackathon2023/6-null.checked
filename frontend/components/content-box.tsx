"use client"

import { cn } from "@/lib/utils";
import { Heading } from "./heading";
import { LucideIcon, Scroll } from "lucide-react";
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
  data: any;
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
  data
}: Props
) => {
  
  const overallScore = data["overall_score"];
  const summary = data["summary"];


  const color = ColorRanges.find((range) => range.value >= overallScore)?.color;
  const match = ColorRanges.find((range) => range.value >= overallScore)?.match;


  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  // const datasets = [
  //   data["matching_scores"].map((item: any) => (
  //     {
  //       label: `${item.section} Matching Score`,
  //       data: item.score,
  //       backgroundColor: 'rgb(224, 99, 132)',
  //     }
  //   ))
  // ];
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
        <ReactMarkdown className="prose dark:prose-headings:text-white dark:text-white lg:prose-xl text-sm leading-7">
          {summary}
        </ReactMarkdown>
      )}
      {currentFeature.title === "Matching Score" && (
        <div className="flex flex-col items-center justify-between">
          <div className={cn("flex items-center justify-center w-40 h-40 rounded-full bg-gradient-to-r background-animate", color)}>
            <div className="text text-7xl font-bold">
              {overallScore}
            </div>
          </div>
          <div className="text-lg font-bold mt-4">{match}</div>
          <div className="flex items-center justify-between">
            {data["matching_scores"].map((item: any) => (
              <div key={item.section} className="flex flex-col items-center p-10">
                <div  className={cn("flex items-center justify-center w-32 h-32 rounded-full bg-secondary")}>
                  <div  className="text text-6xl font-bold">
                    {item.score}
                  </div>
                </div>
                <div className="text-lg font-bold mt-4">{item.section}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      {currentFeature.title === "Matching Dashboard" && (
        <div className="flex flex-col items-center justify-center dark:bg-white rounded-xl">
          <Bar
            data={{
              labels: ['Score'],
              datasets: [
                {
                  label: `${data["matching_scores"][0].section}`,
                  data: [data["matching_scores"][0].score],
                  backgroundColor: 'rgb(224, 99, 132)',
                },
                {
                  label: `${data["matching_scores"][1].section}`,
                  data: [data["matching_scores"][1].score],
                  backgroundColor: 'hsl(180, 48%, 52%)',
                },
                {
                  label: `${data["matching_scores"][2].section}`,
                  data: [data["matching_scores"][2].score],
                  backgroundColor: 'rgb(102, 102, 255)',
                },
                {
                  label: `${data["matching_scores"][3].section}`,
                  data: [data["matching_scores"][3].score],
                  backgroundColor: 'rgb(102, 255, 255)',
                },
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