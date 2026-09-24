export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-5xl">😕</p>
      <h2 className="text-2xl font-bold text-white">Something went wrong</h2>
      <p className="max-w-md text-gray-400">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded-lg bg-amber-400 px-6 py-2 font-semibold transition hover:bg-amber-500"
        >
          Try again
        </button>
      )}
    </div>
  );
}
