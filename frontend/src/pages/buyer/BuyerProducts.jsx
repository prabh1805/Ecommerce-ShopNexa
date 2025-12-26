import { useEffect, useState, useCallback } from "react";
import ProductCard from "../../components/ProductCard";
import Toast from "../../components/Toast";
import api from "../../services/api";

export default function BuyerProducts() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(12);
  const [category, setCategory] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const fetchProducts = useCallback(async () => {
    console.log("🔍 Fetching products with params:", { page, size, category });
    setIsLoading(true);
    try {
      const params = { page, size };
      if (category) params.category = category;

      console.log("📡 Making API call to: http://localhost:8080/api/product");
      console.log("📋 With params:", params);

      // Try /api/products first (plural)

      const response = await api.get("/api/product", { params });
      console.log("✅ API Response received:", response);
      console.log("📦 Response data:", response.data);

      const pageData = response.data;
      const productsArray = pageData.content || [];

      console.log("📊 Products array:", productsArray);
      console.log("📄 Total pages:", pageData.totalPages);

      setProducts(productsArray);
      setTotalPages(pageData.totalPages || 1);
    } catch (error) {
      console.error("❌ Error fetching products:", error);
      console.error("❌ Error status:", error.response?.status);
      setProducts([]);
    } finally {
      setIsLoading(false);
      console.log("✔️ Loading complete");
    }
  }, [page, size, category]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const addToCart = async (product) => {
    if (!user || !user.id) {
      setToast({
        message: "Please login to add items to cart",
        type: "warning",
      });
      return;
    }

    try {
      console.log("🛒 Adding to cart:", {
        userId: user.id,
        productId: product.id,
        quantity: 1,
      });

      await api.post("/api/cart/add", null, {
        params: {
          userId: user.id,
          productId: product.id,
          quantity: 1,
        },
      });

      console.log("✅ Successfully added to cart");
      setToast({ message: `${product.name} added to cart!`, type: "success" });
    } catch (error) {
      console.error("❌ Error adding to cart:", error);
      console.error("❌ Error status:", error.response?.status);
      setToast({ message: "Failed to add item to cart", type: "error" });
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
      <div className="min-h-screen bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50">
        {/* Hero Header */}
        <div className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                Discover Amazing Products
              </h1>
              <p className="text-xl text-indigo-100">
                Browse our curated collection of quality products
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Filters Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                {/* Category Filter */}
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                      setPage(0);
                    }}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">All Categories</option>
                    <option value="electronics">Electronics</option>
                    <option value="fashion">Fashion</option>
                    <option value="home">Home</option>
                    <option value="beauty">Beauty</option>
                    <option value="sports">Sports</option>
                    <option value="grocery">Grocery</option>
                  </select>
                </div>

                {/* Items per page */}
                <div className="w-full sm:w-48">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Items per page
                  </label>
                  <select
                    value={size}
                    onChange={(e) => {
                      setSize(Number(e.target.value));
                      setPage(0);
                    }}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value={6}>6</option>
                    <option value={12}>12</option>
                    <option value={24}>24</option>
                    <option value={48}>48</option>
                  </select>
                </div>
              </div>

              {/* Results Count */}
              <div className="text-sm text-gray-600 font-medium">
                {isLoading ? (
                  "Loading..."
                ) : (
                  <>
                    Showing {products.length} product
                    {products.length !== 1 ? "s" : ""}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {isLoading
              ? Array.from({ length: size }).map((_, i) => (
                  <div
                    key={i}
                    className="h-[420px] bg-white rounded-2xl animate-pulse border border-gray-100"
                  />
                ))
              : products.map((product) => (
                  <div key={product.id}>
                    <ProductCard
                      product={product}
                      showActions={false}
                      onAddToCart={addToCart}
                    />
                  </div>
                ))}
          </div>

          {/* Empty State */}
          {!isLoading && products.length === 0 && (
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
                No products found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your filters to see more results
              </p>
              <button
                onClick={() => {
                  setCategory("");
                  setPage(0);
                }}
                className="px-6 py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* Pagination */}
          {!isLoading && products.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <button
                disabled={page === 0}
                onClick={() => setPage(page - 1)}
                className="px-6 py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:transform-none flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Previous
              </button>

              <div className="flex items-center gap-2">
                <span className="text-gray-700 font-semibold">
                  Page {page + 1} of {Math.max(1, totalPages)}
                </span>
              </div>

              <button
                disabled={page + 1 >= totalPages}
                onClick={() => setPage(page + 1)}
                className="px-6 py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:transform-none flex items-center gap-2"
              >
                Next
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
