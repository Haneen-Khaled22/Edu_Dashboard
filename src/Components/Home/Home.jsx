import React from "react";

// import DashboardStatsCards from '../StatCard/StatCard'
import { Container } from "@mui/material";
import AdminHeader from "../AdminHeader/AdminHeader";
import LessonsOverview from "../Lessons/LessonsOverview";
import RecentUsers from "../Users/RecentUsers";
import Dashboard from "../StatCard/StatCard";
// import RecentUsers from "../Users/RecentUsers";
// import LessonsOverview from "../Lessons/LessonsOverview";
// import ExamsStats from "../Exams/ExamsOverview";

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
