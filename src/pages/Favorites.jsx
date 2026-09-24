import { Link } from "react-router";
import Imagecard from "../components/Imagecard";
import { useFavorites } from "../context/favorites";

export default function Favorites() {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="text-5xl">🤍</p>
        <h2 className="text-2xl font-bold text-white">No favorites yet</h2>
        <p className="text-gray-400">
          Tap the heart on any photo to save it here.
        </p>
        <Link
          to="/"
          className="rounded-lg bg-amber-400 px-6 py-2 font-semibold transition hover:bg-amber-500"
        >
          Browse photos
        </Link>
      </div>
    );
  }

  return (
    <>
      <p className="px-6 text-gray-400">
        {favorites.length} saved {favorites.length === 1 ? "photo" : "photos"}
      </p>
      <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {favorites.map((photo) => (
          <Imagecard key={photo.id} id={photo.id} author={photo.author} />
        ))}
      </div>
    </>
  );
}
