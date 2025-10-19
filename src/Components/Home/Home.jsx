import React from "react";

// import DashboardStatsCards from '../StatCard/StatCard'
import { Container } from "@mui/material";
import AdminHeader from "../AdminHeader/AdminHeader";
import LessonsOverview from "../Lessons/LessonsOverview";
import RecentUsers from "../Users/RecentUsers";
import Dashboard from "../StatCard/StatCard";
import ExamsStats from "../Exams/ExamsOverview";
// import RecentUsers from "../Users/RecentUsers";
// import LessonsOverview from "../Lessons/LessonsOverview";
// import ExamsStats from "../Exams/ExamsOverview";

function Home() {
  return (
    <div >
      
        <AdminHeader />
        
        <Dashboard />
        <LessonsOverview/>
    
    
     
      {/* <RecentUsers/> */}
       <ExamsStats/>
   
      
    </div>
  );
}

export default Home;
