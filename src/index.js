import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { HelmetProvider } from "react-helmet-async";
import ReactGA from "react-ga4";
import TagManager from "react-gtm-module";
import App from "./App";
import { ReactQueryDevtools } from "react-query/devtools";
import { RecoilRoot } from "recoil";

ReactGA.initialize("G-R5PVHWQGMD");
const SYtagManager = {
  gtmId: "GTM-KCVRZJB"
};
TagManager.initialize(SYtagManager);
const root = ReactDOM.createRoot(document.getElementById("SY"));
const queryClient = new QueryClient();

root.render(
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  </RecoilRoot>
);
