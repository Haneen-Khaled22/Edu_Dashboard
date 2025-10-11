import React from "react";

// import DashboardStatsCards from '../StatCard/StatCard'
import { Container } from "@mui/material";
import AdminHeader from "../AdminHeader/AdminHeader";
import Dashboard from "../StatCard/StatCard";
import RecentUsers from "../Recent Users/RecentUsers";

function Home() {
  return (
    <div className="sm:p-6 lg:p-4 min-h-screen">
      
        <AdminHeader />
        
        <Dashboard />
    
      <RecentUsers/>
    </div>
  );
}

export default Home;
