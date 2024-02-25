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
  const [min_price, setMinPrice] = useState(searchParams.get("min_price") ?? 0);
  const [max_price, setMaxPrice] = useState(searchParams.get("max_price") ?? 0);
  const [filterCode, setFilterCode] = useState(null);

  const SYbuttonBox = [
    {
      code: "0",
      title: "전체",
      selected: filterCode === "0" ? true : false,
    },
    {
      code: "30000",
      title: "~3억",
      selected: filterCode === "30000" ? true : false,
    },
    {
      code: "50000",
      title: "~5억",
      selected: filterCode === "50000" ? true : false,
    },
    {
      code: "70000",
      title: "~7억",
      selected: filterCode === "70000" ? true : false,
    },
    {
      code: "100000",
      title: "~10억",
      selected: filterCode === "100000" ? true : false,
    },
    {
      code: "150000",
      title: "~15억",
      selected: filterCode === "150000" ? true : false,
    },
    {
      code: "180000",
      title: "18억~",
      selected: filterCode === "180000" ? true : false,
    },
  ];

  useEffect(() => {
    if (filterCode) {
      if (filterCode === "0") {
        searchParams.delete("min_price");
        searchParams.delete("max_price");
      } else if (filterCode >= 180000) {
        searchParams.set("min_price", filterCode);
        searchParams.delete("max_price");
      } else {
        searchParams.set("min_price", 0);
        searchParams.set("max_price", filterCode);
      }
    }
    setSearchParams(searchParams);
  }, [filterCode]);

  const handleFilterChange = (e, value) => {
    if (value[0] >= 180000 && value[1] >= 180000) {
      searchParams.set("min_price", value[1]);
      searchParams.delete("max_price");
    } else if (value[0] === 0 && value[1] >= 180000) {
      searchParams.delete("min_price");
      searchParams.delete("max_price");
    } else {
      searchParams.set("min_price", value[0]);
      searchParams.set("max_price", value[1]);
    }
    setMinPrice(value[0]);
    setMaxPrice(value[1]);
    setSearchParams(searchParams);
    setFilterCode(null);
  };

  const handleCodeChange = (value) => {
    if (value === "0") {
      setMinPrice(null);
      setMaxPrice(null);
      setFilterCode(value);
    } else if (value > 0 && value < 180000) {
      setMinPrice(0);
      setMaxPrice(value);
      setFilterCode(value);
    } else if (value === "180000") {
      setMinPrice(value);
      setMaxPrice(0);
      setFilterCode(value);
    } else {
      setMinPrice(0);
      setMaxPrice(180000);
      setFilterCode("");
    }
  };

  const marks = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 30000,
      label: "3억",
    },
    {
      value: 50000,
      label: "5억",
    },
    {
      value: 70000,
      label: "7억",
    },
    {
      value: 100000,
      label: "10억",
    },
    {
      value: 150000,
      label: "15억",
    },
    {
      value: 180000,
      label: "18억",
    },
  ];

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setSearchParams(searchParams);
  //   }, 500);

  //   return () => clearInterval(intervalId);
  // }, [min_price, max_price]);

  return (
    <div className="SYfilterLayerComponent">
      <div className="innerFilterwrap rangeFilterwrap">
        <ThemeProvider theme={customTheme}>
          <Slider
            getAriaLabel={() => "Price"}
            min={0}
            max={180000}
            step={10000}
            orientation="horizontal"
            value={[min_price ?? 0, max_price ? max_price : 180000]}
            defaultValue={[min_price, max_price]}
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
