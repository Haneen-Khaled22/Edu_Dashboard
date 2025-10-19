import React, { useState } from "react";
import { toast } from "react-hot-toast";

import { useNavigate } from "react-router-dom";
import { useQuestions } from "../../Features/Context/Questions/QuestionsContext";

export default function AddQuestion() {
  const { addQuestion } = useQuestions();
  const navigate = useNavigate();

  const [question, setQuestion] = useState({
    text: "",
    type: "",
    options: [],
    correctAnswer: "",
    points: "",
    exam: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestion((prev) => ({ ...prev, [name]: value }));
  };

  const handleOptionsChange = (e) => {
    const opts = e.target.value.split(",").map((opt) => opt.trim());
    setQuestion((prev) => ({ ...prev, options: opts }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!question.text || !question.type || !question.exam) {
    toast.error("Please fill all required fields!");
    return;
  }

  // تجهيز الداتا اللي هتتبعت
  const payload = {
    text: question.text,
    type: question.type,
    exam: question.exam,
    correctAnswer: question.correctAnswer,
    points: Number(question.points) || 1,
  };

  // لو النوع multiple-choice فقط ضيف options
  if (question.type === "multiple-choice") {
    payload.options = question.options;
  }

  const res = await addQuestion(payload);

  if (res?.success) {
    toast.success("Question added successfully!");
    navigate("/questions");
  } else {
    console.error("Error adding question:", res);
    toast.error(res?.message || " Error adding question!");
  }
};


  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-3xl p-8 mt-8 border border-gray-100">
      <h2 className="text-2xl font-bold text-[#6a11cb] mb-6 text-center">
        Add New Question
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Question Text */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Question Text *
          </label>
          <textarea
            name="text"
            value={question.text}
            onChange={handleChange}
            rows={3}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-[#6a11cb] outline-none"
            placeholder="Write your question"
          />
        </div>

        {/* Type */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Type *
          </label>
          <select
            name="type"
            value={question.type}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-[#6a11cb] outline-none cursor-pointer"
          >
            <option value="">Select Type</option>
            <option value="multiple-choice">Multiple Choice</option>
            <option value="true-false">True / False</option>
            <option value="short-answer">Short Answer</option>
          </select>
        </div>

        {/* Options only for multiple choice */}
        {question.type === "multiple-choice" && (
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Options (comma-separated)
            </label>
            <input
              type="text"
              onChange={handleOptionsChange}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-[#6a11cb] outline-none"
              placeholder="Example: A, B, C, D"
            />
          </div>
        )}

        {/* Correct Answer */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Correct Answer *
          </label>
          <input
            type="text"
            name="correctAnswer"
            value={question.correctAnswer}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-[#6a11cb] outline-none"
            placeholder={
              question.type === "true-false"
                ? "Enter 'true' or 'false'"
                : "Enter correct answer"
            }
          />
        </div>

        {/* Points */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Points
          </label>
          <input
            type="number"
            name="points"
            value={question.points}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-[#6a11cb] outline-none"
          />
        </div>

        {/* Exam */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Exam ID *
          </label>
          <input
            type="text"
            name="exam"
            value={question.exam}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-[#6a11cb] outline-none"
            placeholder="Enter exam ID"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={() => navigate("/questions")}
            className="px-6 py-2 rounded-3xl bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-2 rounded-3xl bg-[#6a11cb] hover:bg-[#5b0eb4] text-white font-semibold transition-all cursor-pointer "
          >
            Add Question
          </button>
        </div>
      </form>
    </div>
  );
}
