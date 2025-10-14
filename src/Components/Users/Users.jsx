import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useUsers } from "../../Features/Context/Context.jsx/AllContext";
import { useEffect, useState } from "react";

export default function CustomGrid() {
  const { getAllUsers, totalUsers } = useUsers();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    // نستدعي الفنكشن عشان تجيب اليوزرز أول ما الصفحة تفتح
    getAllUsers();
  }, []);

  
  useEffect(() => {

    // لما totalUsers تتغير، نجهز الداتا للـ DataGrid
    if (Array.isArray(totalUsers) && totalUsers.length > 0) {

      setRows(
        totalUsers.map((user, index) => ({
          id: user._id || user.id || index + 1, // لازم id فريد
          fullName: user.fullName || "No name",
          email: user.email || "No email",
          phone: user.phoneNumber || "No phone",
          role: user.role || "user",
          updatedAt: user.updatedAt
            ? new Date(user.updatedAt).toLocaleDateString()
            : "N/A",
            isVerified: user.isVerified ? true : false,
        }))
      );
    }
  }, [totalUsers]);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "fullName", headerName: "FullName", width: 160 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "role", headerName: "Role", width: 120 },
    { field: "updatedAt", headerName: "UpdatedAt", width: 150 },
    { field: "isVerified", headerName: "IsVerified", width: 150,

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
  ];

  return (
    <>
    <h2 className="font-bold  text-[#6a11cb]">All Users</h2>

 
    <div style={{ height: "auto", width: "100%",marginTop:"20px" }}>
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
