import { useState } from "react";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { Check, X, RotateCcw, Search, Filter } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockBorrowings } from "@/data/mockData";
import { BorrowingRecord } from "@/types/library";
import { toast } from "sonner";

export default function AdminBorrowingsPage() {
  const [borrowings, setBorrowings] = useState<BorrowingRecord[]>(mockBorrowings);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredBorrowings = borrowings.filter((record) => {
    const matchesSearch =
      record.bookTitle.toLowerCase().includes(search.toLowerCase()) ||
      record.studentName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || record.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleApprove = (id: string) => {
    setBorrowings(
      borrowings.map((b) =>
        b.id === id ? { ...b, status: "borrowed" as const } : b
      )
    );
    toast.success("Peminjaman disetujui");
  };

  const handleReject = (id: string) => {
    setBorrowings(borrowings.filter((b) => b.id !== id));
    toast.success("Peminjaman ditolak");
  };

  const handleReturn = (id: string) => {
    setBorrowings(
      borrowings.map((b) =>
        b.id === id
          ? { ...b, status: "returned" as const, returnDate: new Date() }
          : b
      )
    );
    toast.success("Buku ditandai sudah dikembalikan");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar variant="admin" />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Kelola Peminjaman</h1>
          <p className="text-muted-foreground">Setujui, tolak, atau tandai pengembalian buku</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari buku atau mahasiswa..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Status</SelectItem>
              <SelectItem value="borrowed">Dipinjam</SelectItem>
              <SelectItem value="returned">Dikembalikan</SelectItem>
              <SelectItem value="late">Terlambat</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {filteredBorrowings.map((record) => (
            <div key={record.id} className="card-library p-4">
              <div className="flex gap-3 mb-3">
                <img
                  src={record.bookCover}
                  alt={record.bookTitle}
                  className="w-16 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-foreground line-clamp-2">
                    {record.bookTitle}
                  </h3>
                  <p className="text-sm text-muted-foreground">{record.studentName}</p>
                  <StatusBadge status={record.status} className="mt-2" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                <div>
                  <p className="text-muted-foreground">Pinjam</p>
                  <p className="text-foreground">
                    {format(record.borrowDate, "d MMM yyyy", { locale: localeId })}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Jatuh Tempo</p>
                  <p className="text-foreground">
                    {format(record.dueDate, "d MMM yyyy", { locale: localeId })}
                  </p>
                </div>
              </div>
              {record.status === "borrowed" && (
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1" onClick={() => handleReturn(record.id)}>
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Dikembalikan
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block card-library overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="table-header">
                <TableHead>Buku</TableHead>
                <TableHead>Mahasiswa</TableHead>
                <TableHead>Tanggal Pinjam</TableHead>
                <TableHead>Jatuh Tempo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBorrowings.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={record.bookCover}
                        alt={record.bookTitle}
                        className="w-10 h-14 object-cover rounded"
                      />
                      <span className="font-medium text-foreground line-clamp-2">
                        {record.bookTitle}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {record.studentName}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {format(record.borrowDate, "d MMM yyyy", { locale: localeId })}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {format(record.dueDate, "d MMM yyyy", { locale: localeId })}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={record.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    {record.status === "borrowed" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleReturn(record.id)}
                      >
                        <RotateCcw className="h-4 w-4 mr-1" />
                        Dikembalikan
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
