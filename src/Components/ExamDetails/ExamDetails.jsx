import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useUsers } from "../../Features/Context/Context.jsx/AllContext";

export default function ExamDetails() {
  const { id } = useParams();
  const location = useLocation();
  const { getExamById } = useUsers();
  const [exam, setExam] = useState(location.state?.exam || null);

  useEffect(() => {
    if (!exam) {
      const fetchExam = async () => {
        const data = await getExamById(id);
        if (data) setExam(data);
      };
      fetchExam();
    }
  }, [id, exam, getExamById]);

  if (!exam)
    return (
      <p className="text-center text-gray-500 mt-10 text-lg animate-pulse">
        Loading exam details...
      </p>
    );

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow-lg rounded-2xl mt-10 border border-gray-200">
      <h2 className="text-3xl font-extrabold text-[#6a11cb] mb-6 ">
        {exam.title}
      </h2>

      <div className="grid sm:grid-cols-2 gap-4 mb-6 text-gray-700">
        <p>
          <strong>Description:</strong> {exam.description || "No description"}
        </p>
        <p>
          <strong>Class Level:</strong> {exam.classLevel || "N/A"}
        </p>
        <p>
          <strong>Duration:</strong> {exam.duration} mins
        </p>
        <p>
          <strong>Is Published:</strong>{" "}
          <span
            className={`px-2 py-1 rounded-lg text-sm font-semibold ${
              exam.isPublished
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {exam.isPublished ? "true" : "false"}
          </span>
        </p>
        <p>
          <strong>Start Date:</strong>{" "}
          {exam.startDate ? new Date(exam.startDate).toLocaleString() : "N/A"}
        </p>
        <p>
          <strong>End Date:</strong>{" "}
          {exam.endDate ? new Date(exam.endDate).toLocaleString() : "N/A"}
        </p>
        <p>
          <strong>Updated At:</strong>{" "}
          {exam.updatedAt ? new Date(exam.updatedAt).toLocaleString() : "N/A"}
        </p>
      </div>

      <h3 className="text-2xl font-semibold text-[#6a11cb] mt-8 mb-4">
        Questions
      </h3>

      {exam.questions && exam.questions.length > 0 ? (
        <div className="space-y-6">
          {exam.questions.map((q, index) => (
            <div
              key={index}
              className="bg-gray-50 border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <h4 className="text-lg font-bold text-[#5b0fbf] mb-2">
                Q{index + 1}. {q.text || "No question text"}
              </h4>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Type:</strong> {q.type || "N/A"}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Points:</strong> {q.points ?? "N/A"}
              </p>

              {q.options && (
                <ul className="list-decimal pl-6 text-gray-700 mb-2">
                  {q.options.map((option, i) => (
                    <li
                      key={i}
                      className={`${
                        option === q.correctAnswer
                          ? "font-semibold text-green-700"
                          : ""
                      }`}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}

              <p className="text-sm text-gray-600">
                <strong>Correct Answer:</strong>{" "}
                <span className="text-green-700 font-medium">
                  {q.correctAnswer}
                </span>
              </p>

              <div className="flex flex-wrap gap-4 text-xs text-gray-500 mt-2">
                <p>
                  <strong>Created At:</strong>{" "}
                  {q.createdAt
                    ? new Date(q.createdAt).toLocaleString()
                    : "Unknown"}
                </p>
                <p>
                  <strong>Created By:</strong> {q.createdBy || "N/A"}
                </p>
              
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic">No questions available</p>
      )}
    </div>
  );
}
