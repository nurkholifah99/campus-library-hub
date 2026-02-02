import { Link } from "react-router-dom";
import { BookOpen, History, User, ArrowRight, Book, Users, Clock } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { SearchBar } from "@/components/books/SearchBar";
import { BookCard } from "@/components/books/BookCard";
import { Button } from "@/components/ui/button";
import { mockBooks } from "@/data/mockData";

const quickActions = [
  {
    href: "/catalog",
    icon: BookOpen,
    label: "Jelajahi Buku",
    description: "Temukan koleksi lengkap",
  },
  {
    href: "/history",
    icon: History,
    label: "Riwayat Peminjaman",
    description: "Lihat aktivitas Anda",
  },
  {
    href: "/profile",
    icon: User,
    label: "Profil Saya",
    description: "Kelola akun Anda",
  },
];

const stats = [
  { icon: Book, value: "12,450+", label: "Koleksi Buku" },
  { icon: Users, value: "8,200+", label: "Mahasiswa Aktif" },
  { icon: Clock, value: "24/7", label: "Akses Digital" },
];

export default function Index() {
  const featuredBooks = mockBooks.slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="gradient-hero py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4 animate-slide-up">
              Perpustakaan Digital
              <span className="text-primary"> Universitas</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 animate-slide-up">
              Akses ribuan buku, jurnal, dan referensi akademik kapan saja dan di mana saja.
            </p>
            <SearchBar large className="max-w-2xl mx-auto animate-slide-up" />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto mt-12">
            {stats.map((stat, i) => (
              <div key={i} className="text-center animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                <stat.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 container mx-auto px-4">
        <h2 className="text-2xl font-bold text-foreground mb-6">Akses Cepat</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {quickActions.map((action, i) => (
            <Link
              key={action.href}
              to={action.href}
              className="card-library p-6 flex items-center gap-4 animate-slide-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <action.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{action.label}</h3>
                <p className="text-sm text-muted-foreground">{action.description}</p>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground" />
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Books */}
      <section className="py-12 container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Buku Populer</h2>
          <Link to="/catalog">
            <Button variant="ghost" className="text-primary">
              Lihat Semua
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {featuredBooks.map((book, i) => (
            <div key={book.id} className="animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
              <BookCard book={book} />
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            © 2024 Perpustakaan Universitas Indonesia. Semua hak dilindungi.
          </p>
        </div>
      </footer>
    </div>
  );
}
