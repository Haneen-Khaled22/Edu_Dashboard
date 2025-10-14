import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useUsers } from "../../Features/Context/Context.jsx/AllContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Chip } from "@mui/material";

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
        }))
      );
    }
  }, [totalExams]);

  const handleViewQuestions = (exam) => {
    navigate(`/exams/${exam.id}/questions`, { state: { exam } });
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
      width: 150,
      renderCell: (params) => (
         <span
      style={{
        color: params.value ? "#22c55e" : "#ef4444", // أخضر أو أحمر
       
       
      }}
    >
      {params.value ? "true" : "false"}
    </span>
      ),
    },
    {
      field: "questions",
      headerName: "Questions",
      width: 160,
      renderCell: (params) => (
        <Button
          variant="contained"
          size="small"
          onClick={() => handleViewQuestions(params.row)}
          style={{
            backgroundColor: "#6a11cb",
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          View Questions
        </Button>
      ),
    },
  ];

  return (
    <>
      <h2 className="font-bold text-[#6a11cb]">All Exams</h2>

      <div style={{ height: "auto", width: "100%", marginTop: "20px" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10, 20]}
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
            },
          }}
        />
      </div>
    </>
  );
}
