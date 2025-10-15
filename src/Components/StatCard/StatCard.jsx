import React, { useEffect, useState } from "react";
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
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 flex flex-col justify-between h-full ">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        <p className="text-xs font-medium text-green-500">{percentage}</p>
      </div>

      {/* Chart */}
      <div className="h-24">
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
  const { getAllUsers, getAllLessons, getAllExams } = useUsers();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalLessons: 0,
    totalExams: 0,
    paidLessons: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const usersRes = await getAllUsers();
        const lessonsRes = await getAllLessons();
        const examsRes = await getAllExams();

        const users = usersRes?.data || [];
        const lessons = lessonsRes?.lessons || [];
        const exams = examsRes?.data || [];
        console.log("📘 Users API:", usersRes);
console.log("📗 Lessons API:", lessons);
console.log("📕 Exams API:", examsRes);


        const paidLessons = lessons.filter(
          (l) => l.price && Number(l.price) > 0
        ).length;

        setStats({
          totalUsers: users.length,
          totalLessons: lessons.length,
          totalExams: exams.length,
          paidLessons,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  // ✅ إنشاء بيانات الرسوم البيانية بشكل نسبي
  const chartData = (value) =>
    Array.from({ length: 5 }, (_, i) => ({
      value: Math.floor(value * (0.7 + i * 0.07)),
    }));

  const cards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      percentage: "+8% from last month",
      color: "#6366f1",
      data: chartData(stats.totalUsers),
    },
    {
      title: "Total Lessons",
      value: stats.totalLessons,
      percentage: "+5% from last month",
      color: "#f97316",
      data: chartData(stats.totalLessons),
    },
    {
      title: "Paid Lessons",
      value: stats.paidLessons,
      percentage: "+3% this week",
      color: "#22c55e",
      data: chartData(stats.paidLessons),
    },
    {
      title: "Total Exams",
      value: stats.totalExams,
      percentage: "+10% this month",
      color: "#06b6d4",
      data: chartData(stats.totalExams),
    },
  ];

  return (
    <div className="lg:p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 mt-12">Dashboard Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 cursor-pointer">
        {cards.map((card, index) => (
          <StatsCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
}
