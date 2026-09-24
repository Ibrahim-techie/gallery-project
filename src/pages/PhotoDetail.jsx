import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router";
import ErrorMessage from "../components/ErrorMessage";

const DISPLAY_WIDTH = 1200;

export default function PhotoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchPhoto() {
      setPhoto(null);
      setError(null);
      try {
        const res = await axios.get(`https://picsum.photos/id/${id}/info`, {
          signal: controller.signal,
        });
        setPhoto(res.data);
      } catch (err) {
        if (axios.isCancel(err)) return;
        setError(
          err.response?.status === 404
            ? "This photo doesn't exist."
            : "Couldn't load this photo. Please try again."
        );
      }
    }

    fetchPhoto();
    return () => controller.abort();
  }, [id]);

  // go back to the same gallery page if we came from inside the app,
  // otherwise (opened from a shared link) just go to the gallery
  function goBack() {
    if (location.key !== "default") navigate(-1);
    else navigate("/");
  }

  if (error) {
    return (
      <>
        <ErrorMessage message={error} />
        <p className="text-center">
          <Link to="/" className="text-amber-400 hover:underline">
            ← Back to gallery
          </Link>
        </p>
      </>
    );
  }

  if (!photo) {
    return (
      <div className="mx-auto max-w-5xl animate-pulse px-6 pb-10">
        <div className="aspect-[3/2] w-full rounded-2xl bg-gray-700" />
        <div className="mt-6 h-8 w-64 rounded bg-gray-700" />
      </div>
    );
  }

  // keep the original aspect ratio but don't download the full-size file
  const displayHeight = Math.round((DISPLAY_WIDTH * photo.height) / photo.width);

  return (
    <div className="mx-auto max-w-5xl px-6 pb-10">
      <button
        onClick={goBack}
        className="mb-4 text-amber-400 transition hover:text-amber-300"
      >
        ← Back
      </button>

      <img
        src={`https://picsum.photos/id/${photo.id}/${DISPLAY_WIDTH}/${displayHeight}`}
        alt={`Photo by ${photo.author}`}
        width={DISPLAY_WIDTH}
        height={displayHeight}
        className="w-full rounded-2xl bg-gray-700 shadow-2xl"
      />

      <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-gray-400">
            Photographer
          </p>
          <h2 className="mt-1 text-3xl font-bold text-white">{photo.author}</h2>
          <p className="mt-1 text-sm text-gray-400">
            Original size: {photo.width} × {photo.height}px
          </p>
        </div>

        <div className="flex gap-3">
          <a
            href={photo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-gray-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700"
          >
            View on Unsplash
          </a>
          <a
            href={photo.download_url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-amber-400 px-4 py-2 text-sm font-semibold text-gray-900 transition hover:bg-amber-500"
          >
            Full size
          </a>
        </div>
      </div>
    </div>
  );
}
