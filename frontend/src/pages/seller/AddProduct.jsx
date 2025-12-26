import React, { useState, useEffect } from "react";
import api from "../../services/api";
import SellerNavbar from "../../components/SellerNavbar";
import ProductCard from "../../components/ProductCard";

export default function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    quantity: "",
    imageUrl: "",
  });

  const [products, setProducts] = useState([]);

  // ✅ RUN ONCE
  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ JWT BASED SELLER PRODUCTS
  const fetchProducts = async () => {
    try {
      const { data } = await api.get("/api/product/seller");
      setProducts(data.products);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ ADD PRODUCT (NO sellerId SENT)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/api/product/add", form);
      fetchProducts(); // refresh list
      setForm({
        name: "",
        category: "",
        description: "",
        price: "",
        quantity: "",
        imageUrl: "",
      });
    } catch (err) {
      console.error("Failed to add product", err);
    }
  };

  return (
    <>
      <SellerNavbar />

      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Add New Product</h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <input
            className="border p-2 rounded w-full mb-3"
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <select
            required
            className="w-full p-2 border mb-2 rounded"
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            <option value="electronics">Electronics</option>
            <option value="clothes">Clothes</option>
            <option value="grocery">Grocery</option>
            <option value="beauty">Beauty</option>
            <option value="home">Home & Kitchen</option>
            <option value="sports">Sports</option>
          </select>

          <input
            className="border p-2 rounded w-full mb-3"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
          />

          <input
            className="border p-2 rounded w-full mb-3"
            name="quantity"
            placeholder="Quantity"
            value={form.quantity}
            onChange={handleChange}
            required
          />

          <input
            className="border p-2 rounded w-full mb-3"
            name="imageUrl"
            placeholder="Image URL"
            value={form.imageUrl}
            onChange={handleChange}
          />

          <textarea
            className="border p-2 rounded w-full mb-3"
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />

          <button className="w-full bg-yellow-400 p-2 rounded font-semibold">
            Add Product
          </button>
        </form>

        <h3 className="text-xl font-bold mt-8 mb-3">Your Products</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </>
  );
}
