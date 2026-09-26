import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  User, 
  Mail, 
  Phone, 
  Search, 
  RefreshCw, 
  Trash2, 
  Download, 
  FileText,
  AlertCircle,
  Eye,
  CheckCircle2,
} from 'lucide-react';
import { Inquiry } from '../types';
import { fetchInquiries, updateInquiryStatus, deleteInquiry } from '../lib/api';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose }) => {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return typeof window !== 'undefined' && sessionStorage.getItem('techworks_admin_auth') === 'true';
  });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Dashboard state
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Selected inquiry for detail modal/edit
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [editNotes, setEditNotes] = useState('');
  const [saveNoteSuccess, setSaveNoteSuccess] = useState(false);

  // Load inquiries when authenticated and open
  useEffect(() => {
    if (isOpen && isAuthenticated) {
      loadData();
    }
  }, [isOpen, isAuthenticated]);

  const loadData = async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const res = await fetchInquiries();
      setInquiries(res.inquiries);
      if (res.error) {
        setFetchError(res.error);
      }
    } catch (e: any) {
      console.error('Error fetching admin data:', e);
      setFetchError(e.message || 'Error connecting to database');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    // Admin Credentials: admin@123 / admin@123
    if (username.trim() === 'admin@123' && password.trim() === 'admin@123') {
      setIsAuthenticated(true);
      sessionStorage.setItem('techworks_admin_auth', 'true');
      setUsername('');
      setPassword('');
      loadData();
    } else {
      setAuthError('Invalid credentials. Please verify your admin username and password.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('techworks_admin_auth');
  };

  const handleStatusChange = async (id: string, newStatus: any) => {
    await updateInquiryStatus(id, { status: newStatus });
    setInquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry((prev) => prev ? { ...prev, status: newStatus } : null);
    }
  };

  const handleSaveNotes = async (id: string) => {
    await updateInquiryStatus(id, { admin_notes: editNotes });
    setInquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, admin_notes: editNotes } : item))
    );
    if (selectedInquiry) {
      setSelectedInquiry((prev) => prev ? { ...prev, admin_notes: editNotes } : null);
    }
    setSaveNoteSuccess(true);
    setTimeout(() => setSaveNoteSuccess(false), 2000);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this inquiry record permanently?')) {
      await deleteInquiry(id);
      setInquiries((prev) => prev.filter((item) => item.id !== id));
      if (selectedInquiry?.id === id) {
        setSelectedInquiry(null);
      }
    }
  };

  const exportToCSV = () => {
    if (inquiries.length === 0) return;
    const headers = ['ID', 'Date', 'Name', 'Email', 'Phone', 'Service', 'Description', 'Status', 'Notes'];
    const rows = inquiries.map((item) => [
      item.id,
      item.created_at,
      `"${item.name.replace(/"/g, '""')}"`,
      `"${item.email.replace(/"/g, '""')}"`,
      `"${item.phone.replace(/"/g, '""')}"`,
      `"${item.service.replace(/"/g, '""')}"`,
      `"${item.description.replace(/"/g, '""')}"`,
      item.status,
      `"${(item.admin_notes || '').replace(/"/g, '""')}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `techworks_inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  // Filtered inquiries
  const filteredInquiries = inquiries.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const countNew = inquiries.filter((i) => i.status === 'new').length;
  const countContacted = inquiries.filter((i) => i.status === 'contacted').length;
  const countInProgress = inquiries.filter((i) => i.status === 'in_progress').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 lg:p-6 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl sm:rounded-3xl max-w-6xl w-full h-[96vh] sm:h-[92vh] max-h-[96vh] overflow-hidden shadow-2xl border border-[#D9DDE1] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header */}
        <div className="bg-[#3A3F44] text-white px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between shrink-0 border-b border-gray-700">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/10 flex items-center justify-center text-[#B8860B] border border-white/15 shrink-0">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <div className="text-sm sm:text-base font-extrabold flex items-center gap-2 text-white truncate">
                <span className="truncate">Admin Portal</span>
                <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#B8860B] text-black shrink-0">
                  Secure
                </span>
              </div>
              <div className="text-[11px] text-gray-300 hidden sm:block truncate">
                TechWorks Client Inquiries & Lead Management
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-200 hover:text-white transition-colors cursor-pointer"
              >
                Log Out
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Close Admin Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        {!isAuthenticated ? (
          /* Authentication Screen */
          <div className="flex-1 flex items-center justify-center p-4 sm:p-6 bg-[#F5F6F7] overflow-y-auto">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 max-w-md w-full border border-[#D9DDE1] shadow-xl my-auto">
              <div className="text-center mb-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#3A3F44] text-[#B8860B] flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-sm">
                  <Lock className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#222222]">
                  Admin Access Login
                </h3>
                <p className="text-xs text-[#8A8F94] mt-1">
                  Enter authorized administrator credentials to manage inquiries
                </p>
              </div>

              {authError && (
                <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#3A3F44] mb-1.5">
                    Username
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      placeholder="Enter username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D9DDE1] focus:border-[#3A3F44] focus:ring-2 focus:ring-[#3A3F44]/20 outline-none text-sm text-[#222222]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#3A3F44] mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                    <input
                      type="password"
                      required
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D9DDE1] focus:border-[#3A3F44] focus:ring-2 focus:ring-[#3A3F44]/20 outline-none text-sm text-[#222222]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl text-sm font-bold text-white bg-[#3A3F44] hover:bg-[#222222] shadow-md transition-all cursor-pointer active:scale-98"
                >
                  Log In to Admin Portal
                </button>
              </form>

              <div className="mt-6 pt-4 border-t border-[#EEF0F2] text-center text-[11px] text-[#8A8F94]">
                <span>TechWorks Security Protocol • Authorized Personnel Only</span>
              </div>
            </div>
          </div>
        ) : (
          /* Authenticated Dashboard - Clean & Responsive */
          <div className="flex-1 flex flex-col overflow-hidden bg-[#F9FAFB] relative">
            
            {/* Top Stat Bar */}
            <div className="bg-white border-b border-[#D9DDE1] px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shrink-0">
              
              <div className="flex items-center justify-between sm:justify-start gap-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#B8860B]" />
                  <span className="text-sm font-extrabold text-[#222222]">
                    Client Inquiries ({inquiries.length})
                  </span>
                </div>

                {/* Refresh Icon */}
                <button
                  onClick={loadData}
                  disabled={loading}
                  className="p-1.5 sm:p-2 rounded-lg bg-[#F5F6F7] hover:bg-[#EEF0F2] text-[#3A3F44] border border-[#D9DDE1] transition-colors cursor-pointer"
                  title="Refresh Inquiries from Supabase"
                >
                  <RefreshCw className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${loading ? 'animate-spin' : ''}`} />
                </button>
              </div>

              {/* Status Counters */}
              <div className="flex items-center gap-2 overflow-x-auto text-[11px] sm:text-xs font-semibold pb-1 sm:pb-0">
                <span className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 whitespace-nowrap">
                  {countNew} New
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 border border-blue-200 whitespace-nowrap">
                  {countContacted} Contacted
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-purple-50 text-purple-800 border border-purple-200 whitespace-nowrap">
                  {countInProgress} In Progress
                </span>
              </div>

            </div>

            {/* Error Notification Bar if Supabase Table/Policy issue exists */}
            {fetchError && (
              <div className="mx-4 sm:mx-6 mt-3 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between gap-2 shrink-0">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>
                    <strong>Database Notice:</strong> {fetchError}
                  </span>
                </div>
                <button
                  onClick={() => setFetchError(null)}
                  className="text-amber-800 hover:text-black font-bold text-xs"
                >
                  Dismiss
                </button>
              </div>
            )}

            {/* Inquiries Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden p-3 sm:p-6">
              
              {/* Search & Action Bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3 mb-3 sm:mb-4 shrink-0">
                <div className="relative flex-1 sm:max-w-xs">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Search name, phone, service..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#D9DDE1] bg-white text-xs text-[#222222] focus:border-[#3A3F44] outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 justify-between sm:justify-end">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="flex-1 sm:flex-initial px-3 py-2 rounded-xl border border-[#D9DDE1] bg-white text-xs font-semibold text-[#3A3F44] outline-none cursor-pointer"
                  >
                    <option value="all">All Statuses ({inquiries.length})</option>
                    <option value="new">New ({countNew})</option>
                    <option value="contacted">Contacted ({countContacted})</option>
                    <option value="in_progress">In Progress ({countInProgress})</option>
                    <option value="completed">Completed</option>
                  </select>

                  <button
                    onClick={exportToCSV}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-[#3A3F44] bg-white hover:bg-[#F5F6F7] border border-[#D9DDE1] transition-colors cursor-pointer shrink-0"
                    title="Export all submissions to CSV"
                  >
                    <Download className="w-3.5 h-3.5 text-[#B8860B]" />
                    <span className="hidden xs:inline">Export</span> CSV
                  </button>
                </div>
              </div>

              {/* Inquiries Container: Mobile Card List on small screens, Full Table on tablet/desktop */}
              <div className="flex-1 bg-white rounded-2xl border border-[#D9DDE1] overflow-hidden shadow-xs flex flex-col">
                {filteredInquiries.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                    <FileText className="w-12 h-12 text-gray-300 mb-3" />
                    <h4 className="text-base font-bold text-[#222222]">No Inquiries Yet</h4>
                    <p className="text-xs text-[#8A8F94] mt-1 max-w-sm">
                      {searchTerm 
                        ? 'No results matching your query.' 
                        : 'Any inquiry submitted from the website form will appear here live from Supabase.'}
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Mobile Card List (Visible only on < md screens) */}
                    <div className="md:hidden flex-1 overflow-y-auto divide-y divide-[#EEF0F2] p-2 space-y-2">
                      {filteredInquiries.map((inq) => (
                        <div 
                          key={inq.id}
                          onClick={() => {
                            setSelectedInquiry(inq);
                            setEditNotes(inq.admin_notes || '');
                          }}
                          className="p-3.5 rounded-xl bg-white hover:bg-[#F9FAFB] border border-[#EEF0F2] shadow-2xs active:bg-[#F5F6F7] transition-colors cursor-pointer"
                        >
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div>
                              <h5 className="font-bold text-sm text-[#222222]">{inq.name}</h5>
                              <div className="text-[11px] text-[#8A8F94] font-mono">
                                {new Date(inq.created_at).toLocaleDateString('en-IN', {
                                  month: 'short',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </div>
                            </div>
                            <span 
                              className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border shrink-0 ${
                                inq.status === 'new'
                                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                                  : inq.status === 'contacted'
                                  ? 'bg-blue-50 text-blue-800 border-blue-300'
                                  : inq.status === 'in_progress'
                                  ? 'bg-purple-50 text-purple-800 border-purple-300'
                                  : 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              }`}
                            >
                              {inq.status}
                            </span>
                          </div>

                          <div className="text-xs font-semibold text-[#3A3F44] mb-1.5 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B]"></span>
                            <span className="truncate">{inq.service}</span>
                          </div>

                          <p className="text-xs text-[#555555] line-clamp-2 mb-3 bg-[#F5F6F7] p-2 rounded-lg">
                            {inq.description}
                          </p>

                          <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#F5F6F7]" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center gap-2 text-xs">
                              <a 
                                href={`tel:${inq.phone}`} 
                                className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-[#3A3F44] hover:text-white text-gray-700 font-medium flex items-center gap-1 text-[11px]"
                              >
                                <Phone className="w-3 h-3 text-[#B8860B]" />
                                <span>Call</span>
                              </a>
                              <a 
                                href={`mailto:${inq.email}`} 
                                className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-[#3A3F44] hover:text-white text-gray-700 font-medium flex items-center gap-1 text-[11px]"
                              >
                                <Mail className="w-3 h-3 text-[#B8860B]" />
                                <span>Email</span>
                              </a>
                            </div>

                            <button
                              onClick={() => {
                                setSelectedInquiry(inq);
                                setEditNotes(inq.admin_notes || '');
                              }}
                              className="px-2.5 py-1 rounded-lg bg-[#3A3F44] text-white text-[11px] font-bold"
                            >
                              Manage
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Desktop & Tablet Full Table (Visible on md+) */}
                    <div className="hidden md:block overflow-x-auto flex-1">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead className="bg-[#F5F6F7] border-b border-[#EEF0F2] text-[#3A3F44] uppercase font-bold sticky top-0 z-10">
                          <tr>
                            <th className="py-3 px-4">Date</th>
                            <th className="py-3 px-4">Client Name</th>
                            <th className="py-3 px-4">Contact</th>
                            <th className="py-3 px-4">Service</th>
                            <th className="py-3 px-4">Kya Banwana Hai (Description)</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#EEF0F2]">
                          {filteredInquiries.map((inq) => (
                            <tr 
                              key={inq.id}
                              className="hover:bg-[#F9FAFB] transition-colors cursor-pointer"
                              onClick={() => {
                                setSelectedInquiry(inq);
                                setEditNotes(inq.admin_notes || '');
                              }}
                            >
                              <td className="py-3 px-4 whitespace-nowrap text-gray-500 font-mono text-[11px]">
                                {new Date(inq.created_at).toLocaleDateString('en-IN', {
                                  month: 'short',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </td>
                              <td className="py-3 px-4 font-bold text-[#222222] whitespace-nowrap">
                                {inq.name}
                              </td>
                              <td className="py-3 px-4 whitespace-nowrap">
                                <div className="flex flex-col gap-0.5">
                                  <a 
                                    href={`mailto:${inq.email}`} 
                                    onClick={(e) => e.stopPropagation()}
                                    className="text-gray-700 hover:text-[#B8860B] font-medium flex items-center gap-1"
                                  >
                                    <Mail className="w-3 h-3 text-gray-400" />
                                    <span>{inq.email}</span>
                                  </a>
                                  <a 
                                    href={`tel:${inq.phone}`} 
                                    onClick={(e) => e.stopPropagation()}
                                    className="text-gray-500 hover:text-[#222222] text-[11px] flex items-center gap-1"
                                  >
                                    <Phone className="w-3 h-3 text-gray-400" />
                                    <span>{inq.phone}</span>
                                  </a>
                                </div>
                              </td>
                              <td className="py-3 px-4 whitespace-nowrap font-medium text-[#3A3F44]">
                                <span className="px-2.5 py-1 rounded-md bg-[#F5F6F7] border border-[#EEF0F2]">
                                  {inq.service}
                                </span>
                              </td>
                              <td className="py-3 px-4 max-w-xs truncate text-[#555555]" title={inq.description}>
                                {inq.description}
                              </td>
                              <td className="py-3 px-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                                <select
                                  value={inq.status}
                                  onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                                  className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors outline-none cursor-pointer ${
                                    inq.status === 'new'
                                      ? 'bg-amber-50 text-amber-800 border-amber-300'
                                      : inq.status === 'contacted'
                                      ? 'bg-blue-50 text-blue-800 border-blue-300'
                                      : inq.status === 'in_progress'
                                      ? 'bg-purple-50 text-purple-800 border-purple-300'
                                      : 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                  }`}
                                >
                                  <option value="new">New</option>
                                  <option value="contacted">Contacted</option>
                                  <option value="in_progress">In Progress</option>
                                  <option value="completed">Completed</option>
                                </select>
                              </td>
                              <td className="py-3 px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                                <div className="flex items-center justify-end gap-2">
                                  <button
                                    onClick={() => {
                                      setSelectedInquiry(inq);
                                      setEditNotes(inq.admin_notes || '');
                                    }}
                                    className="p-1.5 rounded-lg bg-gray-100 hover:bg-[#3A3F44] hover:text-white text-gray-700 transition-colors"
                                    title="View & Edit Notes"
                                  >
                                    <Eye className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleDelete(inq.id)}
                                    className="p-1.5 rounded-lg bg-gray-100 hover:bg-red-600 hover:text-white text-gray-700 transition-colors cursor-pointer"
                                    title="Delete Inquiry"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </div>

              {/* Inquiry Detail Drawer / Modal */}
              {selectedInquiry && (
                <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs">
                  <div className="bg-white rounded-2xl sm:rounded-3xl max-w-lg w-full p-5 sm:p-7 border border-[#D9DDE1] shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between pb-3 border-b border-[#EEF0F2]">
                      <div>
                        <h4 className="text-base sm:text-lg font-extrabold text-[#222222]">
                          Inquiry: {selectedInquiry.name}
                        </h4>
                        <span className="text-[11px] text-[#8A8F94] font-mono">
                          {selectedInquiry.id}
                        </span>
                      </div>
                      <button
                        onClick={() => setSelectedInquiry(null)}
                        className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 cursor-pointer"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="space-y-3.5 text-xs">
                      {/* Status Selector */}
                      <div>
                        <label className="font-bold text-[#3A3F44] block mb-1">Current Status:</label>
                        <select
                          value={selectedInquiry.status}
                          onChange={(e) => handleStatusChange(selectedInquiry.id, e.target.value)}
                          className="w-full p-2.5 rounded-xl border border-[#D9DDE1] bg-white text-xs font-bold text-[#222222] outline-none"
                        >
                          <option value="new">New Lead</option>
                          <option value="contacted">Contacted</option>
                          <option value="in_progress">In Progress / Negotiation</option>
                          <option value="completed">Completed / Closed</option>
                        </select>
                      </div>

                      {/* Contact Channels */}
                      <div className="grid grid-cols-2 gap-2">
                        <a 
                          href={`tel:${selectedInquiry.phone}`} 
                          className="p-2.5 rounded-xl bg-gray-100 hover:bg-[#3A3F44] hover:text-white text-gray-800 font-semibold flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5 text-[#B8860B]" />
                          <span>Call Client</span>
                        </a>
                        <a 
                          href={`mailto:${selectedInquiry.email}`} 
                          className="p-2.5 rounded-xl bg-gray-100 hover:bg-[#3A3F44] hover:text-white text-gray-800 font-semibold flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5 text-[#B8860B]" />
                          <span>Email Client</span>
                        </a>
                      </div>

                      <div>
                        <span className="font-bold text-[#3A3F44] block mb-0.5">Service Requested:</span>
                        <div className="p-2 rounded-lg bg-[#F5F6F7] text-[#222222] font-semibold">
                          {selectedInquiry.service}
                        </div>
                      </div>

                      <div>
                        <span className="font-bold text-[#3A3F44] block mb-0.5">Contact Coordinates:</span>
                        <div className="text-gray-700">
                          <div><strong>Email:</strong> {selectedInquiry.email}</div>
                          <div><strong>Phone:</strong> {selectedInquiry.phone}</div>
                          <div><strong>Budget Range:</strong> {selectedInquiry.budget_range || 'Flexible'}</div>
                        </div>
                      </div>

                      <div>
                        <span className="font-bold text-[#3A3F44] block mb-1">
                          Project Description (Kya banwana hai):
                        </span>
                        <div className="p-3.5 rounded-xl bg-[#F5F6F7] border border-[#EEF0F2] text-[#444444] whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
                          {selectedInquiry.description}
                        </div>
                      </div>

                      {/* Admin Internal Notes */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-[#3A3F44]">Admin Follow-up Notes:</span>
                          {saveNoteSuccess && (
                            <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> Saved!
                            </span>
                          )}
                        </div>
                        <textarea
                          rows={3}
                          placeholder="Add internal notes (e.g. called client, sent quotation, scheduled call)..."
                          value={editNotes}
                          onChange={(e) => setEditNotes(e.target.value)}
                          className="w-full p-3 rounded-xl border border-[#D9DDE1] bg-white text-xs text-[#222222] outline-none focus:border-[#3A3F44]"
                        ></textarea>
                        <button
                          onClick={() => handleSaveNotes(selectedInquiry.id)}
                          className="mt-2 w-full py-2 rounded-xl bg-[#3A3F44] hover:bg-[#222222] text-white text-xs font-bold transition-colors cursor-pointer"
                        >
                          Save Notes
                        </button>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#EEF0F2] flex items-center justify-between">
                      <button
                        onClick={() => handleDelete(selectedInquiry.id)}
                        className="py-1.5 px-3 rounded-xl text-red-600 hover:bg-red-50 text-xs font-bold transition-colors"
                      >
                        Delete Record
                      </button>
                      <button
                        onClick={() => setSelectedInquiry(null)}
                        className="py-1.5 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-bold text-gray-700 cursor-pointer"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
