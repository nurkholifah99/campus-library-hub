export interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
  category: string;
  cover: string;
  isbn: string;
  description: string;
  stock: number;
  available: number;
}

export interface BorrowingRecord {
  id: string;
  bookId: string;
  bookTitle: string;
  bookCover: string;
  studentId: string;
  studentName: string;
  borrowDate: Date;
  dueDate: Date;
  returnDate?: Date;
  status: 'borrowed' | 'returned' | 'late';
}

export interface Student {
  id: string;
  nim: string;
  name: string;
  email: string;
  faculty: string;
  major: string;
  avatar?: string;
}

export interface DashboardStats {
  totalBooks: number;
  borrowedBooks: number;
  lateReturns: number;
  newRequests: number;
}
