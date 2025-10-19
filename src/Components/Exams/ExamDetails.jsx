import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { useExams } from "../../Features/Context/Exams/ExamsContext";

export default function ExamDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { getExamById, deleteExam, updateExam } = useExams();
  const [exam, setExam] = useState(location.state?.exam || null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!exam) {
      const fetchExam = async () => {
        setLoading(true);
        const data = await getExamById(id);
        if (data) setExam(data);
        else toast.error("Exam not found");
        setLoading(false);
      };
      fetchExam();
    } else setLoading(false);
  }, [id, exam, getExamById]);

  // 🗑️ Delete Exam
  const handleDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This exam will be permanently deleted!",
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
        const res = await deleteExam(id);
        if (res?.success) {
          Swal.fire({
            title: "Deleted!",
            text: "Exam deleted successfully!",
            icon: "success",
            confirmButtonColor: "#6a11cb",
          });
          navigate("/exams");
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

  // ✏️ Update Exam
  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedData = {
      title: e.target.title.value,
      description: e.target.description.value,
      classLevel: e.target.classLevel.value,
      duration: Number(e.target.duration.value),
      isPublished: e.target.isPublished.checked,
      startDate: e.target.startDate.value,
      endDate: e.target.endDate.value,
    };

    const res = await updateExam(id, updatedData);

    if (res?.success) {
      toast.success("Exam updated successfully!");
      setExam((prev) => ({ ...prev, ...updatedData }));
      setIsModalOpen(false);
    } else {
      toast.error("Error updating exam");
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-[70vh] text-lg font-semibold text-gray-600">
        Loading exam details...
      </div>
    );

  if (!exam) return null;

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8 mt-10 border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 gap-3 flex-wrap">
        <h2 className="text-3xl font-bold text-[#6a11cb]">
          {exam.title || "Exam Details"}
        </h2>
        <div className="flex gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#6a11cb] hover:bg-[#5b0fbf] text-white px-4 py-2 rounded-3xl font-medium text-sm transition-all cursor-pointer"
          >
            Update Exam
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-3xl font-medium text-sm transition-all cursor-pointer"
          >
            Delete Exam
          </button>
        </div>
      </div>

      {/* Exam Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700 mb-8">
        <DetailItem label="Exam ID" value={exam._id} />
        <DetailItem label="Class Level" value={exam.classLevel} />
        <DetailItem label="Duration" value={`${exam.duration} mins`} />
        <DetailItem
          label="Is Published"
          value={exam.isPublished ? "True" : "False"}
          valueClass={exam.isPublished ? "text-green-600" : "text-red-600"}
        />
        <DetailItem
          label="Start Date"
          value={
            exam.startDate ? new Date(exam.startDate).toLocaleString() : "N/A"
          }
        />
        <DetailItem
          label="End Date"
          value={
            exam.endDate ? new Date(exam.endDate).toLocaleString() : "N/A"
          }
        />
        <DetailItem
          label="Updated At"
          value={
            exam.updatedAt
              ? new Date(exam.updatedAt).toLocaleString()
              : "Not Updated"
          }
        />
      </div>

      {/* Description */}
      <div className="mb-10">
        <h3 className="text-lg font-semibold text-[#6a11cb] mb-2">
          Description
        </h3>
        <p className="text-gray-700 leading-relaxed border-l-4 border-[#6a11cb] pl-4">
          {exam.description || "No description available."}
        </p>
      </div>

      {/* Questions */}
      <h3 className="text-2xl font-semibold text-[#6a11cb] mb-4">
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

      {/* Back Button */}
      <div className="mt-10 text-right">
        <button
          onClick={() => navigate("/exams")}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-3xl font-medium transition-all cursor-pointer"
        >
          Back to Exams
        </button>
      </div>

      {/* Update Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mt-3 h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-semibold text-[#6a11cb] text-center pb-3">
              Update Exam
            </h3>

            <form onSubmit={handleUpdate} className="space-y-4">
              <InputField name="title" label="Title" defaultValue={exam.title} />
              <TextareaField
                name="description"
                label="Description"
                defaultValue={exam.description}
              />
              <InputField
                name="classLevel"
                label="Class Level"
                defaultValue={exam.classLevel}
              />
              <InputField
                name="duration"
                label="Duration (mins)"
                type="number"
                defaultValue={exam.duration}
              />
              <InputField
                name="startDate"
                label="Start Date"
                type="datetime-local"
                defaultValue={
                  exam.startDate
                    ? new Date(exam.startDate).toISOString().slice(0, 16)
                    : ""
                }
              />
              <InputField
                name="endDate"
                label="End Date"
                type="datetime-local"
                defaultValue={
                  exam.endDate
                    ? new Date(exam.endDate).toISOString().slice(0, 16)
                    : ""
                }
              />
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isPublished"
                  defaultChecked={exam.isPublished}
                />
                <label className="text-sm font-medium text-gray-600">
                  Is Published
                </label>
              </div>

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

const DetailItem = ({ label, value, valueClass = "" }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className={`font-semibold ${valueClass}`}>{value}</p>
  </div>
);

const InputField = ({ name, label, type = "text", defaultValue }) => (
  <div>
    <label className="block text-sm font-medium text-gray-600 mb-1">
      {label}
    </label>
    <input
      name={name}
      type={type}
      defaultValue={defaultValue}
      className="w-full border border-gray-300 rounded-xl p-2.5 
                 focus:outline-none focus:ring-2 focus:ring-[#6a11cb]"
    />
  </div>
);

const TextareaField = ({ name, label, defaultValue }) => (
  <div>
    <label className="block text-sm font-medium text-gray-600 mb-1">
      {label}
    </label>
    <textarea
      name={name}
      defaultValue={defaultValue}
      rows={3}
      className="w-full border border-gray-300 rounded-xl p-2.5 
                 focus:outline-none focus:ring-2 focus:ring-[#6a11cb]"
    />
  </div>
);
