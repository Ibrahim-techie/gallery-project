import { useCallback, useEffect, useMemo, useState } from "react";
import { FavoritesContext } from "./favorites";

const STORAGE_KEY = "gallery-favorites";

function loadFavorites() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    // private mode or corrupted data, just start empty
    return [];
  }
}

export default function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(loadFavorites);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // storage full or blocked, favorites still work for this session
    }
  }, [favorites]);

  // we only keep what the cards need, not the whole API response
  const toggleFavorite = useCallback((photo) => {
    setFavorites((prev) =>
      prev.some((p) => p.id === photo.id)
        ? prev.filter((p) => p.id !== photo.id)
        : [...prev, { id: photo.id, author: photo.author }]
    );
  }, []);

  const value = useMemo(
    () => ({
      favorites,
      toggleFavorite,
      isFavorite: (id) => favorites.some((p) => p.id === id),
    }),
    [favorites, toggleFavorite]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}
