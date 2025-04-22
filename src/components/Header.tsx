import { Logo } from "./Logo";
import { Search } from "./Search";
import { CreateTrackButton } from "./CreateTrackButton";

export function Header({
  search,
  setSearch,
}: {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <header className="bg-background sticky top-0 z-10 border-b">
      <div className="flex h-16 items-center justify-between px-4">
        <Logo />
        <Search search={search} setSearch={setSearch} />
        <CreateTrackButton />
      </div>
    </header>
  );
}
