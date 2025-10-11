import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useUsers } from "../../Features/Context/Context.jsx/AllContext";
import { useNavigate } from "react-router-dom";

function RecentUsers() {
  const { getAllUsers, totalUsers } = useUsers();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();


  function navigateToAllUsers(){
    navigate('/users');
  }


  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      await getAllUsers();
      setLoading(false);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (Array.isArray(totalUsers) && totalUsers.length > 0) {
      setRows(
        totalUsers.map((user, index) => ({
          id: user._id || user.id || index + 1,
          fullName: user.fullName || "No name",
          email: user.email || "No email",
          role: user.role || "user",
        }))
      );
    }
  }, [totalUsers]);

  const columns = [
    { field: "fullName", headerName: "Full Name", flex: 1, minWidth: 150 },
    { field: "email", headerName: "Email", flex: 1, minWidth: 200 },
    { field: "role", headerName: "Role", flex: 1, minWidth: 100 },
  ];

  return (
    <div className="w-full mt-12">
      {/* Header */}
      <div className=" items-center mb-4">
        <h3 className="text-indigo-600 text-lg font-semibold">Recent Users</h3>
      
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="flex justify-center items-center py-8 text-gray-500 font-medium">
          Loading users...
        </div>
      ) : (
        <div
          style={{
            width: "fit-content",
            maxWidth: "100%",
            overflowX: "auto",
          }}
          className=" rounded"
        >
          <div style={{ height: "auto", minHeight: "350px" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSizeOptions={[5, 10]}
              initialState={{
                pagination: { paginationModel: { pageSize: 5 } },
              }}
              disableRowSelectionOnClick
              autoHeight
            />
          </div>
        </div>
        
      )}
        <button 
        onClick={navigateToAllUsers}
        className="border border-gray-300 px-3 py-1 mt-5 rounded-2xl text-white text-sm bg-indigo-600 hover:bg-indigo-500 transition-all cursor-pointer">
          View all users
        </button>
    </div>
  );
}

export default RecentUsers;
