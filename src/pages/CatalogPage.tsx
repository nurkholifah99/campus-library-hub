import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter, Grid, List } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { SearchBar } from "@/components/books/SearchBar";
import { BookCard } from "@/components/books/BookCard";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockBooks, categories } from "@/data/mockData";
import { cn } from "@/lib/utils";

export default function CatalogPage() {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [category, setCategory] = useState("Semua Kategori");
  const [year, setYear] = useState("all");
  const [availability, setAvailability] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  const filteredBooks = useMemo(() => {
    return mockBooks.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = category === "Semua Kategori" || book.category === category;
      const matchesYear = year === "all" || book.year.toString() === year;
      const matchesAvailability =
        availability === "all" ||
        (availability === "available" && book.available > 0) ||
        (availability === "borrowed" && book.available === 0);

      return matchesSearch && matchesCategory && matchesYear && matchesAvailability;
    });
  }, [searchQuery, category, year, availability]);

  const years = Array.from(new Set(mockBooks.map((b) => b.year))).sort((a, b) => b - a);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Katalog Buku</h1>
          <p className="text-muted-foreground">
            Temukan buku dari berbagai kategori dan penulis
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1">
            <SearchBar />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="lg:hidden"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <div className="flex border border-border rounded-lg overflow-hidden">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                className="rounded-none"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                className="rounded-none"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside
            className={cn(
              "lg:w-64 space-y-6",
              showFilters ? "block" : "hidden lg:block"
            )}
          >
            <div className="card-library p-4 space-y-4">
              <h3 className="font-semibold text-foreground">Filter</h3>

              <div className="space-y-2">
                <Label>Kategori</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Tahun Terbit</Label>
                <Select value={year} onValueChange={setYear}>
                  <SelectTrigger>
                    <SelectValue placeholder="Semua Tahun" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Tahun</SelectItem>
                    {years.map((y) => (
                      <SelectItem key={y} value={y.toString()}>
                        {y}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Ketersediaan</Label>
                <Select value={availability} onValueChange={setAvailability}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua</SelectItem>
                    <SelectItem value="available">Tersedia</SelectItem>
                    <SelectItem value="borrowed">Dipinjam</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setCategory("Semua Kategori");
                  setYear("all");
                  setAvailability("all");
                }}
              >
                Reset Filter
              </Button>
            </div>
          </aside>

          {/* Book Grid */}
          <main className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <p className="text-muted-foreground">
                Menampilkan {filteredBooks.length} buku
              </p>
            </div>

            {filteredBooks.length === 0 ? (
              <div className="card-library p-12 text-center">
                <p className="text-muted-foreground">
                  Tidak ada buku yang ditemukan dengan filter ini.
                </p>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                {filteredBooks.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredBooks.map((book) => (
                  <div key={book.id} className="card-library p-4 flex gap-4">
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-20 h-28 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{book.title}</h3>
                      <p className="text-sm text-muted-foreground">{book.author}</p>
                      <p className="text-sm text-muted-foreground">{book.year} • {book.category}</p>
                      <div className="mt-2">
                        <span
                          className={cn(
                            "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                            book.available > 0 ? "status-available" : "status-borrowed"
                          )}
                        >
                          {book.available > 0 ? "Tersedia" : "Dipinjam"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
