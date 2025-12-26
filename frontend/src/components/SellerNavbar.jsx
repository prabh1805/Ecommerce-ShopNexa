import { Link } from "react-router-dom";

export default function SellerNavbar() {
  return (
    <nav className="bg-gray-900 px-6 py-4 flex items-center justify-between shadow-lg">
      <h1 className="text-xl font-bold text-yellow-400">Seller Panel</h1>

      <div className="flex gap-6">
        <Link
          className="text-white hover:text-yellow-400"
          to="/seller/products"
        >
          Products
        </Link>
        <Link
          className="text-white hover:text-yellow-400"
          to="/seller/analytics"
        >
          Analytics
        </Link>
      </div>
    </nav>
  );
}
