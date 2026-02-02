import { useNavigate } from "react-router-dom";
import { Mail, LogOut, BookOpen, Calendar } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { mockBorrowings } from "@/data/mockData";

export default function ProfilePage() {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();

  const activeBorrowings = mockBorrowings.filter((b) => b.status === "borrowed");
  const lateBorrowings = mockBorrowings.filter((b) => b.status === "late");

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8 flex items-center justify-center">
          <p className="text-muted-foreground">Memuat...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto text-center">
            <div className="card-library p-8">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Silakan Login
              </h1>
              <p className="text-muted-foreground mb-6">
                Masuk ke akun Anda untuk melihat profil dan riwayat peminjaman
              </p>
              <Button onClick={() => navigate("/auth")} className="w-full">
                Login / Daftar
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const userName = user.user_metadata?.full_name || user.email?.split("@")[0] || "User";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Profile Header */}
          <div className="card-library p-6 mb-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                  {userName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="text-center sm:text-left flex-1">
                <h1 className="text-2xl font-bold text-foreground">
                  {userName}
                </h1>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Keluar
              </Button>
            </div>
          </div>

          {/* Profile Info */}
          <div className="card-library p-6 mb-6">
            <h2 className="font-semibold text-foreground mb-4">Informasi Akun</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium text-foreground">{user.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Borrowing Summary */}
          <div className="card-library p-6">
            <h2 className="font-semibold text-foreground mb-4">Ringkasan Peminjaman</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <div className="flex items-center gap-3 mb-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <span className="text-sm text-muted-foreground">Sedang Dipinjam</span>
                </div>
                <p className="text-3xl font-bold text-foreground">
                  {activeBorrowings.length}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-destructive/5 border border-destructive/20">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="h-5 w-5 text-destructive" />
                  <span className="text-sm text-muted-foreground">Terlambat</span>
                </div>
                <p className="text-3xl font-bold text-foreground">
                  {lateBorrowings.length}
                </p>
              </div>
            </div>

            {/* Active Borrowings */}
            {activeBorrowings.length > 0 && (
              <div className="mt-6 pt-6 border-t border-border">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">
                  Buku yang Sedang Dipinjam
                </h3>
                <div className="space-y-3">
                  {activeBorrowings.map((borrowing) => (
                    <div key={borrowing.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <img
                        src={borrowing.bookCover}
                        alt={borrowing.bookTitle}
                        className="w-12 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-foreground line-clamp-1">
                          {borrowing.bookTitle}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Jatuh tempo: {borrowing.dueDate.toLocaleDateString("id-ID")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
