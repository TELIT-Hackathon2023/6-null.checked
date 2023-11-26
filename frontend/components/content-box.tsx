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
import Loader from "./loader";

interface Props {
  currentFeature: { title: string; description: string; icon: LucideIcon;};  
  data: any;
  isLoading: boolean;
}

export const ColorRanges = [
  {
    color: "bg-red-500",
    value: 5,
    match: "Bad Match 👎",
  },
  {
    color: "bg-orange-500",
    value: 6,
    match: "Low Match 👎",
  },
  {
    color: "bg-yellow-500",
    value: 7,
    matcj: "Medium Match 👎",
  },
  {
    color: "bg-lime-500",
    value: 8,
    match: "High Match 👍",
  },
  {
    color: "bg-green-500",
    value: 9,
    match: "Very High Match 👍",
  },
  {
    color: "bg-primary",
    value: 10,
    match: "Perfect Match 👍",
  },
]

const ContentBox = ({
  currentFeature, 
  data,
  isLoading
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

  ChartJS.defaults.font.size = 18;

  return (
    <div className="w-full item-start">
      <Heading
        key={currentFeature.title}
        title={currentFeature.title}
        description={currentFeature.description}
        icon={currentFeature.icon}
        iconColor="text-primary"
        bgColor="bg-primary/20 dark:bg-primary/40"
      />
      {isLoading ? (
        <Loader />
      ) : (
        <>
        {currentFeature.title === "Summary" && (
          <ReactMarkdown className="prose dark:prose-headings:text-white dark:text-white lg:prose-xl text-sm leading-7">
            {summary}
          </ReactMarkdown>
        )}
        {currentFeature.title === "Matching Score" && (
          <div className="flex flex-col items-center justify-between">
            <div className={cn("flex items-center justify-center w-40 h-40 rounded-full", color)}>
              <div className="text text-7xl font-bold">
                {overallScore}
              </div>
            </div>
            <div className="text-xl font-bold mt-4">Overall</div>
            <div className="text-6xl font-extrabold mt-4 ">{match}</div>
            <div className="flex items-center justify-between">
              {data["matching_scores"].map((item: any) => (
                <div key={item.section} className="flex flex-col items-center p-10">
                  <div className={cn("flex items-center justify-center w-32 h-32 rounded-full", ColorRanges.find((range) => range.value >= item.score)?.color)}>
                    <div className="font-bold text-5xl">
                      {item.score}
                    </div>
                  </div>
                  <div className="text-xl font-bold mt-4">{item.section}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        {currentFeature.title === "Matching Dashboard" && (
          <div className="flex flex-col items-center justify-center dark:bg-white rounded-xl ">
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
                scales: {
                  y: {
                    max: 10,
                  } 
                },
                plugins: {
                  legend: {
                    position: 'left' as const,
                    labels: {
                      font: {
                        size: 24
                      }
                    }
                  },
                  title: {
                    display: true,
                    text: 'Matching Score of following categories',
                    font: {
                      size: 24
                    }
                  }
                }
              }}
            />
          </div>
        )}
        </>
      )}
    </div>
  )
}

export default ContentBox;