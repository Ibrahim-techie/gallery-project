import { lazy, Suspense } from "react";
import { Link, NavLink, Route, Routes } from "react-router";
import Gallery from "./pages/Gallery";
import { useFavorites } from "./context/favorites";

// only the gallery is needed on first load, the rest get their own chunks
const PhotoDetail = lazy(() => import("./pages/PhotoDetail"));
const Favorites = lazy(() => import("./pages/Favorites"));
const NotFound = lazy(() => import("./pages/NotFound"));

function navClass({ isActive }) {
  return `rounded-lg px-4 py-2 font-medium transition ${
    isActive ? "bg-amber-400 text-gray-900" : "text-gray-300 hover:text-white"
  }`;
}

function App() {
  const { favorites } = useFavorites();

  return (
    <div className="min-h-screen w-full bg-gray-800">
      <header className="flex flex-col items-center gap-4 px-6 py-6 sm:flex-row sm:justify-between">
        <Link to="/" className="text-3xl font-bold text-white sm:text-4xl">
          📸 Image Gallery
        </Link>
        <nav className="flex gap-2">
          <NavLink to="/" end className={navClass}>
            Gallery
          </NavLink>
          <NavLink to="/favorites" className={navClass}>
            Favorites ({favorites.length})
          </NavLink>
        </nav>
      </header>

      <Suspense fallback={<p className="text-center text-gray-400">Loading…</p>}>
        <Routes>
          <Route path="/" element={<Gallery />} />
          <Route path="/photo/:id" element={<PhotoDetail />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
