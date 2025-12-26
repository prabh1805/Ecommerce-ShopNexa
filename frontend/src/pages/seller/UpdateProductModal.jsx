import React, { useState } from "react";
import api from "../../services/api";

export default function UpdateProductModal({ product, onClose, onSaved }) {
  const [form, setForm] = useState({
    name: product.name || "",
    category: product.category || "",
    description: product.description || "",
    price: product.price || 0,
    quantity: product.quantity || 0,
    imageUrl: product.imageUrl || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await api.put(`/api/product/${product.id}`, form); // ✅ no full URL
      onSaved();
    } catch (err) {
      console.error("❌ Update failed:", err.response?.data || err.message);
      alert("Update failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h3 className="text-lg font-bold mb-4">Edit Product</h3>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-2"
          placeholder="Name"
        />
        <select
          name="category"
          value={form.category}
          required
          className="w-full p-2 border mb-2 rounded"
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
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-2"
          placeholder="Price"
        />
        <input
          name="quantity"
          type="number"
          value={form.quantity}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-2"
          placeholder="Quantity"
        />
        <input
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-2"
          placeholder="Image URL"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-3"
          placeholder="Description"
        />

        <div className="flex gap-2 justify-end">
          <button onClick={onClose} className="px-4 py-2 rounded border">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded bg-yellow-500"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
