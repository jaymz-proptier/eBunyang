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

function HouseCntFilterComponent() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [min_house_cnt, setMinHouse] = useState(
    searchParams.get("min_house_cnt") ?? 0
  );
  const [max_house_cnt, setMaxHouse] = useState(
    searchParams.get("max_house_cnt") ?? 0
  );
  const [filterCode, setFilterCode] = useState(null);

  const SYbuttonBox = [
    {
      code: "0",
      title: "전체",
      selected: filterCode === "0" ? true : false,
    },
    {
      code: "100",
      title: "~100세대",
      selected: filterCode === "100" ? true : false,
    },
    {
      code: "300",
      title: "~300세대",
      selected: filterCode === "300" ? true : false,
    },
    {
      code: "500",
      title: "~500세대",
      selected: filterCode === "500" ? true : false,
    },
    {
      code: "1000",
      title: "1000세대~",
      selected: filterCode === "1000" ? true : false,
    },
  ];

  useEffect(() => {
    if (filterCode) {
      if (filterCode === "0") {
        searchParams.delete("min_house_cnt");
        searchParams.delete("max_house_cnt");
      } else if (filterCode >= 1000) {
        searchParams.set("min_house_cnt", filterCode);
        searchParams.delete("max_house_cnt");
      } else {
        searchParams.set("min_house_cnt", 0);
        searchParams.set("max_house_cnt", filterCode);
      }
    }
    setSearchParams(searchParams);
  }, [filterCode]);

  const handleFilterChange = (e, value) => {
    if (value[0] >= 1000 && value[1] >= 1000) {
      searchParams.set("min_house_cnt", value[1]);
      searchParams.delete("max_house_cnt");
    } else if (value[0] === 0 && value[1] >= 1000) {
      searchParams.delete("min_house_cnt");
      searchParams.delete("max_house_cnt");
    } else {
      searchParams.set("min_house_cnt", value[0]);
      searchParams.set("max_house_cnt", value[1]);
    }
    setMinHouse(value[0]);
    setMaxHouse(value[1]);
    setSearchParams(searchParams);
    setFilterCode(null);
  };

  const handleCodeChange = (value) => {
    if (value === "0") {
      setMinHouse(null);
      setMaxHouse(null);
      setFilterCode(value);
    } else if (value > 0 && value < 1000) {
      setMinHouse(0);
      setMaxHouse(value);
      setFilterCode(value);
    } else if (value === "1000") {
      setMinHouse(value);
      setMaxHouse(0);
      setFilterCode(value);
    } else {
      setMinHouse(0);
      setMaxHouse(1000);
      setFilterCode("");
    }
  };

  const marks = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 100,
      label: "100세대",
    },
    {
      value: 300,
      label: "300세대",
    },
    {
      value: 500,
      label: "500세대",
    },
    {
      value: 1000,
      label: "1000세대",
    },
  ];

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setSearchParams(searchParams);
  //   }, 500);

  //   return () => clearInterval(intervalId);
  // }, [min_house_cnt, max_house_cnt]);

  return (
    <div className="SYfilterLayerComponent">
      <div className="innerFilterwrap rangeFilterwrap">
        <ThemeProvider theme={customTheme}>
          <Slider
            getAriaLabel={() => "Price"}
            min={0}
            max={1000}
            step={100}
            orientation="horizontal"
            value={[min_house_cnt ?? 0, max_house_cnt ? max_house_cnt : 1000]}
            defaultValue={[min_house_cnt, max_house_cnt]}
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

export default HouseCntFilterComponent;
