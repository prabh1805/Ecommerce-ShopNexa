import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import { useAuth } from "../context/useAuth";
import { loginUser } from "../services/apiAuth";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser(form);
      console.log("Login successful:", data);
      login(data.token, data.user);
      // ✅ ROLE BASED REDIRECT (LEGAL PLACE)
      const role = data.user.roles?.toLowerCase();

      if (role === "seller") {
        navigate("/seller", { replace: true });
      } else {
        navigate("/products", { replace: true });
      }
    } catch (error) {
      console.error("Login error:", error);
      setToast({ message: "Invalid Credentials", type: "error" });
    }
  };

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <div className="flex justify-center items-center min-h-[80vh] bg-gray-100">
        <div className="bg-white w-96 shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>

          <form onSubmit={handleLogin}>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border p-2 rounded mb-4"
              placeholder="Enter email"
            />

            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border p-2 rounded mb-4"
              placeholder="Enter password"
            />

            <button
              type="submit"
              className="w-full bg-yellow-500 text-black p-2 rounded font-semibold hover:bg-yellow-400 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
