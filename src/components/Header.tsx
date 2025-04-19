import { Logo } from "./Logo";
import { SearchForm } from "./SearchForm";
import { AddTrackButton } from "./AddTrackButton";

export function Header() {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center justify-between px-4">
        <Logo />
        <SearchForm />
        <AddTrackButton />
      </div>
    </header>
  );
}
