"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  CheckCheck,
  Edit3,
  Eye,
  FileText,
  ImageIcon,
  Lock,
  LogOut,
  Mail,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  Trash2,
  Upload,
  X,
} from "lucide-react";

type Question = {
  id: string;
  subject: string;
  topic: string;
  text: string;
  options: string[];
  answer: number;
  explanation: string;
  imageUrl?: string | null;
  deneme?: number;
  qnum?: number;
};

const SUBJECT_LIST = [
  "Tümü",
  "Coğrafya",
  "Tarih",
  "Türkçe",
  "Matematik",
  "Geometri",
  "Vatandaşlık",
  "Güncel Bilgiler",
];

const COGRAFYA_TOPICS = [
  "Türkiye'nin Coğrafi Konumu",
  "Türkiye'nin Fiziki Özellikleri",
  "Türkiye'nin İklimi ve Bitki Örtüsü",
  "Türkiye'de Nüfus ve Yerleşme",
  "Türkiye'de Tarım",
  "Türkiye'de Hayvancılık",
  "Türkiye'de Madenler ve Enerji",
  "Türkiye'de Sanayi",
  "Türkiye'de Ulaşım",
  "Türkiye'de Turizm",
  "Türkiye'nin Coğrafi Bölgeleri",
];

export default function AdminPage() {
  // Auth state
  const [authChecked, setAuthChecked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginBusy, setLoginBusy] = useState(false);

  // Question studio state
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("Tümü");
  const [filterHasImage, setFilterHasImage] = useState(false);
  const [filterFaulty, setFilterFaulty] = useState(false);
  const [showExplanations, setShowExplanations] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [notice, setNotice] = useState("");

  // Edit / Create modal state
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [isNewQuestion, setIsNewQuestion] = useState(false);
  const [editBusy, setEditBusy] = useState(false);
  const [uploadBusy, setUploadBusy] = useState(false);

  // Image lightbox preview
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const res = await fetch("/api/admin/auth");
      const data = await res.json();
      if (data.authenticated) {
        setIsAdmin(true);
        setAdminEmail(data.email || "Admin");
        loadQuestions();
      } else {
        setIsAdmin(false);
      }
    } catch {
      setIsAdmin(false);
    } finally {
      setAuthChecked(true);
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    setLoginBusy(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Giriş başarısız.");
      }

      setIsAdmin(true);
      setAdminEmail(data.email || loginEmail);
      setLoginPassword("");
      showNotice("Yönetici girişi başarılı.");
      loadQuestions();
    } catch (err: any) {
      setLoginError(err.message || "Giriş sırasında hata oluştu.");
    } finally {
      setLoginBusy(false);
    }
  }

  async function handleLogout() {
    try {
      await fetch("/api/admin/auth", { method: "DELETE" });
    } catch {
      // ignore
    }
    setIsAdmin(false);
    setQuestions([]);
    setSelectedIds([]);
    showNotice("Oturum kapatıldı.");
  }

  async function loadQuestions() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/questions");
      if (res.status === 401) {
        setIsAdmin(false);
        return;
      }
      const data = await res.json();
      if (data.questions) {
        setQuestions(data.questions);
      }
    } catch (err) {
      console.error(err);
      showNotice("Sorular yüklenirken hata oluştu.");
    } finally {
      setLoading(false);
    }
  }

  function showNotice(msg: string) {
    setNotice(msg);
    setTimeout(() => setNotice(""), 4000);
  }

  // Filtered list
  const filteredQuestions = questions.filter((q) => {
    if (selectedSubject !== "Tümü" && q.subject !== selectedSubject) return false;
    if (filterHasImage && !q.imageUrl) return false;
    if (filterFaulty) {
      const isFaulty =
        !q.text.trim() ||
        (Array.isArray(q.options) && q.options.length === 5 && q.options.join("") === "ABCDE") ||
        (Array.isArray(q.options) &&
          q.options.some(
            (o) => o.includes("Yukarıda verilen") || o.includes("aşağıdakilerden hangisi")
          ));
      if (!isFaulty) return false;
    }
    if (search) {
      const s = search.toLocaleLowerCase("tr");
      const combined = `${q.text} ${q.topic} ${q.subject} ${(q.options || []).join(" ")}`.toLocaleLowerCase("tr");
      if (!combined.includes(s)) return false;
    }
    return true;
  });

  // Stats
  const totalCount = questions.length;
  const cografyaCount = questions.filter((q) => q.subject === "Coğrafya").length;
  const imageCount = questions.filter((q) => Boolean(q.imageUrl)).length;

  // Single delete
  async function deleteQuestion(id: string) {
    if (!confirm("Bu soruyu ve varsa görselini silmek istediğine emin misin?")) return;
    try {
      const res = await fetch(`/api/admin/questions?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Silinemedi");
      showNotice("Soru ve görseli başarıyla silindi.");
      setQuestions((prev) => prev.filter((q) => q.id !== id));
      setSelectedIds((prev) => prev.filter((i) => i !== id));
    } catch (err) {
      alert("Soru silinirken hata oluştu.");
    }
  }

  // Multi select
  function toggleSelect(id: string) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }

  function toggleSelectAll() {
    const visibleIds = filteredQuestions.map((q) => q.id);
    const allSelected = visibleIds.length > 0 && visibleIds.every((id) => selectedIds.includes(id));
    if (allSelected) {
      setSelectedIds((prev) => prev.filter((id) => !visibleIds.includes(id)));
    } else {
      setSelectedIds((prev) => Array.from(new Set([...prev, ...visibleIds])));
    }
  }

  async function deleteSelectedQuestions() {
    if (!selectedIds.length) return;
    if (
      !confirm(
        `${selectedIds.length} adet soruyu ve görsellerini kalıcı olarak silmek istediğinize emin misiniz?`
      )
    )
      return;
    try {
      const res = await fetch("/api/admin/questions", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selectedIds }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Silinemedi");
      showNotice(`${data.deletedCount ?? selectedIds.length} soru ve görseli silindi.`);
      const delSet = new Set(selectedIds);
      setQuestions((prev) => prev.filter((q) => !delSet.has(q.id)));
      setSelectedIds([]);
    } catch (err: any) {
      alert(err.message || "Sorular silinirken bir hata oluştu.");
    }
  }

  // Open modal for editing
  function openEdit(q: Question) {
    setEditingQuestion({ ...q, options: [...q.options] });
    setIsNewQuestion(false);
  }

  function openCreate() {
    setEditingQuestion({
      id: `q_${Date.now()}`,
      subject: selectedSubject !== "Tümü" ? selectedSubject : "Coğrafya",
      topic: "Türkiye'nin Fiziki Özellikleri",
      text: "",
      options: ["", "", "", "", ""],
      answer: 0,
      explanation: "",
      imageUrl: null,
    });
    setIsNewQuestion(true);
  }

  async function saveQuestion() {
    if (!editingQuestion) return;
    if (!editingQuestion.text.trim()) {
      alert("Lütfen soru metnini girin.");
      return;
    }
    setEditBusy(true);
    try {
      const method = isNewQuestion ? "POST" : "PUT";
      const res = await fetch("/api/admin/questions", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingQuestion),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "İşlem başarısız.");

      showNotice(isNewQuestion ? "Yeni soru eklendi." : "Soru güncellendi.");
      setEditingQuestion(null);
      loadQuestions();
    } catch (err: any) {
      alert(err.message || "Kaydederken hata oluştu.");
    } finally {
      setEditBusy(false);
    }
  }

  async function handleImageUpload(
    e: React.ChangeEvent<HTMLInputElement>,
    targetCallback: (url: string) => void
  ) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadBusy(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Yükleme başarısız.");
      targetCallback(data.imageUrl);
      showNotice("Resim başarıyla yüklendi.");
    } catch (err: any) {
      alert(err.message || "Resim yüklenirken hata oluştu.");
    } finally {
      setUploadBusy(false);
      if (e.target) e.target.value = "";
    }
  }

  // Loading spinner during initial auth check
  if (!authChecked) {
    return (
      <div className="admin-login-screen">
        <RefreshCw size={28} className="spin" />
        <p>Yönetici paneli yükleniyor...</p>
      </div>
    );
  }

  // Not authenticated: Show Login Card
  if (!isAdmin) {
    return (
      <div className="admin-login-screen">
        <div className="admin-login-card">
          <div className="admin-login-header">
            <div className="admin-login-icon">
              <Lock size={28} />
            </div>
            <h2>Şahmat KPSS Yönetici Girişi</h2>
            <p>Soru havuzu ve panel yönetimi için giriş yapın.</p>
          </div>

          <form onSubmit={handleLogin} className="admin-login-form">
            {loginError && <div className="admin-login-error">{loginError}</div>}

            <div className="admin-input-group">
              <label>Yönetici E-Posta</label>
              <div className="admin-input-with-icon">
                <Mail size={16} />
                <input
                  type="email"
                  required
                  placeholder="admin@sahmatkpss.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  autoFocus
                />
              </div>
            </div>

            <div className="admin-input-group">
              <label>Şifre</label>
              <div className="admin-input-with-icon">
                <Lock size={16} />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>
            </div>

            <button type="submit" className="button primary full-width" disabled={loginBusy}>
              {loginBusy ? "Giriş Yapılıyor..." : "Giriş Yap"}
            </button>
          </form>

          <div className="admin-login-footer">
            <Link href="/" className="admin-return-link">
              <ArrowLeft size={14} /> Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated: Show Full Studio
  return (
    <div className="admin-container">
      {/* Header */}
      <header className="admin-header">
        <div className="admin-header-left">
          <Link href="/" className="admin-back-link" title="Ana sayfaya dön">
            <ArrowLeft size={16} />
            <span>Siteye Dön</span>
          </Link>
          <div className="admin-title-wrap">
            <h1>Soru Yönetim Stüdyosu</h1>
            <span className="admin-badge">Admin</span>
          </div>
        </div>

        <div className="admin-header-stats">
          <div className="admin-stat-chip">
            <span>Toplam Soru:</span>
            <strong>{totalCount}</strong>
          </div>
          <div className="admin-stat-chip highlight-chip">
            <span>Coğrafya:</span>
            <strong>{cografyaCount}</strong>
          </div>
          <div className="admin-stat-chip">
            <span>Görselli:</span>
            <strong>{imageCount}</strong>
          </div>
          <div className="admin-stat-chip admin-user-chip">
            <ShieldCheck size={14} />
            <span>{adminEmail}</span>
          </div>
          <button
            className="admin-logout-btn"
            onClick={handleLogout}
            title="Yönetici oturumunu kapat"
          >
            <LogOut size={15} />
            Çıkış Yap
          </button>
        </div>
      </header>

      {/* Notice toast */}
      {notice && (
        <div className="admin-toast">
          <Check size={16} />
          <span>{notice}</span>
        </div>
      )}

      {/* QUESTION LIST STUDIO */}
      <div className="admin-content-card">
        {/* Bulk Selection Sticky Bar */}
        {selectedIds.length > 0 && (
          <div className="admin-bulk-bar">
            <div className="admin-bulk-info">
              <CheckCheck size={18} />
              <span>
                <strong>{selectedIds.length}</strong> soru seçildi
              </span>
            </div>
            <div className="admin-bulk-actions">
              <button
                className="admin-bulk-del-btn"
                onClick={deleteSelectedQuestions}
              >
                <Trash2 size={16} />
                Seçilenleri Sil ({selectedIds.length})
              </button>
              <button
                className="admin-bulk-clear-btn"
                onClick={() => setSelectedIds([])}
              >
                <X size={15} />
                Seçimi Temizle
              </button>
            </div>
          </div>
        )}

        {/* Controls Bar */}
        <div className="admin-controls-bar">
          <div className="admin-search-wrap">
            <Search size={16} />
            <input
              type="text"
              placeholder="Soru metni, konu veya şık ara..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button className="clear-btn" onClick={() => setSearch("")}>
                <X size={14} />
              </button>
            )}
          </div>

          <div className="admin-filters-wrap">
            <label className="admin-checkbox-label master-select-label">
              <input
                type="checkbox"
                checked={
                  filteredQuestions.length > 0 &&
                  filteredQuestions.every((q) => selectedIds.includes(q.id))
                }
                onChange={toggleSelectAll}
              />
              <span>
                <strong>Tümünü Seç</strong> ({filteredQuestions.length})
              </span>
            </label>

            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="admin-select"
            >
              {SUBJECT_LIST.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <label className="admin-checkbox-label">
              <input
                type="checkbox"
                checked={filterHasImage}
                onChange={(e) => setFilterHasImage(e.target.checked)}
              />
              <span>Sadece Görselli</span>
            </label>

            <label
              className="admin-checkbox-label"
              title="Şıkları boş veya hatalı olan soruları listele"
            >
              <input
                type="checkbox"
                checked={filterFaulty}
                onChange={(e) => setFilterFaulty(e.target.checked)}
              />
              <span>Hatalı / Boş Şıklı</span>
            </label>

            <label
              className="admin-checkbox-label"
              title="Çözüm açıklamalarını göster/gizle"
            >
              <input
                type="checkbox"
                checked={showExplanations}
                onChange={(e) => setShowExplanations(e.target.checked)}
              />
              <span>Çözümleri Göster</span>
            </label>

            <button className="button primary admin-add-btn" onClick={openCreate}>
              <Plus size={16} />
              Yeni Soru Ekle
            </button>
          </div>
        </div>

        {/* Questions Grid */}
        {loading ? (
          <div className="admin-empty-state">
            <RefreshCw size={24} className="spin" />
            <p>Sorular yükleniyor...</p>
          </div>
        ) : filteredQuestions.length === 0 ? (
          <div className="admin-empty-state">
            <FileText size={32} />
            <p>Arama kriterlerine uygun soru bulunamadı.</p>
          </div>
        ) : (
          <div className="admin-questions-grid">
            {filteredQuestions.map((q, idx) => (
              <div
                key={q.id || idx}
                className={`admin-q-card ${selectedIds.includes(q.id) ? "selected" : ""}`}
              >
                <div className="admin-q-header">
                  <div className="admin-q-left-header">
                    <input
                      type="checkbox"
                      className="admin-card-checkbox"
                      checked={selectedIds.includes(q.id)}
                      onChange={() => toggleSelect(q.id)}
                      title="Soruyu seç"
                    />
                    <div className="admin-q-tags">
                      <span className="admin-subject-tag">{q.subject}</span>
                      <span className="admin-topic-tag">{q.topic}</span>
                      {q.imageUrl && (
                        <span
                          className="admin-image-tag"
                          onClick={() => setPreviewImage(q.imageUrl!)}
                        >
                          <ImageIcon size={12} /> Görsel
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="admin-q-actions">
                    <button
                      className="admin-icon-btn"
                      title="Düzenle"
                      onClick={() => openEdit(q)}
                    >
                      <Edit3 size={15} />
                    </button>
                    <button
                      className="admin-icon-btn danger"
                      title="Sil"
                      onClick={() => deleteQuestion(q.id)}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                {/* Optional Image Thumbnail */}
                {q.imageUrl && (
                  <div
                    className="admin-q-img-wrap"
                    onClick={() => setPreviewImage(q.imageUrl!)}
                  >
                    <img src={q.imageUrl} alt="Soru görseli" />
                    <div className="img-overlay">
                      <Eye size={16} />
                      <span>Büyüt</span>
                    </div>
                  </div>
                )}

                <p className="admin-q-text">{q.text}</p>

                <div className="admin-q-options">
                  {q.options?.map((opt, optIdx) => (
                    <div
                      key={optIdx}
                      className={`admin-q-opt ${q.answer === optIdx ? "correct" : ""}`}
                    >
                      <span className="opt-letter">{"ABCDE"[optIdx]}</span>
                      <span className="opt-val">{opt}</span>
                      {q.answer === optIdx && (
                        <Check size={14} className="opt-check" />
                      )}
                    </div>
                  ))}
                </div>

                {showExplanations && q.explanation && (
                  <div className="admin-q-exp">
                    <strong>Çözüm:</strong> {q.explanation}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit / Create Question Modal */}
      {editingQuestion && (
        <div className="admin-modal-backdrop" onClick={() => setEditingQuestion(null)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>{isNewQuestion ? "Yeni Soru Ekle" : "Soruyu Düzenle"}</h3>
              <button
                className="close-btn"
                onClick={() => setEditingQuestion(null)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="admin-modal-body">
              <div className="form-row">
                <div className="form-group flex-1">
                  <label>Ders</label>
                  <select
                    value={editingQuestion.subject}
                    onChange={(e) =>
                      setEditingQuestion({
                        ...editingQuestion,
                        subject: e.target.value,
                      })
                    }
                  >
                    {SUBJECT_LIST.filter((s) => s !== "Tümü").map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group flex-1">
                  <label>Konu</label>
                  {editingQuestion.subject === "Coğrafya" ? (
                    <select
                      value={editingQuestion.topic}
                      onChange={(e) =>
                        setEditingQuestion({
                          ...editingQuestion,
                          topic: e.target.value,
                        })
                      }
                    >
                      {COGRAFYA_TOPICS.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={editingQuestion.topic}
                      onChange={(e) =>
                        setEditingQuestion({
                          ...editingQuestion,
                          topic: e.target.value,
                        })
                      }
                    />
                  )}
                </div>
              </div>

              {/* Image upload */}
              <div className="form-group">
                <label>Soru Haritası / Görseli (İsteğe bağlı)</label>
                <div className="modal-img-manager">
                  {editingQuestion.imageUrl ? (
                    <div className="modal-img-preview-box">
                      <img
                        src={editingQuestion.imageUrl}
                        alt="Soru Görseli"
                      />
                      <button
                        type="button"
                        className="modal-img-remove-btn"
                        onClick={() =>
                          setEditingQuestion({
                            ...editingQuestion,
                            imageUrl: null,
                          })
                        }
                      >
                        <Trash2 size={13} /> Resmi Kaldır
                      </button>
                    </div>
                  ) : (
                    <div className="modal-img-placeholder">
                      <ImageIcon size={28} />
                      <p>Bu soruya henüz resim eklenmemiş</p>
                    </div>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) =>
                      handleImageUpload(e, (url) =>
                        setEditingQuestion({
                          ...editingQuestion,
                          imageUrl: url,
                        })
                      )
                    }
                  />

                  <button
                    type="button"
                    className="button secondary img-upload-btn"
                    disabled={uploadBusy}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload size={15} />
                    {uploadBusy ? "Yükleniyor..." : "Bilgisayardan Resim Seç"}
                  </button>
                </div>
              </div>

              {/* Text */}
              <div className="form-group">
                <label>Soru Metni</label>
                <textarea
                  rows={4}
                  value={editingQuestion.text}
                  onChange={(e) =>
                    setEditingQuestion({
                      ...editingQuestion,
                      text: e.target.value,
                    })
                  }
                  placeholder="Soru kökünü ve öncülleri buraya yazın..."
                />
              </div>

              {/* Options */}
              <div className="form-group">
                <label>Şıklar ve Doğru Cevap (Doğru şıkkı işaretleyin)</label>
                <div className="modal-options-list">
                  {editingQuestion.options.map((opt, optIdx) => (
                    <div
                      key={optIdx}
                      className={`modal-opt-item ${editingQuestion.answer === optIdx ? "selected-correct" : ""}`}
                    >
                      <button
                        type="button"
                        className="opt-correct-toggle"
                        title={
                          editingQuestion.answer === optIdx
                            ? "Doğru cevap"
                            : "Doğru cevap olarak ayarla"
                        }
                        onClick={() =>
                          setEditingQuestion({
                            ...editingQuestion,
                            answer: optIdx,
                          })
                        }
                      >
                        {"ABCDE"[optIdx]}
                      </button>
                      <input
                        type="text"
                        value={opt}
                        onChange={(e) => {
                          const nextOpts = [...editingQuestion.options];
                          nextOpts[optIdx] = e.target.value;
                          setEditingQuestion({
                            ...editingQuestion,
                            options: nextOpts,
                          });
                        }}
                        placeholder={`${"ABCDE"[optIdx]} şıkkı metni...`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Explanation (Optional) */}
              <div className="form-group">
                <label>Açıklama / Çözüm (İsteğe bağlı)</label>
                <textarea
                  rows={2}
                  value={editingQuestion.explanation}
                  onChange={(e) =>
                    setEditingQuestion({
                      ...editingQuestion,
                      explanation: e.target.value,
                    })
                  }
                  placeholder="İsteğe bağlı açıklama..."
                />
              </div>
            </div>

            <div className="admin-modal-footer">
              <button
                type="button"
                className="button secondary"
                onClick={() => setEditingQuestion(null)}
              >
                İptal
              </button>
              <button
                type="button"
                className="button primary"
                disabled={editBusy}
                onClick={saveQuestion}
              >
                {editBusy ? "Kaydediliyor..." : "Kaydet"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Lightbox Preview */}
      {previewImage && (
        <div className="admin-lightbox" onClick={() => setPreviewImage(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setPreviewImage(null)}>
              <X size={20} />
            </button>
            <img src={previewImage} alt="Büyük önizleme" />
          </div>
        </div>
      )}
    </div>
  );
}
