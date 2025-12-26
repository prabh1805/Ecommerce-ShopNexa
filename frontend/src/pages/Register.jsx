import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import { useAuth } from "../context/useAuth";
import { registerUser } from "../services/apiAuth";

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    roles: "Buyer",
    countryCode: "+91",
    phoneNumber: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    if (loading) return; // extra safety
    setLoading(true);
    setToast(null);

    try {
      const { data } = await registerUser(form);

      await login(data.token, data.user); // <-- this does the redirect/reload
      // nothing else needed here
      navigate(
        data.user.role?.toLowerCase() === "seller" ? "/seller" : "/products"
      );
    } catch (error) {
      console.error(error);
      setToast({
        message:
          error.response?.data?.message ||
          "Registration failed. Please try again.",
        type: "error",
      });
      setLoading(false);
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
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Create Account
          </h2>

          <form onSubmit={handleRegister}>
            {/* ---------- all inputs stay identical ---------- */}
            <label className="block mb-1 font-medium">First Name</label>
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              className="w-full border p-2 rounded mb-4"
              placeholder="John"
              required
            />

            <label className="block mb-1 font-medium">Last Name</label>
            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              className="w-full border p-2 rounded mb-4"
              placeholder="Doe"
              required
            />

            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border p-2 rounded mb-4"
              placeholder="you@example.com"
              required
            />

            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border p-2 rounded mb-4"
              placeholder="********"
              required
            />

            <label className="block mb-1 font-medium">Phone Number</label>
            <div className="flex gap-2 mb-4">
              <select
                name="countryCode"
                value={form.countryCode}
                onChange={handleChange}
                className="w-24 border p-2 rounded"
                required
              >
                <option value="+91">+91</option>
                <option value="+1">+1</option>
                <option value="+44">+44</option>
                <option value="+86">+86</option>
                <option value="+81">+81</option>
                <option value="+61">+61</option>
              </select>
              <input
                type="tel"
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
                className="flex-1 border p-2 rounded"
                placeholder="1234567890"
                required
                minLength="5"
                maxLength="15"
              />
            </div>

            <label className="block mb-1 font-medium">Select Role</label>
            <select
              name="roles"
              value={form.roles}
              onChange={handleChange}
              className="w-full border p-2 rounded mb-4"
            >
              <option value="Buyer">Buyer</option>
              <option value="Seller">Seller</option>
            </select>

            <button
              type="submit"
              disabled={loading}
              className={`w-full p-2 rounded font-semibold transition
                ${
                  loading
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-yellow-500 text-black hover:bg-yellow-400"
                }`}
            >
              {loading ? "Creating…" : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
