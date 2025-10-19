import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { useExams } from "../../Features/Context/Exams/ExamsContext";

export default function ExamsOverview() {
  const { getAllExams } = useExams();
  const [stats, setStats] = useState({
    totalExams: 0,
    published: 0,
    upcoming: 0,
    ended: 0,
    levels: {},
  });

  const COLORS = ["#6a11cb", "#b91372", "#00C49F", "#FFBB28", "#FF8042"];

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllExams(1, 1000);
      const Exams = response?.data?.exams || response?.data || [];

      const total = Exams.length;
      const published = Exams.filter((e) => e.isPublished).length;

      const today = new Date();
      const upcoming = Exams.filter(
        (e) => e.startDate && new Date(e.startDate) > today
      ).length;
      const ended = Exams.filter(
        (e) => e.endDate && new Date(e.endDate) < today
      ).length;

      const levels = Exams.reduce((acc, exam) => {
        const level = exam.classLevel || "Unknown";
        acc[level] = (acc[level] || 0) + 1;
        return acc;
      }, {});

      setStats({
        totalExams: total,
        published,
        upcoming,
        ended,
        levels,
      });
    };

    fetchData();
  }, []);

  const donutData = [
    { name: "Published", value: stats.published },
    { name: "Upcoming", value: stats.upcoming },
    { name: "Ended", value: stats.ended },
  ];

  const levelData = Object.entries(stats.levels).map(([key, value]) => ({
    name: key,
    value,
  }));

  return (
    <div className="w-full px-4 lg:px-10 mt-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* === Left: Donut Chart === */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 w-full">
          <h3 className="text-lg font-bold text-[#6a11cb] mb-4 text-center">
            Exams Status Overview
          </h3>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label
                >
                  {donutData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* === Right: Levels Chart === */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 w-full">
          <h3 className="text-lg font-bold text-[#6a11cb] mb-4 text-center">
            Exams per Level
          </h3>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={levelData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                  dataKey="value"
                >
                  {levelData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[(index + 2) % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
