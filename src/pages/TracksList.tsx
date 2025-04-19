import { useGetTracks } from "@/queries";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";

export function TracksList() {
  const { data } = useGetTracks();

  return (
    <div>
      <Header />

      {/* <Button onClick={() => console.log("Clicked!")}>Click me</Button> */}
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
}
