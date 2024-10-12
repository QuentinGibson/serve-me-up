export default function MovieCardSkeleton({ isTrending = false }) {
  return (
    <div
      className={`bg-card rounded-lg shadow-lg overflow-hidden ${isTrending ? "h-[280px]" : "h-[400px]"}`}
    >
      <div
        className={`bg-muted animate-pulse ${isTrending ? "h-40" : "h-64"}`}
      ></div>
      <div className="p-4">
        <div className="h-4 bg-muted animate-pulse rounded w-3/4 mb-2"></div>
        {!isTrending && (
          <div className="h-4 bg-muted animate-pulse rounded w-1/2 mb-4"></div>
        )}
        <div className="flex justify-between items-center">
          {isTrending && (
            <div className="h-4 bg-muted animate-pulse rounded w-1/4"></div>
          )}
          <div className="h-8 bg-muted animate-pulse rounded w-24"></div>
        </div>
      </div>
    </div>
  );
}
