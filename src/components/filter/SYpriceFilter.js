import React, { useState, useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Slider, { sliderClasses } from "@mui/material/Slider";
import { useRecoilState } from "recoil";
import { bunyangFilterState } from "../../recoils/bunyang";
import { siteReportFilterState } from "../../recoils/siteReport";

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

function SYpriceFilter({ SYfilterMenu }) {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [min_price, setMinPrice] = useState(searchParams.get("min_price") || 0);
  const [max_price, setMaxPrice] = useState(searchParams.get("max_price") || 0);
  const [filterValue, setFilterValue] = useState(null);
  const maxValue = SYfilterMenu.maxValue;
  const minValue = SYfilterMenu.minValue;
  const stepValue = SYfilterMenu.stepValue;

  let filterCode;
  let setFilterCode;
  if (location.pathname === "/bunyang") {
    [filterCode, setFilterCode] = useRecoilState(bunyangFilterState);
  } else if (location.pathname === "/siteReport") {
    [filterCode, setFilterCode] = useRecoilState(siteReportFilterState);
  } else {
    [filterCode, setFilterCode] = useState();
  }

  useEffect(() => {
    if (filterValue) {
      if (filterValue === "all") {
        searchParams.delete("min_price");
        searchParams.delete("max_price");
      } else if (filterValue >= maxValue) {
        searchParams.set("min_price", filterValue);
        searchParams.delete("max_price");
      } else {
        searchParams.set("min_price", minValue);
        searchParams.set("max_price", filterValue);
      }
    }
    searchParams.delete("page");
    setSearchParams(searchParams);
  }, [filterValue]);

  useEffect(() => {
    setFilterCode({
      ...filterCode,
      min_price: searchParams.get("min_price") || "",
      max_price: searchParams.get("max_price") || "",
    });
  }, [min_price, max_price]);

  const handleFilterChange = (e, value) => {
    if (value[0] >= maxValue && value[1] >= maxValue) {
      searchParams.set("min_price", value[1]);
      searchParams.delete("max_price");
    } else if (value[0] === minValue && value[1] >= maxValue) {
      searchParams.delete("min_price");
      searchParams.delete("max_price");
    } else {
      searchParams.set("min_price", value[0]);
      searchParams.set("max_price", value[1]);
    }

    setMinPrice(value[0]);
    setMaxPrice(value[1]);
    searchParams.delete("page");
    setSearchParams(searchParams);
    setFilterValue(null);
  };

  const handleCodeChange = (value) => {
    const code = parseInt(value);
    if (code === minValue) {
      setMinPrice(null);
      setMaxPrice(null);
      setFilterValue("all");
    } else if (code > minValue && code < maxValue) {
      setMinPrice(minValue);
      setMaxPrice(code);
      setFilterValue(code);
    } else if (code === maxValue) {
      setMinPrice(code);
      setMaxPrice(minValue);
      setFilterValue(code);
    } else {
      setMinPrice(minValue);
      setMaxPrice(maxValue);
      setFilterValue("");
    }
  };

  return (
    <div className="SYfilterLayerComponent">
      <div className="innerFilterwrap rangeFilterwrap">
        <ThemeProvider theme={customTheme}>
          <Slider
            getAriaLabel={() => "Price"}
            min={minValue}
            max={maxValue}
            step={stepValue}
            orientation="horizontal"
            value={[min_price ?? minValue, max_price ? max_price : maxValue]}
            defaultValue={[min_price, max_price]}
            valueLabelDisplay="off"
            marks={SYfilterMenu.item.map((loopData) => ({
              value: parseInt(loopData.code),
              label: loopData.marks,
            }))}
            onChange={(e, value) => handleFilterChange(e, value)}
          />
        </ThemeProvider>

        <div className="filterContainer priceRange">
          {SYfilterMenu.item.map((loopData, index) => (
            <button
              key={index}
              type="button"
              className="filterItem all"
              aria-pressed={loopData.selected}
              onClick={() => handleCodeChange(loopData.code)}
            >
              {loopData.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SYpriceFilter;
