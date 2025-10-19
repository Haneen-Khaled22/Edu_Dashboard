import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useExams } from "../../Features/Context/Exams/ExamsContext";
import { useQuestions } from "../../Features/Context/Questions/QuestionsContext";

export default function ExamScore() {
  const location = useLocation();
  const navigate = useNavigate();
  const { getExamScore } = useExams();
    const {  getQuestionById } = useQuestions();

  const examId = location.state?.examId;

  const [scoreData, setScoreData] = useState(null);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchScoreData = async () => {
      try {
        if (!examId) {
          toast.error("No exam ID found!");
          return;
        }

        const res = await getExamScore(examId);
        console.log("🎯 Score response:", res);

        // ✅ لو الريسبونس بالشكل: { data: [ {...} ] }
        const data = Array.isArray(res?.data) ? res.data[0] : res?.data?.[0];
        if (!data) {
          toast.error("No score data found for this exam!");
          return;
        }

        setScoreData(data);

        // ✅ جلب تفاصيل الأسئلة
        if (data.answers?.length) {
          const fetchedQuestions = await Promise.all(
            data.answers.map(async (ans) => {
              const qData = await getQuestionById(ans.questionId);
              return qData?.question || qData;
            })
          );
          setQuestions(fetchedQuestions.filter(Boolean));
        }
      } catch (error) {
        console.error("❌ Error fetching score:", error);
        toast.error("Something went wrong while fetching your score.");
      }
    };

    fetchScoreData();
  }, [examId, getExamScore, getQuestionById]);

  if (!scoreData) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-gray-600">
        Loading your score...
      </div>
    );
  }

  // ✅ استخراج البيانات من الأرايز
  const student = scoreData.student;
  const exam = scoreData.exam;
  const answers = scoreData.answers || [];

  return (
    <div className="max-w-2xl mx-auto bg-white mt-10 p-8 rounded-2xl  border border-purple-100">
      <button
        onClick={() => navigate(-1)}
        className="px-4 py-2 mb-5 bg-gradient-to-r from-purple-600 to-indigo-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold text-purple-700 mb-2">{exam?.title || "Exam"}</h1>
      <p className="text-gray-600 mb-4"> Student: {student?.fullName || "Unknown"}</p>

      <div className="bg-purple-50 p-4 rounded-xl mb-8 text-center">
        <h2 className="text-2xl font-bold text-purple-700">
          🎯 Your Score: {scoreData.score} points
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          📅 Submitted: {new Date(scoreData.createdAt).toLocaleString()}
        </p>
      </div>

      <div className="space-y-6">
        {questions.map((q, index) => {
          const studentAnswer = answers.find((a) => a.questionId === q._id);
          const isCorrect = studentAnswer?.selectedAnswer === q.correctAnswer;

          return (
            <div
              key={q._id}
              className={`p-5 border rounded-xl ${
                isCorrect ? "border-green-300 bg-green-50" : "border-red-300 bg-red-50"
              }`}
            >
              <h3 className="font-semibold text-lg mb-2 text-purple-800">
                {index + 1}. {q.text}
              </h3>

              <p className="text-gray-700">
                <strong>Your Answer:</strong>{" "}
                <span className={isCorrect ? "text-green-700" : "text-red-700"}>
                  {studentAnswer?.selectedAnswer || "No answer"}
                </span>
              </p>

              <p className="text-gray-700">
                <strong>Correct Answer:</strong> {q.correctAnswer}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
