export default function ProductCard({ product, onEdit, onDelete, showActions = false, onAddToCart }) {
  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-indigo-200 transform hover:-translate-y-1">
      {/* Image Container - Smaller for seller view */}
      <div className={`relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 ${showActions ? 'h-48' : 'h-64'}`}>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-sm text-gray-800 shadow-md">
            {product.category}
          </span>
        </div>

        {/* Stock Badge */}
        {product.quantity !== undefined && (
          <div className="absolute top-3 right-3">
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-sm shadow-md ${
              product.quantity > 0 
                ? 'bg-green-500/90 text-white' 
                : 'bg-red-500/90 text-white'
            }`}>
              {product.quantity > 0 ? `${product.quantity} in stock` : 'Out of stock'}
            </span>
          </div>
        )}

        {/* Action Buttons Overlay - Only show if showActions is true */}
        {showActions && (
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit && onEdit(product);
              }}
              className="px-4 py-2 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transform hover:scale-105 transition-all duration-200 flex items-center gap-2 shadow-lg"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete && onDelete(product);
              }}
              className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transform hover:scale-105 transition-all duration-200 flex items-center gap-2 shadow-lg"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Product Name */}
        <h3 className="text-base font-bold text-gray-900 mb-1.5 line-clamp-1 group-hover:text-indigo-600 transition-colors duration-200">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div>
            <p className="text-xs text-gray-500 mb-0.5">Price</p>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              ₹{product.price}
            </span>
          </div>

          {!showActions && onAddToCart && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
              className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span>Add to Cart</span>
            </button>
          )}
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-indigo-400 transition-all duration-300 pointer-events-none"></div>
    </div>
  );
}
