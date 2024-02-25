import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { defaults } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
// import ChartDataLabels from 'chartjs-plugin-datalabels';
import { SYreactGA4Title } from "../../hooks/";

const SYhomeApartmentGraph = ({ SYdata }) => {
  const labels = SYdata.aptMviHouseList.map((data) => {
    return data.date_year;
  });
  // const [year, setYear] = useRecoilState(yearState);

  const data = {
    labels,
    datasets: [
      {
        data: SYdata.aptMviHouseList.map((data) => {
          return data.total_house_cnt;
        }),
        backgroundColor: "#FABB98",
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    maxBarThickness: 35,
    borderRadius: 4,
    responsive: true,
    plugins: {
      legend: {
        display: false,
        labels: {
          font: {
            family: "SUIT",
            lineHeight: 1,
            size: 20,
          },
        },
      },
      tooltip: {
        padding: 10,
        caretSize: 0,
        displayColors: false,
        backgroundColor: "#fff",
        titleColor: "#7B726F",
        titleSpacing: 0,
        titleMarginBottom: 0,
        titleFont: {
          family: "SUIT",
          size: 14,
          weight: "400",
          lineHeight: 1.4,
        },
        bodyColor: "#3A3736",
        bodySpacing: 0,
        bodyFont: {
          family: "SUIT",
          size: 16,
          weight: "400",
          lineHeight: 1.5,
        },
        borderWidth: 1,
        borderColor: "rgba(231, 226, 223, 1)",
        callbacks: {
          title: function (element) {
            // console.log(element);
            return element[0].label + "년";
          },
        },
      },
    },
    scales: {
      yAxes: {
        grid: {
          drawBorder: false,
          drawTicks: false,
          color: function (context) {
            // console.log(context);
            if (context.index == 0) {
              return "#7B726F";
            } else {
              return "#E7E2DF";
            }
          },
          // lineWidth: 0
        },
        ticks: {
          padding: 10,
          beginAtZero: false,
          color: "#3A3736",
          font: {
            family: "SUIT",
            lineHeight: 1,
            size: 12,
          },
          maxTicksLimit: 4,
          count: 4,
          autoSkip: true,
          precision: 0,
          callback: function (value, index, ticks) {
            const koreanUnits = ["", "만", "천", "백"];
            const formattedValues = [];

            if (value > 99999) {
              for (
                let i = 0, unit = 10000;
                i < koreanUnits.length;
                i++, unit /= 10
              ) {
                const division = Math.floor(value / unit);

                if (division === 0) continue;

                const mod = division % 10;
                const modToString = division.toString();
                const formattedValue = `${modToString}${koreanUnits[1]}`;

                formattedValues.push(formattedValue);
                value -= division * unit;
              }
            } else {
              for (
                let i = 0, unit = 100000;
                i < koreanUnits.length;
                i++, unit /= 10
              ) {
                const division = Math.floor(value / unit);

                if (division === 0) continue;

                const mod = division % 10;
                const modToString = mod
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                const formattedValue = `${modToString}${koreanUnits[i]}`;

                formattedValues.push(formattedValue);
                value -= division * unit;
              }
            }

            if (value === 0) {
              return formattedValues.join("");
            }

            const onesToString = value
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const formattedOnes = `${onesToString}`;
            formattedValues.push(formattedOnes);

            return formattedValues.join("");
          },
        },
      },
      xAxes: {
        grid: {
          display: false,
          // drawBorder: true,
          // borderColor: '#111111',
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
    },
  };

  const plugins = [
    {
      afterDraw: function (chart) {
        let arrayCheck = chart.data.datasets[0].data;
        let arrayDataCheck = (currentValue) => currentValue == 0;

        if (arrayCheck.every(arrayDataCheck) == true) {
          let ctx = chart.ctx;
          let width = chart.width;
          let height = chart.height;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.font = "17px SUIT";
          ctx.fillText("데이터가 없습니다", width / 2, height / 2.1);
          ctx.restore();

          // y-축 숨기기
          if (
            chart.options.scales.yAxes &&
            chart.options.scales.yAxes.length > 0
          ) {
            chart.options.scales.yAxes[0].ticks.display = false;
          } else {
            // y-축이 정의되어 있지 않으면 y-축 생성 후 ticks 속성 변경
            chart.options.scales.yAxes = [
              {
                ticks: {
                  display: false,
                },
              },
            ];
          }
        }
      },
    },
  ];

  return (
    <div className="SYhomeApartmentGraph">
      <div className="chartBox" style={{ height: "204px" }}>
        <Bar
          options={options}
          data={data}
          plugins={plugins}
          className="aptChart"
        />
      </div>
    </div>
  );
};

export default React.memo(SYhomeApartmentGraph);
