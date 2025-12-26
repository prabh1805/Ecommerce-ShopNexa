import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Toast from "../components/Toast";

export default function AccountDetails() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "+91",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    if (!storedUser) {
      navigate("/login");
      return;
    }
    setUser(storedUser);
    setForm({
      firstName: storedUser.firstName || "",
      lastName: storedUser.lastName || "",
      email: storedUser.email || "",
      countryCode: storedUser.countryCode || "+91",
      phoneNumber: storedUser.phoneNumber || "",
      address: storedUser.address || "",
      city: storedUser.city || "",
      state: storedUser.state || "",
      pinCode: storedUser.pinCode || "",
    });
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("📤 Updating user with data:", form);
      
      const response = await axios.put(
        `http://localhost:8080/api/user/update/${user.id}`,
        form
      );

      console.log("✅ User updated:", response.data);
      
      // Update localStorage with the response data
      const updatedUser = { ...user, ...response.data };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setForm({
        firstName: updatedUser.firstName || "",
        lastName: updatedUser.lastName || "",
        email: updatedUser.email || "",
        countryCode: updatedUser.countryCode || "+91",
        phoneNumber: updatedUser.phoneNumber || "",
        address: updatedUser.address || "",
        city: updatedUser.city || "",
        state: updatedUser.state || "",
        pinCode: updatedUser.pinCode || "",
      });
      setIsEditing(false);

      // Show success message
      setToast({ message: "Profile updated successfully!", type: "success" });
    } catch (error) {
      console.error("❌ Error updating profile:", error);
      console.error("❌ Error response:", error.response?.data);
      setToast({ 
        message: error.response?.data?.message || "Failed to update profile. Please try again.", 
        type: "error" 
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Account Details</h1>
          <p className="text-lg text-indigo-100">Manage your personal information</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          {/* Profile Header */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-2xl">
                  {form.firstName.charAt(0)}{form.lastName.charAt(0)}
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {form.firstName} {form.lastName}
                </h2>
                <p className="text-gray-600">{form.email}</p>
                <span className="inline-block mt-1 px-3 py-1 bg-indigo-100 text-indigo-700 text-sm font-medium rounded-full">
                  {user.role || user.roles}
                </span>
              </div>
            </div>

            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Profile
              </button>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                  required
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  disabled={true}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="flex gap-2">
                  <select
                    name="countryCode"
                    value={form.countryCode}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-24 px-2 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
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
                    disabled={!isEditing}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                    minLength="5"
                    maxLength="15"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="Street address, apartment, suite, etc."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                />
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                />
              </div>

              {/* State */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                />
              </div>

              {/* Pin Code */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Pin Code
                </label>
                <input
                  type="text"
                  name="pinCode"
                  value={form.pinCode}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                />
              </div>
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    // Reset form to original values
                    setForm({
                      firstName: user.firstName || "",
                      lastName: user.lastName || "",
                      email: user.email || "",
                      countryCode: user.countryCode || "+91",
                      phoneNumber: user.phoneNumber || "",
                      address: user.address || "",
                      city: user.city || "",
                      state: user.state || "",
                      pinCode: user.pinCode || "",
                    });
                  }}
                  className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
    </>
  );
}
