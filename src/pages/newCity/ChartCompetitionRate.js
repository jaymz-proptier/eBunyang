import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

function ChartCompetitionRate({ SYdata }) {
  if (!SYdata) return "";

  const options = {
    plugins: {
      tooltip: {
        enabled: false,
      },
      hover: {
        animationDuration: 0,
      },
      animation: {
        duration: 0,
      },
      legend: {
        display: false,
      },
      showValue: {
        fontStyle: "SUIT",
        fontSize: 14,
      },
      datalabels: {
        display: true,
        color: "#3A3736",
        anchor: "end",
        align: "-90",
      },
    },
    scales: {
      x: {
        borderColor: { color: "red" },
        borderWidth: 22,
        grid: {
          display: false,
        },
        ticks: {
          color: "#3A3736",
          font: {
            family: "SUIT",
            lineHeight: 1,
            size: 14,
          },
        },
      },
      y: {
        display: false,
      },
    },
    maintainAspectRatio: false, // false로 설정 시 사용자 정의 크기에 따라 그래프 크기가 결정됨.
  };

  const dataBar = {
    labels: ["1차", "2차", "3차", "4차"],
    datasets: [
      {
        type: "bar",
        data: [
          SYdata.avg_rate_1,
          SYdata.avg_rate_2,
          SYdata.avg_rate_3,
          SYdata.avg_rate_4,
        ],
        //data:[52,6,35,21],
        backgroundColor: "#FABB98",
        borderColor: "red",
        barThickness: 56,
        borderRadius: [4, 4],
      },
    ],
  };

  return (
    <Bar
      data={dataBar}
      width={300}
      height={192}
      options={options}
      plugins={[ChartDataLabels]}
    />
  );
}
export default ChartCompetitionRate;
