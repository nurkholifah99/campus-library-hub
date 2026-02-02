import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { Navbar } from "@/components/layout/Navbar";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { mockBorrowings } from "@/data/mockData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Riwayat Peminjaman
          </h1>
          <p className="text-muted-foreground">
            Daftar semua buku yang pernah Anda pinjam
          </p>
        </div>

        <div className="card-library overflow-hidden">
          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-border">
            {mockBorrowings.map((record) => (
              <div key={record.id} className="p-4 space-y-3">
                <div className="flex gap-3">
                  <img
                    src={record.bookCover}
                    alt={record.bookTitle}
                    className="w-16 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground line-clamp-2">
                      {record.bookTitle}
                    </h3>
                    <StatusBadge status={record.status} className="mt-2" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Tanggal Pinjam</p>
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
              </div>
            ))}
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow className="table-header">
                  <TableHead>Buku</TableHead>
                  <TableHead>Tanggal Pinjam</TableHead>
                  <TableHead>Jatuh Tempo</TableHead>
                  <TableHead>Dikembalikan</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockBorrowings.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={record.bookCover}
                          alt={record.bookTitle}
                          className="w-10 h-14 object-cover rounded"
                        />
                        <span className="font-medium text-foreground">
                          {record.bookTitle}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {format(record.borrowDate, "d MMM yyyy", { locale: localeId })}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {format(record.dueDate, "d MMM yyyy", { locale: localeId })}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {record.returnDate
                        ? format(record.returnDate, "d MMM yyyy", { locale: localeId })
                        : "-"}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={record.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
