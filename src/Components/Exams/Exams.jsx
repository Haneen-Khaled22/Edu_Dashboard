import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Play } from "lucide-react";
import toast from "react-hot-toast";
import { useExams } from "../../Features/Context/Exams/ExamsContext";

export default function AllExams() {
  const { getAllExams, totalExams, startExam } = useExams(); // ✅ نجيب startExam من الكونتكست
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  function addExamPage() {
    navigate("/addExam");
  }

  useEffect(() => {
    getAllExams();
  }, []);

  useEffect(() => {
    if (Array.isArray(totalExams) && totalExams.length > 0) {
      setRows(
        totalExams.map((exam, index) => ({
          id: exam._id || exam.id || index + 1,
          title: exam.title || "No title",
          classLevel: exam.classLevel || "N/A",
          duration: exam.duration ? `${exam.duration} mins` : "N/A",
          description: exam.description || "No description",
          isPublished: exam.isPublished,
          startDate: exam.startDate
            ? new Date(exam.startDate).toLocaleDateString()
            : "N/A",
          endDate: exam.endDate
            ? new Date(exam.endDate).toLocaleDateString()
            : "N/A",
          fullExam: exam,
        }))
      );
    }
  }, [totalExams]);

  // 🟢 دالة بدء الامتحان
  const handleStartExam = async (examId) => {
    try {
      console.log("Starting exam:", examId);
      const res = await startExam(examId);

      if (res?.success) {
        toast.success(" Exam started ");
        // 🧭 بعد النجاح نروح على صفحة الامتحان
        navigate(`/exams/take/${examId}`, { state: { examData: res } });
      } else {
        toast.error(` ${res?.message || "Failed to start exam"}`);
      }
    } catch (error) {
      console.error("🚨 Error starting exam:", error);
      toast.error("Something went wrong while starting the exam");
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Title", width: 180 },
    { field: "classLevel", headerName: "Class Level", width: 130 },
    { field: "duration", headerName: "Duration", width: 120 },
    { field: "description", headerName: "Description", width: 200 },
    {
      field: "isPublished",
      headerName: "Status",
      width: 130,
      renderCell: (params) => (
        <span
          style={{
            color: params.value ? "#22c55e" : "#ef4444",
            fontWeight: "500",
          }}
        >
          {params.value ? "Published" : "Draft"}
        </span>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 160,
      sortable: false,
      renderCell: (params) => (
        <button
          onClick={(e) => {
            e.stopPropagation(); // يمنع فتح صفحة التفاصيل
            handleStartExam(params.row.id);
          }}
          className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg transition-all"
        >
          <Play className="w-4 h-4" />
          Start Exam
        </button>
      ),
    },
  ];

  // 🔵 الضغط على الصف = فتح التفاصيل
  const handleRowClick = (params) => {
    navigate(`/exams/${params.row.id}`, { state: { exam: params.row.fullExam } });
  };

  return (
    <>
      <div className="flex justify-between items-center gap-6 ">
        <h2 className="font-bold text-[#6a11cb] text-xl mb-3">All Exams</h2>
        <button
          onClick={addExamPage}
          className="flex items-center gap-2 bg-[#6a11cb] hover:bg-indigo-700 text-white font-medium px-3 py-2 rounded-lg transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Exam
        </button>
      </div>

      <div style={{ height: "auto", width: "100%", marginTop: "20px" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10, 20]}
          onRowClick={handleRowClick}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f3e8ff",
              color: "#6a11cb",
              fontWeight: "bold",
            },
            "& .MuiDataGrid-cell": {
              fontSize: "0.9rem",
              cursor: "pointer",
            },
          }}
        />
      </div>
    </>
  );
}
