import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import hour from "../../assets/hourglass.png";
import { useExams } from "../../Features/Context/Exams/ExamsContext";
import { useQuestions } from "../../Features/Context/Questions/QuestionsContext";

// ✅ دالة جلب النتيجة من السيرفر
const getExamScore = async (id) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in localStorage");
      return;
    }

    const response = await fetch(
      `https://edu-master-psi.vercel.app/studentExam/exams/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      }
    );

    const data = await response.json();
    console.log("🎯 Exam Score Response:", data);

    if (response.ok) {
      console.log("✅ Exam score fetched successfully:", data);
    } else {
      console.error("❌ Error fetching exam score:", data.message);
    }

    return data;
  } catch (error) {
    console.error("🚨 Error fetching exam score:", error);
  }
};

export default function TakeExam() {
  const location = useLocation();
  const exam = location.state?.examData?.data?.exam;
  const {  submitExam, getRemainingTime } = useExams();
  const {getQuestionById} = useQuestions();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [remainingSeconds, setRemainingSeconds] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showScoreButton, setShowScoreButton] = useState(false);

  // ✅ تحميل الأسئلة
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        if (exam?.questions?.length) {
          setLoading(true);
          const responses = await Promise.all(
            exam.questions.map(async (id) => {
              const data = await getQuestionById(id);
              return data?.question || data;
            })
          );
          setQuestions(responses.filter(Boolean));
        }
      } catch (error) {
        console.error("❌ Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [exam, getQuestionById]);

  // ✅ جلب الوقت المتبقي من السيرفر
  useEffect(() => {
    const fetchRemainingTime = async () => {
      if (!exam?._id) return;
      try {
        const res = await getRemainingTime(exam._id);
        const time = res?.data?.remainingTime;
        const seconds =
          typeof time === "object"
            ? (time.minutes || 0) * 60 + (time.seconds || 0)
            : typeof time === "number"
            ? time * 60
            : 0;

        setRemainingSeconds(seconds);
        console.log("⏳ Remaining Time (sec):", seconds);
      } catch (error) {
        console.error("❌ Error fetching remaining time:", error);
      }
    };

    fetchRemainingTime();
  }, [exam, getRemainingTime]);

  // ✅ عداد تنازلي مباشر
  useEffect(() => {
    if (remainingSeconds === null) return;

    if (remainingSeconds <= 0) {
      toast.error("Time is up! Submitting your exam...");
      handleSubmitExam(true); // Auto submit
      return;
    }

    const interval = setInterval(() => {
      setRemainingSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [remainingSeconds]);

  // ✅ تنسيق الوقت (mm:ss)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // ✅ تحديث الإجابات
  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  // ✅ تسليم الامتحان
  const handleSubmitExam = async (autoSubmit = false) => {
    if (!Object.keys(answers).length) {
      if (autoSubmit) {
        toast.error("Time is up! You didn’t answer any questions.");
        return;
      } else {
        toast.error("Please answer at least one question before submitting!");
        return;
      }
    }

    const formattedAnswers = Object.entries(answers).map(
      ([questionId, value]) => ({
        questionId,
        selectedAnswer: value,
      })
    );

    if (!exam?._id) {
      toast.error("Exam ID is missing!");
      return;
    }

    try {
      setLoading(true);
      const response = await submitExam(exam._id, { answers: formattedAnswers });

      console.log("✅ Submit Exam Response:", response);

      if (response?.success) {
        toast.success("Exam submitted successfully!");
        setShowScoreButton(true); // ✅ إظهار زرار النتيجة بعد التسليم
      } else {
        toast.error(response?.message || "Failed to submit exam.");
      }
    } catch (error) {
      console.error("❌ Error submitting exam:", error);
      toast.error("Something went wrong while submitting!");
    } finally {
      setLoading(false);
    }
  };

  // ✅ جلب النتيجة
  const handleGetScore = async () => {
    try {
      if (!exam?._id) {
        toast.error("Exam ID not found!");
        return;
      }

      const res = await getExamScore(exam._id);
      console.log("🎯 Score response:", res);

      if (res?.data?.score !== undefined) {
        toast.success(`🎯 Your Score: ${res.data.score}`);
      } else {
        toast.error(res?.message || "Could not fetch your score.");
      }
    } catch (error) {
      console.error("❌ Error fetching score:", error);
      toast.error("Something went wrong while getting your score!");
    }
  };

  if (!exam) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-gray-600 text-lg">⚠️ No exam data found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gradient-to-br from-white to-purple-50 rounded-2xl mt-10 border border-purple-100">
      {/* 🔙 زر الرجوع */}
      <button
        onClick={() => navigate(-1)}
        className="px-4 my-5 cursor-pointer py-2 bg-gradient-to-r from-purple-600 to-indigo-500 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200"
      >
        ← Back
      </button>

      {/* 🕒 عنوان الامتحان + الوقت */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-3xl font-bold text-purple-700">{exam.title}</h2>
          <h2 className="text-md font-normal text-gray-500 mt-2">
            {exam.classLevel}
          </h2>
        </div>

        {remainingSeconds !== null && (
          <div
            className={`${
              remainingSeconds < 60
                ? "bg-red-100 text-red-600"
                : "bg-purple-100 text-purple-700"
            } flex gap-2 px-4 py-2 rounded-lg shadow-sm`}
          >
            <img src={hour} className="w-6 h-6" alt="hourglass" />
            Remaining Time: {formatTime(remainingSeconds)}
          </div>
        )}
      </div>

      <p className="text-gray-600 mb-10 mt-4">{exam.description}</p>

      {loading ? (
        <p className="text-center text-gray-500">Loading questions...</p>
      ) : (
        <div className="space-y-8">
          {questions
            .filter((q) => q && q.text)
            .map((q, index) => (
              <div
                key={q._id}
                className="p-5 border border-purple-200 bg-white rounded-xl shadow-sm hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-lg mb-4 text-purple-800">
                  {index + 1}. {q.text}
                </h3>

                {q.type === "short-answer" ? (
                  <input
                    type="text"
                    placeholder="Write your answer here..."
                    value={answers[q._id] || ""}
                    onChange={(e) =>
                      handleAnswerChange(q._id, e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-400 outline-none"
                  />
                ) : q.type === "true-false" ? (
                  <div className="flex gap-6">
                    {["True", "False"].map((option) => (
                      <label
                        key={`${q._id}-${option}`}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-purple-50 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name={q._id}
                          value={option}
                          checked={answers[q._id] === option}
                          onChange={(e) =>
                            handleAnswerChange(q._id, e.target.value)
                          }
                          className="text-purple-600 focus:ring-purple-400"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {q.options?.map((opt) => (
                      <label
                        key={`${q._id}-${opt}`}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-purple-50 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name={q._id}
                          value={opt}
                          checked={answers[q._id] === opt}
                          onChange={(e) =>
                            handleAnswerChange(q._id, e.target.value)
                          }
                          className="text-purple-600 focus:ring-purple-400"
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}

          {/* ✅ أزرار التحكم */}
          <div className="mt-10 flex items-center gap-4">
            <button
              onClick={handleSubmitExam}
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition-all"
            >
              Submit Exam
            </button>

            {showScoreButton && (
              <button
  onClick={() => navigate("/exam-score", { state: { examId: exam._id } })}
  className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition-all ml-4"
>
  View My Score
</button>

            )}
          </div>
        </div>
      )}
    </div>
  );
}
