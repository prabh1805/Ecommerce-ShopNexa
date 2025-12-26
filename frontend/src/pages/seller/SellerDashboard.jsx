import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import ProductCard from "../../components/ProductCard";

function SellerDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [filter, setFilter] = useState("all");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    console.log("👤 User from localStorage:", storedUser);
    setUser(storedUser);

    if (storedUser) {
      console.log("🚀 Fetching seller products via JWT...");
      fetchProducts();
    } else {
      console.warn("⚠️ No user found");
    }
  }, []);

  const fetchProducts = async () => {
    try {
      console.log("🔍 Fetching products for logged-in seller");
      setLoading(true);

      const { data } = await api.get("api/product/seller", {
        params: {
          page: 0,
          size: 6,
        },
      });
      const productsData = data.products || [];

      console.log("✅ Products fetched:", productsData.length);
      setProducts(productsData);
    } catch (error) {
      console.error("❌ Error fetching products:", error);
      console.error("Error details:", error.response?.data || error.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const totalProducts = products.length;
  // For now, make active listings equal to total products
  const activeListings = totalProducts;
  const totalSales = products.reduce(
    (sum, p) => sum + p.price * (p.soldCount || 0),
    0
  );

  // Log stats whenever they change
  useEffect(() => {
    console.log("📈 Dashboard Stats:");
    console.log("  - Total Products:", totalProducts);
    console.log("  - Active Listings:", activeListings);
    console.log(
      "  - Products with quantity > 0:",
      products.filter((p) => p.quantity > 0).length
    );
    console.log(
      "  - All products quantities:",
      products.map((p) => ({ name: p.name, quantity: p.quantity }))
    );
    console.log("  - Total Sales:", totalSales);
  }, [totalProducts, activeListings, totalSales, products]);

  // Filter products based on selected filter
  const getFilteredProducts = () => {
    if (filter === "active") {
      return products.filter((p) => p.quantity > 0);
    } else if (filter === "inactive") {
      return products.filter((p) => p.quantity <= 0);
    }
    return products;
  };

  const filteredProducts = getFilteredProducts();
  const displayProducts = filteredProducts.slice(0, 6); // Show first 6 products

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Hero Header */}
      <div className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3">
                Welcome back, {user?.firstName || "Seller"}! 👋
              </h1>
              <p className="text-lg text-indigo-100">
                Manage your products and grow your business
              </p>
            </div>

            <Link to="/seller/add-product">
              <button className="group relative px-8 py-4 bg-white text-indigo-600 font-semibold rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-3">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span>Add New Product</span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-6 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">
                  Total Products
                </p>
                <p className="text-3xl font-bold text-gray-800">
                  {loading ? "..." : totalProducts}
                </p>
              </div>
              <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center">
                <svg
                  className="w-7 h-7 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">
                  Active Listings
                </p>
                <p className="text-3xl font-bold text-gray-800">
                  {loading ? "..." : activeListings}
                </p>
              </div>
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
                <svg
                  className="w-7 h-7 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">
                  Total Sales
                </p>
                <p className="text-3xl font-bold text-gray-800">
                  {loading ? "..." : `$${totalSales.toFixed(2)}`}
                </p>
              </div>
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center">
                <svg
                  className="w-7 h-7 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Your Products</h2>

            {/* Filters */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  filter === "all"
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter("active")}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  filter === "active"
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setFilter("inactive")}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  filter === "inactive"
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Inactive
              </button>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-16">
              <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading products...</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && totalProducts === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No products yet
              </h3>
              <p className="text-gray-600 mb-6">
                Start by adding your first product to your store
              </p>
              <Link to="/seller/add-product">
                <button className="px-6 py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
                  Add Your First Product
                </button>
              </Link>
            </div>
          )}

          {/* Products Grid */}
          {!loading && totalProducts > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {displayProducts.map((product) => (
                  <div
                    key={product.id}
                    className="cursor-pointer"
                    onClick={() => navigate("/seller/products")}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>

              {/* View All Button */}
              {filteredProducts.length > 6 && (
                <div className="text-center pt-4 border-t border-gray-200">
                  <Link to="/seller/products">
                    <button className="px-8 py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
                      View All {filteredProducts.length} Products
                    </button>
                  </Link>
                </div>
              )}

              {/* Show message if no products match filter */}
              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">
                    No {filter} products found
                  </p>
                  <button
                    onClick={() => setFilter("all")}
                    className="mt-4 px-6 py-2 text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    View All Products
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 mb-8">
          <Link to="/seller/products" className="group">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl hover:border-indigo-200 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
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
                      d="M4 6h16M4 10h16M4 14h16M4 18h16"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">
                    View All Products
                  </h3>
                  <p className="text-sm text-gray-600">
                    Manage your product inventory
                  </p>
                </div>
              </div>
            </div>
          </Link>

          <div className="group cursor-pointer">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl hover:border-purple-200 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
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
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">
                    Analytics
                  </h3>
                  <p className="text-sm text-gray-600">Coming soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerDashboard;
