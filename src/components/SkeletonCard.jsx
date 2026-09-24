export default function SkeletonCard() {
  return (
    <div className="w-full animate-pulse overflow-hidden rounded-2xl bg-white shadow-lg">
      <div className="h-60 w-full bg-gray-300" />
      <div className="flex items-center justify-between p-4">
        <div className="space-y-2">
          <div className="h-3 w-20 rounded bg-gray-300" />
          <div className="h-5 w-32 rounded bg-gray-300" />
        </div>
        <div className="h-9 w-16 rounded-lg bg-gray-300" />
      </div>
    </div>
  );
}
