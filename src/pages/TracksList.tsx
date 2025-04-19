import { useGetTracks } from "@/queries";

export function TracksList() {
  const { data } = useGetTracks();

  return (
    <div>
      <h1 className="text-3xl font-bold text-teal-500">Tracks List</h1>
      <p>This is the tracks list page.</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
