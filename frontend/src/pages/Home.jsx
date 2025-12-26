import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    setUser(storedUser);
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 flex flex-col items-center justify-center px-4">
      <div className="text-center space-y-8 max-w-4xl">
        {/* Hero Section */}
        <div className="space-y-4">
          <h1 className="text-6xl md:text-7xl font-bold bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            ShopNexa
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-light">
            Your Modern E-Commerce Platform
          </p>
          <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto">
            Discover amazing products, connect with sellers, and enjoy a
            seamless shopping experience
          </p>
        </div>

        {/* CTA Buttons - Only show if not logged in */}
        {!user && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <button
              className="group relative px-10 py-4 bg-linear-to-r from-indigo-600 to-purple-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto"
              onClick={() => navigate("/login")}
            >
              <span className="relative z-10">Login</span>
              <div className="absolute inset-0 bg-linear-to-r from-indigo-700 to-purple-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            <button
              className="group relative px-10 py-4 bg-white text-indigo-600 text-lg font-semibold rounded-xl shadow-lg hover:shadow-2xl border-2 border-indigo-600 transform hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto"
              onClick={() => navigate("/register")}
            >
              <span className="relative z-10">Register</span>
            </button>
          </div>
        )}

        {/* Welcome message for logged in users */}
        {user && (
          <div className="pt-6">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto border border-gray-100">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-linear-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm-7 9a7 7 0 0 1 14 0H5z" />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Welcome back, {user.firstName || user.email}!
              </h2>
              <p className="text-gray-600 mb-6">
                You're logged in as a{" "}
                <span className="font-semibold text-indigo-600">
                  {user.role || user.roles}
                </span>
              </p>

              {/* Action buttons based on role */}
              <div className="flex flex-col gap-3">
                {(user.role === "Buyer" || user.roles === "Buyer") && (
                  <button
                    onClick={() => navigate("/products")}
                    className="w-full px-6 py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                  >
                    Browse Products
                  </button>
                )}
                {(user.role === "Seller" || user.roles === "Seller") && (
                  <button
                    onClick={() => navigate("/seller")}
                    className="w-full px-6 py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                  >
                    Go to Dashboard
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg
                className="w-6 h-6 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Fast & Secure</h3>
            <p className="text-sm text-gray-600">
              Lightning-fast checkout with secure payment processing
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">
              Quality Products
            </h3>
            <p className="text-sm text-gray-600">
              Curated selection from trusted sellers worldwide
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg
                className="w-6 h-6 text-pink-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">24/7 Support</h3>
            <p className="text-sm text-gray-600">
              Round-the-clock customer service for your needs
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
