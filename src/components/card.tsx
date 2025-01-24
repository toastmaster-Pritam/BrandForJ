import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
ChartJS.register(ArcElement, Tooltip, Legend);

type ChartData = {
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor: string[];
    hoverBackgroundColor: string[];
  }[];
};

const DynamicChartCard = () => {
  const chartData: ChartData = {
    labels: ["Total Used", "Left"],
    datasets: [
      {
        data: [75, 25],
        backgroundColor: ["#6C63FF", "#8ECAE6", "#00C49A"],
        hoverBackgroundColor: ["#584ACF", "#73BFE2", "#00A379"],
      },
    ],
  };

  return (
    <div className="w-1/3 bg-black text-white rounded-xl p-4 flex flex-col justify-between z-50 animate-slide-up">
      <div className="flex flex-row items-center justify-between pb-2 gap-4">
        <h2 className="text-lg font-bold">Activity</h2>
        <span className="rounded-full bg-zinc-800 px-4 py-1 text-sm">Usages</span>
      </div>
      <CardContent className="flex flex-col items-center justify-center flex-1">
        <div className="relative flex flex-col items-center justify-center">
          <Doughnut
            data={chartData}
            options={{
              cutout: "70%",
              plugins: {
                tooltip: { enabled: true },
                legend: { display: false },
              },
              circumference: 180,
              rotation: 270,
            }}
            className="h-[200px] w-[200px]"
          />
          <div className="absolute text-center text-lg font-bold mt-10">75%</div>
        </div>
      </CardContent>
      <div className="flex justify-around w-full mt-2">
        <div className="flex items-center space-x-1">
          
          <div className="flex flex-col items-start">
           <div className="flex justify-center items-center gap-3">
           <div className="w-3 h-3 rounded-full bg-[#6C63FF]"></div>
           <span className="text-sm">Total Used</span>
           </div>
            <span className="text-sm font-bold ml-6">75%</span>
          </div>
        </div>
        <div className="flex items-center space-x-1">
        <div className="flex flex-col items-start">
           <div className="flex justify-center items-center gap-3">
           <div className="w-3 h-3 rounded-full bg-[#00C49A]"></div>
           <span className="text-sm">Left</span>
           </div>
            <span className="text-sm font-bold ml-6">25%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicChartCard;
