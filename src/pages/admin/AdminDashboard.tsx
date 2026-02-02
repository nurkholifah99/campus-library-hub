import { BookOpen, BookCheck, AlertTriangle, Clock } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { StatCard } from "@/components/admin/StatCard";
import { mockDashboardStats, mockBorrowings } from "@/data/mockData";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const monthlyData = [
  { month: "Jan", peminjaman: 65, pengembalian: 58 },
  { month: "Feb", peminjaman: 72, pengembalian: 70 },
  { month: "Mar", peminjaman: 80, pengembalian: 75 },
  { month: "Apr", peminjaman: 68, pengembalian: 65 },
  { month: "Mei", peminjaman: 85, pengembalian: 78 },
  { month: "Jun", peminjaman: 90, pengembalian: 85 },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar variant="admin" />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard Admin</h1>
          <p className="text-muted-foreground">
            Selamat datang kembali! Berikut ringkasan aktivitas perpustakaan.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total Buku"
            value={mockDashboardStats.totalBooks}
            icon={BookOpen}
            variant="primary"
          />
          <StatCard
            title="Buku Dipinjam"
            value={mockDashboardStats.borrowedBooks}
            icon={BookCheck}
            variant="success"
          />
          <StatCard
            title="Terlambat"
            value={mockDashboardStats.lateReturns}
            icon={AlertTriangle}
            variant="warning"
          />
          <StatCard
            title="Permintaan Baru"
            value={mockDashboardStats.newRequests}
            icon={Clock}
            variant="default"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chart */}
          <div className="lg:col-span-2 card-library p-6">
            <h3 className="font-semibold text-foreground mb-6">Statistik Peminjaman</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="peminjaman" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="pengembalian" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-primary" />
                <span className="text-sm text-muted-foreground">Peminjaman</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-success" />
                <span className="text-sm text-muted-foreground">Pengembalian</span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card-library p-6">
            <h3 className="font-semibold text-foreground mb-4">Aktivitas Terbaru</h3>
            <div className="space-y-4">
              {mockBorrowings.slice(0, 5).map((record) => (
                <div key={record.id} className="flex items-center gap-3">
                  <img
                    src={record.bookCover}
                    alt={record.bookTitle}
                    className="w-10 h-14 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {record.bookTitle}
                    </p>
                    <p className="text-xs text-muted-foreground">{record.studentName}</p>
                  </div>
                  <StatusBadge status={record.status} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
