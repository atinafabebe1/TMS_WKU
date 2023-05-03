import React from "react";
import Navbar from "../../common/header/Navbar";
import SparePartsHomeReport from "./GenerateAndStoreReports";
import SparePartPurchasingRequest from "./ApproveSparePartPurchasing";
import WeeklySpareParts from "./weeklyReport";
import MonthlySpareParts from "./monthlyReport";
import HalfYearSpareParts from "./halfYearReport";
import YearlySpareParts from "./yearlyReport";

import { Routes, Route } from "react-router-dom";

const links = [
  {
    name: "Home",
    url: "/store",
  },
  {
    name: "Approve",
    url: "/store/approve",
    children: [
      {
        name: "Spare Part Purchasing",
        url: "/store/approve/sparePart-purchasing-request",
      },
    ],
  },
  {
    name: "Report",
    url: "/store/Report",
    children: [
      {
        name: "Generate Report",
        url: "/store/Report",
      },
    ],
  },
];
const StorePage = () => {
  return (
    <div>
      <div className="mb-3">
        <Navbar links={links} title="TMS" />
      </div>
      <Routes>
        <Route
          path="approve/sparePart-purchasing-request"
          element={<SparePartPurchasingRequest />}
        />
        <Route path="Report" element={<SparePartsHomeReport />} />
        <Route
          path="Report/generate-report-weekly"
          element={<WeeklySpareParts />}
        />
        <Route
          path="Report/generate-report-monthly"
          element={<MonthlySpareParts />}
        />
        <Route
          path="Report/generate-report-halfYear"
          element={<HalfYearSpareParts />}
        />
        <Route
          path="Report/generate-report-yearly"
          element={<YearlySpareParts />}
        />
      </Routes>
    </div>
  );
};

export default StorePage;
