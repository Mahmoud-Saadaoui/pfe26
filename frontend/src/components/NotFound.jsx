import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-[#777] px-4">
      <h1 className="text-[100px] font-bold text-gray-800">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Page non trouvée</h2>
      <p className="text-center max-w-md mb-6">
        Désolé, la page que vous essayez de consulter n'existe pas
      </p>
      <Link
        to="/"
        className="inline-flex items-center px-4 py-2 border border-[#EEF0EA] bg-gray-100 hover:bg-gray-200 text-sm font-medium rounded transition"
      >
        <FaArrowLeft className="mr-2" />
            S'identifier
      </Link>
    </div>
  );
}