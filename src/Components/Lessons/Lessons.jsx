import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useUsers } from "../../Features/Context/Context.jsx/AllContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LessonsGrid() {
  const { getAllLessons } = useUsers();
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // 👈 استخدم النيفيجيت هنا

  const fetchLessons = async (pageNum = 1) => {
    setLoading(true);
    const { lessons, pagination } = await getAllLessons(pageNum, pageSize);
    setLoading(false);

    if (lessons && Array.isArray(lessons)) {
      setRows(
        lessons.map((lesson, index) => {
          const isFree = !lesson.price || lesson.price === 0;
          return {
            id: lesson._id || index + 1,
            title: lesson.title || "No name",
            classLevel: lesson.classLevel || "N/A",
            description: lesson.description || "No description",
            price: isFree ? "Free" : `${lesson.price} EGP`,
            isPaid: !isFree,
            video: lesson.video || "No link",
            createdAt: lesson.createdAt
              ? new Date(lesson.createdAt).toLocaleDateString()
              : "N/A",
            fullData: lesson, // 👈 خزن البيانات الأصلية لو عايز تبعتها كلها
          };
        })
      );

      setTotal(pagination?.total || lessons.length);
    }
  };

  useEffect(() => {
    fetchLessons(page);
  }, [page, pageSize]);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "title", headerName: "Lesson Name", width: 200 },
    { field: "classLevel", headerName: "Class Level", width: 130 },
    {
      field: "description",
      headerName: "Description",
      width: 250,
      renderCell: (params) => (
        <span className="truncate" title={params.value}>
          {params.value}
        </span>
      ),
    },
    {
      field: "price",
      headerName: "Price",
      width: 120,
      renderCell: (params) => (
        <span
          style={{
            color: params.value === "Free" ? "green" : "red",
          }}
        >
          {params.value}
        </span>
      ),
    },
    {
      field: "isPaid",
      headerName: "Is Paid",
      width: 120,
      renderCell: (params) =>
        params.value ? (
          <span className="text-green-600">True</span>
        ) : (
          <span className="text-red-600">False</span>
        ),
    },
    {
      field: "video",
      headerName: "Video Link",
      width: 180,
      renderCell: (params) =>
        params.value !== "No link" ? (
          <a
            href={params.value}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800"
          >
            Watch
          </a>
        ) : (
          <span className="text-gray-400">No link</span>
        ),
    },
    { field: "createdAt", headerName: "Created At", width: 150 },
  ];

  return (
    <>
      <h2 className="font-bold text-[#6a11cb] text-xl mb-3">All Lessons</h2>

      <div style={{ height: "auto", width: "100%", marginTop: "20px" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          paginationMode="server"
          rowCount={total}
          pageSizeOptions={[5, 10, 20]}
          paginationModel={{ page: page - 1, pageSize }}
          onPaginationModelChange={(model) => {
            setPage(model.page + 1);
            setPageSize(model.pageSize);
          }}
          onRowClick={(params) => {
            navigate(`/lessons/${params.row.id}`, {
              state: { lesson: params.row.fullData },
            });
          }}
          loading={loading}
          sx={{
            cursor: "pointer",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f3f4f6",
              color: "#333",
              fontWeight: "bold",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#f9fafb",
            },
          }}
        />
      </div>
    </>
  );
}
