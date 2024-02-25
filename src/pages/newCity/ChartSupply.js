import React from "react";
import styled from "styled-components";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";

function ChartSupply() {
  const dataDoughnut = {
    labels: ["사전청약", "본청약 공공분양", "본청약 민간분양"],
    datasets: [
      {
        data: [6, 12, 6],
        backgroundColor: ["#F47630", "#71AAE5", "#C7E4F8"],
        hoverBackgroundColor: ["#F47630", "#71AAE5", "#C7E4F8"],
        borderWidth: 0,
        hoverOffset: 4,
        hoverBorderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            let value = context.formattedValue;
            return value + "만호";
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
          size: 0,
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
        containerID: "legend-container",
      },
      legend: {
        display: true,
        fullWidth: false,
        position: "bottom",
        labels: {
          //padding:40,
          boxHeight: 15,
          boxWidth: 15,
          fontSize: 16,
          fontStyle: "SUIT",
          fontColor: "#3A3736",
        },
      },
    },
  };

  return (
    <Container>
      <>
        {/* <div id="legend-container"> */}
        <Doughnut type="doughnut" data={dataDoughnut} options={options} />
        <h2 className="graphTitle graphTitleSupply">24만호 공급</h2>
        {/* </div> */}
      </>
    </Container>
  );
}

export default ChartSupply;

const Container = styled.div`
  width: 100%;
  max-width: 330px;
  text-align: center;
  margin: auto;
  position: relative;
`;
