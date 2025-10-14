import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useUsers } from "../../Features/Context/Context.jsx/AllContext";
import { useNavigate } from "react-router-dom";

export default function AddLesson() {
  const { addLesson } = useUsers();
  const navigate = useNavigate();

  const [lesson, setLesson] = useState({
    title: "",
    description: "",
    video: "",
    classLevel: "",
    scheduledDate: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLesson((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!lesson.title || !lesson.description) {
      toast.error("Please fill in the required fields!");
      return;
    }

    const res = await addLesson(lesson);

    if (res?.success) {
      toast.success("Lesson added successfully!");
      navigate("/lessons");
    } else {
      toast.error(res?.message || "Error adding lesson!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-3xl p-8 mt-8 border border-gray-100">
      <h2 className="text-2xl font-bold text-[#6a11cb] mb-6 text-center">
      Add New Lesson
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Lesson Title *
          </label>
          <input
            type="text"
            name="title"
            value={lesson.title}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-[#6a11cb] outline-none"
            placeholder="Enter lesson title"
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
            value={lesson.description}
            onChange={handleChange}
            rows={4}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-[#6a11cb] outline-none"
            placeholder="Write lesson description"
            required
          />
        </div>

        {/* Video URL */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            YouTube Video URL
          </label>
          <input
            type="text"
            name="video"
            value={lesson.video}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-[#6a11cb] outline-none"
            placeholder="https://www.youtube.com/watch?v=example"
          />
        </div>

        {/* Class Level */}
        {/* Class Level */}
<div>
  <label className="block text-sm font-medium text-gray-600 mb-1">
    Class Level
  </label>
  <select
    name="classLevel"
    value={lesson.classLevel}
    onChange={handleChange}
    className="w-full p-3 border rounded-xl bg-white focus:ring-2 focus:ring-[#6a11cb] outline-none cursor-pointer"
  >
   
    <option value="1st Secondary">Grade 1 Secondary</option>
    <option value="2nd Secondary">Grade 2 Secondary</option>
    <option value="3rd Secondary">Grade 3 Secondary</option>
  </select>
</div>


        {/* Scheduled Date */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Scheduled Date
          </label>
          <input
            type="datetime-local"
            name="scheduledDate"
            value={lesson.scheduledDate}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-[#6a11cb] outline-none"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Price (EGP)
          </label>
          <input
            type="number"
            name="price"
            value={lesson.price}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-[#6a11cb] outline-none"
            placeholder="0 for free lessons"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={() => navigate("/lessons")}
            className="px-6 py-2 rounded-3xl bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-2 rounded-3xl bg-[#6a11cb] hover:bg-[#5b0eb4] text-white font-semibold transition-all cursor-pointer "
          >
            Add Lesson
          </button>
        </div>
      </form>
    </div>
  );
}
