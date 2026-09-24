export default function Imagecard({
  download_url = "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  author = "Unknown",
  url = "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
}) {
  return (
    <div className="group w-full overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <div className="overflow-hidden">
        <img
          src={download_url}
          alt={author}
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
