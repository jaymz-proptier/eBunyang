import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { defaults } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
// import ChartDataLabels from 'chartjs-plugin-datalabels';
import { SYreactGA4Title } from "../../hooks/";

const SYhomeWholeGraph = ({ SYdata }) => {
  const labels = SYdata.bizAreaList.map((data) => {
    return data.categoryName;
  });
  // const [year, setYear] = useRecoilState(yearState);

  const developData = () => {
    let dataDevelopArr = [];
    SYdata.bizAreaList.map((data) => {
      data.dataList.map((dataDevelop) => {
        if (dataDevelop.biz_type_cd == "22") {
          dataDevelopArr.push(dataDevelop.biz_type_cnt);
          // console.log(dataDevelopArr);
        }
      });
    });
    return dataDevelopArr;
  };

  const archData = () => {
    let dataArchArr = [];
    SYdata.bizAreaList.map((data) => {
      data.dataList.map((dataArch) => {
        // console.log(data1);
        if (dataArch.biz_type_cd == "21") {
          dataArchArr.push(dataArch.biz_type_cnt);
        }
      });
      // console.log(dataArchArr);
    });
    return dataArchArr;
  };

  const data = {
    labels,
    datasets: [
      {
        label: "재개발",
        data: archData(),
        backgroundColor: "#7AD1DD",
      },
      {
        label: "재건축",
        data: developData(),
        backgroundColor: "#FDD160",
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    maxBarThickness: 35,
    responsive: true,
    borderRadius: 4,
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
        enabled: false,
        boxPadding: 4,
        mode: "index",
        padding: 10,
        caretSize: 0,
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
        bodyColor: "#7B726F",
        bodySpacing: 0,
        bodyFont: {
          family: "SUIT",
          size: 14,
          weight: "400",
          lineHeight: 1.3,
        },
        borderWidth: 1,
        borderColor: "rgba(231, 226, 223, 1)",
        itemSort: function (a, b) {
          return b.datasetIndex - a.datasetIndex;
        },
        external: function (context) {


          let chartBx = document.querySelector(".homeWholeGraphBx");
          // Tooltip Element
          let tooltipEl = document.getElementById("chartjs-tooltip");

          // Create element on first render
          if (!tooltipEl) {
            tooltipEl = document.createElement("div");
            tooltipEl.id = "chartjs-tooltip";
            tooltipEl.innerHTML = "<table></table>";
            chartBx.appendChild(tooltipEl);
          }




          // Hide if no tooltip
          const tooltipModel = context.tooltip;
          if (tooltipModel.opacity === 0) {
            tooltipEl.style.opacity = 0;
            return;
          }

          // Set caret Position
          tooltipEl.classList.remove("above", "below", "no-transform");
          if (tooltipModel.yAlign) {
            tooltipEl.classList.add(tooltipModel.yAlign);
          } else {
            tooltipEl.classList.add("no-transform");
          }

          function getBody(bodyItem) {
            // console.log(bodyItem);
            return bodyItem.lines;
          }

          // Set Text
          if (tooltipModel.body) {
            // const titleLines = tooltipModel.title || [];
            const bodyLines = tooltipModel.body.map(getBody);

            // console.log(bodyLines);

            let innerHtml = "<thead>";

            // titleLines.forEach(function(title) {
            //     innerHtml += '<tr><th>' + title + '</th></tr>';
            // });
            innerHtml += "</thead><tbody>";

            bodyLines.forEach(function (body, i) {
              const colors = tooltipModel.labelColors[i];
              let style = "background:" + colors.backgroundColor;
              style += "; border-color:" + colors.borderColor;
              style += "; border-width: 2px";
              const span =
                '<span class="colorBx" style="' + style + '"></span>';
              innerHtml +=
                "<tr><td>" +
                span +
                '<span class="title">' +
                body[0].substr(0, 3) +
                '</span><span class="info">' +
                body[0].substr(4) +
                "건</span></td></tr>";

              // console.log(body[0].substr(0, 3));
            });
            innerHtml += "</tbody>";

            let tableRoot = tooltipEl.querySelector("table");
            tableRoot.innerHTML = innerHtml;
          }

          const position = context.chart.canvas.getBoundingClientRect();
          // const bodyFont = Chart.helpers.toFont(tooltipModel.options.bodyFont);

          // console.log(context)
          // Display, position, and set styles for font

          tooltipEl.style.opacity = 1;
          tooltipEl.style.position = "absolute";

          tooltipEl.style.top = tooltipModel.caretY + 'px';
          tooltipEl.style.padding = tooltipModel.padding + "px " + tooltipModel.padding + "px";
          tooltipEl.style.pointerEvents = "none";

          let chartInnerBx = document.querySelector(".SYhomeWholeGraph").clientWidth;

          if (window.innerWidth < 680) { 
            tooltipEl.style.top = tooltipModel.caretY + 'px';
            context.chart.canvas.addEventListener('mousemove', function (e) {
              let graphX = e.clientX;
              if(tooltipEl.clientWidth + graphX > chartInnerBx){
                tooltipEl.style.left = graphX -= tooltipEl.clientWidth;
              } else {
                tooltipEl.style.left = graphX  + 'px';
              }
              // console.log('chartBx.clientX', tooltipEl.clientWidth);
            });
          } else {
            const { height, width } = tooltipEl.getBoundingClientRect();

            const xAlign = tooltipModel.xAlign;
            const caretX = tooltipModel.caretX;

            var positionX = this._chart.canvas.offsetLeft;
            let left = positionX + caretX - width / 2;

            // tooltipEl.style.left = tooltipModel.caretX - context.chart.canvas.offsetLeft + "px";
            if (xAlign === "left") {
                  left = left + width / 2;
    
                } else if (xAlign === "right") {
                  left -= width / 2;
                }
                tooltipEl.style.left = `${left}px`;
          }


          // console.log('top', top);

                    // const { height, width } = tooltipEl.getBoundingClientRect();

          // const yAlign = tooltipModel.yAlign;
          // const xAlign = tooltipModel.xAlign;

          // var positionY = this._chart.canvas.offsetTop;
          // var positionX = this._chart.canvas.offsetLeft;

          // const caretY = tooltipModel.caretY;
          // const caretX = tooltipModel.caretX;
          // // Final coordinates
          // let top = positionY + caretY - height;
          // let left = positionX + caretX - width / 2;
          // let space = 8;

          // if (yAlign === "top") {
          //   top += height + space;
          // } else if (yAlign === "center") {
          //   top += height / 2;
          // } else if (yAlign === "bottom") {
          //   top -= space;
          // }
          // // xAlign could be: `left`, `center`, `right`

          // if(window.innerWidth < 680) {
          //   if (xAlign === "left") {

          //     left -= tooltipModel.caretX / 3
          //   } else if (xAlign === "right") {
          //     left -= tooltipModel.caretX / 1
          //   }
          // } else {
          //   if (xAlign === "left") {
          //     left = left + width / 2;

          //   } else if (xAlign === "right") {
          //     left -= width / 2;
          //   }
          // }          

          // tooltipEl.style.top = `${top}px`;
          // tooltipEl.style.left = `${left}px`;

          // if (window.innerWidth / 2 > tooltipModel.caretX) {
          //   tooltipEl.style.right = "auto";
          //   tooltipEl.style.left =
          //     tooltipModel.caretX + "px";
          // } else {
          //   if (window.innerWidth < 680) {
          //     tooltipEl.style.left = "auto";
          //     tooltipEl.style.right =
          //     context.chart.canvas.offsetLeft + (tooltipModel.caretX / 2) + 'px'
          //       // tooltipModel.caretX - window.innerWidth / 2 + "px";
          //   } else {
          //     tooltipEl.style.left = "auto";
          //     tooltipEl.style.right =
          //       position.right - (tooltipModel.caretX * 1.35) + "px";
          //   }
          // }

          // if ((chartBx.clientHeight - 50) < tooltipModel.caretY) {
          //   tooltipEl.style.bottom = "0px"
          //   tooltipEl.style.top = "auto";
          // } else {
          //   tooltipEl.style.bottom = "auto";
          //   tooltipEl.style.top =
          //     tooltipModel.caretY + "px";
          // }

        },
      },
    },
    scales: {
      yAxes: {
        stacked: true,
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
        stacked: true,
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
    <div className="SYhomeWholeGraph">
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

export default React.memo(SYhomeWholeGraph);
