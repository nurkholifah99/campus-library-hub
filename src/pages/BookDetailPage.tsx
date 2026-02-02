import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, BookOpen, User, Hash, Layers } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { BookCard } from "@/components/books/BookCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/button";
import { mockBooks } from "@/data/mockData";

export default function BookDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const book = mockBooks.find((b) => b.id === id);

  if (!book) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Buku tidak ditemukan</h1>
          <Link to="/catalog">
            <Button>Kembali ke Katalog</Button>
          </Link>
        </div>
      </div>
    );
  }

  const isAvailable = book.available > 0;
  const relatedBooks = mockBooks
    .filter((b) => b.category === book.category && b.id !== book.id)
    .slice(0, 4);

  const bookDetails = [
    { icon: User, label: "Penulis", value: book.author },
    { icon: Calendar, label: "Tahun Terbit", value: book.year.toString() },
    { icon: Layers, label: "Kategori", value: book.category },
    { icon: Hash, label: "ISBN", value: book.isbn },
    { icon: BookOpen, label: "Stok", value: `${book.available} dari ${book.stock} tersedia` },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali
        </Button>

        {/* Book Details */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Cover */}
          <div className="lg:col-span-1">
            <div className="card-library overflow-hidden sticky top-24">
              <img
                src={book.cover}
                alt={book.title}
                className="w-full aspect-[3/4] object-cover"
              />
            </div>
          </div>

          {/* Info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <StatusBadge status={isAvailable ? "available" : "unavailable"} />
                <span className="text-sm text-muted-foreground">{book.category}</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                {book.title}
              </h1>
              <p className="text-xl text-muted-foreground">oleh {book.author}</p>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {book.description}
            </p>

            {/* Details Grid */}
            <div className="card-library p-6">
              <h3 className="font-semibold text-foreground mb-4">Informasi Buku</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {bookDetails.map((detail) => (
                  <div key={detail.label} className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                      <detail.icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{detail.label}</p>
                      <p className="font-medium text-foreground">{detail.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <div className="flex flex-col sm:flex-row gap-3">
              {isAvailable ? (
                <Link to={`/borrow/${book.id}`} className="flex-1">
                  <Button size="lg" className="w-full">
                    <BookOpen className="h-5 w-5 mr-2" />
                    Pinjam Buku
                  </Button>
                </Link>
              ) : (
                <Button size="lg" className="flex-1" disabled>
                  Buku Sedang Dipinjam
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Related Books */}
        {relatedBooks.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Buku Serupa
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
              {relatedBooks.map((relatedBook) => (
                <BookCard key={relatedBook.id} book={relatedBook} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
