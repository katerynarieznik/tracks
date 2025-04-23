import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface TracksPaginationProps {
  currentPage: number;
  totalPages: number;
  isNextPage: boolean;
  onPageChange: (page: number) => void;
}

export function TracksPagination({
  currentPage,
  totalPages,
  isNextPage,
  onPageChange,
}: TracksPaginationProps) {
  const pagesList = Array.from({ length: totalPages ?? 1 }, (_, i) => i + 1);

  return (
    <div className="py-10">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            />
          </PaginationItem>
          {pagesList.map((pageItem) => (
            <PaginationItem key={pageItem}>
              <PaginationLink
                onClick={() => onPageChange(pageItem)}
                isActive={pageItem === currentPage}
              >
                {pageItem}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              onClick={() => {
                if (isNextPage) {
                  onPageChange(currentPage + 1);
                }
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
