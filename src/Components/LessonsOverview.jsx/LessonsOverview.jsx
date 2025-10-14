import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { useUsers } from "../../Features/Context/Context.jsx/AllContext";

export default function LessonsOverview() {
  const { getAllLessons } = useUsers();
  const [stats, setStats] = useState({
    totalLessons: 0,
    paid: 0,
    free: 0,
    levels: {},
  });

  const COLORS = ["#6a11cb", "#b91372", "#00C49F", "#FFBB28", "#FF8042"];

  useEffect(() => {
    const fetchData = async () => {
      const { lessons } = await getAllLessons(1, 1000); // كل الدروس
      if (!lessons) return;

      const total = lessons.length;
      const paid = lessons.filter((l) => l.price && l.price > 0).length;
      const free = total - paid;

      // احصائية حسب المرحلة
      const levels = lessons.reduce((acc, lesson) => {
        const level = lesson.classLevel || "Unknown";
        acc[level] = (acc[level] || 0) + 1;
        return acc;
      }, {});

      setStats({ totalLessons: total, paid, free, levels });
    };

    fetchData();
  }, []);

  const pieData = [
    { name: "Paid Lessons", value: stats.paid },
    { name: "Free Lessons", value: stats.free },
  ];

  const levelData = Object.entries(stats.levels).map(([key, value]) => ({
    name: key,
    value,
  }));

  // البيانات الخاصة بالـ Bar Chart
  const barData = [
    { name: "Total Lessons", value: stats.totalLessons },
    { name: "Paid Lessons", value: stats.paid },
    { name: "Free Lessons", value: stats.free },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
      {/* === Left Side: Bar Chart === */}
      <div className="bg-white  rounded-2xl p-5 border border-gray-100">
        <h3 className="text-lg font-bold text-[#6a11cb] mb-4 text-center">
          Lessons Statistics
        </h3>

        <div className="w-full h-80">
          <ResponsiveContainer>
            <BarChart data={barData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#6a11cb" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* === Right Side: Pie Charts === */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100">
        <h3 className="text-lg font-bold text-[#6a11cb] mb-4 text-center">
          Lessons Overview
        </h3>

        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          {/* Pie Chart: Paid vs Free */}
          <div className="w-64 h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
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

          {/* Pie Chart: Lessons per Level */}
          <div className="w-64 h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={levelData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
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
