import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useUsers } from "../../Features/Context/Context.jsx/AllContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AllExams() {
  const { getAllExams, totalExams } = useUsers();
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

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
          questions: exam.questions || [],
          fullExam: exam, // نحفظ كل بيانات الامتحان هنا علشان نبعتها
        }))
      );
    }
  }, [totalExams]);

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
  ];

  // 👇 لما المستخدم يضغط على صف
  const handleRowClick = (params) => {
    navigate(`/exams/${params.row.id}`, { state: { exam: params.row.fullExam } });
  };

  return (
    <>
      <h2 className="font-bold text-[#6a11cb]">All Exams</h2>

      <div style={{ height: "auto", width: "100%", marginTop: "20px" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10, 20]}
          onRowClick={handleRowClick} // 🟣 هنا بنضيف الحدث
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
