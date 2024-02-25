import React, { useState } from "react";
import { SYregionFilterComponent } from "../filter";

function SYfilterButtonComponent({ SYdata }) {
  const [SYbuttonSelected, SYsetButtonSelected] = useState(SYdata.selected);
  const [SYbuttonPressed, SYsetButtonPressed] = useState(false);
  const SYsettingFilter = {
    region: SYregionFilterComponent,
  };
  const SYfilterComponentCreate = (SYtitle) => {
    const SYcomponentName = SYsettingFilter[SYtitle];
    return <SYcomponentName SYdata={""} />;
  };
  const SYbuttonClickHandler = () => {
    //SYsetButtonSelected(!SYbuttonSelected)
    SYsetButtonPressed(!SYbuttonPressed);
  };
  return (
    <button
      type="button"
      class="filterCell"
      aria-selected={SYbuttonSelected}
      aria-pressed={SYbuttonPressed}
      onClick={() => SYbuttonClickHandler()}
    >
      {SYdata.text}
      {SYdata.column === "region" ? SYfilterComponentCreate(SYdata.column) : ""}
    </button>
  );
}

export default SYfilterButtonComponent;
