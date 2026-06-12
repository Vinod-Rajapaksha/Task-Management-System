import { Link } from "react-router-dom";
import { AlertTriangle, Home } from "lucide-react";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <AlertTriangle
          size={80}
          className="mx-auto text-red-500 mb-4"
        />

        <h1 className="text-6xl font-bold text-gray-800">
          404
        </h1>

        <h2 className="text-2xl font-semibold text-gray-700 mt-2">
          Page Not Found
        </h2>

        <p className="text-gray-500 mt-3">
          The page you are looking for doesn't exist or has been moved.
        </p>

        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Home size={18} />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default NotFound;