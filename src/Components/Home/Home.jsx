import React from "react";

// import DashboardStatsCards from '../StatCard/StatCard'
import { Container } from "@mui/material";
import AdminHeader from "../AdminHeader/AdminHeader";
import Dashboard from "../StatCard/StatCard";
import RecentUsers from "../Recent Users/RecentUsers";
import LessonsOverview from "../LessonsOverview.jsx/LessonsOverview";
import ExamsStats from "../ExamsOverview/ExamsOverview";

function Home() {
  return (
    <div className="sm:p-6 lg:p-4 min-h-screen">
      
        <AdminHeader />
        
        <Dashboard />
        <LessonsOverview/>
    
    <div className="flex justify-between items-center gap-4">
     
      <RecentUsers/>
       {/* <ExamsStats/> */}
    </div>
      
    </div>
  );
}

export default Home;
