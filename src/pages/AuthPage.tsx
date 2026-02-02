import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Mail, Lock, User, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            setError("Email atau password salah");
          } else if (error.message.includes("Email not confirmed")) {
            setError("Email belum dikonfirmasi. Silakan cek inbox Anda");
          } else {
            setError(error.message);
          }
        } else {
          toast({
            title: "Login Berhasil",
            description: "Selamat datang kembali!",
          });
          navigate("/profile");
        }
      } else {
        if (password.length < 6) {
          setError("Password minimal 6 karakter");
          setLoading(false);
          return;
        }
        
        const { error } = await signUp(email, password, name);
        if (error) {
          if (error.message.includes("User already registered")) {
            setError("Email sudah terdaftar. Silakan login");
          } else {
            setError(error.message);
          }
        } else {
          toast({
            title: "Registrasi Berhasil",
            description: "Silakan cek email Anda untuk konfirmasi",
          });
        }
      }
    } catch (err) {
      setError("Terjadi kesalahan. Silakan coba lagi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary mx-auto mb-4">
            <BookOpen className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Perpustakaan Digital</h1>
          <p className="text-muted-foreground">Universitas Indonesia</p>
        </div>

        {/* Form Card */}
        <div className="card-library p-6">
          <h2 className="text-xl font-semibold text-foreground text-center mb-6">
            {isLogin ? "Masuk ke Akun" : "Daftar Akun Baru"}
          </h2>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center gap-2 text-destructive">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Nama Lengkap</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Masukkan nama lengkap"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="nama@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Memproses..." : isLogin ? "Masuk" : "Daftar"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {isLogin ? "Belum punya akun?" : "Sudah punya akun?"}{" "}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError("");
                }}
                className="text-primary hover:underline font-medium"
              >
                {isLogin ? "Daftar sekarang" : "Masuk di sini"}
              </button>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Button variant="ghost" onClick={() => navigate("/")}>
            Kembali ke Beranda
          </Button>
        </div>
      </div>
    </div>
  );
}
