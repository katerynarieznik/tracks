import { Logo } from "./Logo";
import { Search } from "./Search";
import { CreateTrack } from "@/components/createEditTrack/CreateTrack";

export function Header() {
  return (
    <header className="bg-background sticky top-0 z-10 flex h-16 items-center justify-between border-b px-4">
      <Logo />
      <Search />
      <CreateTrack />
    </header>
  );
}
