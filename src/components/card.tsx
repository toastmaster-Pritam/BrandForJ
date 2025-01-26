import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useUser } from "@clerk/nextjs";
import { toPercentage } from "@/lib/to-percentage";
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
  const { user } = useUser();
  const credits = user?.publicMetadata?.credits;
  const newUser = typeof credits === "undefined";
  const totalCredits = 10;
  const chartData: ChartData = {
    labels: ["Total Used", "Left"],
    datasets: [
      {
        data: newUser
          ? [0, 100]
          : [
              toPercentage({
                value: totalCredits - Number(credits) || 0,
                total: totalCredits
              }),
              toPercentage({ value: Number(credits) || 0, total: totalCredits })
            ],
        backgroundColor: ["#6C63FF", "#8ECAE6", "#00C49A"],
        hoverBackgroundColor: ["#584ACF", "#73BFE2", "#00A379"]
      }
    ]
  };

  return (
    <div className="w-1/3 bg-black text-white rounded-xl p-4 flex flex-col justify-between z-40 animate-slide-up">
      <div className="flex flex-row items-center justify-between pb-2 gap-4">
        <h2 className="text-lg font-bold">Activity</h2>
        <span className="rounded-full bg-zinc-800 px-4 py-1 text-sm">
          Usages
        </span>
      </div>
      <CardContent className="flex flex-col items-center justify-center flex-1">
        <div className="relative flex flex-col items-center justify-center">
          <Doughnut
            data={chartData}
            options={{
              cutout: "70%",
              plugins: {
                tooltip: { enabled: true },
                legend: { display: false }
              },
              circumference: 180,
              rotation: 270
            }}
            className="h-[200px] w-[200px]"
          />
          <div className="absolute text-center text-lg font-bold mt-10">
            {toPercentage({
              value: newUser?0 :(totalCredits- Number(credits)) || 10,
              total: totalCredits
            })}
            %
          </div>
        </div>
      </CardContent>
      <div className="flex justify-around w-full mt-2">
        <div className="flex items-center space-x-1">
          <div className="flex flex-col items-start">
            <div className="flex justify-center items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#6C63FF]"></div>
              <span className="text-sm">Total Used</span>
            </div>
            <span className="text-sm font-bold ml-6">
              {toPercentage({
                value: totalCredits - Number(credits) || 0,
                total: totalCredits
              })}
              %
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <div className="flex flex-col items-start">
            <div className="flex justify-center items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#00C49A]"></div>
              <span className="text-sm">Left</span>
            </div>
            <span className="text-sm font-bold ml-6">
              {toPercentage({
                value: newUser?10: Number(credits) || 0,
                total: totalCredits
              })}
              %
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicChartCard;
