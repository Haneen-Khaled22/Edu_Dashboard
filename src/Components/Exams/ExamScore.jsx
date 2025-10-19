import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useExams } from "../../Features/Context/Exams/ExamsContext";
import { useQuestions } from "../../Features/Context/Questions/QuestionsContext";

export default function ExamScore() {
  const location = useLocation();
  const navigate = useNavigate();
  const { getExamScore } = useExams();
  const { getQuestionById } = useQuestions();

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
        console.log("🎯 Raw getExamScore response:", res);

        // مرونة في الوصول للـ payload لأن شكل الريسبونس ممكن يختلف
        let data = null;
        if (Array.isArray(res?.data)) {
          data = res.data[0];
        } else if (res?.data && typeof res.data === "object") {
          // لو res.data نفسه كائن يمثل السكور
          data = Array.isArray(res.data?.data) ? res.data.data[0] : res.data;
        } else {
          data = res?.data ?? res;
        }

        // fallback إضافي: لو لسه مصفاش، خلي data = res (لو هو الكائن المطلوب)
        if (!data || (typeof data === "object" && Object.keys(data).length === 0)) {
          // حاول نستخدم res.data[0] أو res[0]
          data = (res?.data && Array.isArray(res.data) && res.data[0]) || (Array.isArray(res) && res[0]) || data;
        }

        if (!data) {
          console.warn("No score data structure matched. Full response:", res);
          toast.error("No score data found for this exam!");
          return;
         

        }

        console.log("✅ Normalized score data:", data);
        setScoreData(data);
         console.log("✅ Final scoreData used in state:", data);

        // إعداد answers بشكل موحَّد
        const answers = Array.isArray(data.answers) ? data.answers : [];
        console.log("📦 Answers array:", answers);

        if (answers.length > 0) {
          const fetchedQuestions = await Promise.all(
            answers.map(async (ans) => {
              // استخراج الـ question id من أي شكل ممكن (مهم جدا)
              const qId =
                (typeof ans.question === "string" && ans.question) ||
                (typeof ans.questionId === "string" && ans.questionId) ||
                (ans.question && typeof ans.question === "object" && (ans.question._id || ans.question.id)) ||
                null;

              if (!qId) {
                console.warn("⚠️ Missing question id for answer:", ans);
                return null;
              }

              try {
                const rawQ = await getQuestionById(qId);
                console.log("🔹 raw question response for", qId, ":", rawQ);

                // مرونة في استخراج كائن السؤال من أي شكل
                const qObj =
                  rawQ?.data ||
                  rawQ?.question ||
                  rawQ?.result ||
                  rawQ ||
                  null;

                if (!qObj) {
                  console.warn("⚠️ Question API returned nothing usable for id:", qId);
                  return null;
                }

                // تأكد إن عندنا _id وحقول نص/جواب صحيح
                const normalized = {
                  _id: qObj._id || qObj.id || qId,
                  text: qObj.text || qObj.questionText || qObj.title || "",
                  correctAnswer: qObj.correctAnswer ?? qObj.answer ?? null,
                  // إبقاء كل الحقل الأصلي لو احتجتيه لاحقًا
                  __raw: qObj,
                };

                return normalized;
              } catch (err) {
                console.error("❌ Error fetching question by id", qId, err);
                return null;
              }
            })
          );

          setQuestions(fetchedQuestions.filter(Boolean));
        } else {
          setQuestions([]);
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

  const student = scoreData.student || {};
  const exam = scoreData.exam || {};
  const answers = Array.isArray(scoreData.answers) ? scoreData.answers : [];

  return (
    <div className="max-w-3xl mx-auto bg-white mt-10 p-8 rounded-2xl border border-purple-100 shadow-sm">
      <button
        onClick={() => navigate(-1)}
        className="px-4 py-2 mb-5 bg-gradient-to-r from-purple-600 to-indigo-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
      >
        ← Back 
      </button>

      <h1 className="text-3xl font-bold text-purple-700 mb-2">
        {exam?.title || "Exam"}
      </h1>
      <p className="text-gray-600 mb-4">
         Student: <strong>{student?.fullName || "Unknown"}</strong>
      </p>

      <div className="bg-purple-50 p-4 rounded-xl mb-8 text-center">
        <h2 className="text-2xl font-bold text-purple-700">
          🎯 Your Score: {scoreData.score ?? "N/A"} points
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          📅 Submitted:{" "}
          {scoreData.createdAt ? new Date(scoreData.createdAt).toLocaleString() : "Unknown"}
        </p>
      </div>

      <div className="space-y-6">
        {questions.map((q, index) => {
          // نحاول نلاقي إجابة الطالب المطابقة لهذا السؤال
          const studentAnswer = answers.find((a) => {
            const aid =
              (typeof a.question === "string" && a.question) ||
              (typeof a.questionId === "string" && a.questionId) ||
              (a.question && typeof a.question === "object" && (a.question._id || a.question.id)) ||
              a._id ||
              null;
            if (!aid || !q?._id) return false;
            return aid.toString() === q._id.toString();
          });

          const selected = studentAnswer?.selectedAnswer ?? "No answer";
          const isCorrect = q?.correctAnswer != null ? q.correctAnswer.toString() === (selected ?? "").toString() : !!studentAnswer?.isCorrect;

          return (
            <div
              key={q._id || index}
              className={`p-5 border rounded-xl transition-all duration-200 ${
                isCorrect ? "border-green-300 bg-green-50" : "border-red-300 bg-red-50"
              }`}
            >
              <h3 className="font-semibold text-lg mb-2 text-purple-800">
                {index + 1}. {q?.text || "Question not found"}
              </h3>

              <p className="text-gray-700 mb-1">
                <strong>Your Answer:</strong>{" "}
                <span className={isCorrect ? "text-green-700" : "text-red-700 font-medium"}>
                  {selected}
                </span>
              </p>

              <p className="text-gray-700">
                <strong>Correct Answer:</strong>{" "}
                <span className="text-green-700 font-medium">{q?.correctAnswer ?? "N/A"}</span>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
