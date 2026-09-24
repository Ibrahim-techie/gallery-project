import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <p className="text-6xl font-bold text-amber-400">404</p>
      <p className="text-gray-300">This page doesn't exist.</p>
      <Link to="/" className="text-amber-400 hover:underline">
        ← Back to gallery
      </Link>
    </div>
  );
}
