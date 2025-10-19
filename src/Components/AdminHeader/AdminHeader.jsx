import React from "react";
import { Plus } from "lucide-react"; // أيقونة بديلة خفيفة (من lucide-react)
import { useNavigate } from "react-router-dom";

export default function AdminHeader() {

  let navigate = useNavigate();

  function navigateToAddLesson(){
    navigate("/addlesson")

  }

   function navigateToAddExam(){
    navigate("/addExam")

  }
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center  rounded-2xl  gap-4 ">
      {/* Left side: Title + Subtitle */}
      <div>
        <h2 className="text-xl font-bold text-gray-900">Welcome to Admin</h2>
        <p className="text-sm text-gray-500 mt-1">
          Quick overview of the learning platform’s activity.
        </p>
      </div>

      {/* Right side: Buttons */}
      <div className="flex flex-row gap-4">
        <button 
         onClick={navigateToAddLesson}
        className="cursor-pointer flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-3 py-2 rounded-lg transition-all">
          <Plus className="w-4 h-4" />
          Add Lesson
        </button>
        <button
        onClick={navigateToAddExam}
        className="cursor-pointer flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-3 py-2 rounded-lg transition-all">
          <Plus className="w-4 h-4" />
          Add Exam
        </button>
      </div>
    </div>
  );
}
