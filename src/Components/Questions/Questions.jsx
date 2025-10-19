import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { useQuestions } from "../../Features/Context/Questions/QuestionsContext";

export default function Questions() {
  const { getAllQuestions, totalQuestions } = useQuestions();
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  function addQuestionPage(){
    navigate('/addquestion')
  }

  useEffect(() => {
  const fetchQuestions = async () => {
    const data = await getAllQuestions();
    if (Array.isArray(data)) {
      setRows(
        data.map((question, index) => ({
          id: question._id || index + 1,
          _id: question._id,
          text: question.text,
          type: question.type,
          points: question.points,
          correctAnswer: question.correctAnswer,
          options: Array.isArray(question.options)
            ? question.options.join(", ")
            : "N/A",
          createdAt: new Date(question.createdAt).toLocaleDateString(),
        }))
      );
    }
  };
  fetchQuestions();
}, [getAllQuestions]);


  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "text", headerName: "Question", width: 280 },
    { field: "type", headerName: "Type", width: 140 },
    { field: "points", headerName: "Points", width: 100 },
    { field: "options", headerName: "Options", width: 300 },
    {
      field: "correctAnswer",
      headerName: "Correct Answer",
      width: 180,
      renderCell: (params) => (
        <span style={{ color: "#22c55e", fontWeight: "bold" }}>
          {params.value}
        </span>
      ),
    },
    { field: "createdAt", headerName: "Created At", width: 150 },
  ];

  return (
    <>
      <div className="flex justify-between items-center gap-2">
              <h2 className="font-bold text-[#6a11cb] text-xl mb-3">All Questions</h2>
            
                   <button
             onClick={addQuestionPage}
             className="flex items-center gap-2 bg-[#6a11cb] hover:bg-indigo-700 text-white font-medium px-3 py-2 rounded-lg transition-all cursor-pointer">
                      <Plus className="w-4 h-4" />
                      Add Question
                    </button>
                   
             
          
          </div>

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
              whiteSpace: "normal",
              wordWrap: "break-word",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#f9f5ff",
              cursor: "pointer",
            },
          }}
          onRowClick={(params) => {
            // ⤵️ الانتقال لصفحة التفاصيل
            navigate(`/questions/${params.row._id}`);
          }}
        />
      </div>
    </>
  );
}
