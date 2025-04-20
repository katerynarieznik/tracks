export function Filters() {
  return (
    <div className="flex w-full items-center justify-between pb-8">
      <div className="flex items-center gap-4">
        <span className="rounded bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors duration-200 hover:bg-gray-300">
          Filter 1
        </span>
        <span className="rounded bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors duration-200 hover:bg-gray-300">
          Filter 2
        </span>
      </div>
    </div>
  );
}
