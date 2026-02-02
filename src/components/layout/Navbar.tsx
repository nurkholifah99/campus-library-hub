import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BookOpen, Menu, X, User, Search, History, LayoutDashboard, LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const studentLinks = [
  { href: "/", label: "Beranda", icon: BookOpen },
  { href: "/catalog", label: "Katalog", icon: Search },
  { href: "/history", label: "Riwayat", icon: History },
  { href: "/profile", label: "Profil", icon: User },
];

const adminLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/books", label: "Kelola Buku", icon: BookOpen },
  { href: "/admin/borrowings", label: "Peminjaman", icon: History },
];

interface NavbarProps {
  variant?: "student" | "admin";
}

export function Navbar({ variant = "student" }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const links = variant === "admin" ? adminLinks : studentLinks;
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to={variant === "admin" ? "/admin" : "/"} className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <BookOpen className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-foreground">Perpustakaan</h1>
              <p className="text-xs text-muted-foreground">Universitas Indonesia</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "nav-link",
                    isActive && "nav-link-active"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop Auth & Switch */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Keluar
              </Button>
            ) : (
              <Link to="/auth">
                <Button variant="ghost" size="sm">
                  <LogIn className="h-4 w-4 mr-2" />
                  Masuk
                </Button>
              </Link>
            )}
            {variant === "student" ? (
              <Link to="/admin">
                <Button variant="outline" size="sm">
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  Mode Admin
                </Button>
              </Link>
            ) : (
              <Link to="/">
                <Button variant="outline" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Mode Mahasiswa
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-1">
              {links.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "nav-link",
                      isActive && "nav-link-active"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-4 mt-4 border-t border-border space-y-2">
                {user ? (
                  <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Keluar
                  </Button>
                ) : (
                  <Link to="/auth" onClick={() => setIsOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      <LogIn className="h-4 w-4 mr-2" />
                      Masuk
                    </Button>
                  </Link>
                )}
                {variant === "student" ? (
                  <Link to="/admin" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full">
                      <LayoutDashboard className="h-4 w-4 mr-2" />
                      Mode Admin
                    </Button>
                  </Link>
                ) : (
                  <Link to="/" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full">
                      <User className="h-4 w-4 mr-2" />
                      Mode Mahasiswa
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
