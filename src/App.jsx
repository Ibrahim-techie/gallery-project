import axios from "axios";
import Imagecard from "./components/Imagecard";
import Pagination from "./components/Pagination";
import SkeletonCard from "./components/SkeletonCard";
import ErrorMessage from "./components/ErrorMessage";
import { useEffect, useState } from "react";

const TOTAL_PAGES = 20;
const PER_PAGE = 60;

function App() {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // bumping this re-runs the effect when the user clicks "Try again"
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const URL = `https://picsum.photos/v2/list?page=${page}&limit=${PER_PAGE}`;
    // cancel the old request if the user switches pages quickly
    const controller = new AbortController();

    async function fetchImages() {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(URL, { signal: controller.signal });
        setPhotos(response.data);
      } catch (err) {
        if (axios.isCancel(err)) return;
        setError("Couldn't load photos. Check your connection and try again.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    fetchImages();
    return () => controller.abort();
  }, [page, retryCount]);

  function goToPage(num) {
    if (num < 1 || num > TOTAL_PAGES) return;
    setPage(num);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  let content;
  if (error) {
    content = (
      <ErrorMessage message={error} onRetry={() => setRetryCount((c) => c + 1)} />
    );
  } else {
    content = (
      <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {loading
          ? Array.from({ length: 12 }, (_, i) => <SkeletonCard key={i} />)
          : photos.map((el) => (
              <Imagecard
                key={el.id}
                download_url={el.download_url}
                author={el.author}
                url={el.url}
              />
            ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-800">
      <h1 className="py-6 text-center text-4xl font-bold text-white">
        📸 Image Gallery
      </h1>

      {content}

      <footer className="sticky bottom-0 flex justify-center bg-gray-900 py-5">
        <Pagination
          page={page}
          totalPages={TOTAL_PAGES}
          onPageChange={goToPage}
        />
      </footer>
    </div>
  );
}

export default App;
