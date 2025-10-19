import React, { useState } from "react";
import { toast } from "react-hot-toast";

import { useNavigate } from "react-router-dom";
import { useExams } from "../../Features/Context/Exams/ExamsContext";

export default function AddExam() {
  const { addExam } = useExams();
  const navigate = useNavigate();

  const [exam, setExam] = useState({
    title: "",
    description: "",
    classLevel: "",
    duration: "",
    startDate: "",
    endDate: "",
    isPublished: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setExam((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!exam.title || !exam.description) {
      toast.error("Please fill in all required fields!");
      return;
    }

    const res = await addExam(exam);

    if (res?.success) {
      toast.success("Exam added successfully!");
      navigate("/exams");
    } else {
      toast.error(res?.message || "Error adding exam!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-3xl p-8 mt-8 border border-gray-100">
      <h2 className="text-2xl font-bold text-[#6a11cb] mb-6 text-center">
        Add New Exam
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Exam Title *
          </label>
          <input
            type="text"
            name="title"
            value={exam.title}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-[#6a11cb] outline-none"
            placeholder="Enter exam title"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Description *
          </label>
          <textarea
            name="description"
            value={exam.description}
            onChange={handleChange}
            rows={4}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-[#6a11cb] outline-none"
            placeholder="Write exam description"
            required
          />
        </div>

        {/* Class Level */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Class Level
          </label>
         <select
  name="classLevel"
  value={exam.classLevel}
  onChange={handleChange}
  className="w-full p-3 border rounded-xl bg-white focus:ring-2 focus:ring-[#6a11cb] outline-none cursor-pointer"
>
  <option value="">Select class level</option>
  <option value="Grade 1 Secondary">Grade 1 Secondary</option>
  <option value="Grade 2 Secondary">Grade 2 Secondary</option>
  <option value="Grade 3 Secondary">Grade 3 Secondary</option>
</select>

        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Duration (minutes)
          </label>
          <input
            type="number"
            name="duration"
            value={exam.duration}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-[#6a11cb] outline-none"
            placeholder="Enter exam duration"
          />
        </div>

        {/* Start Date */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Start Date & Time
          </label>
          <input
            type="datetime-local"
            name="startDate"
            value={exam.startDate}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-[#6a11cb] outline-none"
          />
        </div>

        {/* End Date */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            End Date & Time
          </label>
          <input
            type="datetime-local"
            name="endDate"
            value={exam.endDate}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-[#6a11cb] outline-none"
          />
        </div>

        {/* Is Published */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="isPublished"
            checked={exam.isPublished}
            onChange={handleChange}
            className="w-5 h-5 accent-[#6a11cb] cursor-pointer"
          />
          <label className="text-sm font-medium text-gray-600">
            Publish Exam
          </label>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={() => navigate("/exams")}
            className="px-6 py-2 rounded-3xl bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-2 rounded-3xl bg-[#6a11cb] hover:bg-[#5b0eb4] text-white font-semibold transition-all cursor-pointer"
          >
            Add Exam
          </button>
        </div>
      </form>
    </div>
  );
}
