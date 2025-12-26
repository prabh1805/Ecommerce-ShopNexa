import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user") || "null");
    setUser(u);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setDropdownOpen(false);
    navigate("/");
  };

  // Get user initials
  const getInitials = () => {
    if (!user) return "";
    const firstName = user.firstName || "";
    const lastName = user.lastName || "";
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-lg fixed top-0 w-full z-50 backdrop-blur-sm bg-opacity-95">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold text-white tracking-wide hover:scale-105 transition-transform duration-200">
          ShopNexa
        </Link>

        <div className="flex items-center gap-4">
          {!user && (
            <>
              <Link
                to="/login"
                className="px-6 py-2.5 bg-white text-indigo-600 font-semibold rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-200 border-2 border-white"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-6 py-2.5 bg-indigo-900 text-white font-semibold rounded-lg hover:shadow-xl hover:scale-105 hover:bg-indigo-800 transition-all duration-200"
              >
                Register
              </Link>
            </>
          )}

          {user && (
            <div className="relative" ref={dropdownRef}>
              <button
                className="group flex items-center gap-3 px-4 py-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full hover:bg-opacity-30 transition-all duration-200 border border-white border-opacity-30"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <div className="w-9 h-9 bg-gradient-to-br from-white to-indigo-100 rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-200">
                  <span className="text-indigo-600 font-bold text-sm">
                    {getInitials()}
                  </span>
                </div>
                <span className="text-white font-medium hidden sm:block">
                  {user.firstName || "Account"}
                </span>
                <svg
                  className={`w-4 h-4 text-white transition-transform duration-200 ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100 animate-fadeIn">
                  {/* User Info Section */}
                  <div className="px-4 py-3 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-800">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-xs text-gray-600 truncate">{user.email}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
                      {user.role || user.roles}
                    </span>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        navigate("/account");
                      }}
                      className="w-full text-left px-4 py-2.5 hover:bg-indigo-50 transition-colors duration-150 flex items-center gap-3 text-gray-700 hover:text-indigo-600"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="font-medium">Account Details</span>
                    </button>

                    {/* View Cart - Only for Buyers */}
                    {(user?.role === "Buyer" || user?.roles === "Buyer") && (
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          navigate("/cart");
                        }}
                        className="w-full text-left px-4 py-2.5 hover:bg-purple-50 transition-colors duration-150 flex items-center gap-3 text-gray-700 hover:text-purple-600"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        <span className="font-medium">View Cart</span>
                      </button>
                    )}

                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2.5 hover:bg-red-50 transition-colors duration-150 flex items-center gap-3 text-red-600 hover:text-red-700"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span className="font-medium">Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
