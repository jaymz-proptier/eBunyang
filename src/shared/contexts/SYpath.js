import React, { createContext, useContext } from "react";

export const SYpath = createContext({
    SYapiPath: "https://test-api.ebunyang.co.kr/v2",
});

export const usePath = () => useContext(SYpath);