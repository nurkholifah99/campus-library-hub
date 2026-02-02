import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { mockBooks, mockStudent } from "@/data/mockData";
import { toast } from "sonner";

export default function BorrowPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const book = mockBooks.find((b) => b.id === id);
  const [nim, setNim] = useState(mockStudent.nim);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nim.trim()) {
      toast.error("NIM harus diisi");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    toast.success("Peminjaman berhasil diajukan!");
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto card-library p-8 text-center animate-scale-in">
            <div className="flex justify-center mb-6">
              <div className="h-16 w-16 rounded-full bg-success/10 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Peminjaman Berhasil!
            </h1>
            <p className="text-muted-foreground mb-6">
              Permintaan peminjaman buku "{book.title}" telah berhasil diajukan.
              Silakan ambil buku di perpustakaan.
            </p>
            <div className="flex flex-col gap-3">
              <Link to="/history">
                <Button className="w-full">Lihat Riwayat Peminjaman</Button>
              </Link>
              <Link to="/catalog">
                <Button variant="outline" className="w-full">
                  Pinjam Buku Lain
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 14);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali
        </Button>

        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-8">
            Form Peminjaman Buku
          </h1>

          <div className="card-library p-6 mb-6">
            <h3 className="font-semibold text-foreground mb-4">Detail Buku</h3>
            <div className="flex gap-4">
              <img
                src={book.cover}
                alt={book.title}
                className="w-20 h-28 object-cover rounded-lg"
              />
              <div>
                <h4 className="font-medium text-foreground">{book.title}</h4>
                <p className="text-sm text-muted-foreground">{book.author}</p>
                <p className="text-sm text-muted-foreground">{book.category} • {book.year}</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="card-library p-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="nim">NIM Mahasiswa *</Label>
              <Input
                id="nim"
                value={nim}
                onChange={(e) => setNim(e.target.value)}
                placeholder="Masukkan NIM Anda"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bookTitle">Judul Buku</Label>
              <Input
                id="bookTitle"
                value={book.title}
                disabled
                className="bg-muted"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Tanggal Pinjam</Label>
                <Input
                  value={new Date().toLocaleDateString("id-ID")}
                  disabled
                  className="bg-muted"
                />
              </div>
              <div className="space-y-2">
                <Label>Tanggal Kembali</Label>
                <Input
                  value={dueDate.toLocaleDateString("id-ID")}
                  disabled
                  className="bg-muted"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4">
                Dengan mengajukan peminjaman, Anda menyetujui untuk mengembalikan buku
                sebelum tanggal jatuh tempo.
              </p>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Memproses..." : "Konfirmasi Peminjaman"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
