export function ToastMessage({
  type,
  children,
}: {
  type: "success" | "error";
  children: React.ReactNode;
}) {
  return (
    <div data-testid="toast-container">
      <p data-testid={`toast-${type}`}>{children}</p>
    </div>
  );
}
