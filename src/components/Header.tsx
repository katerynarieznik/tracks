import { Logo } from "./Logo";
import { Search } from "./Search";
import { CreateTrack } from "@/components/createEditTrack/CreateTrack";

export function Header() {
  return (
    <header className="bg-background sticky top-0 z-10 border-b">
      <div className="flex h-16 items-center justify-between px-4">
        <Logo />
        <Search />
        <CreateTrack />
      </div>
    </header>
  );
}
