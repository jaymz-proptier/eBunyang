import React, { createContext, useContext } from "react";

export const SYfilter = createContext({
    bclass: "",
    setBclass: () => {}
});

export const useFilter = () => useContext(SYfilter);