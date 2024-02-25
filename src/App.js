import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SYheader, SYfooter, SYmetatag } from "./components/layout";
import { SYhome } from "./pages/home";
import { SYbunyang, SYbunyangDetail, SYbunyangMap } from "./pages/bunyang";
import { SYdevelop, SYdevelopDetail } from "./pages/develop";
import { SYmoveIn, SYmoveInDetail } from "./pages/moveIn";
import { SYsiteReport, YJsiteReportDetail } from "./pages/siteReport";
import { SYtip, SYtipDetail } from "./pages/tip";
import { SYapartment } from "./pages/apt";
import { NewCity, NewCityDetail, YJcomplexDetail } from "./pages/newCity";
import { SYproposal } from "./pages";

function App() {
  return (
    <Router>
      <SYmetatag />
      <SYheader />
      <Routes>
        <Route exact path="/bunyang" element={<SYbunyang />} />
        <Route exact path="/bunyang/detail" element={<SYbunyangDetail />} />
        <Route exact path="/bunyang/map" element={<SYbunyangMap />} />
        <Route exact path="/develop" element={<SYdevelop />} />
        <Route exact path="/develop/detail" element={<SYdevelopDetail />} />
        <Route exact path="/moveIn" element={<SYmoveIn />} />
        <Route exact path="/moveIn/detail" element={<SYmoveInDetail />} />
        <Route exact path="/siteReport" element={<SYsiteReport />} />
        <Route
          exact
          path="/siteReport/detail"
          element={<YJsiteReportDetail />}
        />
        <Route exact path="/tip" element={<SYtip />} />
        <Route exact path="/tip/detail" element={<SYtipDetail />} />
        <Route exact path="/apt" element={<SYapartment />} />
        <Route exact path="/newCity" element={<NewCity />} />
        <Route exact path="/newCity/detail" element={<NewCityDetail />} />
        <Route exact path="/newCity/complex" element={<YJcomplexDetail />} />
        <Route exact path="/" element={<SYhome />} />
        <Route exact path="/proposal" element={<SYproposal />} />
      </Routes>
      <SYfooter />
    </Router>
  );
}

export default App;
