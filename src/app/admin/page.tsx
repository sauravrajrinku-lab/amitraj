"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Mail,
  Phone,
  Calendar,
  Trash2,
  RefreshCw,
  Download,
  Search,
  MessageSquare,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  LogOut,
  ExternalLink,
  User,
  Lock,
} from "lucide-react";

interface Message {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  message: string;
  created_at: string;
}

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("supabase_admin_user");
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setCurrentUser(parsed);
        fetchMessages(parsed.email);
      } catch {
        localStorage.removeItem("supabase_admin_user");
      }
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setCurrentUser(data.user);
        localStorage.setItem("supabase_admin_user", JSON.stringify(data.user));
        await fetchMessages(data.user.email);
        showToast(`Welcome back, ${data.user.name}!`, "success");
      } else {
        setLoginError(data.error || "Authentication failed.");
      }
    } catch (err: any) {
      setLoginError("Failed to connect to Supabase authentication service.");
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (adminEmail: string) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/messages?adminEmail=${encodeURIComponent(adminEmail)}`);
      const data = await res.json();

      if (res.ok && data.success) {
        setMessages(data.messages || []);
      } else {
        showToast(data.error || "Failed to load messages from Supabase", "error");
      }
    } catch (err) {
      showToast("Error loading messages.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("supabase_admin_user");
    setCurrentUser(null);
    setEmail("");
    setPassword("");
    setMessages([]);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this message from Supabase?")) return;
    if (!currentUser) return;

    setDeletingId(id);
    try {
      const res = await fetch(
        `/api/admin/messages?adminEmail=${encodeURIComponent(currentUser.email)}&id=${encodeURIComponent(id)}`,
        { method: "DELETE" }
      );
      const data = await res.json();

      if (res.ok && data.success) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
        showToast("Message deleted permanently from Supabase.", "success");
      } else {
        showToast(data.error || "Failed to delete message.", "error");
      }
    } catch (err) {
      showToast("Error deleting message.", "error");
    } finally {
      setDeletingId(null);
    }
  };

  const handleExportCSV = () => {
    if (!messages.length) {
      showToast("No messages to export.", "error");
      return;
    }

    const headers = ["ID", "Name", "Email", "Phone", "Message", "Date (UTC)"];
    const rows = messages.map((m) => [
      `"${m.id}"`,
      `"${m.name.replace(/"/g, '""')}"`,
      `"${m.email.replace(/"/g, '""')}"`,
      `"${(m.phone || "").replace(/"/g, '""')}"`,
      `"${m.message.replace(/"/g, '""')}"`,
      `"${new Date(m.created_at).toLocaleString()}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `AmitRaj_Inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("CSV exported successfully!", "success");
  };

  const filteredMessages = messages.filter((m) => {
    const term = searchTerm.toLowerCase();
    return (
      m.name?.toLowerCase().includes(term) ||
      m.email?.toLowerCase().includes(term) ||
      m.phone?.toLowerCase().includes(term) ||
      m.message?.toLowerCase().includes(term)
    );
  });

  // Supabase Auth Login Screen
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center p-6 text-slate-100">
        <div className="w-full max-w-md bg-[#141820] border border-[#1E2D40] rounded-2xl p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-400" />
          
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl mx-auto flex items-center justify-center text-emerald-400 mb-4 shadow-[0_0_25px_rgba(16,185,129,0.2)]">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Supabase Admin Login</h1>
            <p className="text-xs text-slate-400 mt-2">
              Authenticate with your credentials stored in Supabase <code className="text-cyan-400 font-mono">admin_users</code> table
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="amit.raj.ee@gmail.com"
                  className="w-full pl-10 pr-4 py-3 bg-[#0D0D0D] border border-[#1E2D40] text-white rounded-xl text-sm focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your admin password"
                  className="w-full pl-10 pr-4 py-3 bg-[#0D0D0D] border border-[#1E2D40] text-white rounded-xl text-sm focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            {loginError && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-400 flex items-center gap-2 animate-fade-in">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-medium text-sm rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                "Authenticate with Supabase"
              )}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-[#1E2D40] pt-4">
            <Link href="/" className="text-xs text-slate-400 hover:text-cyan-400 flex items-center justify-center gap-1.5 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Supabase Admin Dashboard
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-slate-100 p-4 sm:p-8">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl shadow-2xl border text-sm font-medium flex items-center gap-2 animate-fade-in ${
            toast.type === "success"
              ? "bg-emerald-950/90 border-emerald-500/40 text-emerald-300"
              : "bg-red-950/90 border-red-500/40 text-red-300"
          }`}
        >
          {toast.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          {toast.msg}
        </div>
      )}

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Navigation */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#141820] border border-[#1E2D40] p-6 rounded-2xl shadow-lg">
          <div>
            <div className="flex items-center gap-3">
              <Link href="/" className="text-xs text-cyan-400 hover:underline flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" /> amitraj.live
              </Link>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Supabase Authenticated
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white mt-1">Inquiries & Contact Messages</h1>
            <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
              <User className="w-3 h-3 text-cyan-400" />
              <span>
                Logged in as <strong className="text-slate-200">{currentUser.name}</strong> ({currentUser.email})
              </span>
              <span className="px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 text-[10px] font-mono uppercase font-semibold">
                {currentUser.role}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => fetchMessages(currentUser.email)}
              disabled={loading}
              className="px-3.5 py-2 bg-[#0D0D0D] hover:bg-[#1A2230] border border-[#1E2D40] text-slate-300 hover:text-white rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>

            <button
              onClick={handleExportCSV}
              className="px-3.5 py-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-300 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              Export CSV
            </button>

            <button
              onClick={handleLogout}
              className="px-3.5 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              Logout
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#141820] border border-[#1E2D40] p-5 rounded-2xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Received</span>
              <MessageSquare className="w-4 h-4 text-cyan-400" />
            </div>
            <p className="text-3xl font-bold text-white mt-3">{messages.length}</p>
          </div>

          <div className="bg-[#141820] border border-[#1E2D40] p-5 rounded-2xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">With Phone / WhatsApp</span>
              <Phone className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-3xl font-bold text-white mt-3">
              {messages.filter((m) => m.phone && m.phone.trim().length > 0).length}
            </p>
          </div>

          <div className="bg-[#141820] border border-[#1E2D40] p-5 rounded-2xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Latest Inquiry</span>
              <Calendar className="w-4 h-4 text-blue-400" />
            </div>
            <p className="text-sm font-medium text-slate-300 mt-4 truncate">
              {messages.length > 0
                ? new Date(messages[0].created_at).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "No messages yet"}
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, email, phone number, or message..."
            className="w-full pl-11 pr-4 py-3.5 bg-[#141820] border border-[#1E2D40] text-white rounded-2xl text-sm focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all placeholder:text-slate-500 shadow-sm"
          />
          {searchTerm && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400">
              Found {filteredMessages.length} results
            </span>
          )}
        </div>

        {/* Messages List */}
        {filteredMessages.length === 0 ? (
          <div className="bg-[#141820] border border-[#1E2D40] rounded-2xl p-12 text-center">
            <MessageSquare className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-slate-300">No Messages Found</h3>
            <p className="text-xs text-slate-500 mt-1">
              {searchTerm ? "No inquiries matched your search keyword." : "When someone submits the contact form, messages will appear here."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredMessages.map((msg) => {
              const formattedDate = new Date(msg.created_at).toLocaleDateString("en-IN", {
                weekday: "short",
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              });

              // Clean phone number for WhatsApp link
              const cleanPhone = msg.phone ? msg.phone.replace(/[^0-9]/g, "") : "";

              return (
                <div
                  key={msg.id}
                  className="bg-[#141820] border border-[#1E2D40] hover:border-cyan-500/40 rounded-2xl p-6 transition-all duration-300 shadow-lg group relative"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#1E2D40]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center font-bold text-white text-sm shadow-md">
                        {msg.name ? msg.name.charAt(0).toUpperCase() : "?"}
                      </div>
                      <div>
                        <h2 className="font-semibold text-white text-base tracking-tight">{msg.name}</h2>
                        <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-slate-400">
                          <a
                            href={`mailto:${msg.email}`}
                            className="flex items-center gap-1 hover:text-cyan-400 transition-colors"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            {msg.email}
                          </a>

                          {msg.phone && (
                            <>
                              <span>•</span>
                              <a
                                href={`tel:${msg.phone}`}
                                className="flex items-center gap-1 hover:text-emerald-400 transition-colors font-mono"
                              >
                                <Phone className="w-3.5 h-3.5" />
                                {msg.phone}
                              </a>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-auto">
                      <span className="text-[11px] text-slate-400 font-mono bg-[#0D0D0D] px-2.5 py-1 rounded-lg border border-[#1E2D40]">
                        {formattedDate}
                      </span>

                      {cleanPhone && (
                        <a
                          href={`https://wa.me/${cleanPhone}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors"
                        >
                          WhatsApp <ExternalLink className="w-3 h-3" />
                        </a>
                      )}

                      <button
                        onClick={() => handleDelete(msg.id)}
                        disabled={deletingId === msg.id}
                        className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg border border-transparent hover:border-red-500/30 transition-all"
                        title="Delete Message permanently from Supabase"
                      >
                        {deletingId === msg.id ? (
                          <RefreshCw className="w-4 h-4 animate-spin text-red-400" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Message Content */}
                  <div className="mt-4 text-sm text-slate-300 whitespace-pre-wrap leading-relaxed bg-[#0D0D0D]/60 p-4 rounded-xl border border-[#1E2D40]/50 font-sans">
                    {msg.message}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
