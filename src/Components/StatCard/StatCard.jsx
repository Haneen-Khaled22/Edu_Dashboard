import React, { useEffect } from "react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useUsers } from "../../Features/Context/Context.jsx/AllContext";

const StatsCard = ({ title, value, percentage, color, data }) => {

   
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex flex-col gap-2 ">
        <h3 className="text-sm font-medium text-gray-600 ">{title}</h3>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        <p className="text-xs font-medium text-green-500">{percentage}</p>
      </div>

      {/* Chart */}
      <div className="h-22">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.4} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis hide />
            <YAxis hide />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                borderRadius: "8px",
                border: "1px solid #ddd",
              }}
              cursor={{ stroke: color, strokeDasharray: "3 3" }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2.5}
              fill={`url(#gradient-${color})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const { getAllUsers, totalUsers } = useUsers();
  
  
    useEffect(() => {
      // نستدعي الفنكشن عشان تجيب اليوزرز أول ما الصفحة تفتح
      getAllUsers();
    }, []);
  
  const newStudentsData = [
    { value: 6000 },
    { value: 6500 },
    { value: 7200 },
    { value: 7800 },
    { value: 8531 },
  ];

  const totalStudentsData = [
    { value: 7000 },
    { value: 7200 },
    { value: 7500 },
    { value: 8200 },
    { value: 8531 },
  ];

  const dailyAttendData = [
    { value: 85 },
    { value: 87 },
    { value: 86 },
    { value: 88 },
    { value: 89 },
  ];

  const avgAttendsData = [
    { value: 97 },
    { value: 98 },
    { value: 99 },
    { value: 99.5 },
    { value: 99.05 },
  ];

  const cards = [
    {
      title: "New Students",
      value: "8,531",
      percentage: "+12% from last month",
      color: "#6366f1",
      data: newStudentsData,
    },
    {
      title: "Total Students",
      value: `${totalUsers.length}`,
      percentage: "+8% from last month",
      color: "#f97316",
      data: totalStudentsData,
    },
    {
      title: "Daily Attendance",
      value: "88%",
      percentage: "+2% this week",
      color: "#a855f7",
      data: dailyAttendData,
    },
    {
      title: "Average Attendance",
      value: "99.05%",
      percentage: "+0.5% from last week",
      color: "#06b6d4",
      data: avgAttendsData,
    },
  ];

  return (
    <div className=" lg:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 cursor-pointer">
        {cards.map((card, index) => (
          <StatsCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
}
