import React, { useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";
import { useUsers } from "../../Features/Context/Users/UsersContext";

export default function UserDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { deleteUser, updateUser } = useUsers();
  const user = location.state?.userData;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState(user || {});

  if (!user) {
    return (
      <div className="flex items-center justify-center h-[70vh] text-lg text-gray-600">
        ⚠️ No user data found for ID: {id}
      </div>
    );
  }

  const handleDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: `This will permanently delete ${user.fullName}!`,
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
        const res = await deleteUser(user._id);
        if (res?.success) {
          Swal.fire({
            title: "Deleted!",
            text: "User deleted successfully!",
            icon: "success",
            confirmButtonColor: "#6a11cb",
          });
          navigate("/users");
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
      fullName: form.fullName,
      email: form.email,
      phoneNumber: form.phoneNumber,
      classLevel: form.classLevel,
     
    };

    const res = await updateUser(user._id, updatedData);
    if (res?.success) {
      toast.success("User updated successfully!");
      setIsModalOpen(false);
      navigate(0); // refresh to see changes
    } else {
      toast.error("Error updating user!");
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8 mt-10 border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 gap-3 flex-wrap">
        <h2 className="text-3xl font-bold text-[#6a11cb]">
          {user.fullName || "User Details"}
        </h2>
        <div className="flex gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#6a11cb] hover:bg-[#5b0fbf] text-white px-4 py-2 rounded-3xl font-medium text-sm transition-all cursor-pointer"
          >
            Update User
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-3xl font-medium text-sm transition-all cursor-pointer"
          >
            Delete User
          </button>
        </div>
      </div>

      {/* User Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
        <DetailItem label="Full Name" value={user.fullName} />
        <DetailItem label="Email" value={user.email} />
        <DetailItem label="Phone" value={user.phoneNumber || "—"} />
        <DetailItem label="Class Level" value={user.classLevel || "—"} />
        <DetailItem label="Role" value={user.role || "N/A"} />
        <DetailItem
          label="Verified"
          value={user.isVerified ? "Yes ✅" : "No ❌"}
          valueClass={user.isVerified ? "text-green-600" : "text-red-600"}
        />
        <DetailItem
          label="Created At"
          value={
            user.createdAt
              ? new Date(user.createdAt).toLocaleDateString()
              : "N/A"
          }
        />
        <DetailItem
          label="Updated At"
          value={
            user.updatedAt
              ? new Date(user.updatedAt).toLocaleDateString()
              : "N/A"
          }
        />
        <DetailItem label="OtpExpires" value={user.otpExpires} />
      </div>

      {/* Back Button */}
      <div className="mt-10 text-right">
        <button
          onClick={() => navigate("/users")}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-3xl font-medium transition-all cursor-pointer"
        >
          Back to Users
        </button>
      </div>

      {/* Update Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mt-3 transform transition-all duration-300">
            <h3 className="text-xl font-semibold text-[#6a11cb] text-center pb-3">
              Update User
            </h3>

            <form onSubmit={handleUpdate} className="space-y-4">
              <InputField
                label="Full Name"
                name="fullName"
                value={form.fullName}
                onChange={(e) =>
                  setForm({ ...form, fullName: e.target.value })
                }
              />
              <InputField
                label="Email"
                name="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <InputField
                label="Phone"
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={(e) =>
                  setForm({ ...form, phoneNumber: e.target.value })
                }
              />
              <InputField
                label="Class Level"
                name="classLevel"
                value={form.classLevel}
                onChange={(e) =>
                  setForm({ ...form, classLevel: e.target.value })
                }
              />
             

              <div className="flex justify-end gap-3 pt-3">
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

// ✅ Reusable detail item (like in LessonDetails)
const DetailItem = ({ label, value, valueClass = "" }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className={`font-semibold ${valueClass}`}>{value}</p>
  </div>
);

// ✅ Reusable input field for the modal
const InputField = ({ label, name, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-600 mb-1">
      {label}
    </label>
    <input
      name={name}
      value={value || ""}
      onChange={onChange}
      placeholder={`Enter ${label.toLowerCase()}`}
      className="w-full border border-gray-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#6a11cb]"
    />
  </div>
);
