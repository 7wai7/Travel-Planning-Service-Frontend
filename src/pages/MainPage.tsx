import { Link } from "react-router-dom";

export default function MainPage() {
  return (
    <main className="max-w-2xl mt-40 mx-auto px-2 flex flex-col">
      <h1 className="text-black text-3xl mb-2">Welcome to Travel Planning Service</h1>

      <p className="text-gray-500 text-lg mb-6">
        Plan your trips, organize places by day, and collaborate with others —
        all in one simple and intuitive interface.
      </p>

      <Link to="/trips" className="py-2 px-6 bg-blue-500 mx-auto text-white text-center font-sans rounded-lg transition-colors duration-200 ease hover:bg-blue-700">
        View my trips
      </Link>
    </main>
  );
}
