import React from "react";
import styled from "styled-components";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";

function ChartPreSubsrRate({ SYdata }) {
  if (!SYdata) return "";

  const htmlLegendPlugin = {
    id: "htmlLegend",
    afterUpdate(chart, args, options) {
      charts.afterUpdate(chart, args, options);
    },
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            let value = context.formattedValue;
            return value + " 세대";
          },
        },
        padding: {
          top: 6,
          bottom: 6,
          left: 12,
          right: 12,
        },
        caretSize: 0,
        displayColors: false,
        backgroundColor: "#fff",
        titleColor: "#7B726F",
        titleSpacing: 0,
        titleMarginBottom: 0,
        titleFont: {
          family: "SUIT",
          size: 12,
          weight: "400",
          lineHeight: 1.4,
        },
        bodyColor: "#3A3736",
        bodySpacing: 0,
        bodyFont: {
          family: "SUIT",
          size: 14,
          weight: "400",
          lineHeight: 1.5,
        },
        borderWidth: 1,
        borderColor: "rgba(231, 226, 223, 1)",
      },
      htmlLegend: {
        // ID of the container to put the legend in
        containerID: "legend-container",
      },
      legend: {
        display: true,
        position: "bottom",
        labels: {
          boxHeight: 15,
          boxWidth: 15,
          fontSize: 16,
          fontStyle: "SUIT",
          fontColor: "#3A3736",
        },
      },
      plugins: [htmlLegendPlugin],
      datalabels: {
        formatter: function (value, context) {
          return context.dataIndex + "세대";
        },
      },
    },
  };

  const dataDoughnut = {
    labels: ["사전청약", "본청약 공공분양"],
    datasets: [
      {
        //label: 'My First Dataset',
        data: [40073, 19927],
        // data: [
        //   SYdata.preSubsrRate.after_subsr_cnt,
        //   SYdata.preSubsrRate.pre_subsr_cnt
        // ],
        backgroundColor: ["#F47630", "#FCE1D2"],
        hoverBackgroundColor: ["#F47630", "#FCE1D2"],
        borderWidth: 0,
        hoverOffset: 4,
        hoverBorderWidth: 0,
      },
    ],
  };

  return (
    <Container>
      <Doughnut type="doughnut" data={dataDoughnut} options={options} />
      <h2 className="graphTitle">
        사전청약<br></br>
        {SYdata.subsr_rate} 진행
      </h2>
    </Container>
  );
}
export default ChartPreSubsrRate;

const Container = styled.div`
  width: 100%;
  max-width: 330px;
  text-align: center;
  margin: auto;
  position: relative;
`;
