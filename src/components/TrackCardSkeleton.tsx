import { getRandomPercent } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export function TrackCardSkeleton() {
  const titleWidth = getRandomPercent();
  const artistWidth = getRandomPercent();
  const genresWidth = getRandomPercent();

  return (
    <article className="flex flex-col justify-between space-y-3">
      <div className="space-y-3">
        <div className="relative h-fit w-full overflow-hidden rounded-md">
          <Skeleton className="aspect-square h-auto w-auto" />
        </div>
        <div className="space-y-1">
          <Skeleton className="h-5" style={{ width: titleWidth }} />
          <Skeleton className="h-4" style={{ width: artistWidth }} />
          <Skeleton className="h-4" style={{ width: genresWidth }} />
        </div>
      </div>
      <div className="flex justify-between">
        <Skeleton className="h-9 w-8" />
        <Skeleton className="h-9 w-8" />
        <Skeleton className="h-9 w-8" />
      </div>
    </article>
  );
}
