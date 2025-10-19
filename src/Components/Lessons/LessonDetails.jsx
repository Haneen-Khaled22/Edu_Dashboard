import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { useLessons } from "../../Features/Context/Lessons/LessonsContext";

export default function LessonDetails() {
  const { id } = useParams();
  const { getLessonById, deleteLesson, updateLesson } = useLessons();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
        title: "text-[#6a11cb]",
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedData = {
    
      title: e.target.title.value,
      description: e.target.description.value,
      video: e.target.video.value,
      price: Number(e.target.price.value),
      classLevel: e.target.classLevel.value,
     
    };

    const res = await updateLesson(id, updatedData);

    if (res?.success) {
    
      setLesson((prev) => ({ ...prev, ...updatedData }));
      setIsModalOpen(false);
    } else {
     console.log('error');
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-[70vh] text-lg font-semibold text-gray-600">
        Loading lesson details...
      </div>
    );

  if (!lesson) return null;

  const embedUrl = (() => {
    if (!lesson.video) return null;
    let url = lesson.video.trim();
    if (url.includes("watch?v=")) return url.replace("watch?v=", "embed/");
    if (url.includes("youtu.be/"))
      return url.replace("youtu.be/", "youtube.com/embed/");
    return null;
  })();

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8 mt-10 border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 gap-3 flex-wrap">
        <h2 className="text-3xl font-bold text-[#6a11cb]">
          {lesson.title || "Lesson Details"}
        </h2>
        <div className="flex gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#6a11cb] hover:bg-[#5b0fbf] text-white px-4 py-2 rounded-3xl font-medium text-sm transition-all cursor-pointer"
          >
            Update Lesson
          </button>

          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-3xl font-medium text-sm transition-all cursor-pointer"
          >
            Delete Lesson
          </button>
        </div>
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
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-3xl font-medium transition-all cursor-pointer"
        >
          Back to Lessons
        </button>
      </div>

      {/* Update Modal */}
{isModalOpen && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center 
               bg-black/40 backdrop-blur-sm p-4"
  >
    {/* Modal Box */}
    <div
      className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mt-3
                 h-[80vh] overflow-y-auto transform transition-all duration-300"
    >
      <h3 className="text-xl font-semibold text-[#6a11cb]  text-center  pb-3">
        Update Lesson
      </h3>

      <form onSubmit={handleUpdate} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Title
          </label>
          <input
            name="title"
            defaultValue={lesson.title}
            placeholder="Enter lesson title"
            className="w-full border border-gray-300 rounded-xl p-2.5 
                       focus:outline-none focus:ring-2 focus:ring-[#6a11cb]"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Description
          </label>
          <textarea
            name="description"
            defaultValue={lesson.description}
            placeholder="Enter lesson description"
            rows={3}
            className="w-full border border-gray-300 rounded-xl p-2.5 
                       focus:outline-none focus:ring-2 focus:ring-[#6a11cb]"
          />
        </div>

        {/* Video URL */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Video URL
          </label>
          <input
            name="video"
            defaultValue={lesson.video}
            placeholder="Enter video link"
            className="w-full border border-gray-300 rounded-xl p-2.5 
                       focus:outline-none focus:ring-2 focus:ring-[#6a11cb]"
          />
        </div>

        {/* Class Level */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Class Level
          </label>
          <input
            name="classLevel"
            defaultValue={lesson.classLevel}
            placeholder="Enter class level"
            className="w-full border border-gray-300 rounded-xl p-2.5 
                       focus:outline-none focus:ring-2 focus:ring-[#6a11cb]"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Price
          </label>
          <input
            name="price"
            type="number"
            defaultValue={lesson.price}
            placeholder="Enter price"
            className="w-full border border-gray-300 rounded-xl p-2.5 
                       focus:outline-none focus:ring-2 focus:ring-[#6a11cb]"
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

const DetailItem = ({ label, value, valueClass = "" }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className={`font-semibold ${valueClass}`}>{value}</p>
  </div>
);
