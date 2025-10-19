import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";
import { useQuestions } from "../../Features/Context/Questions/QuestionsContext";

export default function QuestionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getQuestionById, deleteQuestion, updateQuestion } = useQuestions();

  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchQuestionDetails = async () => {
      try {
        const data = await getQuestionById(id);
        if (data?.data) setQuestion(data.data);
        else setQuestion(data);
      } catch (error) {
        console.error("Error loading question:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestionDetails();
  }, [id, getQuestionById]);

  // 🗑️ حذف السؤال
  const handleDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This question will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      background: "#fff",
      customClass: {
        title: "text-[#6a11cb]",
        popup: "rounded-3xl shadow-lg border border-gray-200",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteQuestion(id);
        if (res?.success) {
          Swal.fire({
            title: "Deleted!",
            text: "Question deleted successfully!",
            icon: "success",
            confirmButtonColor: "#6a11cb",
          });
          navigate("/questions");
        } else {
          Swal.fire({
            title: "Error!",
            text: "Something went wrong while deleting.",
            icon: "error",
            confirmButtonColor: "#6a11cb",
          });
        }
      }
    });
  };

  // ✏️ تحديث السؤال
  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedData = {
      text: e.target.text.value,
      type: e.target.type.value,
      points: Number(e.target.points.value),
      correctAnswer: e.target.correctAnswer.value,
      options: e.target.options.value.split(",").map((opt) => opt.trim()),
    };

    const res = await updateQuestion(id, updatedData);

    if (res?.success) {
    //   Swal.fire({
    //     title: "Updated!",
    //     text: "Question updated successfully!",
    //     icon: "success",
    //     confirmButtonColor: "#6a11cb",
    //   });
    toast.success("Question updated successfully");
      setQuestion((prev) => ({ ...prev, ...updatedData }));
      setIsModalOpen(false);
    } else {
    //   Swal.fire({
    //     title: "Error!",
    //     text: "Something went wrong while updating.",
    //     icon: "error",
    //     confirmButtonColor: "#6a11cb",
    //   });
      toast.error("something went wrong");
    }
  };

  if (loading)
    return (
      <p className="text-lg font-semibold animate-pulse text-center mt-10">
        Loading question ...
      </p>
    );

  if (!question)
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-gray-500 text-lg">No question found.</p>
      </div>
    );

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8 border border-purple-100 transition-all duration-300">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <button
            onClick={() => navigate(-1)}
            className="px-4 ؤعقcursor-pointer py-2 bg-gradient-to-r from-purple-600 to-indigo-500 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200"
          >
            ← Back
          </button>

          <div className="flex gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#6a11cb] hover:bg-[#5b0fbf] text-white px-4 py-2 rounded-3xl font-medium text-sm transition-all cursor-pointer"
            >
              Update Question
            </button>

            <button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-3xl font-medium text-sm transition-all cursor-pointer"
            >
              Delete Question
            </button>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-500 mb-8">
          Question Details
        </h2>

        {/* Details */}
        <div className="space-y-4 text-gray-800">
          <DetailItem label="ID" value={question._id} />
          <DetailItem label="Question" value={question.text} />
          <DetailItem label="Type" value={question.type} />
          <DetailItem label="Points" value={question.points} />
          <DetailItem
            label="Correct Answer"
            value={question.correctAnswer}
            highlight="green"
          />
          <DetailItem
            label="Options"
            value={
              Array.isArray(question.options)
                ? question.options.join(", ")
                : "N/A"
            }
          />
          <DetailItem
            label="Created At"
            value={new Date(question.createdAt).toLocaleString()}
          />
          <DetailItem
            label="Updated At"
            value={new Date(question.updatedAt).toLocaleString()}
          />
        </div>
      </div>

      {/* ✏️ Update Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mt-3 h-[80vh] overflow-y-auto transform transition-all duration-300">
            <h3 className="text-xl font-semibold text-[#6a11cb] text-center pb-3">
              Update Question
            </h3>

            <form onSubmit={handleUpdate} className="space-y-4">
              {/* Text */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Question Text
                </label>
                <input
                  name="text"
                  defaultValue={question.text}
                  placeholder="Enter question text"
                  className="w-full border border-gray-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#6a11cb]"
                />
              </div>

              {/* Type */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Type
                </label>
                <input
                  name="type"
                  defaultValue={question.type}
                  placeholder="Enter question type"
                  className="w-full border border-gray-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#6a11cb]"
                />
              </div>

              {/* Points */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Points
                </label>
                <input
                  name="points"
                  type="number"
                  defaultValue={question.points}
                  placeholder="Enter question points"
                  className="w-full border border-gray-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#6a11cb]"
                />
              </div>

              {/* Correct Answer */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Correct Answer
                </label>
                <input
                  name="correctAnswer"
                  defaultValue={question.correctAnswer}
                  placeholder="Enter correct answer"
                  className="w-full border border-gray-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#6a11cb]"
                />
              </div>

              {/* Options */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Options (comma separated)
                </label>
                <input
                  name="options"
                  defaultValue={
                    Array.isArray(question.options)
                      ? question.options.join(", ")
                      : ""
                  }
                  placeholder="Option1, Option2, Option3"
                  className="w-full border border-gray-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#6a11cb]"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-3 sticky bottom-0 bg-white pb-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-xl font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#6a11cb] hover:bg-[#5b0fbf] text-white px-4 py-2 rounded-xl font-medium cursor-pointer"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// 🔹 مكون لصف التفاصيل
function DetailItem({ label, value, highlight }) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-gray-100 pb-3">
      <p className="font-semibold text-gray-600">{label}:</p>
      <p
        className={`mt-1 sm:mt-0 ${
          highlight === "green" ? "text-green-600 font-bold" : "text-gray-800"
        } break-words text-sm sm:text-base text-right`}
      >
        {value}
      </p>
    </div>
  );
}
