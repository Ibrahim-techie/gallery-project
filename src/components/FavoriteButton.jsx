import { useFavorites } from "../context/favorites";

export default function FavoriteButton({ photo, className = "" }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const saved = isFavorite(photo.id);

  return (
    <button
      onClick={() => toggleFavorite(photo)}
      aria-pressed={saved}
      aria-label={saved ? "Remove from favorites" : "Add to favorites"}
      title={saved ? "Remove from favorites" : "Add to favorites"}
      className={`flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-xl shadow transition hover:scale-110 ${className}`}
    >
      {saved ? "❤️" : "🤍"}
    </button>
  );
}
