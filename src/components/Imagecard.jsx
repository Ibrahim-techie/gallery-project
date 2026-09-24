import { memo } from "react";

// download_url is the original photo (often 5000px+ wide). For the grid we
// ask picsum for a resized version instead, which is much lighter.
function thumbnailUrl(id) {
  return `https://picsum.photos/id/${id}/600/400`;
}

function Imagecard({ id, author = "Unknown", url }) {
  return (
    <div className="group w-full overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <div className="overflow-hidden bg-gray-200">
        <img
          src={thumbnailUrl(id)}
          alt={`Photo by ${author}`}
          width={600}
          height={400}
          loading="lazy"
          decoding="async"
          className="h-60 w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="flex items-center justify-between p-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-gray-500">
            Photographer
          </p>
          <h2 className="mt-1 text-lg font-bold text-gray-800">{author}</h2>
        </div>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-black"
        >
          View
        </a>
      </div>
    </div>
  );
}

export default memo(Imagecard);
