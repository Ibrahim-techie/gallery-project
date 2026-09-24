import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Imagecard from "../components/Imagecard";
import Pagination from "../components/Pagination";
import SkeletonCard from "../components/SkeletonCard";
import ErrorMessage from "../components/ErrorMessage";

// picsum has ~990 photos, so with 60 per page the list runs out after page 17
const TOTAL_PAGES = 17;
const PER_PAGE = 60;

// keep the page inside 1..TOTAL_PAGES even if someone types ?page=abc
function readPage(searchParams) {
  const num = Number(searchParams.get("page"));
  if (!Number.isInteger(num) || num < 1) return 1;
  return Math.min(num, TOTAL_PAGES);
}

export default function Gallery() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = readPage(searchParams);

  const [photos, setPhotos] = useState([]);
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
    setSearchParams({ page: num });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  let content;
  if (error) {
    content = (
      <ErrorMessage message={error} onRetry={() => setRetryCount((c) => c + 1)} />
    );
  } else if (!loading && photos.length === 0) {
    content = (
      <p className="py-20 text-center text-gray-400">No photos on this page.</p>
    );
  } else {
    content = (
      <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {loading
          ? Array.from({ length: 12 }, (_, i) => <SkeletonCard key={i} />)
          : photos.map((el) => (
              <Imagecard key={el.id} id={el.id} author={el.author} />
            ))}
      </div>
    );
  }

  return (
    <>
      {content}

      <footer className="sticky bottom-0 z-20 flex justify-center bg-gray-900 px-2 py-5">
        <Pagination
          page={page}
          totalPages={TOTAL_PAGES}
          onPageChange={goToPage}
        />
      </footer>
    </>
  );
}
