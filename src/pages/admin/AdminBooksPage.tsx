import { useState } from "react";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockBooks, categories } from "@/data/mockData";
import { toast } from "sonner";

export default function AdminBooksPage() {
  const [books, setBooks] = useState(mockBooks);
  const [search, setSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<typeof mockBooks[0] | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    year: new Date().getFullYear().toString(),
    category: categories[1],
    stock: "1",
    isbn: "",
  });

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingBook) {
      setBooks(books.map((b) =>
        b.id === editingBook.id
          ? {
              ...b,
              title: formData.title,
              author: formData.author,
              year: parseInt(formData.year),
              category: formData.category,
              stock: parseInt(formData.stock),
              available: parseInt(formData.stock),
              isbn: formData.isbn,
            }
          : b
      ));
      toast.success("Buku berhasil diperbarui");
    } else {
      const newBook = {
        id: String(Date.now()),
        title: formData.title,
        author: formData.author,
        year: parseInt(formData.year),
        category: formData.category,
        stock: parseInt(formData.stock),
        available: parseInt(formData.stock),
        isbn: formData.isbn,
        cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop",
        description: "",
      };
      setBooks([newBook, ...books]);
      toast.success("Buku berhasil ditambahkan");
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (book: typeof mockBooks[0]) => {
    setEditingBook(book);
    setFormData({
      title: book.title,
      author: book.author,
      year: book.year.toString(),
      category: book.category,
      stock: book.stock.toString(),
      isbn: book.isbn,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setBooks(books.filter((b) => b.id !== id));
    toast.success("Buku berhasil dihapus");
  };

  const resetForm = () => {
    setEditingBook(null);
    setFormData({
      title: "",
      author: "",
      year: new Date().getFullYear().toString(),
      category: categories[1],
      stock: "1",
      isbn: "",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar variant="admin" />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Kelola Buku</h1>
            <p className="text-muted-foreground">Tambah, edit, atau hapus data buku</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Tambah Buku
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingBook ? "Edit Buku" : "Tambah Buku Baru"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Judul Buku *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="author">Penulis *</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="year">Tahun *</Label>
                    <Input
                      id="year"
                      type="number"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stock">Stok *</Label>
                    <Input
                      id="stock"
                      type="number"
                      min="1"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Kategori *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.slice(1).map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="isbn">ISBN</Label>
                  <Input
                    id="isbn"
                    value={formData.isbn}
                    onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button type="button" variant="outline" className="flex-1" onClick={() => setIsDialogOpen(false)}>
                    Batal
                  </Button>
                  <Button type="submit" className="flex-1">
                    {editingBook ? "Simpan" : "Tambah"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <div className="relative mb-6 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari judul atau penulis..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Table */}
        <div className="card-library overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="table-header">
                <TableHead>Buku</TableHead>
                <TableHead className="hidden md:table-cell">Kategori</TableHead>
                <TableHead className="hidden sm:table-cell">Tahun</TableHead>
                <TableHead>Stok</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBooks.map((book) => (
                <TableRow key={book.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="w-10 h-14 object-cover rounded hidden sm:block"
                      />
                      <div>
                        <p className="font-medium text-foreground">{book.title}</p>
                        <p className="text-sm text-muted-foreground">{book.author}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">
                    {book.category}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-muted-foreground">
                    {book.year}
                  </TableCell>
                  <TableCell>
                    <span className="text-foreground">{book.available}</span>
                    <span className="text-muted-foreground">/{book.stock}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(book)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDelete(book.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
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
