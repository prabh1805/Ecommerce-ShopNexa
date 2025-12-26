import React, { useEffect, useState, useCallback } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import SellerNavbar from "../../components/SellerNavbar";
import ProductCard from "../../components/ProductCard";
import UpdateProductModal from "./UpdateProductModal";

export default function SellerProducts() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const sellerId = user?.id;
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0); // backend 0-based
  const [size, setSize] = useState(6);
  const [category, setCategory] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [editingProduct, setEditingProduct] = useState(null); // product to edit

  const fetchPage = useCallback(async () => {
    setIsLoading(true);
    const params = {
      page,
      size,
    };
    if (category) params.category = category;
    try {
      const { data } = await api.get("/api/product/seller", { params });
      setProducts(data.products);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error("Failed to fetch products", err);
    } finally {
      setIsLoading(false);
    }
  }, [sellerId, page, size, category]);

  useEffect(() => {
    fetchPage();
    // run when page, size, category, maxPrice change
  }, [fetchPage]);

  // after adding/updating product, refresh
  const refresh = () => {
    fetchPage();
  };

  return (
    <>
      <SellerNavbar />

      <div className="p-6 pt-24">
        {" "}
        {/* pt-24 so content not hidden under top navbar */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">My Products</h2>
          <button
            onClick={() => navigate("/seller/add-product")}
            className="bg-yellow-500 px-4 py-2 rounded"
          >
            + Add Product
          </button>
        </div>
        <div className="bg-white p-4 rounded shadow mb-6 flex gap-4 items-center">
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(0);
            }}
            className="border p-2 rounded"
          >
            <option value="">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
          </select>

          <select
            value={size}
            onChange={(e) => {
              setSize(Number(e.target.value));
              setPage(0);
            }}
            className="border p-2 rounded"
          >
            <option value={6}>6 / page</option>
            <option value={12}>12 / page</option>
            <option value={20}>20 / page</option>
          </select>
        </div>
        {/* grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[600px]">
          {isLoading
            ? Array.from({ length: size }).map((_, i) => (
                <div
                  key={i}
                  className="h-[380px] bg-gray-200 animate-pulse rounded-xl"
                />
              ))
            : products.map((p) => (
                <div key={p.id}>
                  <ProductCard
                    product={p}
                    showActions={true}
                    onEdit={(product) => setEditingProduct(product)}
                    onDelete={async (product) => {
                      if (!confirm("Delete product?")) return;
                      await api.delete(`api/product/${product.id}`);
                      refresh();
                    }}
                  />
                </div>
              ))}
        </div>
        {/* pagination controls */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span>
            Page {page + 1} of {Math.max(1, totalPages)}
          </span>
          <button
            disabled={page + 1 >= totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* update modal */}
      {editingProduct && (
        <UpdateProductModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSaved={() => {
            setEditingProduct(null);
            refresh();
          }}
        />
      )}
    </>
  );
}
