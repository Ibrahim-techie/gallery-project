import { lazy, Suspense } from "react";
import { Link, Route, Routes } from "react-router";
import Gallery from "./pages/Gallery";

// the detail page isn't needed on first load, so split it into its own chunk
const PhotoDetail = lazy(() => import("./pages/PhotoDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <div className="min-h-screen w-full bg-gray-800">
      <header className="py-6 text-center">
        <Link to="/" className="text-4xl font-bold text-white">
          📸 Image Gallery
        </Link>
      </header>

      <Suspense fallback={<p className="text-center text-gray-400">Loading…</p>}>
        <Routes>
          <Route path="/" element={<Gallery />} />
          <Route path="/photo/:id" element={<PhotoDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
