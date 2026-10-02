"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Bookmark,
  ChartNoAxesCombined,
  Check,
  CheckCheck,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Compass,
  Flame,
  GraduationCap,
  LayoutDashboard,
  Map,
  MapPin,
  Menu,
  Plus,
  Search,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
  X,
  RotateCcw,
  LogIn,
  Landmark,
  Calculator,
  Feather,
  Globe,
  Minus,
} from "lucide-react";
import QuizAdSlot from "@/components/QuizAdSlot";
import provinces from "@/data/provinces.json";
import {
  questions,
  mapQuestions,
  type Question,
  type Subject,
} from "@/data/questions";
import {
  geoMapQuestions,
  mapCategories,
  type MapCategory,
} from "@/data/map-questions";

type View = "home" | "courses" | "map" | "wrong" | "saved" | "stats";
type Attempt = { id: string; correct: boolean; date: string };
type Progress = { attempts: Attempt[]; saved: string[]; goal: number };
type AuthUser = { id: string; email: string; name: string | null };
const EMPTY: Progress = { attempts: [], saved: [], goal: 20 };
const subjects: {
  name: Subject;
  group: string;
  desc: string;
  icon: typeof BookOpen;
  color: string;
  topics: string[];
  questionCount: number;
}[] = [
  {
    name: "Türkçe", group: "GY", desc: "30 soru · Sözcükte anlamdan paragrafa.", icon: Feather, color: "purple", questionCount: 30,
    topics: ["Sözcükte Anlam","Cümlede Anlam","Paragrafta Anlam","Ses Bilgisi","Sözcüğün Yapısı","Sözcük Türleri","Fiilde Çatı","Cümlenin Ögeleri","Cümle Türleri","Yazım Kuralları","Noktalama İşaretleri","Anlatım Bozuklukları","Sözel Mantık"],
  },
  {
    name: "Matematik", group: "GY", desc: "27 soru · Sayılardan olasılığa.", icon: Calculator, color: "blue", questionCount: 27,
    topics: ["Sayılar","Rasyonel Sayılar","Üslü Sayılar","Köklü Sayılar","Bölme ve Bölünebilme","Basit Eşitsizlikler","Mutlak Değer","Denklemler","Çarpanlara Ayırma","Oran - Orantı","Sayı ve Kesir Problemleri","Yüzde Problemleri","Yaş ve Hareket Problemleri","İşlem","Fonksiyonlar","Kümeler","Permütasyon ve Kombinasyon","Olasılık","Grafik ve Tablo Yorumlama","Sayısal Mantık"],
  },
  {
    name: "Geometri", group: "GY", desc: "3 soru · Şekil ve uzay bilgisi.", icon: Calculator, color: "blue", questionCount: 3,
    topics: ["Üçgende Açılar","Özel Üçgenler","Dörtgenler","Çokgenler","Çember ve Daire","Analitik Geometri","Katı Cisimler"],
  },
  {
    name: "Tarih", group: "GK", desc: "27 soru · Hunlardan günümüze.", icon: Landmark, color: "orange", questionCount: 27,
    topics: ["İslamiyet Öncesi Türk Tarihi","İlk Türk-İslam Devletleri","Osmanlı Devleti Siyasi","Osmanlı Devleti Kültür ve Uygarlık","20. Yüzyılda Osmanlı Devleti","Kurtuluş Savaşı Hazırlık Dönemi","Kurtuluş Savaşı Cepheleri","Atatürk İnkılapları","Atatürk İlkeleri","Atatürk Dönemi İç ve Dış Politika","Çağdaş Türk ve Dünya Tarihi"],
  },
  {
    name: "Coğrafya", group: "GK", desc: "18 soru · Türkiye'yi keşfet.", icon: Globe, color: "green", questionCount: 18,
    topics: ["Türkiye'nin Coğrafi Konumu","Türkiye'nin Fiziki Özellikleri","Türkiye'nin İklimi ve Bitki Örtüsü","Türkiye'de Nüfus ve Yerleşme","Türkiye'de Tarım","Türkiye'de Hayvancılık","Türkiye'de Madenler ve Enerji","Türkiye'de Sanayi","Türkiye'de Ticaret","Türkiye'de Ulaşım","Türkiye'de Turizm","Türkiye'nin Coğrafi Bölgeleri"],
  },
  {
    name: "Vatandaşlık", group: "GK", desc: "9 soru · Hukuktan anayasaya.", icon: ShieldCheck, color: "rose", questionCount: 9,
    topics: ["Temel Hukuk Kavramları","Anayasal Kavramlar","Türk Anayasa Tarihi","Temel Hak ve Ödevler","Yasama","Yürütme","Yargı","İdare Hukuku"],
  },
  {
    name: "Güncel Bilgiler", group: "GK", desc: "6 soru · Dünyayı takip et.", icon: Sparkles, color: "gold", questionCount: 6,
    topics: ["Uluslararası Kuruluşlar","Türkiye'nin Dış Politikası","Güncel Olaylar","UNESCO Dünya Mirası","Spor","Kültür ve Sanat","Bilim ve Teknoloji","Ekonomi ve Projeler","Genel Kültür ve Güncel Bilgiler"],
  },
];
const navItems: { id: View; label: string; icon: typeof Map }[] = [
  { id: "home", label: "Çalışma alanım", icon: LayoutDashboard },
  { id: "courses", label: "Dersler & konular", icon: BookOpen },
  { id: "map", label: "Haritada keşfet", icon: Map },
  { id: "wrong", label: "Yanlışlarım", icon: RotateCcw },
  { id: "saved", label: "Kaydettiklerim", icon: Bookmark },
  { id: "stats", label: "İstatistiklerim", icon: ChartNoAxesCombined },
];

function TurkeyMap({
  selected,
  checked,
  correct,
  onSelect,
  compact = false,
}: {
  selected: number | null;
  checked: boolean;
  correct: number;
  onSelect: (id: number) => void;
  compact?: boolean;
}) {
  const [hover, setHover] = useState("");
  const [zoom, setZoom] = useState(1);
  const [labelPositions, setLabelPositions] = useState<
    Record<string, { x: number; y: number }>
  >({});
  const cityGroups = useRef<Record<string, SVGGElement | null>>({});

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const positions: Record<string, { x: number; y: number }> = {};
      provinces.forEach((city) => {
        const group = cityGroups.current[city.id];
        const path = group?.querySelector("path");
        if (!path) return;
        const box = path.getBBox();
        positions[city.id] = {
          x: box.x + box.width / 2,
          y: box.y + box.height / 2,
        };
      });
      setLabelPositions(positions);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [zoom]);
  return (
    <div className={`turkey-map ${compact ? "compact" : ""}`}>
      <span className="sea-label black-sea">K A R A D E N İ Z</span>
      <div className="map-scroll">
        <svg
          viewBox="0 100 1050 470"
          style={{ width: `${zoom * 100}%` }}
          aria-label="Türkiye il haritası"
        >
          {provinces.map((city) => (
            <g
              key={city.id}
              ref={(element) => {
                cityGroups.current[city.id] = element;
              }}
            >
              <path
                d={city.path}
                role="button"
                tabIndex={compact ? -1 : 0}
                aria-label={city.name}
                aria-pressed={selected === city.plateNumber}
                className={`${selected === city.plateNumber ? "selected" : ""} ${checked && correct === city.plateNumber ? "correct" : ""} ${checked && selected === city.plateNumber && selected !== correct ? "incorrect" : ""}`}
                onMouseEnter={() => setHover(city.name)}
                onMouseLeave={() => setHover("")}
                onFocus={() => setHover(city.name)}
                onBlur={() => setHover("")}
                onClick={() => onSelect(city.plateNumber)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelect(city.plateNumber);
                  }
                }}
              >
                <title>{city.name}</title>
              </path>
              {labelPositions[city.id] && (
                <text
                  x={labelPositions[city.id].x}
                  y={labelPositions[city.id].y}
                  className="plate-label"
                  aria-hidden="true"
                >
                  {String(city.plateNumber).padStart(2, "0")}
                </text>
              )}
            </g>
          ))}
        </svg>
      </div>
      <span className="sea-label mediterranean">A K D E N İ Z</span>
      <span className="map-hover">
        {hover ||
          (selected
            ? provinces.find((c) => c.plateNumber === selected)?.name
            : "Bir il seçerek keşfet")}
      </span>
      {!compact && (
        <div className="zoom-controls">
          <button
            aria-label="Haritayı yakınlaştır"
            onClick={() => setZoom(Math.min(2, zoom + 0.25))}
          >
            <Plus size={16} />
          </button>
          <button
            aria-label="Haritayı uzaklaştır"
            onClick={() => setZoom(Math.max(1, zoom - 0.25))}
          >
            <Minus size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

export default function Home({
  initialView,
}: {
  initialView?: View;
} = {}) {
  const router = useRouter();
  const pathname = usePathname();
  const [view, setView] = useState<View>(() => {
    if (initialView) return initialView;
    if (typeof window !== "undefined" && window.location.pathname === "/haritalar") {
      return "map";
    }
    return "home";
  });
  const [mapSearch, setMapSearch] = useState("");
  const [group, setGroup] = useState("Tümü");
  const [search, setSearch] = useState("");
  const [sidebar, setSidebar] = useState(false);
  const [progress, setProgress] = useState<Progress>(EMPTY);
  const [loaded, setLoaded] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const [modal, setModal] = useState<"account" | "goal" | "help" | "profile" | "subject" | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<typeof subjects[0] | null>(null);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [authName, setAuthName] = useState("");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authBusy, setAuthBusy] = useState(false);
  const [goalDraft, setGoalDraft] = useState(20);
  const [quiz, setQuiz] = useState<Question[] | null>(null);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<(number | null)[]>([]);
  const [quizRevealed, setQuizRevealed] = useState<boolean[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);
  const [mapIndex, setMapIndex] = useState(0);
  const [mapSelection, setMapSelection] = useState<number | null>(null);
  const [mapChecked, setMapChecked] = useState(false);
  const [mapCat, setMapCat] = useState<MapCategory | null>(null);
  const [mapCatActive, setMapCatActive] = useState(false);
  const [mapScore, setMapScore] = useState(0);
  const [mapTotal, setMapTotal] = useState(0);
  const [notice, setNotice] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const isDialogOpen = Boolean(modal || quiz);

  function openSubject(s: typeof subjects[0]) {
    setSelectedSubject(s);
    setModal("subject");
  }

  useEffect(() => {
    try {
      const raw = localStorage.getItem("sahmat-progress-v1");
      if (raw) {
        const p = JSON.parse(raw);
        if (
          Array.isArray(p.attempts) &&
          Array.isArray(p.saved) &&
          Number.isFinite(p.goal) &&
          p.goal >= 5 &&
          p.goal <= 100
        ) {
          setProgress({
            attempts: p.attempts.filter(
              (a: Attempt) =>
                typeof a.id === "string" &&
                typeof a.correct === "boolean" &&
                typeof a.date === "string",
            ),
            saved: p.saved.filter((s: unknown) => typeof s === "string"),
            goal: p.goal,
          });
        }
      }
    } catch {
      setStorageError(true);
    }
    setLoaded(true);
  }, []);
  useEffect(() => {
    fetch("/api/auth/me")
      .then((response) => response.json())
      .then((data) => setAuthUser(data.user ?? null))
      .catch(() => undefined);
  }, []);
  useEffect(() => {
    if (loaded) {
      try {
        localStorage.setItem("sahmat-progress-v1", JSON.stringify(progress));
      } catch {
        setStorageError(true);
      }
    }
  }, [progress, loaded]);
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(""), 4000);
    return () => clearTimeout(timer);
  }, [notice]);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (isDialogOpen && dialog) {
      lastFocus.current = document.activeElement as HTMLElement;
      dialog.showModal();
      document.body.style.overflow = "hidden";
    } else {
      dialog?.close();
      document.body.style.overflow = "";
      lastFocus.current?.focus();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDialogOpen]);

  useEffect(() => {
    if (quiz && quiz[quizIndex]) {
      try {
        const curQ = quiz[quizIndex];
        if (curQ.subject) {
          localStorage.setItem(`sahmat-last-qid-${curQ.subject}`, curQ.id);
        }
        localStorage.setItem("sahmat-last-qid-general", curQ.id);
      } catch {
        // ignore storage errors
      }
    }
  }, [quiz, quizIndex]);

  useEffect(() => {
    if (pathname === "/haritalar") {
      setView("map");
    }
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const v = params.get("view") as View | null;
      if (v && ["home", "courses", "map", "wrong", "saved", "stats"].includes(v)) {
        setView(v);
      }
      const catParam = params.get("kategori") as MapCategory | null;
      if (catParam && mapCategories.some((c) => c.id === catParam)) {
        setMapCat(catParam);
        setMapCatActive(true);
      }
      const q = params.get("q") || params.get("search");
      if (q) {
        setMapSearch(q);
      }
    }
  }, [pathname]);

  const now = new Date();
  const dayKey = (d: Date) =>
    `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
  const today = progress.attempts.filter(
    (a) => dayKey(new Date(a.date)) === dayKey(now),
  );
  const correctCount = progress.attempts.filter((a) => a.correct).length;
  const accuracy = progress.attempts.length
    ? Math.round((correctCount / progress.attempts.length) * 100)
    : 0;
  const latest = new globalThis.Map<string, Attempt>();
  progress.attempts.forEach((a) => latest.set(a.id, a));
  const wrongIds = [...latest.values()]
    .filter((a) => !a.correct)
    .map((a) => a.id);
  const wrongQuestions = questions.filter((q) => wrongIds.includes(q.id));
  const savedQuestions = questions.filter((q) => progress.saved.includes(q.id));
  const activeDays = new Set(
    progress.attempts.map((a) => dayKey(new Date(a.date))),
  );
  const goalPercent = Math.min(
    100,
    Math.round((today.length / progress.goal) * 100),
  );
  const visibleSubjects = subjects.filter(
    (s) =>
      (group === "Tümü" || s.group === group) &&
      `${s.name} ${s.topics.join(" ")}`
        .toLocaleLowerCase("tr")
        .includes(search.toLocaleLowerCase("tr")),
  );
  const currentMapLegacy = mapQuestions[mapIndex];
  const filteredMapQuestions = mapCat
    ? geoMapQuestions.filter((q) => q.category === mapCat)
    : geoMapQuestions;
  const currentGeoMap = filteredMapQuestions[mapIndex] ?? filteredMapQuestions[0];

  const matchingMapQuestions = mapSearch.trim()
    ? geoMapQuestions.filter((q) => {
        const query = mapSearch.trim().toLocaleLowerCase("tr");
        const prov = provinces.find((p) => p.plateNumber === q.answer);
        return (
          q.text.toLocaleLowerCase("tr").includes(query) ||
          q.explanation.toLocaleLowerCase("tr").includes(query) ||
          q.categoryLabel.toLocaleLowerCase("tr").includes(query) ||
          (prov && prov.name.toLocaleLowerCase("tr").includes(query))
        );
      })
    : [];

  function handleMapSearchChange(val: string) {
    setMapSearch(val);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (val.trim()) {
        url.searchParams.set("q", val.trim());
      } else {
        url.searchParams.delete("q");
        url.searchParams.delete("search");
      }
      window.history.replaceState(null, "", url.toString());
    }
  }

  const currentAnswer = quiz ? (quizAnswers[quizIndex] ?? null) : null;
  const isRevealed = quiz ? Boolean(quizRevealed[quizIndex]) : false;
  const sessionScore = quiz
    ? quiz.reduce((sum, q, idx) => {
        return sum + (quizRevealed[idx] && quizAnswers[idx] === q.answer ? 1 : 0);
      }, 0)
    : 0;

  function navigate(next: View) {
    if (next === "map") {
      if (pathname !== "/haritalar") {
        router.push("/haritalar");
      }
      setView("map");
      setSidebar(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (pathname === "/haritalar") {
      if (next === "home") {
        router.push("/");
      } else {
        router.push(`/?view=${next}`);
      }
      setView(next);
      setSidebar(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setView(next);
    setSidebar(false);
    setSearch("");
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (next === "home") {
        url.searchParams.delete("view");
      } else {
        url.searchParams.set("view", next);
      }
      window.history.replaceState(null, "", url.toString());
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function startQuiz(list: Question[], initialIndex?: number) {
    if (!list.length) {
      setNotice(
        "Bu dersin soru havuzu hazırlanıyor. Diğer dersleri deneyebilirsin.",
      );
      return;
    }
    setQuiz(list);
    let startIndex = 0;
    if (initialIndex !== undefined) {
      startIndex = Math.max(0, Math.min(initialIndex, list.length - 1));
    } else {
      const subj = list[0]?.subject;
      let foundIndex = -1;
      try {
        const savedQid = subj
          ? localStorage.getItem(`sahmat-last-qid-${subj}`)
          : localStorage.getItem("sahmat-last-qid-general");
        if (savedQid) {
          foundIndex = list.findIndex((q) => q.id === savedQid);
        }
      } catch {
        // ignore
      }

      if (foundIndex !== -1) {
        startIndex = foundIndex;
      } else {
        const answeredIds = new Set(progress.attempts.map((a) => a.id));
        const firstUnanswered = list.findIndex((q) => !answeredIds.has(q.id));
        if (firstUnanswered !== -1) {
          startIndex = firstUnanswered;
        }
      }
    }
    setQuizIndex(startIndex);

    // Prefill state for already attempted questions in this list
    const attemptMap = new globalThis.Map<string, boolean>();
    progress.attempts.forEach((a) => attemptMap.set(a.id, a.correct));

    const initialAnswers = list.map((q) => {
      if (attemptMap.has(q.id)) {
        return attemptMap.get(q.id) ? q.answer : null;
      }
      return null;
    });
    const initialRevealed = list.map((q) => attemptMap.has(q.id));

    setQuizAnswers(initialAnswers);
    setQuizRevealed(initialRevealed);
    setQuizFinished(false);
  }

  function startGeneralQuiz(count = 15) {
    const answeredIds = new Set(progress.attempts.map((a) => a.id));
    const unanswered = questions.filter((q) => !answeredIds.has(q.id));
    const pool = unanswered.length >= count ? unanswered : questions;
    const batch = pool.slice(0, count);
    startQuiz(batch, 0);
  }
  function record(id: string, correct: boolean) {
    setProgress((p) => ({
      ...p,
      attempts: [
        ...p.attempts,
        { id, correct, date: new Date().toISOString() },
      ],
    }));
  }
  function selectAnswer(index: number) {
    if (!quiz || quizRevealed[quizIndex]) return;
    setQuizAnswers((prev) => {
      const next = [...prev];
      next[quizIndex] = index;
      return next;
    });
  }
  function checkAnswer() {
    if (!quiz) return;
    const ans = quizAnswers[quizIndex];
    if (ans === null || ans === undefined || quizRevealed[quizIndex]) return;
    const ok = ans === quiz[quizIndex].answer;
    record(quiz[quizIndex].id, ok);
    setQuizRevealed((prev) => {
      const next = [...prev];
      next[quizIndex] = true;
      return next;
    });
  }
  function prevQuestion() {
    if (!quiz || quizIndex <= 0) return;
    setQuizIndex((i) => i - 1);
  }
  function nextQuestion() {
    if (!quiz) return;
    if (quizIndex + 1 >= quiz.length) {
      setQuizFinished(true);
      return;
    }
    setQuizIndex((i) => i + 1);
  }
  function toggleSave(id: string) {
    setProgress((p) => ({
      ...p,
      saved: p.saved.includes(id)
        ? p.saved.filter((s) => s !== id)
        : [...p.saved, id],
    }));
  }
  function checkMap() {
    if (mapSelection === null || mapChecked) return;
    if (mapCatActive && currentGeoMap) {
      record(currentGeoMap.id, mapSelection === currentGeoMap.answer);
      setMapTotal((t) => t + 1);
      if (mapSelection === currentGeoMap.answer) setMapScore((s) => s + 1);
    } else {
      record(currentMapLegacy.id, mapSelection === currentMapLegacy.answer);
    }
    setMapChecked(true);
  }
  function nextMap() {
    if (mapCatActive) {
      if (mapIndex + 1 >= filteredMapQuestions.length) {
        // finished all questions in category
        setMapIndex(0);
        setMapSelection(null);
        setMapChecked(false);
        setMapCatActive(false);
        return;
      }
      setMapIndex((i) => i + 1);
    } else {
      setMapIndex((i) => (i + 1) % mapQuestions.length);
    }
    setMapSelection(null);
    setMapChecked(false);
  }
  function startMapCategory(cat: MapCategory, initialIndex = 0) {
    setMapCat(cat);
    setMapCatActive(true);
    setMapIndex(initialIndex);
    setMapSelection(null);
    setMapChecked(false);
    setMapScore(0);
    setMapTotal(0);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("kategori", cat);
      window.history.replaceState(null, "", url.toString());
    }
  }
  function backToCategories() {
    setMapCatActive(false);
    setMapCat(null);
    setMapIndex(0);
    setMapSelection(null);
    setMapChecked(false);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("kategori");
      window.history.replaceState(null, "", url.toString());
    }
  }
  function closeDialog() {
    setModal(null);
    setQuiz(null);
    setQuizAnswers([]);
    setQuizRevealed([]);
    setAuthError("");
  }
  function openAccount(mode: "login" | "register" = "login") {
    setAuthMode(mode);
    setAuthError("");
    setModal("account");
  }
  async function submitAuth(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAuthBusy(true);
    setAuthError("");
    try {
      const response = await fetch(`/api/auth/${authMode === "login" ? "login" : "register"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: authName, email: authEmail, password: authPassword }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "İşlem tamamlanamadı.");
      setAuthUser(data.user);
      setAuthPassword("");
      closeDialog();
      setNotice(authMode === "login" ? "Tekrar hoş geldin." : "Hesabın oluşturuldu. Artık ilerlemen hesabına bağlı.");
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : "İşlem tamamlanamadı.");
    } finally {
      setAuthBusy(false);
    }
  }
  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => undefined);
    setAuthUser(null);
    setNotice("Oturumun kapatıldı. Misafir olarak devam edebilirsin.");
  }

  const courseSection = (
    <section className="courses-section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">BİLGİNİ HAMLEYE DÖNÜŞTÜR</span>
          <h2>
            {view === "courses"
              ? "Dersler & konular"
              : "Bugün hangi dersten başlayalım?"}
          </h2>
        </div>
        {view === "home" && (
          <button className="text-button" onClick={() => navigate("courses")}>
            Tüm dersler <ArrowUpRight size={16} />
          </button>
        )}
      </div>
      <div className="course-filter" role="group" aria-label="Ders grubu">
        <button
          className={group === "Tümü" ? "active" : ""}
          onClick={() => setGroup("Tümü")}
        >
          Tüm dersler
        </button>
        <button
          className={group === "GY" ? "active" : ""}
          onClick={() => setGroup("GY")}
        >
          Genel Yetenek <span>GY</span>
        </button>
        <button
          className={group === "GK" ? "active" : ""}
          onClick={() => setGroup("GK")}
        >
          Genel Kültür <span>GK</span>
        </button>
        <span className="course-count">
          {visibleSubjects.length} ders seni bekliyor
        </span>
      </div>
      <div className="course-grid">
        {visibleSubjects.map((s) => {
          const Icon = s.icon;
          const list = questions.filter((q) => q.subject === s.name);
          const solved = list.filter((q) => latest.has(q.id)).length;
          return (
            <article
              className={`course-card ${s.color} clickable`}
              key={s.name}
              role="button"
              tabIndex={0}
              aria-label={`${s.name} konularını görüntüle`}
              onClick={() => openSubject(s)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openSubject(s); } }}
            >
              <div className="course-top">
                <div className="subject-icon">
                  <Icon size={23} strokeWidth={1.7} />
                </div>
                <span className="group-tag">{s.group}</span>
              </div>
              <h3>{s.name}</h3>
              <p>{s.desc}</p>
              <div className="course-meta">
                {`${s.topics.length} konu · ${list.length} soru`}
              </div>
              <div className="course-progress">
                <span
                  style={{
                    width: `${list.length ? (solved / list.length) * 100 : 0}%`,
                  }}
                />
              </div>
              <div className="course-bottom">
                <small>
                  {solved
                    ? `${solved} / ${list.length} soru çözüldü`
                    : "Konulara göz at"}
                </small>
                <span className="card-arrow"><ChevronRight size={18} /></span>
              </div>
            </article>
          );
        })}
      </div>
      {!visibleSubjects.length && (
        <div className="empty-state">
          <Search />
          <h3>Aradığın dersi bulamadık.</h3>
          <p>Başka bir ders veya konu adıyla tekrar dene.</p>
          <button
            className="button secondary"
            onClick={() => {
              setSearch("");
              setGroup("Tümü");
            }}
          >
            Filtreleri temizle
          </button>
        </div>
      )}
    </section>
  );

  return (
    <div className="app-shell">
      {sidebar && (
        <div className="sidebar-backdrop" onClick={() => setSidebar(false)} />
      )}
      <aside
        className={`sidebar ${sidebar ? "open" : ""}`}
        aria-label="Ana menü"
      >
        <button
          className="brand"
          onClick={() => navigate("home")}
          aria-label="Şahmat KPSS ana sayfa"
        >
          <span className="brand-mark">♞</span>
          <span>
            şahmat<span className="brand-sub">K P S S</span>
          </span>
        </button>
        <div className="workspace-label">SENİN ÇALIŞMA ALANIN</div>
        <nav>
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={`nav-item ${view === id ? "active" : ""}`}
              onClick={() => navigate(id)}
              aria-current={view === id ? "page" : undefined}
            >
              <Icon size={19} strokeWidth={1.7} />
              <span>{label}</span>
              {id === "map" && <span className="new-tag">YENİ</span>}
              {id === "wrong" && wrongIds.length > 0 && (
                <span className="nav-count">{wrongIds.length}</span>
              )}
            </button>
          ))}
        </nav>
        <div className="sidebar-note">
          <span className="mini-knight">♞</span>
          <p>
            Büyük hedefler,
            <br />
            <strong>küçük hamlelerle başlar.</strong>
          </p>
          <div className="note-line" />
        </div>
        <div className="sidebar-bottom">
          <button className="help-button" onClick={() => setModal("help")}>
            <CircleHelp size={18} />
            Nasıl çalışır?
            <ArrowUpRight size={14} />
          </button>
          <button className="guest-profile" onClick={() => authUser ? setModal("profile") : openAccount("login")}>
            <span className="avatar">{authUser?.name?.slice(0, 1).toUpperCase() || "M"}</span>
            <span>
              <strong>{authUser?.name || "Misafir öğrenci"}</strong>
              <small>{authUser ? authUser.email : "Hesabına giriş yap"}</small>
            </span>
            <ChevronRight size={16} />
          </button>
        </div>
      </aside>
      <div className="main-shell">
        <header className="topbar">
          <div className="breadcrumb">
            <button
              className="mobile-menu icon-button"
              aria-label="Menüyü aç"
              onClick={() => setSidebar(true)}
            >
              <Menu size={23} />
            </button>
            <span>Çalışma alanı</span>
            <ChevronRight size={13} />
            <strong>{navItems.find((n) => n.id === view)?.label}</strong>
          </div>
          <div className="top-actions">
            <label className="search-field">
              <Search size={17} />
              <input
                value={view === "map" ? mapSearch : search}
                onChange={(e) => {
                  if (view === "map") {
                    handleMapSearchChange(e.target.value);
                    if (mapCatActive) {
                      setMapCatActive(false);
                      setMapCat(null);
                    }
                  } else {
                    setSearch(e.target.value);
                    if (view !== "home" && view !== "courses") setView("courses");
                  }
                }}
                placeholder={
                  view === "map"
                    ? "Göl, dağ, ova, plato, nehir ara..."
                    : "Ders veya konu ara..."
                }
                aria-label={
                  view === "map"
                    ? "Göl, dağ, ova, plato, nehir ara"
                    : "Ders veya konu ara"
                }
              />
              {view === "map" && mapSearch ? (
                <button
                  type="button"
                  onClick={() => handleMapSearchChange("")}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "inherit", padding: 0 }}
                  aria-label="Aramayı temizle"
                >
                  ✕
                </button>
              ) : (
                <span>⌕</span>
              )}
            </label>
            <button className="login-button" onClick={() => authUser ? logout() : openAccount("login")}>
              <LogIn size={16} />
              {authUser ? "Çıkış yap" : "Giriş yap"}
            </button>
            <span className="top-avatar">{authUser?.name?.slice(0, 1).toUpperCase() || "M"}</span>
          </div>
        </header>
        <main id="main-content">
          <div className="page-intro">
            <div>
              <div className="intro-kicker">
                <span className="status-dot" /> BUGÜN, HEDEFİNE BİR ADIM DAHA
              </div>
              <h1>
                {view === "home" ? (
                  <>
                    Hoş geldin, <span>geleceğin kazananı.</span>
                    <span className="greeting-spark">✳</span>
                  </>
                ) : (
                  navItems.find((n) => n.id === view)?.label
                )}
              </h1>
              <p>
                {view === "home"
                  ? "Küçük bir adım, doğru bir hamle. Bugünkü yolculuğun burada başlıyor."
                  : view === "map"
                    ? "Ezberlemenin ötesine geç. Bilgini Türkiye haritası üzerinde keşfet."
                    : view === "stats"
                      ? "Attığın her adım burada. İlerlemeni kendi sonuçlarınla takip et."
                      : view === "wrong"
                        ? "Her yanlış, öğrenmek için yeni bir fırsat."
                        : view === "saved"
                          ? "Tekrar dönmek istediğin sorular, bir arada."
                          : "Hedefine giden yolu seç. Bir ders, bir konu, yeni bir başlangıç."}
              </p>
            </div>
            <div className="guest-pill">
              <span />
              <span>
                {authUser ? `${authUser.name || "Üye"} olarak giriş yapıldı` : "Misafir modu"}<small>{authUser ? "İlerlemen hesabına bağlı" : "İlerlemen bu cihazda"}</small>
              </span>
            </div>
          </div>
          {storageError && (
            <div className="storage-warning" role="status">
              Tarayıcı depolamasına erişilemiyor. İlerlemen yalnızca bu sayfa
              açıkken korunacak.
            </div>
          )}

          {view === "home" && (
            <>
              <div className="hero-grid">
                <section className="hero-card">
                  <div className="hero-content">
                    <div className="hero-label">
                      <span /> HER HAMLE BİR ADIM İLERİ
                    </div>
                    <h2>
                      Hedefin belli.
                      <br />
                      Sıradaki hamle <em>senin.</em>
                    </h2>
                    <p>
                      Konuları keşfet, sorularla pekiştir.
                      <br />
                      KPSS yolculuğunda kendi oyununu kur.
                    </p>
                    <button
                      className="button cream"
                      onClick={() => startGeneralQuiz(15)}
                    >
                      Hemen soru çöz <ArrowUpRight size={17} />
                    </button>
                    <div className="hero-foot">
                      <CheckCheck size={15} />
                      Üyelik gerektirmez. Bir soruyla başla.
                    </div>
                  </div>
                  <div className="chess-art" aria-hidden="true">
                    <div className="orbit orbit-one" />
                    <div className="orbit orbit-two" />
                    <span className="art-star star-one">✧</span>
                    <span className="art-star star-two">✦</span>
                    <div className="chess-board" />
                    <span className="chess-shadow" />
                    <span className="big-knight">♞</span>
                    <span className="little-pawn">♟</span>
                    <div className="floating-label">
                      <TrendingUp size={16} />
                      Bir hamle daha ileri
                    </div>
                  </div>
                </section>
                <section className="goal-card">
                  <div className="card-heading">
                    <div>
                      <Target size={19} />
                      <h3>Günlük hedefin</h3>
                    </div>
                    <button
                      className="icon-button"
                      aria-label="Günlük hedefi düzenle"
                      onClick={() => {
                        setGoalDraft(progress.goal);
                        setModal("goal");
                      }}
                    >
                      <Settings2 size={17} />
                    </button>
                  </div>
                  <div
                    className="goal-ring"
                    style={{
                      background: `conic-gradient(#315c4c ${goalPercent}%, #eeeee8 0)`,
                    }}
                  >
                    <div>
                      <span>
                        <strong>{today.length}</strong>
                        <small> / {progress.goal}</small>
                      </span>
                      <p>soru çözüldü</p>
                    </div>
                    <span className="ring-spark">
                      <Sparkles size={17} />
                    </span>
                  </div>
                  <h4>
                    {goalPercent === 100
                      ? "Bugünün hedefi tamam!"
                      : today.length
                        ? "Güzel bir başlangıç yaptın!"
                        : "İlk hamleni yapmaya hazır mısın?"}
                  </h4>
                  <p>
                    {goalPercent === 100
                      ? "Her adım seni hedefine yaklaştırıyor."
                      : "Her soru, hedefine bir adım daha."}
                  </p>
                  <div className="goal-divider" />
                  <div className="goal-footer">
                    <span>
                      <Flame size={16} /> Bugünkü doğru sayın
                    </span>
                    <strong>
                      {today.filter((a) => a.correct).length} <span>soru</span>
                    </strong>
                  </div>
                </section>
              </div>
              <div className="stats-row">
                <div>
                  <span className="stat-icon sage">
                    <CheckCheck size={20} />
                  </span>
                  <div>
                    <span>Çözülen soru</span>
                    <strong>
                      {progress.attempts.length}
                      <small>toplam hamle</small>
                    </strong>
                  </div>
                </div>
                <div>
                  <span className="stat-icon lilac">
                    <Target size={20} />
                  </span>
                  <div>
                    <span>Doğruluk oranı</span>
                    <strong>
                      {progress.attempts.length ? `%${accuracy}` : "—"}
                      <small>
                        {progress.attempts.length
                          ? "çözümlerine göre"
                          : "ilk soruyla başlar"}
                      </small>
                    </strong>
                  </div>
                </div>
                <div>
                  <span className="stat-icon peach">
                    <Flame size={20} />
                  </span>
                  <div>
                    <span>Çalıştığın gün</span>
                    <strong>
                      {activeDays.size}
                      <small>her gün bir adım</small>
                    </strong>
                  </div>
                </div>
                <div>
                  <span className="stat-icon sand">
                    <Bookmark size={20} />
                  </span>
                  <div>
                    <span>Kaydedilen soru</span>
                    <strong>
                      {progress.saved.length}
                      <small>tekrar için hazır</small>
                    </strong>
                  </div>
                </div>
              </div>
            </>
          )}

          {(view === "home" || view === "courses") && courseSection}

          {view === "home" && (
            <div className="discovery-grid">
              <section className="map-promo">
                <div className="map-promo-copy">
                  <span className="feature-tag">
                    <Compass size={13} /> ÖĞRENMENİN YENİ BİR YOLU
                  </span>
                  <h2>Bilgini haritaya taşı.</h2>
                  <p>
                    Antik kentlerden dağlara, Türkiye’yi
                    <br />
                    soru soru keşfet.
                  </p>
                  <button
                    className="text-button"
                    onClick={() => navigate("map")}
                  >
                    Haritada keşfe çık <ArrowRight size={16} />
                  </button>
                </div>
                <div className="map-promo-image">
                  <TurkeyMap
                    selected={null}
                    checked={false}
                    correct={27}
                    onSelect={(id) => {
                      setMapIndex(0);
                      setMapChecked(false);
                      setMapSelection(id);
                      navigate("map");
                    }}
                    compact
                  />
                  <span className="map-floating-pin">
                    <MapPin size={19} />
                  </span>
                </div>
              </section>
              <section className="tip-card">
                <span className="tip-label">
                  <span>✧</span> KÜÇÜK BİR HATIRLATMA
                </span>
                <blockquote>
                  “Önemli olan herkesten
                  <br />
                  iyi olmak değil, dünden
                  <br />
                  <em>daha iyi olmak.</em>”
                </blockquote>
                <span className="tip-bottom">
                  Kendi hızında. Kendi yolunda.<span>↗</span>
                </span>
              </section>
            </div>
          )}

          {view === "map" && !mapCatActive && (
            <section className="map-categories-section">
              <div className="section-heading" style={{ flexWrap: "wrap", gap: "16px", alignItems: "flex-end" }}>
                <div>
                  <span className="eyebrow">COĞRAFİ BİLGİNİ TEST ET</span>
                  <h2>Kategori seç veya haritada ara.</h2>
                </div>
                <div className="map-search-wrap">
                  <Search size={17} />
                  <input
                    type="text"
                    value={mapSearch}
                    onChange={(e) => handleMapSearchChange(e.target.value)}
                    placeholder="Göl, dağ, ova, plato, nehir, baraj veya il ara... (örn: Abant, Nemrut, Meriç)"
                    className="map-search-input"
                  />
                  {mapSearch && (
                    <button
                      className="map-search-clear"
                      onClick={() => handleMapSearchChange("")}
                      aria-label="Aramayı temizle"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {mapSearch.trim() ? (
                <div className="map-search-results">
                  <div className="map-search-results-head">
                    <span>"{mapSearch}" araması için {matchingMapQuestions.length} soru bulundu</span>
                    <button className="text-button" onClick={() => handleMapSearchChange("")}>
                      Aramayı temizle
                    </button>
                  </div>
                  {matchingMapQuestions.length === 0 ? (
                    <div className="empty-state" style={{ padding: "40px 20px" }}>
                      <Search />
                      <h3>Eşleşen coğrafi yer bulunamadı.</h3>
                      <p>Farklı bir göl, dağ, ova, plato veya il adı deneyebilirsin.</p>
                      <button className="button secondary" onClick={() => handleMapSearchChange("")}>
                        Tüm kategorileri göster
                      </button>
                    </div>
                  ) : (
                    <div className="map-search-results-grid">
                      {matchingMapQuestions.map((q) => {
                        const cat = mapCategories.find((c) => c.id === q.category);
                        const prov = provinces.find((p) => p.plateNumber === q.answer);
                        return (
                          <div key={q.id} className="map-search-card">
                            <div className="map-search-card-top">
                              <span
                                className="map-search-card-tag"
                                style={{ "--cat-color": cat?.color } as React.CSSProperties}
                              >
                                <span>{cat?.emoji}</span> {q.categoryLabel}
                              </span>
                              <span className="map-search-prov-badge">
                                📍 {prov?.name ?? `İl: ${q.answer}`}
                              </span>
                            </div>
                            <h4>{q.text}</h4>
                            <p>{q.explanation}</p>
                            <button
                              className="button primary small"
                              onClick={() => {
                                const catList = geoMapQuestions.filter((item) => item.category === q.category);
                                const idx = catList.findIndex((item) => item.id === q.id);
                                startMapCategory(q.category, idx >= 0 ? idx : 0);
                              }}
                            >
                              Haritada Çöz
                              <ArrowRight size={14} />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : (
                <div className="map-cat-grid">
                  {mapCategories.map((cat) => {
                    const catQuestions = geoMapQuestions.filter(
                      (q) => q.category === cat.id,
                    );
                    const answeredIds = new Set(
                      progress.attempts.map((a) => a.id),
                    );
                    const answered = catQuestions.filter((q) =>
                      answeredIds.has(q.id),
                    ).length;
                    return (
                      <button
                        key={cat.id}
                        className="map-cat-card"
                        style={
                          {
                            "--cat-color": cat.color,
                          } as React.CSSProperties
                        }
                        onClick={() => startMapCategory(cat.id)}
                      >
                        <span className="map-cat-emoji">{cat.emoji}</span>
                        <strong>{cat.label}</strong>
                        <p>{cat.desc}</p>
                        <span className="map-cat-count">
                          {answered}/{catQuestions.length} çözüldü
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </section>
          )}

          {view === "map" && mapCatActive && currentGeoMap && (
            <section className="map-workspace">
              <div className="map-question-head">
                <button
                  className="map-back-btn"
                  onClick={backToCategories}
                >
                  <ArrowLeft size={16} />
                  Kategoriler
                </button>
                <span className="feature-tag" style={{ "--cat-color": mapCategories.find((c) => c.id === mapCat)?.color } as React.CSSProperties}>
                  <span>{mapCategories.find((c) => c.id === mapCat)?.emoji}</span>
                  {currentGeoMap.categoryLabel}
                </span>
                <span>
                  {mapIndex + 1} / {filteredMapQuestions.length}
                </span>
              </div>

              <div className="map-score-bar">
                <span className="map-score-correct">{mapScore} doğru</span>
                <span className="map-score-total">{mapTotal} çözüldü</span>
                <div className="map-progress-track">
                  <div
                    className="map-progress-fill"
                    style={{
                      width: `${((mapIndex + (mapChecked ? 1 : 0)) / filteredMapQuestions.length) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <h2>{currentGeoMap.text}</h2>
              <p>
                Haritadaki il sınırlarına tıkla, ardından cevabını kontrol et.
              </p>
              <TurkeyMap
                selected={mapSelection}
                checked={mapChecked}
                correct={currentGeoMap.answer}
                onSelect={(id) => {
                  if (!mapChecked) setMapSelection(id);
                }}
              />
              <div className="map-answer-bar">
                <label>
                  Seçimin
                  <select
                    aria-label="İl seç"
                    disabled={mapChecked}
                    value={mapSelection ?? ""}
                    onChange={(e) =>
                      setMapSelection(
                        e.target.value ? Number(e.target.value) : null,
                      )
                    }
                  >
                    <option value="">Haritadan veya listeden seç</option>
                    {[...provinces]
                      .sort((a, b) => a.name.localeCompare(b.name, "tr"))
                      .map((c) => (
                        <option key={c.id} value={c.plateNumber}>
                          {c.name}
                        </option>
                      ))}
                  </select>
                </label>
                {!mapChecked ? (
                  <button
                    className="button primary"
                    disabled={mapSelection === null}
                    onClick={checkMap}
                  >
                    Kontrol et
                    <Check size={17} />
                  </button>
                ) : (
                  <button className="button primary" onClick={nextMap}>
                    {mapIndex + 1 >= filteredMapQuestions.length
                      ? "Kategorilere dön"
                      : "Sonraki soru"}
                    <ArrowRight size={17} />
                  </button>
                )}
              </div>
              {mapChecked && (
                <div
                  className={`answer-explanation ${mapSelection === currentGeoMap.answer ? "right" : "wrong"}`}
                  role="status"
                >
                  <strong>
                    {mapSelection === currentGeoMap.answer
                      ? "Doğru hamle!"
                      : `Doğru cevap: ${provinces.find((c) => c.plateNumber === currentGeoMap.answer)?.name}`}
                  </strong>
                  <p>{currentGeoMap.explanation}</p>
                </div>
              )}
              <p className="map-credit">
                Günümüz il sınırları · Harita verisi:{" "}
                <a
                  href="https://github.com/erdigokce/turkey-map-react"
                  target="_blank"
                  rel="noreferrer"
                >
                  turkey-map-react
                </a>{" "}
                ·{" "}
                <a href="/map-LICENSE.txt" target="_blank" rel="noreferrer">
                  MIT lisansı
                </a>
              </p>
            </section>
          )}

          {(view === "wrong" || view === "saved") && (
            <section className="collection-panel">
              {(view === "wrong" ? wrongQuestions : savedQuestions).length >
              0 ? (
                <>
                  <div className="section-heading">
                    <h2>
                      {view === "wrong"
                        ? wrongQuestions.length
                        : savedQuestions.length}{" "}
                      soru seni bekliyor
                    </h2>
                    <button
                      className="button primary"
                      onClick={() =>
                        startQuiz(
                          view === "wrong" ? wrongQuestions : savedQuestions,
                        )
                      }
                    >
                      Tekrar çöz
                      <ArrowRight size={16} />
                    </button>
                  </div>
                  {(view === "wrong" ? wrongQuestions : savedQuestions).map(
                    (q) => (
                      <button
                        className="question-row"
                        key={q.id}
                        onClick={() => startQuiz([q])}
                      >
                        <span className="question-row-icon">
                          <BookOpen size={20} />
                        </span>
                        <span>
                          <small>
                            {q.subject} · {q.topic}
                          </small>
                          <strong>{q.text}</strong>
                        </span>
                        <ChevronRight size={18} />
                      </button>
                    ),
                  )}
                </>
              ) : (
                <div className="empty-state">
                  {view === "wrong" ? <CheckCheck /> : <Bookmark />}
                  <h2>
                    {view === "wrong"
                      ? "Yeni bir sayfa, temiz bir başlangıç."
                      : "Güzel soruları sonraya sakla."}
                  </h2>
                  <p>
                    {view === "wrong"
                      ? "Yanlış cevapladığın sorular burada görünecek. Doğru çözdüğünde bu listeden kalkacak."
                      : "Soru ekranındaki yer imi simgesine dokun; tekrar etmek istediğin soruları burada bul."}
                  </p>
                  <button
                    className="button primary"
                    onClick={() => startGeneralQuiz(15)}
                  >
                    Soru çözmeye başla
                    <ArrowRight size={17} />
                  </button>
                </div>
              )}
              {view === "wrong" &&
                mapQuestions.some((q) => wrongIds.includes(q.id)) && (
                  <div className="map-wrong-list">
                    <h3>Haritada tekrar et</h3>
                    {mapQuestions
                      .filter((q) => wrongIds.includes(q.id))
                      .map((q) => (
                        <button
                          className="question-row"
                          key={q.id}
                          onClick={() => {
                            setMapIndex(
                              mapQuestions.findIndex((m) => m.id === q.id),
                            );
                            setMapSelection(null);
                            setMapChecked(false);
                            navigate("map");
                          }}
                        >
                          <MapPin size={20} />
                          <span>
                            <strong>{q.text}</strong>
                          </span>
                          <ChevronRight size={18} />
                        </button>
                      ))}
                  </div>
                )}
            </section>
          )}

          {view === "stats" && (
            <section className="statistics-panel">
              <div className="stats-summary">
                <div>
                  <span>Toplam çözüm</span>
                  <strong>{progress.attempts.length}</strong>
                </div>
                <div>
                  <span>Doğru cevap</span>
                  <strong>{correctCount}</strong>
                </div>
                <div>
                  <span>Doğruluk</span>
                  <strong>
                    {progress.attempts.length ? `%${accuracy}` : "—"}
                  </strong>
                </div>
              </div>
              <h2>Derslere göre ilerlemen</h2>
              {subjects
                .filter((s) => s.topics.length)
                .map((s) => {
                  const ids = questions
                    .filter((q) => q.subject === s.name)
                    .map((q) => q.id);
                  const attempts = progress.attempts.filter((a) =>
                    ids.includes(a.id),
                  );
                  const right = attempts.filter((a) => a.correct).length;
                  return (
                    <div className="subject-stat" key={s.name}>
                      <span>{s.name}</span>
                      <div className="course-progress">
                        <span
                          style={{
                            width: `${attempts.length ? (right / attempts.length) * 100 : 0}%`,
                          }}
                        />
                      </div>
                      <small>
                        {right} doğru / {attempts.length} çözüm
                      </small>
                    </div>
                  );
                })}
              <p className="muted">
                İstatistikler bu tarayıcıdaki örnek soru çözümlerine dayanır.
                Harita çözümleri toplam sayılara dahildir.
              </p>
            </section>
          )}

          <footer className="page-footer">
            <span>
              <span className="footer-knight">♞</span> şahmat kpss{" "}
              <span className="footer-dot">·</span> Bir sonraki hamlen,
              geleceğin.
            </span>
            <span>
              İlk bakış sürümü <span className="footer-dot">·</span> Örnek soru
              havuzu
            </span>
          </footer>
        </main>
      </div>
      {notice && (
        <div className="toast" role="status">
          <CircleHelp size={18} />
          {notice}
          <button aria-label="Bildirimi kapat" onClick={() => setNotice("")}>
            <X size={16} />
          </button>
        </div>
      )}
      <dialog
        ref={dialogRef}
        className={`modal ${quiz ? "quiz-modal" : ""} ${quiz && !quizFinished ? `quiz-active ${quiz[quizIndex].imageContainsQuestion ? "quiz-image-mode" : ""}` : ""}`}
        onCancel={closeDialog}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeDialog();
        }}
        aria-labelledby="dialog-title"
      >
        <div className="modal-inner">
          <button
            className="modal-close icon-button"
            aria-label="Pencereyi kapat"
            onClick={closeDialog}
          >
            <X size={21} />
          </button>
          {modal === "account" && (
            <>
              <div className="modal-symbol">
                <GraduationCap size={30} />
              </div>
              <span className="eyebrow">ŞAHMAT KPSS HESABI</span>
              <h2 id="dialog-title">
                {authMode === "login" ? "Tekrar hoş geldin." : "Kendi hesabını oluştur."}
              </h2>
              <p>{authMode === "login" ? "İlerlemeni farklı cihazlarda da sürdürmek için giriş yap." : "Soru geçmişin ve hedeflerin hesabına bağlı kalsın."}</p>
              <form className="auth-form" onSubmit={submitAuth}>
                {authMode === "register" && <label>Ad soyad<input required minLength={2} maxLength={80} autoComplete="name" value={authName} onChange={(e) => setAuthName(e.target.value)} placeholder="Örn. Mustafa Özkaya" /></label>}
                <label>E-posta<input required type="email" autoComplete="email" value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} placeholder="ornek@mail.com" /></label>
                <label>Şifre<input required minLength={8} type="password" autoComplete={authMode === "login" ? "current-password" : "new-password"} value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} placeholder="En az 8 karakter" /></label>
                {authError && <div className="auth-error" role="alert">{authError}</div>}
                <button className="button primary full-width" disabled={authBusy}>{authBusy ? "Bekleyin..." : authMode === "login" ? "Giriş yap" : "Ücretsiz hesap oluştur"}<ArrowRight size={17} /></button>
              </form>
              <div className="auth-switch">{authMode === "login" ? "Henüz hesabın yok mu?" : "Zaten hesabın var mı?"}<button onClick={() => { setAuthMode(authMode === "login" ? "register" : "login"); setAuthError(""); }}>{authMode === "login" ? "Kayıt ol" : "Giriş yap"}</button></div>
              <div className="honest-note"><strong>Misafir olarak da devam edebilirsin.</strong><p>Hesap açmadan soru çözme ve harita çalışmalarını bu cihazda kullanabilirsin.</p></div>
            </>
          )}
          {modal === "profile" && authUser && (
            <>
              <div className="modal-symbol">
                <span style={{ fontSize: "2.2rem", fontWeight: 700, lineHeight: 1 }}>{authUser.name?.slice(0, 1).toUpperCase() || "?"}</span>
              </div>
              <span className="eyebrow">HESABIM</span>
              <h2 id="dialog-title" style={{ marginBottom: "0.25rem" }}>{authUser.name || "Kullanıcı"}</h2>
              <p style={{ color: "var(--muted)", marginBottom: "1.5rem", fontSize: "0.9rem" }}>{authUser.email}</p>
              <div className="honest-note" style={{ marginBottom: "1.25rem" }}>
                <strong>İlerleme bilgilerin</strong>
                <p>Toplam çözüm: <strong>{progress.attempts.length}</strong> · Doğruluk: <strong>{progress.attempts.length ? `%${accuracy}` : "—"}</strong> · Aktif gün: <strong>{activeDays.size}</strong></p>
              </div>
              <button
                className="button primary full-width"
                onClick={() => { closeDialog(); logout(); }}
                style={{ background: "hsl(0 65% 50%)", marginTop: "0.5rem" }}
              >
                Oturumu kapat
                <ArrowRight size={17} />
              </button>
              <button className="button secondary full-width" style={{ marginTop: "0.75rem" }} onClick={closeDialog}>
                Kapat
              </button>
            </>
          )}
          {modal === "subject" && selectedSubject && (() => {
            const subList = questions.filter((q) => q.subject === selectedSubject.name);
            const SubIcon = selectedSubject.icon;
            return (
              <>
                <div className={`subject-modal-header ${selectedSubject.color}`}>
                  <div className="subject-modal-icon"><SubIcon size={26} strokeWidth={1.7} /></div>
                  <div>
                    <span className="eyebrow">{selectedSubject.group} · {subList.length} KPSS sorusu</span>
                    <h2 id="dialog-title">{selectedSubject.name}</h2>
                  </div>
                </div>
                <button
                  className="topic-all-btn"
                  style={{ width: "100%", marginBottom: "8px" }}
                  onClick={() => { closeDialog(); startQuiz(subList); }}
                >
                  <BookOpen size={15} />
                  Tüm {selectedSubject.name} Sorularını Çöz ({subList.length} Soru)
                  <ArrowRight size={14} style={{ marginLeft: "auto" }} />
                </button>
                {selectedSubject.topics.length > 0 && (
                  <>
                    <div className="topic-divider" style={{ marginTop: "4px" }}>Konuya Göre Çalış</div>
                    <div className="subject-topic-grid">
                      {selectedSubject.topics.map((t) => {
                        const count = subList.filter((q) => q.topic === t).length;
                        return (
                          <button
                            key={t}
                            className="subject-topic-btn"
                            onClick={() => { closeDialog(); startQuiz(subList.filter((q) => q.topic === t)); }}
                          >
                            <span>{t}</span>
                            <span style={{ fontSize: "11px", color: "var(--muted)", fontWeight: 600, marginLeft: "auto", marginRight: "6px" }}>
                              {count} soru
                            </span>
                            <ChevronRight size={13} />
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}
                {selectedSubject.topics.length === 0 && (
                  <p style={{ color: "var(--muted)", fontSize: "13px", textAlign: "center", marginTop: "12px" }}>
                    Bu ders için soru havuzu hazırlanıyor.
                  </p>
                )}
              </>
            );
          })()}

          {modal === "help" && (
            <>
              <div className="modal-symbol">
                <Compass size={28} />
              </div>
              <h2 id="dialog-title">Kendi yolunda, üç küçük adım.</h2>
              <div className="help-steps">
                <p>
                  <strong>01 · Dersini seç</strong>GK veya GY derslerinden
                  birine gir. İstersen doğrudan haritada keşfe çık.
                </p>
                <p>
                  <strong>02 · Bilgini dene</strong>Cevabını seçip kontrol et.
                  Açıklamayı oku, önemli soruları kaydet.
                </p>
                <p>
                  <strong>03 · Bir adım daha at</strong>Yanlışlarına geri dön,
                  günlük hedefine ilerle. Sonuçların bu tarayıcıda saklanır.
                </p>
              </div>
              <QuizAdSlot />
              <button
                className="button primary full-width"
                onClick={closeDialog}
              >
                Hazırım
                <ArrowRight size={17} />
              </button>
            </>
          )}
          {modal === "goal" && (
            <>
              <div className="modal-symbol">
                <Target size={28} />
              </div>
              <h2 id="dialog-title">Her gün küçük bir hedef.</h2>
              <p>
                Sürdürebileceğin bir hedef seç. Dilediğin zaman
                değiştirebilirsin.
              </p>
              <label className="goal-input">
                Günlük soru hedefi
                <input
                  type="number"
                  min={5}
                  max={100}
                  step={5}
                  value={goalDraft}
                  onChange={(e) => setGoalDraft(Number(e.target.value))}
                />
              </label>
              <div className="goal-presets">
                {[10, 20, 30, 50].map((n) => (
                  <button
                    key={n}
                    className={goalDraft === n ? "selected" : ""}
                    onClick={() => setGoalDraft(n)}
                  >
                    {n} soru
                  </button>
                ))}
              </div>
              <button
                className="button primary full-width"
                disabled={
                  !Number.isInteger(goalDraft) ||
                  goalDraft < 5 ||
                  goalDraft > 100
                }
                onClick={() => {
                  setProgress((p) => ({ ...p, goal: goalDraft }));
                  closeDialog();
                }}
              >
                Hedefimi kaydet
                <Check size={17} />
              </button>
              <small className="muted">
                5–100 arasında bir hedef belirleyebilirsin.
              </small>
            </>
          )}
          {quiz && !quizFinished && (
            <>
              <div className="quiz-meta">
                <span className="feature-tag">{quiz[quizIndex].subject}</span>
                <div className="quiz-nav-counter">
                  <button
                    type="button"
                    className="quiz-counter-btn"
                    onClick={prevQuestion}
                    disabled={quizIndex === 0}
                    title="Önceki soru"
                    aria-label="Önceki soru"
                  >
                    <ChevronLeft size={15} />
                  </button>
                  <span className="quiz-counter-text">
                    {quizIndex + 1} / {quiz.length} soru
                  </span>
                  <button
                    type="button"
                    className="quiz-counter-btn"
                    onClick={nextQuestion}
                    title={quizIndex + 1 === quiz.length ? "Sonuçları gör" : "Sonraki soru"}
                    aria-label="Sonraki soru"
                  >
                    <ChevronRight size={15} />
                  </button>
                </div>
              </div>
              <div className="quiz-progress">
                <span
                  style={{ width: `${((quizIndex + 1) / quiz.length) * 100}%` }}
                />
              </div>

              <div className="quiz-topic">
                <span>{quiz[quizIndex].topic} · Soru {quizIndex + 1}</span>
                <button
                  className={`icon-button ${progress.saved.includes(quiz[quizIndex].id) ? "bookmarked" : ""}`}
                  aria-label={
                    progress.saved.includes(quiz[quizIndex].id)
                      ? "Kaydı kaldır"
                      : "Soruyu kaydet"
                  }
                  onClick={() => toggleSave(quiz[quizIndex].id)}
                >
                  <Bookmark
                    size={20}
                    fill={
                      progress.saved.includes(quiz[quizIndex].id)
                        ? "currentColor"
                        : "none"
                    }
                  />
                </button>
              </div>
              <div className="quiz-reading" key={quiz[quizIndex].id}>
              <div className="quiz-stem" key={`stem-${quiz[quizIndex].id}`} tabIndex={0} role="region" aria-label="Soru metni">
                <h2 id="dialog-title" className={`question-text ${quiz[quizIndex].imageContainsQuestion ? "sr-only" : ""}`}>
                  {quiz[quizIndex].text}
                </h2>
                {quiz[quizIndex].imageUrl && (
                  <div className={`quiz-question-img-wrap ${quiz[quizIndex].imageContainsQuestion ? "full-question-image" : ""}`}>
                    <img 
                      src={quiz[quizIndex].imageUrl} 
                      alt={quiz[quizIndex].imageContainsQuestion ? `${quiz[quizIndex].text}: soru ve A–E şıkları` : "Soru görseli"} 
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (target && target.parentElement) {
                          target.parentElement.style.display = 'none';
                        }
                      }}
                    />
                    <a href={quiz[quizIndex].imageUrl} target="_blank" rel="noopener noreferrer">Görseli büyüt</a>
                  </div>
                )}
              </div>
              <div key={`options-${quiz[quizIndex].id}`} className={`answer-options ${quiz[quizIndex].imageContainsQuestion ? "image-answer-options" : ""}`}>
                {quiz[quizIndex].options.map((o, i) => (
                  <button
                    key={o}
                    disabled={isRevealed}
                    aria-pressed={currentAnswer === i}
                    aria-label={quiz[quizIndex].imageContainsQuestion ? `${"ABCDE"[i]} seçeneği` : undefined}
                    className={`${currentAnswer === i ? "selected" : ""} ${isRevealed && i === quiz[quizIndex].answer ? "correct" : ""} ${isRevealed && i === currentAnswer && currentAnswer !== quiz[quizIndex].answer ? "incorrect" : ""}`}
                    onClick={() => selectAnswer(i)}
                  >
                    <span>{"ABCDE"[i]}</span>
                    {!quiz[quizIndex].imageContainsQuestion && o}
                    {isRevealed && i === quiz[quizIndex].answer && (
                      <Check size={18} />
                    )}
                    {isRevealed && i === currentAnswer && currentAnswer !== quiz[quizIndex].answer && (
                      <X size={18} />
                    )}
                  </button>
                ))}
              </div>
              </div>
              <div className="quiz-footer">
              {isRevealed && <p className="quiz-feedback" role="status">{currentAnswer === quiz[quizIndex].answer ? "Doğru cevap!" : `Doğru cevap: ${"ABCDE"[quiz[quizIndex].answer]}`}</p>}
              <div className="quiz-actions-bar">
                <button
                  type="button"
                  className="button secondary quiz-nav-btn"
                  onClick={prevQuestion}
                  disabled={quizIndex === 0}
                >
                  <ArrowLeft size={16} />
                  Önceki
                </button>

                <div className="quiz-actions-center">
                  {!isRevealed ? (
                    <button
                      type="button"
                      className="button primary quiz-check-btn"
                      disabled={currentAnswer === null}
                      onClick={checkAnswer}
                    >
                      Kontrol et
                      <Check size={16} />
                    </button>
                  ) : null}
                </div>

                <button
                  type="button"
                  className={`button ${isRevealed ? "primary" : "secondary"} quiz-nav-btn`}
                  onClick={nextQuestion}
                >
                  {quizIndex + 1 === quiz.length
                    ? "Sonuçları gör"
                    : isRevealed
                    ? "Sonraki soru"
                    : "İleri"}
                  <ArrowRight size={16} />
                </button>
              </div>
              </div>
            </>
          )}
          {quiz && quizFinished && (
            <div className="quiz-result">
              <div className="modal-symbol">
                <Trophy size={34} />
              </div>
              <span className="eyebrow">BİR ADIM DAHA İLERİ</span>
              <h2 id="dialog-title">Güzel bir hamle yaptın.</h2>
              <p>Bu çalışmada {quiz.length} sorudan {quizRevealed.filter(Boolean).length} tanesini tamamladın.</p>
              <div className="result-score">
                <strong>
                  {sessionScore}
                  <small> / {quiz.length}</small>
                </strong>
                <span>doğru cevap</span>
              </div>
              <p>
                {sessionScore === quiz.length
                  ? "Tebrikler! Hepsi doğru! Yeni bir derste kendini deneyebilirsin."
                  : "Açıklamaları tekrar okumak öğrenmeni pekiştirir. Yanlışların çalışma alanında seni bekliyor."}
              </p>
              <button
                className="button primary full-width"
                onClick={closeDialog}
              >
                Çalışma alanına dön
                <ArrowRight size={17} />
              </button>
              <QuizAdSlot />
            </div>
          )}
        </div>
      </dialog>
    </div>
  );
}
