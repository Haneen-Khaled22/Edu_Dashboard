import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUsers } from "../../Features/Context/Context.jsx/AllContext";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

export default function LessonDetails() {
  const { id } = useParams();
  const { getLessonById, deleteLesson } = useUsers();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLesson = async () => {
      setLoading(true);
      const data = await getLessonById(id);
      if (data?.data) setLesson(data.data);
      else toast.error("Lesson not found");
      setLoading(false);
    };
    fetchLesson();
  }, [id]);

 

const handleDelete = async () => {
  Swal.fire({
    title: "Are you sure?",
    text: "This lesson will be permanently deleted!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
    background: "#fff",
    customClass: {
      title: "text-[#6a11cb] ",
      popup: "rounded-3xl shadow-lg border border-gray-200",
    },
  }).then(async (result) => {
    if (result.isConfirmed) {
      const res = await deleteLesson(id);
      if (res?.success) {
        Swal.fire({
          title: "Deleted!",
          text: "Lesson deleted successfully!",
          icon: "success",
          confirmButtonColor: "#6a11cb",
        });
        navigate("/lessons");
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


  if (loading)
    return (
      <div className="flex items-center justify-center h-[70vh] text-lg font-semibold text-gray-600">
        Loading lesson details...
      </div>
    );

  if (!lesson) return null;

  // استخراج فيديو يوتيوب من اللينك
  const embedUrl = (() => {
    if (!lesson.video) return null;

    let url = lesson.video.trim();

    if (url.includes("watch?v=")) {
      return url.replace("watch?v=", "embed/");
    } else if (url.includes("youtu.be/")) {
      return url.replace("youtu.be/", "youtube.com/embed/");
    } else {
      return null;
    }
  })();

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8 mt-10 border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-[#6a11cb]">
          {lesson.title || "Lesson Details"}
        </h2>
        <button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-3xl font-medium text-sm transition-all cursor-pointer"
        >
          Delete Lesson
        </button>
      </div>

      {/* Video Section */}
      {embedUrl ? (
        <div className="mb-8">
          <iframe
            width="100%"
            height="400"
            src={embedUrl}
            title={lesson.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-xl shadow-md"
          ></iframe>
        </div>
      ) : (
        <p className="text-gray-500 italic mb-6">No video available</p>
      )}

      {/* Details Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
        <DetailItem label="Lesson ID" value={lesson._id} />
        <DetailItem label="Class Level" value={lesson.classLevel} />
        <DetailItem
          label="Price"
          value={
            !lesson.price || lesson.price === 0
              ? "Free"
              : `${lesson.price} EGP`
          }
          valueClass={
            !lesson.price || lesson.price === 0
              ? "text-green-600"
              : "text-red-600"
          }
        />
        <DetailItem
          label="Is Paid"
          value={lesson.isPaid ? "True" : "False"}
          valueClass={lesson.isPaid ? "text-green-600" : "text-red-600"}
        />
        <DetailItem
          label="Scheduled Date"
          value={
            lesson.scheduledDate
              ? new Date(lesson.scheduledDate).toLocaleString()
              : "Not Scheduled"
          }
        />
        <DetailItem
          label="Created At"
          value={
            lesson.createdAt
              ? new Date(lesson.createdAt).toLocaleDateString()
              : "N/A"
          }
        />
        <DetailItem
          label="Updated At"
          value={
            lesson.updatedAt
              ? new Date(lesson.updatedAt).toLocaleDateString()
              : "N/A"
          }
        />
      </div>

      {/* Description */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-[#6a11cb] mb-2">
          Description
        </h3>
        <p className="text-gray-700 leading-relaxed border-l-4 border-[#6a11cb] pl-4">
          {lesson.description || "No description available."}
        </p>
      </div>

      {/* Back Button */}
      <div className="mt-10 text-right">
        <button
          onClick={() => navigate("/lessons")}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-xl font-medium transition-all cursor-pointer"
        >
          Back to Lessons
        </button>
      </div>
    </div>
  );
}

// مكون صغير لإعادة استخدامه في عرض التفاصيل
const DetailItem = ({ label, value, valueClass = "" }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className={`font-semibold ${valueClass}`}>{value}</p>
  </div>
);
