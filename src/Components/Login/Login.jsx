import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Features/Context/Auth/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { loginAsAdmin } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await loginAsAdmin(form.email, form.password);

    console.log("Login data:", res);

   if (res.success) {
  console.log("✅ Login successful");
  navigate("/"); // ده تمام دلوقتي

 // ✅ هنا هنروح للهوم بعد النجاح
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white shadow-md rounded-xl w-full max-w-md p-8 my-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-1"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your admin email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="cursor-pointer w-full bg-gradient-to-br from-purple-700 to-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-all duration-300"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
