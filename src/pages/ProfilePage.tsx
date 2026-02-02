import { Mail, Building, GraduationCap, BookOpen, Calendar } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { mockStudent, mockBorrowings } from "@/data/mockData";

export default function ProfilePage() {
  const activeBorrowings = mockBorrowings.filter((b) => b.status === "borrowed");
  const lateBorrowings = mockBorrowings.filter((b) => b.status === "late");

  const profileInfo = [
    { icon: Mail, label: "Email", value: mockStudent.email },
    { icon: Building, label: "Fakultas", value: mockStudent.faculty },
    { icon: GraduationCap, label: "Program Studi", value: mockStudent.major },
  ];

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
                  {mockStudent.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="text-center sm:text-left">
                <h1 className="text-2xl font-bold text-foreground">
                  {mockStudent.name}
                </h1>
                <p className="text-muted-foreground">NIM: {mockStudent.nim}</p>
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="card-library p-6 mb-6">
            <h2 className="font-semibold text-foreground mb-4">Informasi Pribadi</h2>
            <div className="space-y-4">
              {profileInfo.map((info) => (
                <div key={info.label} className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <info.icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{info.label}</p>
                    <p className="font-medium text-foreground">{info.value}</p>
                  </div>
                </div>
              ))}
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
