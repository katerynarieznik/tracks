import { Link } from "@tanstack/react-router";

// TODO: Style a 404 page

export function NotFound() {
  return (
    <div>
      <h2>404 Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link to="/">Home</Link>
    </div>
  );
}
