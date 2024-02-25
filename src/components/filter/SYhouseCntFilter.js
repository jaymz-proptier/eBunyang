import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Slider, { sliderClasses } from "@mui/material/Slider";
import { useRecoilState } from "recoil";
import { bunyangFilterState } from "../../recoils/bunyang";

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

function SYhouseCntFilter({ SYfilterMenu }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [min_house_cnt, setMinPrice] = useState(
    searchParams.get("min_house_cnt") ?? 0
  );
  const [max_house_cnt, setMaxPrice] = useState(
    searchParams.get("max_house_cnt") ?? 0
  );
  const [filterValue, setFilterValue] = useState(null);
  const maxValue = SYfilterMenu.maxValue;
  const minValue = SYfilterMenu.minValue;
  const stepValue = SYfilterMenu.stepValue;
  const [filterCode, setFilterCode] = useRecoilState(bunyangFilterState);

  useEffect(() => {
    if (filterValue) {
      if (filterValue === "all") {
        searchParams.delete("min_house_cnt");
        searchParams.delete("max_house_cnt");
      } else if (filterValue >= maxValue) {
        searchParams.set("min_house_cnt", filterValue);
        searchParams.delete("max_house_cnt");
      } else {
        searchParams.set("min_house_cnt", minValue);
        searchParams.set("max_house_cnt", filterValue);
      }
    }
    searchParams.delete("page");
    setSearchParams(searchParams);
  }, [filterValue]);

  useEffect(() => {
    setFilterCode({
      ...filterCode,
      min_house_cnt: searchParams.get("min_house_cnt") || "",
      max_house_cnt: searchParams.get("max_house_cnt") || "",
    });
  }, [min_house_cnt, max_house_cnt]);

  const handleFilterChange = (e, value) => {
    if (value[0] >= maxValue && value[1] >= maxValue) {
      searchParams.set("min_house_cnt", value[1]);
      searchParams.delete("max_house_cnt");
    } else if (value[0] === minValue && value[1] >= maxValue) {
      searchParams.delete("min_house_cnt");
      searchParams.delete("max_house_cnt");
    } else {
      searchParams.set("min_house_cnt", value[0]);
      searchParams.set("max_house_cnt", value[1]);
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
            allowCross="false"
            orientation="horizontal"
            value={[
              min_house_cnt ?? minValue,
              max_house_cnt ? max_house_cnt : maxValue,
            ]}
            defaultValue={[min_house_cnt, max_house_cnt]}
            valueLabelDisplay="off"
            marks={SYfilterMenu.item.map((SYloopData, SYindex) => ({
              value: parseInt(SYloopData.code),
              label: SYloopData.marks,
            }))}
            onChange={(e, value) => handleFilterChange(e, value)}
          />
        </ThemeProvider>

        <div className="filterContainer priceRange">
          {SYfilterMenu.item.map((SYloopData, SYindex) => (
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

export default SYhouseCntFilter;
