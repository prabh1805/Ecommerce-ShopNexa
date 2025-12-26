import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Toast from "../../components/Toast";

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    if (user && user.id) {
      fetchCart();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8080/api/cart/${user.id}`);
      console.log("🛒 Cart data:", response.data);
      console.log("🛒 Cart items:", response.data.items);
      if (response.data.items && response.data.items.length > 0) {
        console.log("🛒 First item structure:", response.data.items[0]);
      }
      setCart(response.data);
    } catch (error) {
      console.error("❌ Error fetching cart:", error);
      setCart({ items: [] });
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      const response = await axios.put("http://localhost:8080/api/cart/update", null, {
        params: { userId: user.id, productId, quantity: newQuantity }
      });
      setCart(response.data);
      setToast({ message: "Quantity updated", type: "success" });
    } catch (error) {
      console.error("❌ Error updating quantity:", error);
      setToast({ message: "Failed to update quantity", type: "error" });
    }
  };

  const removeItem = async (productId) => {
    try {
      const response = await axios.delete("http://localhost:8080/api/cart/remove", {
        params: { userId: user.id, productId }
      });
      setCart(response.data);
      setToast({ message: "Item removed from cart", type: "success" });
    } catch (error) {
      console.error("❌ Error removing item:", error);
      setToast({ message: "Failed to remove item", type: "error" });
    }
  };

  const clearCart = async () => {
    setShowConfirm(true);
  };

  const confirmClearCart = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/cart/clear/${user.id}`);
      setCart({ items: [] });
      setToast({ message: "Cart cleared successfully", type: "success" });
      setShowConfirm(false);
    } catch (error) {
      console.error("❌ Error clearing cart:", error);
      setToast({ message: "Failed to clear cart", type: "error" });
      setShowConfirm(false);
    }
  };

  const calculateTotal = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((sum, item) => {
      const product = item.product || item;
      const price = product.price || 0;
      const quantity = item.quantity || 1;
      return sum + (price * quantity);
    }, 0);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Please login to view your cart</h2>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
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

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Clear Cart?</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to remove all items from your cart? This action cannot be undone.</p>
            <div className="flex gap-4">
              <button
                onClick={confirmClearCart}
                className="flex-1 px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all duration-200"
              >
                Yes, Clear Cart
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Shopping Cart</h1>
          <p className="text-lg text-indigo-100">Review your items before checkout</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {loading ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading cart...</p>
          </div>
        ) : !cart || !cart.items || cart.items.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Your cart is empty</h3>
            <p className="text-gray-600 mb-6">Add some products to get started</p>
            <button
              onClick={() => navigate("/products")}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.items.map((item) => {
                // Handle both item.product and direct item structure
                const product = item.product || item;
                const productId = product.id || item.productId;
                const quantity = item.quantity || 1;
                
                return (
                  <div key={productId} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                    <div className="flex flex-col sm:flex-row gap-6">
                      {/* Product Image */}
                      <div className="w-full sm:w-32 h-32 flex-shrink-0">
                        <img
                          src={product.imageUrl || "https://via.placeholder.com/150"}
                          alt={product.name || "Product"}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">{product.name || "Unknown Product"}</h3>
                            <p className="text-sm text-gray-600 mt-1">{product.category || "Uncategorized"}</p>
                          </div>
                          <button
                            onClick={() => removeItem(productId)}
                            className="text-red-500 hover:text-red-700 p-2"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>

                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description || "No description available"}</p>

                        <div className="flex items-center justify-between">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateQuantity(productId, quantity - 1)}
                              disabled={quantity <= 1}
                              className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-semibold"
                            >
                              -
                            </button>
                            <span className="text-lg font-semibold w-12 text-center">{quantity}</span>
                            <button
                              onClick={() => updateQuantity(productId, quantity + 1)}
                              className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-semibold"
                            >
                              +
                            </button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <p className="text-sm text-gray-500">Price</p>
                            <p className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                              ₹{((product.price || 0) * quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 sticky top-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({cart.items.length} items)</span>
                    <span className="font-semibold">₹{calculateTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-semibold text-green-600">Free</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-xl font-bold text-gray-900">
                      <span>Total</span>
                      <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        ₹{calculateTotal().toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <button className="w-full px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 mb-3">
                  Proceed to Checkout
                </button>

                <button
                  onClick={() => navigate("/products")}
                  className="w-full px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all duration-200 mb-3"
                >
                  Continue Shopping
                </button>

                <button
                  onClick={clearCart}
                  className="w-full px-6 py-3 text-red-600 font-semibold hover:bg-red-50 rounded-xl transition-all duration-200"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
