import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Slider, { sliderClasses } from "@mui/material/Slider";

const customTheme = createTheme({
  components: {
    typography: {
      fontFamily: ["SUIT"],
    },
    MuiSlider: {
      styleOverrides: {
        valueLabel: ({ ownerState, theme }) => ({
          ...(ownerState.orientation === "horizontal" && {
            backgroundColor: "transparent",
            fontWeight: 400,
            color: "#3A3736",
            fontSize: "12px",
            padding: 0,
            bottom: "-25px",
            fontFamily: "SUIT",
          }),
          [`&.${sliderClasses.valueLabelOpen}`]: {
            transform: "none",
            top: "initial",
          },
        }),
      },
    },
  },
});

function PriceFilterComponent() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [minValue, setMinScale] = useState(searchParams.get("min_scale") ?? 0);
  const [maxValue, setMaxScale] = useState(searchParams.get("max_scale") ?? 0);
  const [filterCode, setFilterCode] = useState(null);

  const SYbuttonBox = [
    {
      code: "0",
      title: "전체",
      selected: filterCode === "0" ? true : false,
    },
    {
      code: "10",
      title: "~10평대",
      selected: filterCode === "10" ? true : false,
    },
    {
      code: "20",
      title: "~20평대",
      selected: filterCode === "20" ? true : false,
    },
    {
      code: "30",
      title: "~30평대",
      selected: filterCode === "30" ? true : false,
    },
    {
      code: "40",
      title: "~40평대",
      selected: filterCode === "40" ? true : false,
    },
    {
      code: "50",
      title: "~50평대",
      selected: filterCode === "50" ? true : false,
    },
    {
      code: "60",
      title: "60평대~",
      selected: filterCode === "60" ? true : false,
    },
  ];

  useEffect(() => {
    if (filterCode) {
      if (filterCode === "0") {
        searchParams.delete("min_scale");
        searchParams.delete("max_scale");
      } else if (filterCode >= 60) {
        searchParams.set("min_scale", filterCode);
        searchParams.delete("max_scale");
      } else {
        searchParams.set("min_scale", 0);
        searchParams.set("max_scale", filterCode);
      }
    }
    setSearchParams(searchParams);
  }, [filterCode]);

  const handleFilterChange = (e, value) => {
    if (value[0] >= 60 && value[1] >= 60) {
      searchParams.set("min_scale", value[1]);
      searchParams.delete("max_scale");
    } else if (value[0] === 0 && value[1] >= 60) {
      searchParams.delete("min_scale");
      searchParams.delete("max_scale");
    } else {
      searchParams.set("min_scale", value[0]);
      searchParams.set("max_scale", value[1]);
    }
    setMinScale(value[0]);
    setMaxScale(value[1]);
    setSearchParams(searchParams);
    setFilterCode(null);
  };

  const handleCodeChange = (value) => {
    if (value === "0") {
      setMinScale(null);
      setMaxScale(null);
      setFilterCode(value);
    } else if (value > 0 && value < 60) {
      setMinScale(0);
      setMaxScale(value);
      setFilterCode(value);
    } else if (value === "60") {
      setMinScale(value);
      setMaxScale(0);
      setFilterCode(value);
    } else {
      setMinScale(0);
      setMaxScale(60);
      setFilterCode("");
    }
  };

  const marks = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 10,
      label: "10평",
    },
    {
      value: 20,
      label: "20평",
    },
    {
      value: 30,
      label: "30평",
    },
    {
      value: 40,
      label: "40평",
    },
    {
      value: 50,
      label: "50평",
    },
    {
      value: 60,
      label: "60평",
    },
  ];

  return (
    <div className="SYfilterLayerComponent">
      <div className="innerFilterwrap rangeFilterwrap">
        <ThemeProvider theme={customTheme}>
          <Slider
            getAriaLabel={() => "Price"}
            min={0}
            max={60}
            step={1}
            orientation="horizontal"
            value={[minValue ?? 0, maxValue ? maxValue : 60]}
            defaultValue={[minValue, maxValue]}
            valueLabelDisplay="off"
            marks={marks}
            onChange={(e, value) => handleFilterChange(e, value)}
          />
        </ThemeProvider>

        <div className="filterContainer priceRange">
          {SYbuttonBox.map((SYloopData, SYindex) => (
            <button
              key={SYindex}
              type="button"
              className="filterItem all"
              aria-pressed={SYloopData.selected}
              onClick={() => handleCodeChange(SYloopData.code)}
            >
              {SYloopData.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PriceFilterComponent;
