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

function SYscaleFilter({ SYfilterMenu }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [min_scale, setMinScale] = useState(searchParams.get("min_scale") || 0);
  const [max_scale, setMaxScale] = useState(searchParams.get("max_scale") || 0);
  const [filterValue, setFilterValue] = useState(null);
  const maxValue = SYfilterMenu.maxValue;
  const minValue = SYfilterMenu.minValue;
  const stepValue = SYfilterMenu.stepValue;
  const [filterCode, setFilterCode] = useRecoilState(bunyangFilterState);

  useEffect(() => {
    if (filterValue) {
      if (filterValue === "all") {
        searchParams.delete("min_scale");
        searchParams.delete("max_scale");
      } else if (filterValue >= maxValue) {
        searchParams.set("min_scale", filterValue);
        searchParams.delete("max_scale");
      } else {
        searchParams.set("min_scale", minValue);
        searchParams.set("max_scale", filterValue);
      }
    }
    searchParams.delete("page");
    setSearchParams(searchParams);
  }, [filterValue]);

  useEffect(() => {
    setFilterCode({
      ...filterCode,
      min_scale: searchParams.get("min_scale") || "",
      max_scale: searchParams.get("max_scale") || "",
    });
  }, [min_scale, max_scale]);

  const handleFilterChange = (e, value) => {
    if (value[0] >= maxValue && value[1] >= maxValue) {
      searchParams.set("min_scale", value[1]);
      searchParams.delete("max_scale");
    } else if (value[0] === minValue && value[1] >= maxValue) {
      searchParams.delete("min_scale");
      searchParams.delete("max_scale");
    } else {
      searchParams.set("min_scale", value[0]);
      searchParams.set("max_scale", value[1]);
    }
    setMinScale(value[0]);
    setMaxScale(value[1]);
    searchParams.delete("page");
    setSearchParams(searchParams);
    setFilterValue(null);
  };

  const handleCodeChange = (value) => {
    const code = parseInt(value);
    if (code === minValue) {
      setMinScale(null);
      setMaxScale(null);
      setFilterValue("all");
    } else if (value > minValue && value < maxValue) {
      setMinScale(minValue);
      setMaxScale(code);
      setFilterValue(code);
    } else if (code === maxValue) {
      setMinScale(code);
      setMaxScale(minValue);
      setFilterValue(code);
    } else {
      setMinScale(minValue);
      setMaxScale(maxValue);
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
            value={[min_scale ?? minValue, max_scale ? max_scale : maxValue]}
            defaultValue={[min_scale, max_scale]}
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

export default SYscaleFilter;
