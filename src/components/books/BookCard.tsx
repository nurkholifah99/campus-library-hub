import { Link } from "react-router-dom";
import { Book } from "@/types/library";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const isAvailable = book.available > 0;

  return (
    <Link to={`/book/${book.id}`}>
      <div className="card-library overflow-hidden group cursor-pointer">
        <div className="aspect-[3/4] relative overflow-hidden">
          <img
            src={book.cover}
            alt={book.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-3 right-3">
            <Badge
              className={cn(
                "text-xs font-medium",
                isAvailable ? "status-available" : "status-borrowed"
              )}
            >
              {isAvailable ? "Tersedia" : "Dipinjam"}
            </Badge>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-foreground line-clamp-2 mb-1 group-hover:text-primary transition-colors">
            {book.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-2">{book.author}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">{book.year}</span>
            <span className="text-xs text-muted-foreground">{book.category}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
