import React, { useEffect, useState } from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useExams } from "../../Features/Context/Exams/ExamsContext";

export default function ExamsStats() {
  const { getAllExams } = useExams();
  const [exams, setExams] = useState([]);
  const [stats, setStats] = useState({
    totalExams: 0,
    publishedExams: 0,
    upcomingExams: 0,
    endedExams: 0,
  });

  useEffect(() => {
    const fetchExams = async () => {
      const { Exams } = await getAllExams();
      if (Exams && Array.isArray(Exams)) {
        setExams(Exams);

        const total = Exams.length;
        const published = Exams.filter((e) => e.isPublished).length;
        const today = new Date();
        const upcoming = Exams.filter(
          (e) => new Date(e.startDate) > today
        ).length;
        const ended = Exams.filter(
          (e) => new Date(e.endDate) < today
        ).length;

        setStats({
          totalExams: total,
          publishedExams: published,
          upcomingExams: upcoming,
          endedExams: ended,
        });
      }
    };

    fetchExams();
  }, []);

  const chartData = [
    {
      name: "Total",
      value: stats.totalExams,
      color: "#8b5cf6",
    },
    {
      name: "Published",
      value: stats.publishedExams,
      color: "#22c55e",
    },
    {
      name: "Upcoming",
      value: stats.upcomingExams,
      color: "#f59e0b",
    },
    {
      name: "Ended",
      value: stats.endedExams,
      color: "#ef4444",
    },
  ];

  return (
    <div className="p-8 bg-gradient-to-br from-[#f8f9ff] via-[#f0f4ff] to-[#e8edff] min-h-screen">
      <h2 className="text-3xl font-extrabold text-[#4338ca] mb-8 text-center">
        🧠 Exams Insights
      </h2>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {[
          {
            title: "Total Exams",
            value: stats.totalExams,
            color: "text-violet-600",
            bg: "bg-violet-100",
          },
          {
            title: "Published",
            value: stats.publishedExams,
            color: "text-green-600",
            bg: "bg-green-100",
          },
          {
            title: "Upcoming",
            value: stats.upcomingExams,
            color: "text-orange-600",
            bg: "bg-orange-100",
          },
          {
            title: "Ended",
            value: stats.endedExams,
            color: "text-red-600",
            bg: "bg-red-100",
          },
        ].map((card, i) => (
          <div
            key={i}
            className={`rounded-2xl shadow-lg ${card.bg} hover:scale-105 transition-transform duration-300 p-6 text-center`}
          >
            <h3 className="text-gray-600 font-medium">{card.title}</h3>
            <p className={`text-4xl font-bold mt-2 ${card.color}`}>
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">
          📈 Exams Activity Overview
        </h3>

        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart data={chartData}>
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#6366f1" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "10px",
              }}
            />
            <Legend />
            <Bar dataKey="value" barSize={60} fill="url(#barGradient)" radius={[10, 10, 0, 0]} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#4f46e5"
              strokeWidth={3}
              dot={{ r: 6, stroke: "#fff", strokeWidth: 2 }}
              activeDot={{ r: 8 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
