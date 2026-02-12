import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart, Music, Quote, Sparkles, Moon, Sun, Coffee,
  Flame, ArrowLeft, X, Menu,
  Infinity as InfinityIcon,
  Smile, Eye, Shield, Headphones,
  ChevronUp
} from "lucide-react";

// =============================================
// SECTION DATA
// =============================================
interface TileData {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  gradient: string;
  bgGlow: string;
  iconBg: string;
  description: string;
}

const sectionTiles: TileData[] = [
  { id: "reasons", emoji: "💕", title: "Why I Love You", subtitle: "Every reason my heart beats for you", gradient: "from-pink-500 to-rose-600", bgGlow: "bg-pink-500", iconBg: "from-pink-500/20 to-rose-500/20", description: "9 reasons my heart chose you — each one more true than the last. You deserve to know them all." },
  { id: "story", emoji: "📖", title: "Our Story", subtitle: "15 chapters that changed everything", gradient: "from-purple-500 to-indigo-600", bgGlow: "bg-purple-500", iconBg: "from-purple-500/20 to-indigo-500/20", description: "15 handwritten chapters of our journey — from the first meeting to forever. Every single word is real." },
  { id: "memories", emoji: "📸", title: "Memory Lane", subtitle: "Golden moments I hold close", gradient: "from-amber-500 to-orange-600", bgGlow: "bg-amber-500", iconBg: "from-amber-500/20 to-orange-500/20", description: "Golden moments that live inside my heart. Each one sparkles brighter when I think of you." },
  { id: "playlist", emoji: "🎵", title: "Songs I Cried To", subtitle: "30 melodies soaked in tears & longing", gradient: "from-violet-500 to-purple-600", bgGlow: "bg-violet-500", iconBg: "from-violet-500/20 to-purple-500/20", description: "30 songs I listened to when missing you hurt so much. Every lyric felt written about us." },
  { id: "dreamboy", emoji: "👨", title: "Design Your Dream Boy", subtitle: "Create him exactly how you want", gradient: "from-blue-500 to-cyan-600", bgGlow: "bg-blue-500", iconBg: "from-blue-500/20 to-cyan-500/20", description: "I want to know everything about the person you'd love. Every trait, every detail, every preference. Help me understand what makes your heart skip a beat." },
  { id: "knowyou", emoji: "💝", title: "Let Me Know You", subtitle: "Every little thing about you", gradient: "from-rose-500 to-pink-600", bgGlow: "bg-rose-500", iconBg: "from-rose-500/20 to-pink-500/20", description: "Tell me everything about you — your likes, dreams, preferences, everything. I want to know you deeper than anyone ever has." },
  { id: "promises", emoji: "🤞", title: "My Promises", subtitle: "Vows written on my soul", gradient: "from-emerald-500 to-teal-600", bgGlow: "bg-emerald-500", iconBg: "from-emerald-500/20 to-teal-500/20", description: "10 promises carved into my soul. These aren't just words — they're my commitment to you forever." },
  { id: "compliments", emoji: "👑", title: "You Are...", subtitle: "Words that don't do you justice", gradient: "from-fuchsia-500 to-pink-600", bgGlow: "bg-fuchsia-500", iconBg: "from-fuchsia-500/20 to-pink-500/20", description: "8 words that describe you — but honestly, no word is enough for someone as special as you." },
  { id: "lovefacts", emoji: "🧠", title: "Love Facts", subtitle: "Science proves we're meant to be", gradient: "from-cyan-500 to-blue-600", bgGlow: "bg-cyan-500", iconBg: "from-cyan-500/20 to-blue-500/20", description: "20 fascinating scientific facts about love. Turns out, science agrees — we're meant to be together." },
  { id: "quiz", emoji: "💝", title: "Love Quiz", subtitle: "Test how well you know us", gradient: "from-red-500 to-rose-600", bgGlow: "bg-red-500", iconBg: "from-red-500/20 to-rose-500/20", description: "A fun little game for us! 5 questions to see how well you know our love story." },
  { id: "quotes", emoji: "💬", title: "Love Quotes", subtitle: "Poets who understand our hearts", gradient: "from-teal-500 to-emerald-600", bgGlow: "bg-teal-500", iconBg: "from-teal-500/20 to-emerald-500/20", description: "6 beautiful love quotes from poets and dreamers — but none compare to what I feel." },
  { id: "forever", emoji: "♾️", title: "Forever & Always", subtitle: "My eternal promise to you", gradient: "from-glow-pink to-glow-purple", bgGlow: "bg-glow-pink", iconBg: "from-glow-pink/20 to-glow-purple/20", description: "My final message to you. The one that says it all. Open it and see. 💖" },
];

// =============================================
// TYPEWRITER HOOK
// =============================================
function useTypewriter(texts: string[], speed = 80, pause = 2000) {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentText.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
        if (charIndex + 1 === currentText.length) {
          setTimeout(() => setIsDeleting(true), pause);
        }
      } else {
        setDisplayText(currentText.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
        if (charIndex <= 1) {
          setIsDeleting(false);
          setTextIndex((t) => (t + 1) % texts.length);
        }
      }
    }, isDeleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, texts, speed, pause]);

  return displayText;
}

// =============================================
// FLOATING NAVIGATION BUTTON
// =============================================
function FloatingNav({ onOpenSection, currentSection, onBack }: {
  onOpenSection: (id: string) => void;
  currentSection: string | null;
  onBack: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: "spring" }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[60] w-14 h-14 rounded-full bg-gradient-to-br from-glow-pink to-glow-purple flex items-center justify-center shadow-[0_0_30px_rgba(255,45,138,0.4)] hover:shadow-[0_0_50px_rgba(255,45,138,0.6)] hover:scale-110 active:scale-95 transition-all duration-300"
      >
        <Menu className="w-5 h-5 text-white" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] bg-dark-950/95 backdrop-blur-2xl"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {currentSection && (
              <button
                onClick={() => { onBack(); setIsOpen(false); }}
                className="absolute top-6 left-6 px-5 py-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-white/60 hover:text-white hover:bg-white/10 transition-all z-10 text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Home
              </button>
            )}

            <div className="h-full overflow-y-auto py-20 px-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-center mb-8">
                <Heart className="w-8 h-8 text-glow-pink fill-glow-pink mx-auto mb-3 animate-heartbeat" />
                <h2 className="text-2xl font-bold bg-gradient-to-r from-glow-pink to-glow-purple bg-clip-text text-transparent">
                  Explore Our World
                </h2>
              </motion.div>

              <div className="max-w-lg mx-auto grid grid-cols-2 gap-3">
                {sectionTiles.map((tile, i) => (
                  <motion.button
                    key={tile.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    onClick={() => { onOpenSection(tile.id); setIsOpen(false); }}
                    className={`relative p-5 rounded-2xl border text-left transition-all duration-300 group overflow-hidden ${
                      currentSection === tile.id
                        ? "border-glow-pink/30 bg-glow-pink/10"
                        : "border-white/[0.06] bg-white/[0.03] hover:border-white/15 hover:bg-white/[0.06]"
                    }`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${tile.gradient} opacity-0 group-hover:opacity-[0.08] transition-opacity duration-500`} />
                    <span className="text-3xl block mb-2 relative z-10">{tile.emoji}</span>
                    <h3 className="text-sm font-semibold text-white/90 relative z-10">{tile.title}</h3>
                    <p className="text-[10px] text-white/30 mt-0.5 relative z-10">{tile.subtitle}</p>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// =============================================
// STARFIELD COMPONENT
// =============================================
function Starfield() {
  const stars = useMemo(() =>
    Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      delay: Math.random() * 6,
      dur: 2 + Math.random() * 4,
    })), []
  );

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.dur}s`,
          }}
        />
      ))}
    </div>
  );
}

// =============================================
// TILE HOMEPAGE — IMMERSIVE REDESIGN
// =============================================
function TileHomepage({ onOpenSection }: { onOpenSection: (id: string) => void }) {
  const typewriterText = useTypewriter([
    "You are my everything 💕",
    "Tumse hi toh zindagi hai ✨",
    "I love you more every day 💖",
    "Tum mere liye special ho 🌹",
    "You make my world beautiful 🌍",
    "Bas tum ho meri duniya 💗",
  ], 70, 2500);

  return (
    <div className="min-h-screen bg-[#030306] relative overflow-hidden">
      {/* ===== STARFIELD ===== */}
      <Starfield />

      {/* ===== AURORA / NORTHERN LIGHTS ===== */}
      <div className="absolute top-0 left-0 right-0 h-[70vh] pointer-events-none overflow-hidden z-[1]">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[300px] bg-gradient-to-r from-pink-500/[0.07] via-rose-500/[0.05] to-transparent rounded-full blur-[100px] animate-[aurora_15s_ease-in-out_infinite]" />
        <div className="absolute top-[-10%] left-[20%] w-[50%] h-[250px] bg-gradient-to-r from-purple-500/[0.06] via-violet-500/[0.04] to-transparent rounded-full blur-[120px] animate-[aurora_18s_ease-in-out_infinite_2s]" />
        <div className="absolute top-[5%] right-[-5%] w-[45%] h-[200px] bg-gradient-to-l from-cyan-500/[0.05] via-blue-500/[0.03] to-transparent rounded-full blur-[100px] animate-[aurora_20s_ease-in-out_infinite_4s]" />
      </div>

      {/* ===== SHOOTING STARS ===== */}
      <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute w-[2px] h-[2px] bg-white rounded-full"
            style={{
              top: `${10 + i * 20}%`,
              left: `-5%`,
              boxShadow: '0 0 6px 2px rgba(255,255,255,0.6), -40px 0 20px rgba(255,255,255,0.3)',
              animation: `shoot ${3 + i}s linear ${i * 4}s infinite`,
            }}
          />
        ))}
      </div>

      {/* ===== AMBIENT GLOW ORBS ===== */}
      <div className="absolute top-[-15%] left-[-15%] w-[700px] h-[700px] bg-pink-500/[0.06] rounded-full blur-[200px] animate-glow-pulse pointer-events-none z-[1]" />
      <div className="absolute bottom-[-10%] right-[-15%] w-[600px] h-[600px] bg-purple-500/[0.05] rounded-full blur-[180px] animate-glow-pulse pointer-events-none z-[1]" style={{ animationDelay: "2s" }} />
      <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[500px] h-[500px] bg-blue-500/[0.04] rounded-full blur-[160px] animate-glow-pulse pointer-events-none z-[1]" style={{ animationDelay: "4s" }} />
      <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-cyan-500/[0.03] rounded-full blur-[140px] animate-glow-pulse pointer-events-none z-[1]" style={{ animationDelay: "6s" }} />
      <div className="absolute bottom-[30%] left-[5%] w-[450px] h-[450px] bg-fuchsia-500/[0.04] rounded-full blur-[150px] animate-glow-pulse pointer-events-none z-[1]" style={{ animationDelay: "3s" }} />

      {/* ===== RADIAL VIGNETTE ===== */}
      <div className="absolute inset-0 pointer-events-none z-[2]" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(3,3,6,0.8) 100%)' }} />

      {/* ===== HERO SECTION ===== */}
      <div className="relative z-10 min-h-[90vh] flex items-center justify-center px-5 md:px-10">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />

        <div className="max-w-5xl mx-auto text-center">
          {/* Animated Heart with Layered Glow Rings */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 80, delay: 0.2, duration: 1.2 }}
            className="mb-10 inline-block relative"
          >
            <div className="absolute inset-[-30px] rounded-full border border-pink-500/10 animate-glow-ring" />
            <div className="absolute inset-[-60px] rounded-full border border-pink-500/[0.06] animate-glow-ring" style={{ animationDelay: "1s" }} />
            <div className="absolute inset-[-90px] rounded-full border border-pink-500/[0.03] animate-glow-ring" style={{ animationDelay: "2s" }} />
            <div className="absolute inset-0 rounded-full bg-pink-500/15 animate-pulse-ring" />
            <div className="absolute inset-0 rounded-full bg-pink-500/10 animate-pulse-ring" style={{ animationDelay: "1s" }} />

            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-pink-500/20 via-fuchsia-500/15 to-purple-500/20 flex items-center justify-center border border-pink-500/20 shadow-[0_0_80px_rgba(255,45,138,0.3)]">
              <Heart className="w-16 h-16 md:w-20 md:h-20 text-pink-500 fill-pink-500 animate-heartbeat drop-shadow-[0_0_60px_rgba(255,45,138,0.9)]" />
            </div>
          </motion.div>

          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mb-8">
            <span className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-pink-500/[0.06] border border-pink-500/15 text-pink-400/60 text-[10px] md:text-xs font-medium tracking-[0.3em] uppercase">
              <Sparkles className="w-3 h-3" />
              Made with love, just for you
              <Sparkles className="w-3 h-3" />
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-extrabold mb-8 leading-[0.9] tracking-tight"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 bg-clip-text text-transparent block" style={{ textShadow: '0 0 80px rgba(255,45,138,0.4)' }}>
              For You,
            </span>
            <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent block mt-2" style={{ textShadow: '0 0 80px rgba(180,77,255,0.3)' }}>
              My Love
            </span>
          </motion.h1>

          {/* Typewriter */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="h-12 mb-6 flex items-center justify-center">
            <p className="text-white/35 text-xl md:text-2xl font-light" style={{ fontFamily: "'Playfair Display', serif" }}>
              {typewriterText}
              <span className="animate-typewriter-blink text-pink-400 ml-0.5">|</span>
            </p>
          </motion.div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="text-white/12 text-sm mb-4">
            I built this little world just for you 🌍
          </motion.p>

          {/* Scroll indicator — mouse scroll design */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="mt-16">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center gap-3 cursor-pointer group"
              onClick={() => document.getElementById("tiles-section")?.scrollIntoView({ behavior: "smooth" })}
            >
              <span className="text-white/12 text-[10px] tracking-[0.5em] uppercase group-hover:text-white/25 transition-colors">Scroll to explore</span>
              <div className="w-7 h-11 rounded-full border-2 border-white/10 flex items-start justify-center p-2 group-hover:border-pink-500/30 transition-colors">
                <motion.div animate={{ y: [0, 14, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full bg-pink-500/60" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ===== GRADIENT DIVIDER ===== */}
      <div id="tiles-section" className="relative z-10 py-10">
        <div className="max-w-5xl mx-auto px-5">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-pink-500/20 to-transparent" />
        </div>
      </div>

      {/* ===== TILES — MASSIVE FULL WIDTH ===== */}
      <div className="relative z-10 px-4 md:px-8 lg:px-12 pb-32">
        <div className="max-w-5xl mx-auto flex flex-col gap-6 md:gap-8">
          {sectionTiles.map((tile, i) => (
            <motion.button
              key={tile.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: "spring", stiffness: 60, damping: 16, delay: 0.05 * i }}
              onClick={() => onOpenSection(tile.id)}
              className="group relative w-full text-left overflow-hidden rounded-[28px] md:rounded-[32px] border border-white/[0.06] bg-gradient-to-br from-white/[0.03] via-white/[0.015] to-white/[0.03] focus:outline-none focus:ring-2 focus:ring-pink-500/40 transition-all duration-500 hover:border-white/[0.12] hover:translate-y-[-6px] hover:shadow-[0_30px_80px_rgba(255,45,138,0.08),0_0_0_1px_rgba(255,255,255,0.06)]"
            >
              {/* Hover gradient fill */}
              <div className={`absolute inset-0 bg-gradient-to-r ${tile.gradient} opacity-0 group-hover:opacity-[0.06] transition-opacity duration-700`} />

              {/* Shimmer sweep */}
              <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent group-hover:left-[150%] transition-all duration-[1200ms] ease-in-out" />

              {/* Corner glow */}
              <div className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${tile.gradient} rounded-full blur-[80px] opacity-0 group-hover:opacity-[0.12] transition-opacity duration-700 pointer-events-none`} />

              {/* Giant watermark emoji */}
              <div className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 text-[120px] md:text-[160px] lg:text-[200px] opacity-[0.015] group-hover:opacity-[0.04] group-hover:scale-110 transition-all duration-700 pointer-events-none select-none leading-none">
                {tile.emoji}
              </div>

              {/* Content */}
              <div className="relative z-10 flex items-center gap-5 md:gap-8 lg:gap-10 p-6 md:p-10 lg:p-12 min-h-[160px] md:min-h-[200px] lg:min-h-[240px]">
                {/* Emoji container */}
                <div className="relative shrink-0">
                  <div className={`absolute inset-[-16px] rounded-[28px] bg-gradient-to-br ${tile.iconBg} opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-500`} />
                  <div className={`relative w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-[22px] md:rounded-[26px] bg-gradient-to-br ${tile.iconBg} border border-white/[0.08] group-hover:border-white/[0.2] flex items-center justify-center transition-all duration-500 group-hover:shadow-[0_0_40px_rgba(255,45,138,0.2)]`}>
                    <span className="text-5xl md:text-6xl lg:text-7xl group-hover:scale-110 group-hover:rotate-[8deg] transition-transform duration-500 ease-out block drop-shadow-[0_0_30px_rgba(255,45,138,0.3)]">
                      {tile.emoji}
                    </span>
                  </div>
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0 py-2">
                  {/* Title */}
                  <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white/90 group-hover:text-white transition-colors duration-300 mb-2 md:mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    {tile.title}
                  </h2>
                  
                  {/* Subtitle - NOW MORE PROMINENT */}
                  <p className={`text-base md:text-lg lg:text-xl font-medium bg-gradient-to-r ${tile.gradient} bg-clip-text text-transparent mb-3 md:mb-4 transition-all duration-300 group-hover:opacity-100`} style={{ fontFamily: "'Playfair Display', serif", opacity: 0.7 }}>
                    {tile.subtitle}
                  </p>
                  
                  {/* Description */}
                  <p className="text-white/20 group-hover:text-white/40 transition-colors duration-300 text-sm md:text-base leading-relaxed max-w-2xl">
                    {tile.description}
                  </p>
                </div>

                {/* Arrow */}
                <div className="shrink-0">
                  <div className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-2xl md:rounded-[20px] bg-white/[0.03] group-hover:bg-gradient-to-br group-hover:from-pink-500/20 group-hover:to-purple-500/20 border border-white/[0.06] group-hover:border-white/[0.2] flex items-center justify-center transition-all duration-500 group-hover:translate-x-2 group-hover:shadow-[0_0_30px_rgba(255,45,138,0.2)]">
                    <span className="text-white/15 group-hover:text-white/90 text-2xl md:text-3xl transition-all duration-300">→</span>
                  </div>
                </div>
              </div>

              {/* Bottom accent */}
              <div className={`absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r ${tile.gradient} opacity-0 group-hover:opacity-70 transition-opacity duration-500`} />
            </motion.button>
          ))}
        </div>
      </div>

      {/* ===== FOOTER ===== */}
      <div className="relative z-10 text-center pb-20">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-pink-500/20" />
          <Heart className="w-5 h-5 text-pink-500/30 fill-pink-500/30 animate-heartbeat" />
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-pink-500/20" />
        </div>
        <p className="text-white/8 text-xs md:text-sm">Made with infinite love, for the most beautiful soul 💕</p>
      </div>
    </div>
  );
}

// =============================================
// SECTION VIEW WRAPPER
// =============================================
function SectionView({
  id,
  onBack,
  children,
  gradient,
  emoji,
  title,
}: {
  id: string;
  onBack: () => void;
  children: React.ReactNode;
  gradient: string;
  emoji: string;
  title: string;
}) {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [id]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-[#030306] relative"
    >
      <motion.div
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
        className="sticky top-0 z-50 bg-[#030306]/80 backdrop-blur-2xl border-b border-white/[0.05]"
      >
        <div className="max-w-6xl mx-auto px-5 md:px-10 h-16 flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1, x: -3 }}
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.1] transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
          </motion.button>
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}>
              <span className="text-sm">{emoji}</span>
            </div>
            <h1 className="text-base font-bold text-white truncate">{title}</h1>
          </div>
          <Heart className="w-4 h-4 text-pink-500/40 fill-pink-500/40 animate-heartbeat" />
        </div>
        <div className="h-[2px] bg-gradient-to-r from-transparent via-pink-500/30 to-transparent" />
      </motion.div>
      <div className="relative overflow-hidden">{children}</div>
    </motion.div>
  );
}

// =============================================
// SHARED SECTION UI
// =============================================
function SectionInner({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative py-14 md:py-20 px-5 md:px-10 overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

function GlowOrb({ color, className = "" }: { color: string; className?: string }) {
  const colors: Record<string, string> = {
    pink: "bg-pink-500/[0.07]",
    purple: "bg-purple-500/[0.07]",
    magenta: "bg-fuchsia-500/[0.06]",
    cyan: "bg-cyan-500/[0.05]",
  };
  return (
    <div className={`absolute w-[400px] h-[400px] rounded-full blur-[120px] animate-glow-pulse pointer-events-none ${colors[color] || colors.pink} ${className}`} />
  );
}

function SectionHeader({ emoji, title, subtitle }: { emoji: string; title: string; subtitle: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }} className="text-center mb-14 md:mb-18">
      <span className="text-5xl md:text-6xl block mb-5">{emoji}</span>
      <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 bg-clip-text text-transparent leading-tight" style={{ fontFamily: "'Poppins', sans-serif" }}>
        {title}
      </h2>
      <p className="text-white/25 mt-4 text-sm md:text-base font-light max-w-lg mx-auto">{subtitle}</p>
      <div className="flex items-center justify-center gap-3 mt-6">
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-pink-500/30" />
        <Heart className="w-3 h-3 text-pink-500/30 fill-pink-500/30 animate-heartbeat" />
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-pink-500/30" />
      </div>
    </motion.div>
  );
}

// =============================================
// SECTION CONTENTS (10 sections)
// =============================================

function ReasonsContent() {
  const reasons = [
    { icon: <Smile className="w-5 h-5" />, title: "Your Smile", text: "The way you smile lights up even my darkest days. It's my absolute favorite thing.", color: "from-pink-500/20 to-rose-500/20" },
    { icon: <Moon className="w-5 h-5" />, title: "Your Laugh", text: "Your laugh is the most beautiful melody. I'd do absolutely anything to hear it.", color: "from-purple-500/20 to-indigo-500/20" },
    { icon: <Sun className="w-5 h-5" />, title: "Your Kindness", text: "The way you care about everyone shows what a gorgeous soul you truly have.", color: "from-amber-500/20 to-orange-500/20" },
    { icon: <Coffee className="w-5 h-5" />, title: "Your Quirks", text: "All those little things that make you uniquely you — I'm obsessed with every one.", color: "from-emerald-500/20 to-teal-500/20" },
    { icon: <Shield className="w-5 h-5" />, title: "Your Strength", text: "You're the strongest person I know. You inspire me to be better every day.", color: "from-blue-500/20 to-cyan-500/20" },
    { icon: <Flame className="w-5 h-5" />, title: "Your Passion", text: "When you talk about things you love, your eyes sparkle and I fall deeper.", color: "from-red-500/20 to-rose-500/20" },
    { icon: <Eye className="w-5 h-5" />, title: "Your Beauty", text: "Inside and out, you are the most beautiful human I have ever seen.", color: "from-violet-500/20 to-purple-500/20" },
    { icon: <Headphones className="w-5 h-5" />, title: "Your Voice", text: "Whether talking, singing, or whispering — it's my favorite sound on earth.", color: "from-sky-500/20 to-blue-500/20" },
    { icon: <Heart className="w-5 h-5" />, title: "Your Love", text: "The way you love makes me feel like the luckiest person alive. Endlessly.", color: "from-pink-500/20 to-purple-500/20" },
  ];

  return (
    <SectionInner>
      <GlowOrb color="pink" className="-top-20 -right-20" />
      <GlowOrb color="purple" className="bottom-0 -left-20" />
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeader emoji="💕" title="Why I Love You" subtitle="Let me count the infinite ways..." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {reasons.map((r, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }} whileHover={{ y: -6, scale: 1.02 }} className="glass-card rounded-2xl p-6 hover:shadow-[0_0_30px_rgba(255,45,138,0.08)] cursor-default transition-all duration-300">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${r.color} flex items-center justify-center text-white/80 mb-4`}>{r.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{r.title}</h3>
              <p className="text-white/35 text-sm leading-relaxed">{r.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionInner>
  );
}

function StoryContent() {
  const chapters = [
    { num: 1, title: 'The First Meeting', subtitle: 'Where it all quietly began', emoji: '🎲', shayari: 'Kuch mulaakaatein bas pal hoti hain us waqt,\npar baad mein wahi poori zindagi ka weight utha leti hain.', story: 'So our story begins here actually. I can say my story to aap se pehli baar mile the. Monopoly khelne ke liye, par tab main nervous aur shy tha. Main ladkiyon se zyada baat nahi karta tha, isliye aapse bhi zyada baat nahi karta tha. Tab main aapko itna jaanta bhi nahi tha, aur us waqt main itna achha bhi nahi tha.', color: 'from-pink-500 to-rose-400' },
    { num: 2, title: 'A Focused Phase', subtitle: 'Life before feelings', emoji: '📚', shayari: 'Hum aksar kaam mein khud ko chhupa lete hain,\ntaakki dil se kuch mehsoos na karna pade.', story: 'Us waqt main 10th mein aaya hi tha, tab mujhe TIM batch mila tha. To tab main padhai par zyada focus karne lag gaya tha. Mera batch bhi sham ka batch tha, isliye hum zyada kuch khela nahi karte the.', color: 'from-blue-500 to-cyan-400' },
    { num: 3, title: 'A Silent Crush', subtitle: 'Unsaid, unnoticed, but real', emoji: '🤫', shayari: 'Kuch pyaar shabd nahi dhoondta,\nwoh chup reh kar hi dil par apni jagah bana leta hai.', story: 'Phir jab main 11th mein aaya, tab mujhe aap par crush generate ho gaya tha (secret crush). Par us waqt main tab bhi bahut shy tha, to main bas aapse badminton khelne ke waqt hi baat karta tha. Aur tab mujhe pata laga tha ki aap topper ho, to maine bhi sirf aapki wajah se grind karna seekha. Sach kahun to main sirf aapki wajah se hi better banna chahta tha.', color: 'from-purple-500 to-violet-400' },
    { num: 4, title: 'Becoming Friends', subtitle: 'Comfort slowly replacing fear', emoji: '🤝', shayari: 'Kuch log dheere-dheere baat nahi badhaate,\nwoh dheere-dheere dil mein rehne lagte hain.', story: 'Aise hi karte-karte 11th bhi nikal gayi. Lagbhag March–April 2025 ke waqt hum achhe friends ban hi gaye the. Matlab main aapko kai saari cheezein batata tha, aur aap bhi kaafi responsive thi. To main bhi sirf aapse, aur sach mein sirf aapse…', color: 'from-emerald-500 to-green-400' },
    { num: 5, title: 'One-Sided Love', subtitle: 'Feelings with no label', emoji: '💔', shayari: 'One-sided pyaar kamzor nahi hota,\nbas usme sehne ki taakat zyada lagti hai.', story: 'Main itna khul ke baat karta tha, phir us samay things were going fine. Matlab us samay tak main aapse one-sided love hi karta tha. Aapko kai baar hints dene ki koshish bhi karta tha ki I really love you, par phir aap nahi samjhi.', color: 'from-red-500 to-pink-400' },
    { num: 6, title: 'A Guess That Hurt', subtitle: 'A moment that stayed', emoji: '😞', shayari: 'Kabhi-kabhi ek sawaal hi kaafi hota hai,\njo dil ke andar sab kuch hila deta hai.', story: 'Phir kuch din baad mujhe feel hua ke Shorya aapka boyfriend hai. Phir maine aapse hi pooch liya tha. Woh random guess hi tha, lekin I still remember you were standing close to a car, then I guessed it. Sach mein woh guess karte waqt mujhe bahut bura laga tha.', color: 'from-amber-500 to-orange-400' },
    { num: 7, title: 'The Confession', subtitle: 'Courage and consequence', emoji: '💌', shayari: 'Sach bolna sirf kehna nahi hota,\nwoh khud ko poori tarah daav par rakhna hota hai.', story: 'Phir uske agle din hi maine confess kar diya tha aapke saamne that I love you. Par aapne mujhe reject kar diya tha. Aur usi samay mera batch bhi morning se evening shift ho gaya tha actually. Us samay mujhe bahut bura laga tha.', color: 'from-rose-500 to-red-400' },
    { num: 8, title: "Fate's Return", subtitle: 'When life brought you back', emoji: '🔄', shayari: 'Kuch log door jaakar bhi nahi jaate,\nwoh bas waqt ke saath chup ho jaate hain.', story: 'Phir aapse mile hue mujhe lagbhag 5–6 months ho gaye the, par phir god ne aapko phir se spawn kar diya tha. Then again I liked you, par this time you also knew that I like you.', color: 'from-indigo-500 to-blue-400' },
    { num: 9, title: 'The Best One Month', subtitle: 'Short, but unforgettable', emoji: '✨', shayari: 'Kuch lamhe lambe nahi hote,\npar unka asar poori zindagi se zyada hota hai.', story: 'Aur sach mein vo jo 1 month wala time period tha, woh best tha. Matlab you came yourself to me, aapan baatein karte the, ushi time ko…', color: 'from-yellow-500 to-amber-400' },
    { num: 10, title: 'Sudden Distance', subtitle: 'When everything stopped', emoji: '🥀', shayari: 'Kabhi rishta toot-ta nahi,\nbas awaazein achanak chup ho jaati hain.', story: 'Main ise meri life ka best moment bolta hoon. Par phir 8 Nov 2025 ko apni bhua aayi thi. Phir uske baad apni snap par bhi baat hona band ho gayi thi.', color: 'from-gray-400 to-slate-500' },
    { num: 11, title: 'Time That Felt Endless', subtitle: 'Pain measured in days', emoji: '😢', shayari: 'Jab dil bhar jaata hai,\nto waqt sirf guzarta nahi — kheenchta hai.', story: 'Uske baad se to ek-ek din mein rota tha. Matlab ek-ek din mera ek saal ki tarah nikla, cuz yaar ye samjho na ki meri zindagi mein kabhi koi important tha hi nahi, aur kabhi kisi ko is tarike se chaha hi nahi. Matlab yaar, love ka matlab hi nahi pata tha. Par phir aap aayi to main iska matlab samjha, par phir aapse milna hi band ho gaya, to yaar rona to aayega hi na.', color: 'from-blue-400 to-indigo-500' },
    { num: 12, title: 'Realization', subtitle: 'Choosing life again', emoji: '🌅', shayari: 'Kabhi ek insaan ka hona hi,\nzindagi ko theek lagne lagta hai.', story: 'Phir January mein aake mujhe realize hua ki yaar, life is precious, aur I have to spend it with you. To main hi aage aake aapko approach karne laga, cuz yaar meri life mein koi hai hi nahi. And I really love you. Dekho, main to bas aapko pyaar karta hoon.', color: 'from-orange-400 to-yellow-500' },
    { num: 13, title: 'A Promise', subtitle: 'Without expectations', emoji: '🤞', shayari: 'Pyaar jawaab ka intezaar nahi karta,\nwoh bas apni zimmedaari nibhaata hai.', story: 'Sach mein, aapko paane ke liye main zindagi bhar efforts karunga. Chahe aap mujhe zindagi bhar bhi na kaho, par I really love you.', color: 'from-pink-400 to-purple-500' },
    { num: 14, title: 'The Truth', subtitle: 'Said without force', emoji: '💗', shayari: 'Sach bolna zabardasti nahi hota,\nkabhi-kabhi wahi sabse shaant imandari hoti hai.', story: "Dekho, main aapko samjha to nahi sakta, par yaar life can end any moment. Aur mujhe to zindagi jeene ka koi shauk nahi tha, but you are the reason I'm still alive.", color: 'from-red-400 to-rose-500' },
    { num: 15, title: 'The Last Line', subtitle: 'Left with honesty', emoji: '♾️', shayari: 'Aage kya hoga ye kal jaane,\nmaine aaj bas jo tha, wahi keh diya.', story: "Main to ye hi bolunga, I really love you. I'll care for you, I respect you bas. Yaar, samjho kya sahi hai kya galat. Dekho, main pressurize nahi kar raha, par what if I died tomorrow.", color: 'from-violet-400 to-fuchsia-500' },
  ];

  const [expandedChapter, setExpandedChapter] = useState<number | null>(null);

  return (
    <SectionInner className="bg-[#060610]/50">
      <GlowOrb color="purple" className="top-1/4 -left-32" />
      <GlowOrb color="pink" className="bottom-20 -right-20" />
      <div className="max-w-4xl mx-auto relative z-10">
        <SectionHeader emoji="📖" title="Our Story" subtitle="Every chapter with you is my favorite" />
        <p className="text-center text-white/25 text-sm max-w-xl mx-auto mb-12 -mt-8 italic" style={{ fontFamily: "'Playfair Display', serif" }}>
          15 chapters of us… tap any chapter to read the full story.
        </p>
        <div className="relative">
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-pink-500/40 via-purple-500/30 to-pink-500/40" />
          {chapters.map((ch, i) => (
            <motion.div key={ch.num} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.04, type: 'spring', stiffness: 120 }} className="relative flex mb-6 last:mb-0">
              <div className="absolute left-6 md:left-8 -translate-x-1/2 z-10">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${ch.color} flex items-center justify-center text-xl shadow-lg border-2 border-[#030306] cursor-pointer transition-transform duration-300 hover:scale-110`} style={{ boxShadow: '0 0 20px rgba(236,72,153,0.25)' }} onClick={() => setExpandedChapter(expandedChapter === ch.num ? null : ch.num)}>
                  {ch.emoji}
                </div>
              </div>
              <div className="ml-16 md:ml-20 flex-1 cursor-pointer group" onClick={() => setExpandedChapter(expandedChapter === ch.num ? null : ch.num)}>
                <div className={`relative p-5 md:p-6 rounded-2xl border transition-all duration-500 ${expandedChapter === ch.num ? 'bg-white/[0.06] border-white/15 shadow-[0_0_40px_rgba(236,72,153,0.1)]' : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] hover:border-white/10'}`}>
                  <div className="flex items-start gap-3 mb-2">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-gradient-to-r ${ch.color} text-white flex-shrink-0`}>Ch. {ch.num}</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg md:text-xl font-bold text-white/90 group-hover:text-white transition-colors leading-tight">{ch.title}</h3>
                      <p className="text-white/30 text-xs mt-0.5 italic">{ch.subtitle}</p>
                    </div>
                    <motion.span animate={{ rotate: expandedChapter === ch.num ? 180 : 0 }} transition={{ duration: 0.3 }} className="text-white/20 text-sm flex-shrink-0 mt-1">▼</motion.span>
                  </div>
                  <div className="border-l-2 border-pink-500/30 pl-4 mt-3">
                    <p className="text-pink-300/50 text-xs md:text-sm italic whitespace-pre-line leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>{ch.shayari}</p>
                  </div>
                  <AnimatePresence>
                    {expandedChapter === ch.num && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: 'easeInOut' }} className="overflow-hidden">
                        <div className="mt-4 pt-4 border-t border-white/[0.06]">
                          <p className="text-white/60 text-sm md:text-base leading-relaxed">{ch.story}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${ch.color} rounded-b-2xl transition-opacity duration-500 ${expandedChapter === ch.num ? 'opacity-60' : 'opacity-0 group-hover:opacity-30'}`} />
                </div>
              </div>
            </motion.div>
          ))}
          <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1, type: 'spring' }} className="relative flex items-center mt-8">
            <div className="absolute left-6 md:left-8 -translate-x-1/2">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-2xl shadow-lg border-2 border-[#030306]" style={{ boxShadow: '0 0 30px rgba(236,72,153,0.4)' }}>❤️</div>
            </div>
            <div className="ml-16 md:ml-20">
              <p className="text-white/25 italic text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>…and this story is still being written, by us. ✍️</p>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionInner>
  );
}

function MemoriesContent() {
  const memories = [
    { emoji: "🌅", title: "Sunsets Together", desc: "Every sunset is more beautiful with you", gradient: "from-orange-500/10 to-pink-500/10" },
    { emoji: "🎵", title: "Our Songs", desc: "Every love song reminds me of you", gradient: "from-purple-500/10 to-pink-500/10" },
    { emoji: "☕", title: "Morning Coffee", desc: "Quiet mornings dreaming of you", gradient: "from-amber-500/10 to-yellow-500/10" },
    { emoji: "🌙", title: "Stargazing", desc: "You outshine every star", gradient: "from-blue-500/10 to-indigo-500/10" },
    { emoji: "😄", title: "Silly Moments", desc: "Being goofy with you is paradise", gradient: "from-green-500/10 to-teal-500/10" },
    { emoji: "💐", title: "Flowers & Love", desc: "No flower matches your beauty", gradient: "from-pink-500/10 to-rose-500/10" },
    { emoji: "🎂", title: "Celebrations", desc: "Every day with you is a party", gradient: "from-violet-500/10 to-purple-500/10" },
    { emoji: "🌊", title: "Adventures", desc: "I want to explore everything with you", gradient: "from-cyan-500/10 to-blue-500/10" },
  ];

  return (
    <SectionInner>
      <GlowOrb color="magenta" className="bottom-0 right-0" />
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeader emoji="📸" title="Memory Lane" subtitle="Moments I hold close to my heart" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {memories.map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 + i * 0.08 }} whileHover={{ scale: 1.06, rotate: i % 2 === 0 ? 2 : -2 }} className={`aspect-square rounded-2xl bg-gradient-to-br ${m.gradient} border border-white/5 flex flex-col items-center justify-center p-5 hover:border-pink-500/20 hover:shadow-[0_0_30px_rgba(255,45,138,0.1)] transition-all duration-300 cursor-default group`}>
              <span className="text-5xl md:text-6xl mb-3 group-hover:scale-110 transition-transform duration-300">{m.emoji}</span>
              <h3 className="text-sm font-semibold text-white text-center">{m.title}</h3>
              <p className="text-white/25 text-xs text-center mt-1 hidden sm:block">{m.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionInner>
  );
}

function PlaylistContent() {
  const songs = [
    // Longing
    { title: "Tum Jo Aaye", tag: "🖤 Longing", spotify: "https://open.spotify.com/search/Tum%20Jo%20Aaye", youtube: "https://www.youtube.com/results?search_query=Tum+Jo+Aaye+Once+Upon+A+Time+In+Mumbai", gradient: "from-pink-500/20 to-rose-500/20" },
    { title: "Tujhe Sochta Hoon", tag: "🖤 Longing", spotify: "https://open.spotify.com/search/Tujhe%20Sochta%20Hoon", youtube: "https://www.youtube.com/results?search_query=Tujhe+Sochta+Hoon+Jannat+2", gradient: "from-pink-500/20 to-rose-500/20" },
    { title: "Sab Tera", tag: "🖤 Longing", spotify: "https://open.spotify.com/search/Sab%20Tera", youtube: "https://www.youtube.com/results?search_query=Sab+Tera+Baaghi", gradient: "from-pink-500/20 to-rose-500/20" },
    { title: "Tum Hi Aana", tag: "🖤 Longing", spotify: "https://open.spotify.com/search/Tum%20Hi%20Aana", youtube: "https://www.youtube.com/results?search_query=Tum+Hi+Aana+Marjaavaan", gradient: "from-pink-500/20 to-rose-500/20" },
    { title: "Ek Vaari Aa", tag: "🖤 Longing", spotify: "https://open.spotify.com/search/Ek%20Vaari%20Aa", youtube: "https://www.youtube.com/results?search_query=Ek+Vaari+Aa+Raabta", gradient: "from-pink-500/20 to-rose-500/20" },
    { title: "Jhol (Coke Studio)", tag: "🖤 Longing", spotify: "https://open.spotify.com/search/Jhol%20Coke%20Studio", youtube: "https://www.youtube.com/results?search_query=Jhol+Coke+Studio", gradient: "from-pink-500/20 to-rose-500/20" },
    { title: "Tum Se Hi", tag: "🖤 Longing / Nostalgia", spotify: "https://open.spotify.com/search/Tum%20Se%20Hi", youtube: "https://www.youtube.com/results?search_query=Tum+Se+Hi+Jab+We+Met", gradient: "from-pink-500/20 to-purple-500/20" },
    
    // Healing
    { title: "Salamat", tag: "🖤 Longing / Healing", spotify: "https://open.spotify.com/search/Salamat", youtube: "https://www.youtube.com/results?search_query=Salamat+Sarbjit", gradient: "from-emerald-500/20 to-teal-500/20" },
    { title: "Phir Chala", tag: "🖤 Longing / Healing", spotify: "https://open.spotify.com/search/Phir%20Chala", youtube: "https://www.youtube.com/results?search_query=Phir+Chala+Ginny+Weds+Sunny", gradient: "from-emerald-500/20 to-teal-500/20" },
    { title: "Khairiyat", tag: "🖤 Longing / Healing", spotify: "https://open.spotify.com/search/Khairiyat", youtube: "https://www.youtube.com/results?search_query=Khairiyat+Chhichhore", gradient: "from-emerald-500/20 to-teal-500/20" },
    { title: "Baarish", tag: "🖤 Healing", spotify: "https://open.spotify.com/search/Baarish%20Stebin%20Ben", youtube: "https://www.youtube.com/results?search_query=Baarish+Stebin+Ben", gradient: "from-emerald-500/20 to-teal-500/20" },
    { title: "Tum Hi Ho", tag: "🖤 Healing / Longing", spotify: "https://open.spotify.com/search/Tum%20Hi%20Ho", youtube: "https://www.youtube.com/results?search_query=Tum+Hi+Ho+Aashiqui+2", gradient: "from-emerald-500/20 to-cyan-500/20" },
    { title: "Naina (Dangal)", tag: "🖤 Healing", spotify: "https://open.spotify.com/search/Naina%20Dangal", youtube: "https://www.youtube.com/results?search_query=Naina+Dangal", gradient: "from-emerald-500/20 to-teal-500/20" },
    { title: "At My Worst", tag: "🖤 Healing", spotify: "https://open.spotify.com/search/At%20My%20Worst", youtube: "https://www.youtube.com/results?search_query=At+My+Worst+Pink+Sweat", gradient: "from-emerald-500/20 to-teal-500/20" },
    { title: "Tera Zikr", tag: "🖤 Healing / Nostalgia", spotify: "https://open.spotify.com/search/Tera%20Zikr", youtube: "https://www.youtube.com/results?search_query=Tera+Zikr+Darshan+Raval", gradient: "from-emerald-500/20 to-blue-500/20" },
    
    // Heartbreak
    { title: "Tujhe Bhula Diya", tag: "🖤 Heartbreak", spotify: "https://open.spotify.com/search/Tujhe%20Bhula%20Diya", youtube: "https://www.youtube.com/results?search_query=Tujhe+Bhula+Diya+Anjaana+Anjaani", gradient: "from-blue-500/20 to-indigo-500/20" },
    { title: "Sun Raha Hai", tag: "🖤 Heartbreak", spotify: "https://open.spotify.com/search/Sun%20Raha%20Hai", youtube: "https://www.youtube.com/results?search_query=Sun+Raha+Hai+Aashiqui+2", gradient: "from-blue-500/20 to-indigo-500/20" },
    { title: "Piya Aaye Na", tag: "🖤 Heartbreak", spotify: "https://open.spotify.com/search/Piya%20Aaye%20Na", youtube: "https://www.youtube.com/results?search_query=Piya+Aaye+Na+Aashiqui+2", gradient: "from-blue-500/20 to-indigo-500/20" },
    { title: "Dhoondne Ko Zamaane Mein", tag: "🖤 Heartbreak", spotify: "https://open.spotify.com/search/Dhoondne%20Ko%20Zamaane%20Mein", youtube: "https://www.youtube.com/results?search_query=Dhoondne+Ko+Zamaane+Mein+Heartless", gradient: "from-blue-500/20 to-indigo-500/20" },
    { title: "Aaj Bhi", tag: "🖤 Heartbreak", spotify: "https://open.spotify.com/search/Aaj%20Bhi%20Vishal%20Mishra", youtube: "https://www.youtube.com/results?search_query=Aaj+Bhi+Vishal+Mishra", gradient: "from-blue-500/20 to-indigo-500/20" },
    { title: "Humnava Mere", tag: "🖤 Heartbreak", spotify: "https://open.spotify.com/search/Humnava%20Mere", youtube: "https://www.youtube.com/results?search_query=Humnava+Mere", gradient: "from-blue-500/20 to-indigo-500/20" },
    { title: "Hamari Adhuri Kahani", tag: "🖤 Heartbreak", spotify: "https://open.spotify.com/search/Hamari%20Adhuri%20Kahani", youtube: "https://www.youtube.com/results?search_query=Hamari+Adhuri+Kahani+Title+Song", gradient: "from-blue-500/20 to-indigo-500/20" },
    { title: "Akhiyaan", tag: "🖤 Heartbreak", spotify: "https://open.spotify.com/search/Akhiyaan%20Jay%20Kadn", youtube: "https://www.youtube.com/results?search_query=Akhiyaan+Jay+Kadn", gradient: "from-blue-500/20 to-indigo-500/20" },
    { title: "Finding Her", tag: "🖤 Heartbreak", spotify: "https://open.spotify.com/search/Finding%20Her", youtube: "https://www.youtube.com/results?search_query=Finding+Her+song", gradient: "from-blue-500/20 to-indigo-500/20" },
    { title: "Let Me Down Slowly", tag: "🖤 Heartbreak", spotify: "https://open.spotify.com/search/Let%20Me%20Down%20Slowly", youtube: "https://www.youtube.com/results?search_query=Let+Me+Down+Slowly+Alec+Benjamin", gradient: "from-blue-500/20 to-indigo-500/20" },
    { title: "Zill-e-Miskin", tag: "🖤 Heartbreak", spotify: "https://open.spotify.com/search/Zill%20e%20Miskin", youtube: "https://www.youtube.com/results?search_query=Zill+e+Miskin", gradient: "from-blue-500/20 to-indigo-500/20" },
    { title: "Past Lives", tag: "🖤 Heartbreak / Nostalgia", spotify: "https://open.spotify.com/search/Past%20Lives", youtube: "https://www.youtube.com/results?search_query=Past+Lives+sapientdream", gradient: "from-blue-500/20 to-purple-500/20" },
    
    // Nostalgia
    { title: "Saiyaara", tag: "🖤 Nostalgia", spotify: "https://open.spotify.com/search/Saiyaara", youtube: "https://www.youtube.com/results?search_query=Saiyaara+Ek+Tha+Tiger", gradient: "from-purple-500/20 to-violet-500/20" },
    { title: "Night Changes", tag: "🖤 Nostalgia", spotify: "https://open.spotify.com/search/Night%20Changes", youtube: "https://www.youtube.com/results?search_query=Night+Changes+One+Direction", gradient: "from-purple-500/20 to-violet-500/20" },
    { title: "Mortals", tag: "🖤 Nostalgia", spotify: "https://open.spotify.com/search/Mortals%20Warriyo", youtube: "https://www.youtube.com/results?search_query=Mortals+Warriyo", gradient: "from-purple-500/20 to-violet-500/20" },
  ];
  
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  
  const filters = ["all", "Longing", "Heartbreak", "Healing", "Nostalgia"];
  
  const filteredSongs = activeFilter === "all" 
    ? songs 
    : songs.filter(s => s.tag.includes(activeFilter));

  return (
    <SectionInner>
      <GlowOrb color="purple" className="top-10 right-10" />
      <GlowOrb color="pink" className="bottom-20 left-10" />
      <div className="max-w-5xl mx-auto relative z-10">
        <SectionHeader 
          emoji="🎵" 
          title="Songs I Cried To" 
          subtitle="When I was alone, missing you so much it hurt" 
        />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.2 }}
          className="mb-10 text-center"
        >
          <p className="text-white/30 text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
            These are the 30 songs I listened to when I missed you so deeply that tears wouldn't stop falling. 
            Each melody carried my pain, my longing, my love for you. 
            <span className="block mt-3 text-pink-400/40 italic">Every lyric felt like it was written about us...</span>
          </p>
          
          {/* Filter Tags */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {filters.map((filter) => (
              <motion.button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-5 py-2.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 ${
                  activeFilter === filter
                    ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-[0_0_30px_rgba(255,45,138,0.3)]"
                    : "bg-white/[0.03] border border-white/[0.08] text-white/40 hover:text-white/60 hover:border-white/[0.15]"
                }`}
              >
                {filter === "all" ? "All Songs (30)" : filter}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Songs Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {filteredSongs.map((song, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + (i % 10) * 0.05 }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              className={`relative glass-card rounded-2xl p-5 transition-all duration-500 group border ${
                hoveredIdx === i 
                  ? "shadow-[0_0_40px_rgba(180,77,255,0.15)] border-purple-500/30" 
                  : "border-white/[0.06]"
              }`}
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${song.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Tag */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-medium px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-white/30 group-hover:text-white/50 group-hover:border-white/[0.15] transition-all">
                    {song.tag}
                  </span>
                  <div className="flex items-end gap-0.5 h-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    {[1,2,3].map(b => (
                      <motion.div 
                        key={b} 
                        animate={{ height: ["40%", "100%", "60%", "90%", "40%"] }} 
                        transition={{ duration: 0.8, repeat: Infinity, delay: b * 0.15 }} 
                        className="w-0.5 bg-pink-400 rounded-full" 
                      />
                    ))}
                  </div>
                </div>
                
                {/* Song Title */}
                <h3 className="text-white font-semibold text-lg mb-4 group-hover:text-pink-200 transition-colors">
                  {song.title}
                </h3>
                
                {/* Links */}
                <div className="flex gap-2">
                  <a
                    href={song.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#1DB954]/10 border border-[#1DB954]/20 text-[#1DB954] hover:bg-[#1DB954]/20 hover:border-[#1DB954]/40 transition-all duration-300 text-sm font-medium group/btn"
                  >
                    <svg className="w-4 h-4 group-hover/btn:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                    </svg>
                    <span className="hidden sm:inline">Spotify</span>
                  </a>
                  
                  <a
                    href={song.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#FF0000]/10 border border-[#FF0000]/20 text-[#FF0000] hover:bg-[#FF0000]/20 hover:border-[#FF0000]/40 transition-all duration-300 text-sm font-medium group/btn"
                  >
                    <svg className="w-4 h-4 group-hover/btn:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    <span className="hidden sm:inline">YouTube</span>
                  </a>
                </div>
              </div>
              
              {/* Bottom accent line */}
              <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${song.gradient.replace('/20', '')} opacity-0 group-hover:opacity-60 transition-opacity duration-500 rounded-b-2xl`} />
            </motion.div>
          ))}
        </div>
        
        {/* Bottom Note */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 1 }}
          className="mt-12 text-center"
        >
          <div className="inline-block px-6 py-3 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
            <p className="text-white/20 text-xs italic" style={{ fontFamily: "'Playfair Display', serif" }}>
              "हर गाने में तेरी याद थी, हर धुन में तेरी बात थी... 💔"
            </p>
          </div>
        </motion.div>
      </div>
    </SectionInner>
  );
}

function PromisesContent() {
  const promises = [
    "I promise to always make you laugh, even on your darkest days",
    "I promise to always listen, even when words are hard to find",
    "I promise to never stop choosing you, every single day",
    "I promise to support your dreams as if they were my own",
    "I promise to always be honest, even when truth is hard",
    "I promise to be your rock when the world feels unstable",
    "I promise to never go to sleep angry at you",
    "I promise to love you even more tomorrow than I do today",
    "I promise to always hold your hand when you need comfort",
    "I promise to make every ordinary moment feel extraordinary",
  ];

  return (
    <SectionInner>
      <GlowOrb color="pink" className="top-0 left-1/4" />
      <div className="max-w-3xl mx-auto relative z-10">
        <SectionHeader emoji="🤞" title="My Promises To You" subtitle="Written on my heart forever" />
        <div className="space-y-4">
          {promises.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.06 }} className="flex items-start gap-5 group cursor-default">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center flex-shrink-0 text-xs font-bold shadow-[0_0_15px_rgba(255,45,138,0.2)] group-hover:shadow-[0_0_25px_rgba(255,45,138,0.4)] transition-all">{i + 1}</div>
              <p className="text-white/40 text-base md:text-lg leading-relaxed pt-2 group-hover:text-white/70 transition-colors duration-300">{p}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionInner>
  );
}

function ComplimentsContent() {
  const compliments = [
    { word: "Beautiful", emoji: "🌹", desc: "In every way imaginable" },
    { word: "Brilliant", emoji: "🧠", desc: "Your mind amazes me" },
    { word: "Brave", emoji: "🦁", desc: "Your courage inspires me" },
    { word: "Kind", emoji: "🕊️", desc: "Your heart is pure gold" },
    { word: "Funny", emoji: "😂", desc: "You make me laugh so hard" },
    { word: "Magical", emoji: "✨", desc: "You make life enchanting" },
    { word: "Perfect", emoji: "💎", desc: "Flaws and all, you're everything" },
    { word: "Mine", emoji: "💖", desc: "And I am forever yours" },
  ];

  return (
    <SectionInner className="bg-[#060610]/50">
      <GlowOrb color="magenta" className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="max-w-5xl mx-auto relative z-10">
        <SectionHeader emoji="👑" title="You Are" subtitle="Just in case you forgot..." />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {compliments.map((c, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.5, rotate: -10 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ delay: 0.3 + i * 0.08, type: "spring", stiffness: 200 }} whileHover={{ scale: 1.08, rotate: i % 2 === 0 ? 3 : -3 }} className="relative glass-card rounded-2xl p-6 md:p-8 text-center cursor-default group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="text-4xl md:text-5xl block mb-3 group-hover:scale-125 transition-transform duration-300 relative z-10">{c.emoji}</span>
              <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent relative z-10">{c.word}</h3>
              <p className="text-white/25 text-xs mt-2 relative z-10">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionInner>
  );
}

function LoveFactsContent() {
  const loveFacts = [
    { fact: "Falling in love has a similar neurological effect as cocaine — both produce the same euphoric feeling of happiness.", emoji: "🧪", category: "Science" },
    { fact: "Couples who laugh together tend to have stronger and longer-lasting relationships.", emoji: "😂", category: "Relationships" },
    { fact: "The feeling of butterflies in your stomach is actually caused by adrenaline released during the fight-or-flight response.", emoji: "🦋", category: "Biology" },
    { fact: "Looking into each other's eyes can synchronize your heartbeats and create a deeper bond.", emoji: "👀", category: "Connection" },
    { fact: "Cuddling releases oxytocin, which helps heal physical wounds and reduces pain.", emoji: "🤗", category: "Health" },
    { fact: "It only takes 4 minutes to decide whether you like someone or not.", emoji: "⏱️", category: "Psychology" },
    { fact: "Being in love can reduce headaches. Studies show that romance activates pain-relief areas in the brain.", emoji: "💊", category: "Science" },
    { fact: "Couples who are in love synchronize their heart rates after gazing into each other's eyes for 3 minutes.", emoji: "💓", category: "Biology" },
    { fact: "Love is actually a chemical cocktail — a mix of dopamine, oxytocin, serotonin, and adrenaline.", emoji: "⚗️", category: "Chemistry" },
    { fact: "Holding hands with someone you love can alleviate physical pain and stress.", emoji: "🤝", category: "Health" },
    { fact: "The ancient Greeks described 7 types of love: Eros, Philia, Storge, Agape, Ludus, Pragma, and Philautia.", emoji: "🏛️", category: "History" },
    { fact: "Your heart can actually sync with the music you listen to — love songs can literally make your heart flutter.", emoji: "🎵", category: "Music" },
    { fact: "Romantic love eventually transforms into committed love, which is associated with calmness and security.", emoji: "🏡", category: "Psychology" },
    { fact: "Expressing gratitude to your partner increases both partners' sense of connection and satisfaction.", emoji: "🙏", category: "Relationships" },
    { fact: "Pupil dilation is a sign of attraction — your pupils can expand up to 45% when looking at someone you love.", emoji: "😍", category: "Biology" },
    { fact: "A hug that lasts 20 seconds releases enough oxytocin to make you trust someone more.", emoji: "💕", category: "Health" },
    { fact: "Love literally makes you do crazy things — it deactivates the brain pathway responsible for fear and negative emotions.", emoji: "🤪", category: "Neuroscience" },
    { fact: "Couples who travel together have healthier and happier relationships than those who don't.", emoji: "✈️", category: "Relationships" },
    { fact: "Monogamous relationships exist throughout the animal kingdom — seahorses, wolves, and swans mate for life.", emoji: "🦢", category: "Nature" },
    { fact: "When two lovers gaze at each other, their brains release phenylethylamine — the same chemical found in chocolate.", emoji: "🍫", category: "Chemistry" },
  ];

  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [direction, setDirection] = useState(1);

  const getRandomIndex = useCallback(() => {
    let newIndex;
    do { newIndex = Math.floor(Math.random() * loveFacts.length); } while (newIndex === currentFactIndex && loveFacts.length > 1);
    return newIndex;
  }, [currentFactIndex, loveFacts.length]);

  const nextFact = () => { setDirection(1); setCurrentFactIndex(getRandomIndex()); };
  const prevFact = () => { setDirection(-1); setCurrentFactIndex((prev) => (prev - 1 + loveFacts.length) % loveFacts.length); };

  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentFactIndex((prev) => {
        let newIdx;
        do { newIdx = Math.floor(Math.random() * loveFacts.length); } while (newIdx === prev);
        return newIdx;
      });
    }, 8000);
    return () => clearInterval(interval);
  }, [isAutoPlay, loveFacts.length]);

  const currentFact = loveFacts[currentFactIndex];
  const categoryColors: Record<string, string> = {
    Science: "from-blue-500 to-cyan-500", Relationships: "from-pink-500 to-rose-500",
    Biology: "from-green-500 to-emerald-500", Connection: "from-purple-500 to-violet-500",
    Health: "from-red-500 to-pink-500", Psychology: "from-amber-500 to-orange-500",
    Chemistry: "from-yellow-500 to-amber-500", History: "from-stone-500 to-amber-700",
    Music: "from-violet-500 to-purple-500", Neuroscience: "from-indigo-500 to-blue-500",
    Nature: "from-emerald-500 to-green-600",
  };

  return (
    <SectionInner>
      <GlowOrb color="cyan" className="-top-20 right-10" />
      <GlowOrb color="pink" className="bottom-10 -left-10" />
      <div className="max-w-4xl mx-auto relative z-10">
        <SectionHeader emoji="🧠" title="Random Love Facts" subtitle="Fascinating facts about the beautiful thing we share" />
        <div className="flex items-center justify-center gap-3 mb-10 flex-wrap">
          <button onClick={() => setIsAutoPlay(!isAutoPlay)} className={`px-5 py-2.5 rounded-xl text-xs font-medium border transition-all duration-300 flex items-center gap-2 ${isAutoPlay ? "bg-pink-500/10 border-pink-500/30 text-pink-400" : "bg-white/5 border-white/10 text-white/40"}`}>
            <div className={`w-2 h-2 rounded-full ${isAutoPlay ? "bg-pink-500 animate-pulse" : "bg-white/20"}`} />
            {isAutoPlay ? "Auto-Play On" : "Auto-Play Off"}
          </button>
          <span className="text-white/15 text-xs">{currentFactIndex + 1} / {loveFacts.length}</span>
        </div>
        <div className="relative">
          <button onClick={prevFact} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-14 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full glass-card flex items-center justify-center text-white/40 hover:text-white/80 transition-all"><ChevronUp className="w-5 h-5 -rotate-90" /></button>
          <button onClick={nextFact} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-14 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full glass-card flex items-center justify-center text-white/40 hover:text-white/80 transition-all"><ChevronUp className="w-5 h-5 rotate-90" /></button>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div key={currentFactIndex} custom={direction} initial={{ opacity: 0, x: direction * 100, scale: 0.95 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: direction * -100, scale: 0.95 }} transition={{ duration: 0.5, ease: "easeInOut" }} className="relative mx-8 md:mx-0">
              <div className="absolute -inset-2 bg-gradient-to-br from-pink-500/10 via-purple-500/5 to-cyan-500/10 rounded-[32px] blur-xl opacity-60" />
              <div className="relative glass-strong rounded-[24px] p-8 md:p-12 gradient-border overflow-hidden">
                <div className="absolute top-4 right-4 text-[120px] md:text-[160px] opacity-[0.03] leading-none select-none pointer-events-none">{currentFact.emoji}</div>
                <div className="flex items-center mb-8">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03]">
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${categoryColors[currentFact.category] || "from-pink-500 to-purple-500"}`} />
                    <span className="text-white/50 text-xs font-medium tracking-wider uppercase">{currentFact.category}</span>
                  </div>
                </div>
                <div className="flex justify-center mb-8">
                  <motion.div initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 200, delay: 0.2 }} className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-cyan-500/10 flex items-center justify-center border border-white/5">
                    <span className="text-4xl md:text-5xl">{currentFact.emoji}</span>
                  </motion.div>
                </div>
                <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-white/60 text-lg md:text-xl leading-relaxed text-center max-w-2xl mx-auto relative z-10" style={{ fontFamily: "'Playfair Display', serif" }}>"{currentFact.fact}"</motion.p>
                {isAutoPlay && (
                  <div className="mt-8 w-full h-0.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div key={currentFactIndex} initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 8, ease: "linear" }} className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full" />
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="text-center mt-10">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={nextFact} className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500/15 to-cyan-500/15 border border-pink-500/20 text-white/60 text-sm font-medium hover:text-white/90 hover:shadow-[0_0_30px_rgba(255,45,138,0.15)] hover:border-pink-500/40 transition-all duration-300 group">
            <Sparkles className="w-4 h-4 text-pink-400 group-hover:animate-pulse" />
            <span>Show Me Another Fact</span>
            <Heart className="w-4 h-4 text-pink-400 fill-pink-400 group-hover:animate-heartbeat" />
          </motion.button>
        </div>
      </div>
    </SectionInner>
  );
}

function QuizContent() {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const questions = [
    { q: "What's the password to this website? 😉", options: ["password123", "letmein", "iloveyou", "opensesame"], correct: 2 },
    { q: "What matters most in love?", options: ["Money", "Trust & Communication", "Looks", "Social Media"], correct: 1 },
    { q: "How much do I love you?", options: ["A little", "A lot", "To infinity", "Beyond infinity ♾️"], correct: 3 },
    { q: "What's the best thing about you?", options: ["Everything!", "Also everything", "Still everything", "All of the above"], correct: 3 },
    { q: "Will I ever stop loving you?", options: ["Never!", "Absolutely never", "Not in a million years", "All of the above"], correct: 3 },
  ];

  const handleAnswer = (idx: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(idx);
    if (idx === questions[currentQ].correct) setScore((s) => s + 1);
    setTimeout(() => {
      if (currentQ < questions.length - 1) { setCurrentQ((q) => q + 1); setSelectedAnswer(null); } else { setShowResult(true); }
    }, 1200);
  };

  const reset = () => { setCurrentQ(0); setScore(0); setShowResult(false); setSelectedAnswer(null); };

  return (
    <SectionInner>
      <GlowOrb color="purple" className="top-10 left-10" />
      <GlowOrb color="pink" className="bottom-10 right-10" />
      <div className="max-w-2xl mx-auto relative z-10">
        <SectionHeader emoji="💝" title="Love Quiz" subtitle="Let's have some fun together!" />
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div key={currentQ} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <div className="w-full h-1 bg-white/5 rounded-full mb-6 overflow-hidden">
                <motion.div initial={{ width: `${(currentQ / questions.length) * 100}%` }} animate={{ width: `${((currentQ + 1) / questions.length) * 100}%` }} className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full" />
              </div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-pink-400 text-sm font-medium">Question {currentQ + 1} of {questions.length}</span>
                <span className="text-white/20 text-sm">Score: {score}</span>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-8">{questions[currentQ].q}</h3>
              <div className="space-y-3">
                {questions[currentQ].options.map((opt, i) => {
                  const isSelected = selectedAnswer === i;
                  const isCorrect = i === questions[currentQ].correct;
                  const showState = selectedAnswer !== null;
                  return (
                    <motion.button key={i} whileHover={selectedAnswer === null ? { scale: 1.01, x: 4 } : undefined} whileTap={selectedAnswer === null ? { scale: 0.99 } : undefined} onClick={() => handleAnswer(i)} className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center gap-3 ${!showState ? "border-white/8 bg-white/3 hover:border-pink-500/20 hover:bg-pink-500/5" : isSelected && isCorrect ? "border-green-500/40 bg-green-500/10" : isSelected && !isCorrect ? "border-red-500/40 bg-red-500/10" : isCorrect ? "border-green-500/30 bg-green-500/5" : "border-white/3 bg-white/1 opacity-40"}`}>
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${!showState ? "bg-white/5 text-white/40" : isCorrect ? "bg-green-500/20 text-green-400" : isSelected ? "bg-red-500/20 text-red-400" : "bg-white/3 text-white/20"}`}>{String.fromCharCode(65 + i)}</div>
                      <span className="text-white/70 text-sm">{opt}</span>
                      {showState && isCorrect && <span className="ml-auto text-green-400">✓</span>}
                      {showState && isSelected && !isCorrect && <span className="ml-auto text-red-400">✗</span>}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-strong rounded-2xl p-8 md:p-10 text-center gradient-border">
              <span className="text-7xl block mb-6">🎉</span>
              <h3 className="text-3xl font-bold text-white mb-3">You scored {score}/{questions.length}!</h3>
              <p className="text-white/40 mb-8 max-w-sm mx-auto">{score === questions.length ? "Perfect score! You know our love by heart! 💕" : score >= 3 ? "Amazing! You know me so well! 💖" : "No matter what, you're always perfect to me! 💗"}</p>
              <button onClick={reset} className="px-8 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm font-medium hover:shadow-[0_0_25px_rgba(255,45,138,0.3)] transition-all">Play Again ♥</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionInner>
  );
}

function QuotesContent() {
  const quotes = [
    { text: "You are my today and all of my tomorrows.", author: "Leo Christopher" },
    { text: "In all the world, there is no heart for me like yours.", author: "Maya Angelou" },
    { text: "I love you not because of who you are, but because of who I am when I am with you.", author: "Roy Croft" },
    { text: "Whatever our souls are made of, his and mine are the same.", author: "Emily Brontë" },
    { text: "You know you're in love when you can't fall asleep because reality is finally better than your dreams.", author: "Dr. Seuss" },
    { text: "I wish I could turn back the clock. I'd find you sooner and love you longer.", author: "Unknown" },
  ];

  return (
    <SectionInner>
      <GlowOrb color="purple" className="top-20 left-20" />
      <div className="max-w-5xl mx-auto relative z-10">
        <SectionHeader emoji="💬" title="Love Quotes" subtitle="Words that speak my heart" />
        <div className="grid md:grid-cols-2 gap-5">
          {quotes.map((q, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }} whileHover={{ y: -4 }} className="love-letter rounded-2xl p-7 relative group hover:shadow-[0_0_30px_rgba(255,45,138,0.08)] transition-all duration-500">
              <Quote className="w-8 h-8 text-pink-500/15 mb-4" />
              <p className="text-white/50 italic leading-relaxed text-[15px]" style={{ fontFamily: "'Playfair Display', serif" }}>"{q.text}"</p>
              <div className="flex items-center gap-2 mt-5">
                <div className="w-6 h-px bg-pink-500/30" />
                <p className="text-pink-400/40 text-xs font-medium">{q.author}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionInner>
  );
}

function DreamBoyContent() {
  const [currentCategory, setCurrentCategory] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [showResults, setShowResults] = useState(false);

  const categories = [
    {
      name: "Physical Appearance",
      icon: "👤",
      gradient: "from-blue-500 to-cyan-500",
      questions: [
        {
          q: "Height preference?",
          type: "choice",
          options: ["Shorter than me", "Same height", "Slightly taller (2-4 inches)", "Noticeably taller (5-7 inches)", "Much taller (8+ inches)", "Height doesn't matter"]
        },
        {
          q: "Body type?",
          type: "choice",
          options: ["Slim/Lean", "Athletic/Toned", "Average build", "Muscular/Buff", "Teddy bear (cuddly)", "Doesn't matter"]
        },
        {
          q: "Hair length preference?",
          type: "choice",
          options: ["Buzz cut/Very short", "Short and neat", "Medium length", "Long hair", "Man bun worthy", "Doesn't matter"]
        },
        {
          q: "Hair texture?",
          type: "choice",
          options: ["Straight", "Wavy", "Curly", "Coily", "Whatever looks good on him", "Doesn't matter"]
        },
        {
          q: "Facial hair preference?",
          type: "choice",
          options: ["Clean shaven always", "Light stubble", "Well-groomed beard", "Full beard", "Mustache only", "Changes it up", "Doesn't matter"]
        },
        {
          q: "Eye color preference?",
          type: "choice",
          options: ["Brown", "Black", "Blue", "Green", "Hazel", "Grey", "Doesn't matter at all"]
        },
        {
          q: "Skin tone?",
          type: "choice",
          options: ["Fair", "Wheatish", "Dusky", "Dark", "Doesn't matter - all are beautiful"]
        },
        {
          q: "Glasses?",
          type: "choice",
          options: ["Yes, glasses are cute", "No, prefer without", "Either works", "Sometimes glasses are hot"]
        },
        {
          q: "Smile type?",
          type: "choice",
          options: ["Bright and toothy", "Subtle/Mysterious", "Dimples!", "Crooked/Unique", "Genuine and warm", "All smiles are beautiful"]
        },
        {
          q: "Hands preference?",
          type: "choice",
          options: ["Veiny and masculine", "Soft and gentle", "Large hands", "Long fingers", "Doesn't matter"]
        }
      ]
    },
    {
      name: "Personality Core",
      icon: "🧠",
      gradient: "from-purple-500 to-pink-500",
      questions: [
        {
          q: "Introvert or Extrovert?",
          type: "choice",
          options: ["Introverted (quiet, reserved)", "Ambivert (balanced)", "Extroverted (outgoing, social)", "Depends on the situation"]
        },
        {
          q: "Sense of humor?",
          type: "choice",
          options: ["Witty and sarcastic", "Goofy and playful", "Dark humor", "Wholesome and punny", "Situational comedy", "Dry/Deadpan", "Mix of everything"]
        },
        {
          q: "Intelligence type?",
          type: "choice",
          options: ["Book smart/Academic", "Street smart/Practical", "Emotionally intelligent", "Creative/Artistic", "All-around smart", "Doesn't have to be genius"]
        },
        {
          q: "Confidence level?",
          type: "choice",
          options: ["Very confident/Alpha", "Quietly confident", "Humble and modest", "A bit shy (cute)", "Balanced confidence", "Doesn't matter"]
        },
        {
          q: "Emotional expressiveness?",
          type: "choice",
          options: ["Very expressive with feelings", "Moderately expressive", "Reserved but opens up", "Actions over words", "Emotionally balanced"]
        },
        {
          q: "Ambition level?",
          type: "choice",
          options: ["Highly ambitious/Driven", "Moderately ambitious", "Content and peaceful", "Balanced approach", "Doesn't matter much"]
        },
        {
          q: "Spontaneity vs Planning?",
          type: "choice",
          options: ["Very spontaneous/Adventurous", "Mix of both", "Prefers planning", "Go with the flow", "Situational"]
        },
        {
          q: "Maturity level?",
          type: "choice",
          options: ["Very mature for age", "Age-appropriate", "Young at heart", "Depends on situation", "Mix of mature and playful"]
        },
        {
          q: "Optimist or Realist?",
          type: "choice",
          options: ["Optimist (glass half full)", "Realist (practical)", "Pessimist (cautious)", "Balanced perspective"]
        },
        {
          q: "Leadership quality?",
          type: "choice",
          options: ["Natural leader", "Good team player", "Prefers to follow", "Can do both", "Doesn't matter"]
        }
      ]
    },
    {
      name: "Communication Style",
      icon: "💬",
      gradient: "from-green-500 to-teal-500",
      questions: [
        {
          q: "Texting frequency?",
          type: "choice",
          options: ["Constant texter", "Regular throughout day", "Few quality messages", "Prefers calls over texts", "Balanced approach"]
        },
        {
          q: "Communication preference?",
          type: "choice",
          options: ["Texting", "Phone calls", "Video calls", "In-person only", "Mix of everything"]
        },
        {
          q: "Response time?",
          type: "choice",
          options: ["Instant replies", "Within an hour", "Few hours is fine", "Whenever he's free", "Doesn't matter"]
        },
        {
          q: "Deep conversations?",
          type: "choice",
          options: ["Loves deep 3am talks", "Occasionally yes", "Prefers light topics", "Mix of both", "Doesn't matter"]
        },
        {
          q: "Argument handling?",
          type: "choice",
          options: ["Discusses calmly", "Needs space first", "Confronts directly", "Avoids conflict", "Compromises easily"]
        },
        {
          q: "Listening skills?",
          type: "choice",
          options: ["Active listener (very attentive)", "Good listener", "Sometimes distracted", "Tries his best"]
        },
        {
          q: "Opening up?",
          type: "choice",
          options: ["Opens up easily", "Takes time to trust", "Very private", "Shares when comfortable"]
        },
        {
          q: "Compliments frequency?",
          type: "choice",
          options: ["Very expressive with compliments", "Occasional sweet words", "Shows through actions", "Balanced approach"]
        },
        {
          q: "Apology style?",
          type: "choice",
          options: ["Quick to apologize", "Takes time to reflect", "Shows through actions", "Talks it out"]
        },
        {
          q: "Sarcasm level?",
          type: "choice",
          options: ["Very sarcastic", "Moderately sarcastic", "Rarely sarcastic", "Never sarcastic", "Depends on mood"]
        }
      ]
    },
    {
      name: "Romance & Affection",
      icon: "💕",
      gradient: "from-pink-500 to-rose-500",
      questions: [
        {
          q: "Love language (giving)?",
          type: "choice",
          options: ["Words of affirmation", "Quality time", "Physical touch", "Acts of service", "Gift giving", "All of them"]
        },
        {
          q: "PDA (Public Display of Affection)?",
          type: "choice",
          options: ["Very comfortable with PDA", "Hand holding is okay", "Minimal PDA", "Private person", "Depends on mood"]
        },
        {
          q: "Romantic gestures?",
          type: "choice",
          options: ["Grand romantic gestures", "Small daily surprises", "Thoughtful planned dates", "Spontaneous moments", "Mix of everything"]
        },
        {
          q: "Pet names?",
          type: "choice",
          options: ["Uses cute pet names", "Occasional pet names", "Prefers real name", "Unique nicknames", "Doesn't matter"]
        },
        {
          q: "Date planning?",
          type: "choice",
          options: ["Always plans dates", "Takes turns planning", "Spontaneous dates", "Lets me plan", "Collaborative planning"]
        },
        {
          q: "Anniversary/Special days?",
          type: "choice",
          options: ["Remembers and celebrates all", "Remembers major ones", "Needs reminders", "Makes every day special", "Low-key celebrations"]
        },
        {
          q: "Gift giving?",
          type: "choice",
          options: ["Thoughtful surprise gifts", "Practical gifts", "Experience gifts", "Handmade/Personal", "Doesn't have to give gifts"]
        },
        {
          q: "Morning/Night texts?",
          type: "choice",
          options: ["Always sends good morning/night", "Sometimes", "Prefers calls", "Shows love differently", "Doesn't matter"]
        },
        {
          q: "Jealousy level?",
          type: "choice",
          options: ["Slightly protective", "Trusts completely", "A little jealous (cute)", "Very secure", "Balanced"]
        },
        {
          q: "Cuddling preference?",
          type: "choice",
          options: ["Loves to cuddle always", "Occasional cuddles", "Not very touchy", "Depends on mood", "Comfortable with both"]
        }
      ]
    },
    {
      name: "Lifestyle & Habits",
      icon: "🏃",
      gradient: "from-orange-500 to-red-500",
      questions: [
        {
          q: "Morning person or night owl?",
          type: "choice",
          options: ["Early bird (wakes up early)", "Night owl (stays up late)", "Flexible schedule", "Adapts to situation"]
        },
        {
          q: "Fitness routine?",
          type: "choice",
          options: ["Gym rat (very fit)", "Regular exercise", "Occasional workouts", "Active lifestyle", "Not into fitness", "Doesn't matter"]
        },
        {
          q: "Eating habits?",
          type: "choice",
          options: ["Foodie (loves food)", "Healthy eater", "Not picky", "Adventurous eater", "Simple tastes"]
        },
        {
          q: "Cooking skills?",
          type: "choice",
          options: ["Great cook", "Can cook basics", "Learning to cook", "Doesn't cook", "We can learn together"]
        },
        {
          q: "Cleanliness level?",
          type: "choice",
          options: ["Very neat and organized", "Generally clean", "Organized chaos", "A bit messy", "Doesn't matter much"]
        },
        {
          q: "Alcohol/Party scene?",
          type: "choice",
          options: ["Non-drinker", "Social drinker", "Occasional parties", "Party person", "Doesn't matter"]
        },
        {
          q: "Smoking?",
          type: "choice",
          options: ["Non-smoker (must)", "Occasional smoker", "Trying to quit", "Doesn't matter"]
        },
        {
          q: "Sleep schedule?",
          type: "choice",
          options: ["Regular sleep schedule", "Irregular hours", "Can stay up for me", "Flexible", "Doesn't matter"]
        },
        {
          q: "Pet preference?",
          type: "choice",
          options: ["Dog person", "Cat person", "Loves all animals", "Not a pet person", "Open to pets"]
        },
        {
          q: "Travel enthusiasm?",
          type: "choice",
          options: ["Loves traveling", "Occasional traveler", "Homebody", "Adventurous explorer", "Balanced approach"]
        }
      ]
    },
    {
      name: "Social Life",
      icon: "👥",
      gradient: "from-indigo-500 to-purple-500",
      questions: [
        {
          q: "Friend circle?",
          type: "choice",
          options: ["Large friend group", "Small close group", "Few best friends", "More alone time", "Balanced social life"]
        },
        {
          q: "Social media activity?",
          type: "choice",
          options: ["Very active", "Moderate use", "Minimal presence", "Private account", "Doesn't use much"]
        },
        {
          q: "Posts about relationship?",
          type: "choice",
          options: ["Shows off relationship", "Occasional posts", "Very private", "Doesn't matter to me"]
        },
        {
          q: "Meeting friends vs couple time?",
          type: "choice",
          options: ["Prioritizes couple time", "Balances both well", "Social butterfly", "Includes me with friends"]
        },
        {
          q: "Female friends?",
          type: "choice",
          options: ["No female friends preferred", "Few female friends okay", "Many female friends", "Mature friendships fine"]
        },
        {
          q: "Family time?",
          type: "choice",
          options: ["Very family-oriented", "Regular family contact", "Independent", "Balanced approach"]
        },
        {
          q: "Social anxiety?",
          type: "choice",
          options: ["Very comfortable socially", "Slightly shy in groups", "Prefers small gatherings", "Understanding of anxiety"]
        },
        {
          q: "Party preference?",
          type: "choice",
          options: ["Loves parties", "Occasional party-goer", "Prefers quiet hangouts", "Flexible"]
        },
        {
          q: "Making new friends?",
          type: "choice",
          options: ["Makes friends easily", "Selective with friends", "Prefers existing friends", "Doesn't matter"]
        },
        {
          q: "Group activities?",
          type: "choice",
          options: ["Loves group activities", "Prefers one-on-one", "Both are fine", "Situational"]
        }
      ]
    },
    {
      name: "Values & Beliefs",
      icon: "⭐",
      gradient: "from-yellow-500 to-orange-500",
      questions: [
        {
          q: "Religious views?",
          type: "choice",
          options: ["Very religious", "Moderately religious", "Spiritual not religious", "Not religious", "Respects all beliefs"]
        },
        {
          q: "Political awareness?",
          type: "choice",
          options: ["Very politically aware", "Moderately aware", "Not interested in politics", "Doesn't matter"]
        },
        {
          q: "Honesty level?",
          type: "choice",
          options: ["Brutally honest always", "Honest but tactful", "Little white lies okay", "Transparency is key"]
        },
        {
          q: "Loyalty importance?",
          type: "choice",
          options: ["Extremely loyal (must)", "Generally loyal", "Depends on situation", "Trust is earned"]
        },
        {
          q: "Family values?",
          type: "choice",
          options: ["Family comes first", "Balances family and relationship", "Independent from family", "Creates own family values"]
        },
        {
          q: "Gender role views?",
          type: "choice",
          options: ["Traditional roles", "Modern/Equal partnership", "Flexible roles", "Doesn't believe in roles"]
        },
        {
          q: "Environmental consciousness?",
          type: "choice",
          options: ["Very eco-conscious", "Tries to be conscious", "Not a priority", "Doesn't matter"]
        },
        {
          q: "Charity/Giving back?",
          type: "choice",
          options: ["Very charitable", "Occasionally gives back", "Supports causes", "Doesn't matter"]
        },
        {
          q: "Work-life balance?",
          type: "choice",
          options: ["Work is priority", "Life is priority", "Perfect balance", "Flexible approach"]
        },
        {
          q: "Materialism?",
          type: "choice",
          options: ["Values experiences over things", "Likes nice things", "Minimalist", "Balanced approach"]
        }
      ]
    },
    {
      name: "Career & Ambition",
      icon: "💼",
      gradient: "from-cyan-500 to-blue-500",
      questions: [
        {
          q: "Career type preference?",
          type: "choice",
          options: ["Stable corporate job", "Entrepreneur/Business", "Creative field", "Service profession", "Doesn't matter"]
        },
        {
          q: "Work dedication?",
          type: "choice",
          options: ["Workaholic", "Dedicated but balanced", "Work to live", "Passionate about work", "Flexible"]
        },
        {
          q: "Income level?",
          type: "choice",
          options: ["High earner", "Stable income", "Growing career", "Money isn't everything", "Doesn't matter"]
        },
        {
          q: "Educational background?",
          type: "choice",
          options: ["Highly educated", "College educated", "Skilled/Trained", "Self-taught", "Doesn't matter"]
        },
        {
          q: "Career ambition?",
          type: "choice",
          options: ["Highly ambitious", "Moderately driven", "Content with current", "Still figuring out"]
        },
        {
          q: "Job stability?",
          type: "choice",
          options: ["Stable long-term job", "Job hopper", "Freelancer", "Entrepreneur risk", "Doesn't matter"]
        },
        {
          q: "Work hours?",
          type: "choice",
          options: ["9-5 schedule", "Flexible hours", "Long hours", "Work from home", "Balanced schedule"]
        },
        {
          q: "Future goals clarity?",
          type: "choice",
          options: ["Clear 5-year plan", "General direction", "Living in present", "Figuring it out"]
        },
        {
          q: "Side hustles?",
          type: "choice",
          options: ["Has side projects", "Focused on one thing", "Multi-talented", "Doesn't matter"]
        },
        {
          q: "Success definition?",
          type: "choice",
          options: ["Money and status", "Happiness and peace", "Making a difference", "Personal growth", "Balanced view"]
        }
      ]
    },
    {
      name: "Interests & Hobbies",
      icon: "🎮",
      gradient: "from-purple-500 to-pink-500",
      questions: [
        {
          q: "Gaming?",
          type: "choice",
          options: ["Avid gamer", "Casual gamer", "Mobile games", "Not into gaming", "Can game together"]
        },
        {
          q: "Sports interest?",
          type: "choice",
          options: ["Plays sports actively", "Watches sports", "Both plays and watches", "Not into sports", "Doesn't matter"]
        },
        {
          q: "Reading habits?",
          type: "choice",
          options: ["Bookworm", "Occasional reader", "Specific genres only", "Not a reader", "We can read together"]
        },
        {
          q: "Music taste?",
          type: "choice",
          options: ["Similar to mine", "Different but open", "Very specific taste", "Loves all music", "Doesn't matter"]
        },
        {
          q: "Movie/Series preference?",
          type: "choice",
          options: ["Binge-watcher", "Occasional viewer", "Specific genres", "Not into shows", "Can watch together"]
        },
        {
          q: "Outdoor activities?",
          type: "choice",
          options: ["Loves outdoors", "Occasional hikes", "Beach person", "Mountain person", "Indoor person"]
        },
        {
          q: "Creative hobbies?",
          type: "choice",
          options: ["Artistic/Creative", "Musical talent", "Writing/Poetry", "Photography", "Not creative", "Doesn't matter"]
        },
        {
          q: "Cooking as hobby?",
          type: "choice",
          options: ["Loves cooking", "Enjoys occasionally", "Baking person", "Not interested", "We can cook together"]
        },
        {
          q: "Car interest?",
          type: "choice",
          options: ["Car enthusiast", "Practical about cars", "Not into cars", "Bike person", "Doesn't matter"]
        },
        {
          q: "Tech savvy?",
          type: "choice",
          options: ["Very tech-savvy", "Moderately tech-aware", "Not very techy", "Doesn't matter"]
        }
      ]
    },
    {
      name: "Relationship Dynamics",
      icon: "💑",
      gradient: "from-rose-500 to-pink-500",
      questions: [
        {
          q: "Decision making?",
          type: "choice",
          options: ["Takes lead in decisions", "We decide together", "Lets me decide", "Depends on situation"]
        },
        {
          q: "Compromise ability?",
          type: "choice",
          options: ["Very compromising", "Finds middle ground", "Stands his ground", "Situational"]
        },
        {
          q: "Trust level?",
          type: "choice",
          options: ["Complete trust", "Trusts but verifies", "Takes time to trust", "Trust is earned"]
        },
        {
          q: "Space vs togetherness?",
          type: "choice",
          options: ["Wants lots of time together", "Balanced independence", "Needs personal space", "Flexible"]
        },
        {
          q: "Handling stress?",
          type: "choice",
          options: ["Shares stress with me", "Deals alone then shares", "Keeps to himself", "Depends on stress"]
        },
        {
          q: "Future planning?",
          type: "choice",
          options: ["Plans our future together", "Takes it day by day", "Open discussions", "Committed to long-term"]
        },
        {
          q: "Possessiveness?",
          type: "choice",
          options: ["A bit possessive (cute)", "Trusts completely", "Protective not possessive", "Balanced"]
        },
        {
          q: "Supporting dreams?",
          type: "choice",
          options: ["Actively supports my goals", "Encourages me", "We support each other", "Gives me space to grow"]
        },
        {
          q: "Handling my mood swings?",
          type: "choice",
          options: ["Very patient and understanding", "Tries to cheer me up", "Gives me space", "Talks it through"]
        },
        {
          q: "Long-term commitment?",
          type: "choice",
          options: ["Talks about marriage", "Takes it slow", "Committed but no rush", "Lives in present"]
        }
      ]
    },
    {
      name: "Little Things Matter",
      icon: "✨",
      gradient: "from-pink-500 to-purple-500",
      questions: [
        {
          q: "Remembers small details?",
          type: "choice",
          options: ["Remembers everything I say", "Remembers important things", "Needs reminders", "Tries his best"]
        },
        {
          q: "Surprises?",
          type: "choice",
          options: ["Loves surprising me", "Occasional surprises", "Not good with surprises", "Everyday surprises"]
        },
        {
          q: "How he says 'I love you'?",
          type: "choice",
          options: ["Says it often", "Shows through actions", "When he means it", "Through little things", "All the ways"]
        },
        {
          q: "Comfort during periods?",
          type: "choice",
          options: ["Very understanding and caring", "Gets me what I need", "Gives me space", "Doesn't know how to help"]
        },
        {
          q: "When I'm sick?",
          type: "choice",
          options: ["Takes care of everything", "Checks on me often", "Gives me space to rest", "Worried and caring"]
        },
        {
          q: "Sharing food?",
          type: "choice",
          options: ["Always shares his food", "Lets me eat from his plate", "Protective of food", "Orders extra for me"]
        },
        {
          q: "Random acts of love?",
          type: "choice",
          options: ["Daily little gestures", "Unexpected sweet things", "Shows love practically", "Big gestures"]
        },
        {
          q: "Notices when I'm upset?",
          type: "choice",
          options: ["Immediately knows", "Asks what's wrong", "Gives me time", "Might miss signals"]
        },
        {
          q: "Celebrates my wins?",
          type: "choice",
          options: ["My biggest cheerleader", "Genuinely happy for me", "Celebrates together", "Supportive always"]
        },
        {
          q: "Late night conversations?",
          type: "choice",
          options: ["Loves talking till late", "Sometimes late talks", "Needs sleep", "Depends on mood"]
        }
      ]
    },
    {
      name: "Fashion & Style",
      icon: "👔",
      gradient: "from-indigo-500 to-blue-500",
      questions: [
        {
          q: "Fashion sense?",
          type: "choice",
          options: ["Very stylish/Trendy", "Classic style", "Casual/Comfortable", "Doesn't care much", "Whatever suits him"]
        },
        {
          q: "Grooming?",
          type: "choice",
          options: ["Very well-groomed", "Clean and neat", "Natural/Minimal effort", "Doesn't matter"]
        },
        {
          q: "Cologne/Fragrance?",
          type: "choice",
          options: ["Always smells amazing", "Occasional cologne", "Natural scent", "Doesn't wear fragrance"]
        },
        {
          q: "Accessories?",
          type: "choice",
          options: ["Watches and accessories", "Minimal accessories", "No accessories", "Whatever looks good"]
        },
        {
          q: "Shoe game?",
          type: "choice",
          options: ["Sneaker head", "Formal shoes", "Comfortable over style", "Mixed collection"]
        },
        {
          q: "Casual vs Formal?",
          type: "choice",
          options: ["Loves dressing up", "Casual most times", "Balanced wardrobe", "Comfort first"]
        },
        {
          q: "Tattoos?",
          type: "choice",
          options: ["Has tattoos (hot)", "Open to tattoos", "No tattoos preferred", "Doesn't matter"]
        },
        {
          q: "Piercings?",
          type: "choice",
          options: ["Has ear piercings", "No piercings", "Doesn't matter at all"]
        },
        {
          q: "Takes style advice?",
          type: "choice",
          options: ["Loves when I help", "Open to suggestions", "Has own style", "We shop together"]
        },
        {
          q: "Gym wear?",
          type: "choice",
          options: ["Stylish gym outfits", "Functional workout clothes", "Doesn't matter"]
        }
      ]
    }
  ];

  const handleAnswer = (questionIndex: number, answer: string) => {
    const key = `${currentCategory}-${questionIndex}`;
    setAnswers(prev => ({ ...prev, [key]: answer }));
  };

  const totalQuestions = categories.reduce((acc, cat) => acc + cat.questions.length, 0);
  const answeredQuestions = Object.keys(answers).length;
  const progress = (answeredQuestions / totalQuestions) * 100;

  return (
    <SectionInner>
      <GlowOrb color="blue" className="top-20 right-10" />
      <GlowOrb color="cyan" className="bottom-20 left-10" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <SectionHeader 
          emoji="👨" 
          title="Design Your Dream Boy" 
          subtitle="Create him exactly the way you want — every single detail matters"
        />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <p className="text-white/40 text-base max-w-3xl mx-auto leading-relaxed mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            I want to know everything about the person who'd make your heart skip a beat. 
            Don't hold back — be completely honest. This is your chance to design your perfect someone, 
            and I promise I'll never judge. I just want to understand what makes you happy.
          </p>
          <p className="text-pink-400/60 text-sm italic">
            {totalQuestions} questions across {categories.length} categories
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/30 text-sm">Progress</span>
            <span className="text-pink-400 text-sm font-medium">{answeredQuestions}/{totalQuestions}</span>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Category Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-10">
          {categories.map((cat, idx) => (
            <motion.button
              key={idx}
              onClick={() => setCurrentCategory(idx)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-4 rounded-2xl border transition-all duration-300 ${
                currentCategory === idx
                  ? `bg-gradient-to-br ${cat.gradient} border-white/20 shadow-[0_0_30px_rgba(255,45,138,0.2)]`
                  : "bg-white/[0.02] border-white/[0.06] hover:border-white/[0.12]"
              }`}
            >
              <div className="text-3xl mb-2">{cat.icon}</div>
              <div className="text-xs font-medium text-white/70">{cat.name}</div>
              <div className="text-[10px] text-white/40 mt-1">
                {categories[idx].questions.filter((_, qIdx) => answers[`${idx}-${qIdx}`]).length}/{categories[idx].questions.length}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Questions */}
        <div className="space-y-6">
          <motion.div
            key={currentCategory}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className={`text-2xl font-bold mb-8 bg-gradient-to-r ${categories[currentCategory].gradient} bg-clip-text text-transparent`}>
              {categories[currentCategory].icon} {categories[currentCategory].name}
            </h3>
            
            {categories[currentCategory].questions.map((question, qIdx) => (
              <motion.div
                key={qIdx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: qIdx * 0.05 }}
                className="mb-8 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-all"
              >
                <h4 className="text-white/90 font-medium mb-4 text-lg">
                  {qIdx + 1}. {question.q}
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {question.options.map((option, oIdx) => {
                    const key = `${currentCategory}-${qIdx}`;
                    const isSelected = answers[key] === option;
                    
                    return (
                      <motion.button
                        key={oIdx}
                        onClick={() => handleAnswer(qIdx, option)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-4 rounded-xl text-left transition-all duration-300 ${
                          isSelected
                            ? `bg-gradient-to-r ${categories[currentCategory].gradient} text-white shadow-[0_0_20px_rgba(255,45,138,0.3)]`
                            : "bg-white/[0.03] border border-white/[0.08] text-white/60 hover:bg-white/[0.06] hover:border-white/[0.15] hover:text-white/80"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                            isSelected ? "border-white" : "border-white/20"
                          }`}>
                            {isSelected && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-3 h-3 rounded-full bg-white"
                              />
                            )}
                          </div>
                          <span className="text-sm font-medium">{option}</span>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-10">
          <button
            onClick={() => setCurrentCategory(Math.max(0, currentCategory - 1))}
            disabled={currentCategory === 0}
            className="px-6 py-3 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white/60 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/[0.08] transition-all"
          >
            ← Previous
          </button>
          
          <button
            onClick={() => {
              if (currentCategory < categories.length - 1) {
                setCurrentCategory(currentCategory + 1);
              } else {
                setShowResults(true);
              }
            }}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium shadow-[0_0_30px_rgba(255,45,138,0.3)] hover:shadow-[0_0_40px_rgba(255,45,138,0.5)] transition-all"
          >
            {currentCategory < categories.length - 1 ? "Next →" : "View My Design"}
          </button>
        </div>

        {/* Results Modal */}
        <AnimatePresence>
          {showResults && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/95 backdrop-blur-xl"
              onClick={() => setShowResults(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-2xl w-full bg-gradient-to-br from-dark-900 to-dark-950 rounded-3xl p-8 border border-white/10 max-h-[80vh] overflow-y-auto"
              >
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">💖</div>
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-2">
                    Thank You
                  </h3>
                  <p className="text-white/50">
                    You've answered {answeredQuestions} out of {totalQuestions} questions
                  </p>
                </div>
                
                <div className="space-y-4 mb-6">
                  <p className="text-white/70 leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Every answer you gave me is precious. I now understand a bit more about what makes your heart happy. 
                    Thank you for being honest and open with me. This means more than you know. 💕
                  </p>
                  <p className="text-pink-400/70 text-sm italic text-center">
                    "Understanding you is understanding how to love you better"
                  </p>
                </div>
                
                <button
                  onClick={() => setShowResults(false)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium"
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionInner>
  );
}

function KnowYouContent() {
  const [currentCategory, setCurrentCategory] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [showResults, setShowResults] = useState(false);

  const categories = [
    {
      name: "Food & Drinks",
      icon: "🍕",
      gradient: "from-orange-500 to-red-500",
      questions: [
        {
          q: "Favorite cuisine?",
          type: "choice",
          options: ["Indian", "Italian", "Chinese", "Mexican", "Thai", "Japanese", "Continental", "Mix of everything"]
        },
        {
          q: "Spice level?",
          type: "choice",
          options: ["Love spicy food", "Medium spice", "Mild preferred", "No spice at all"]
        },
        {
          q: "Sweet or Savory?",
          type: "choice",
          options: ["Sweet tooth!", "Savory person", "Both equally", "Depends on mood"]
        },
        {
          q: "Favorite sweet?",
          type: "choice",
          options: ["Chocolate", "Ice cream", "Cake", "Indian sweets", "Pastries", "Candies", "Fruits", "All sweets!"]
        },
        {
          q: "Coffee or Tea?",
          type: "choice",
          options: ["Coffee lover", "Tea person", "Both", "Neither", "Depends on time"]
        },
        {
          q: "Breakfast preference?",
          type: "choice",
          options: ["Heavy breakfast", "Light breakfast", "Just coffee", "Skip breakfast", "Brunch person"]
        },
        {
          q: "Street food?",
          type: "choice",
          options: ["Love street food", "Occasionally", "Not a fan", "Hygiene matters"]
        },
        {
          q: "Favorite snack?",
          type: "choice",
          options: ["Chips", "Chocolate", "Fruits", "Namkeen", "Cookies", "Healthy snacks", "Anything tasty"]
        },
        {
          q: "Pizza toppings?",
          type: "choice",
          options: ["Margherita", "Pepperoni", "Veggie", "Loaded", "Plain cheese", "Unique toppings"]
        },
        {
          q: "Trying new foods?",
          type: "choice",
          options: ["Adventurous eater", "Sometimes try new", "Stick to favorites", "Very picky"]
        }
      ]
    },
    {
      name: "Entertainment",
      icon: "🎬",
      gradient: "from-purple-500 to-pink-500",
      questions: [
        {
          q: "Favorite movie genre?",
          type: "choice",
          options: ["Romance", "Action", "Comedy", "Horror", "Thriller", "Drama", "Sci-Fi", "Fantasy", "Mix of all"]
        },
        {
          q: "Series or Movies?",
          type: "choice",
          options: ["Long series", "Movies", "Both equally", "Short series", "Anime"]
        },
        {
          q: "Favorite music genre?",
          type: "choice",
          options: ["Bollywood", "Pop", "Rock", "Hip-Hop/Rap", "Classical", "EDM", "Indie", "Everything"]
        },
        {
          q: "Book reader?",
          type: "choice",
          options: ["Bookworm", "Occasional reader", "Specific genres", "Not into reading", "Audiobooks"]
        },
        {
          q: "Favorite book genre?",
          type: "choice",
          options: ["Romance", "Fiction", "Mystery/Thriller", "Fantasy", "Self-help", "Biography", "Poetry", "Don't read much"]
        },
        {
          q: "Gaming?",
          type: "choice",
          options: ["Love gaming", "Casual gamer", "Mobile games", "Not into games", "Watch others play"]
        },
        {
          q: "YouTube or Netflix?",
          type: "choice",
          options: ["YouTube always", "Netflix binger", "Both equally", "Other platforms", "Don't watch much"]
        },
        {
          q: "Podcasts?",
          type: "choice",
          options: ["Love podcasts", "Occasionally", "Specific topics", "Not my thing"]
        },
        {
          q: "Concerts/Live shows?",
          type: "choice",
          options: ["Love concerts", "Would go for favorite artist", "Not interested", "Small gigs preferred"]
        },
        {
          q: "Binge-watching?",
          type: "choice",
          options: ["Binge whole series", "Few episodes at time", "One episode daily", "Not a binge-watcher"]
        }
      ]
    },
    {
      name: "Fashion & Style",
      icon: "👗",
      gradient: "from-pink-500 to-rose-500",
      questions: [
        {
          q: "Fashion style?",
          type: "choice",
          options: ["Trendy/Fashion-forward", "Classic/Timeless", "Casual/Comfortable", "Bohemian", "Sporty", "Mix of everything"]
        },
        {
          q: "Favorite color to wear?",
          type: "choice",
          options: ["Black", "White", "Pastels", "Bright colors", "Earth tones", "All colors"]
        },
        {
          q: "Dresses or Jeans?",
          type: "choice",
          options: ["Love dresses", "Jeans person", "Both equally", "Traditional wear", "Skirts", "Whatever's comfortable"]
        },
        {
          q: "Makeup?",
          type: "choice",
          options: ["Full glam", "Natural/Minimal", "No makeup", "Depends on occasion", "Just lipstick"]
        },
        {
          q: "Jewelry?",
          type: "choice",
          options: ["Love accessories", "Minimal jewelry", "Statement pieces", "No jewelry", "Depends on outfit"]
        },
        {
          q: "Heels or Flats?",
          type: "choice",
          options: ["Heels always", "Comfort over style", "Sneakers", "Depends on occasion", "Mix of both"]
        },
        {
          q: "Hair style preference?",
          type: "choice",
          options: ["Long hair", "Medium length", "Short hair", "Changes often", "Experimenting"]
        },
        {
          q: "Shopping frequency?",
          type: "choice",
          options: ["Love shopping", "Occasional shopper", "Online shopping", "Only when needed", "Window shopping"]
        },
        {
          q: "Brand conscious?",
          type: "choice",
          options: ["Love brands", "Quality over brand", "Mix of both", "Thrift shopping", "Not brand conscious"]
        },
        {
          q: "Perfume?",
          type: "choice",
          options: ["Always wear perfume", "Occasionally", "Specific scents", "Natural scent", "Body mist"]
        }
      ]
    },
    {
      name: "Daily Life",
      icon: "☀️",
      gradient: "from-yellow-500 to-orange-500",
      questions: [
        {
          q: "Morning routine?",
          type: "choice",
          options: ["Early riser", "Snooze button lover", "Depends on day", "Night owl", "No fixed routine"]
        },
        {
          q: "Shower preference?",
          type: "choice",
          options: ["Morning shower", "Night shower", "Both", "Depends on mood", "Long relaxing baths"]
        },
        {
          q: "Room temperature?",
          type: "choice",
          options: ["Love AC/Cold", "Warm room", "Natural temperature", "Changes with season"]
        },
        {
          q: "Sleep schedule?",
          type: "choice",
          options: ["Early sleeper", "Night owl", "Irregular", "8 hours must", "Flexible"]
        },
        {
          q: "Pillow count?",
          type: "choice",
          options: ["One pillow", "Two pillows", "Many pillows", "Body pillow", "Doesn't matter"]
        },
        {
          q: "Organized or Messy?",
          type: "choice",
          options: ["Very organized", "Organized chaos", "A bit messy", "Minimalist", "Depends on mood"]
        },
        {
          q: "Phone usage?",
          type: "choice",
          options: ["Always on phone", "Moderate usage", "Minimal usage", "Depends on day", "Trying to reduce"]
        },
        {
          q: "Social media platform?",
          type: "choice",
          options: ["Instagram", "Snapchat", "Twitter/X", "Facebook", "Multiple", "Not active"]
        },
        {
          q: "Planner or Spontaneous?",
          type: "choice",
          options: ["Plans everything", "Mix of both", "Very spontaneous", "Go with flow"]
        },
        {
          q: "Alone time need?",
          type: "choice",
          options: ["Need lots of alone time", "Occasional me-time", "Social butterfly", "Balanced"]
        }
      ]
    },
    {
      name: "Hobbies & Interests",
      icon: "🎨",
      gradient: "from-indigo-500 to-purple-500",
      questions: [
        {
          q: "Creative outlet?",
          type: "choice",
          options: ["Painting/Drawing", "Writing", "Crafting", "Photography", "Cooking/Baking", "Music", "Not creative", "Multiple interests"]
        },
        {
          q: "Sports/Exercise?",
          type: "choice",
          options: ["Gym regularly", "Yoga/Meditation", "Dance", "Sports", "Walking/Running", "Not into fitness"]
        },
        {
          q: "Indoor or Outdoor?",
          type: "choice",
          options: ["Indoor person", "Outdoor lover", "Balanced", "Depends on weather"]
        },
        {
          q: "Favorite season?",
          type: "choice",
          options: ["Summer", "Monsoon", "Autumn", "Winter", "Spring", "Love all seasons"]
        },
        {
          q: "Beach or Mountains?",
          type: "choice",
          options: ["Beach person", "Mountain lover", "Both equally", "City person", "Countryside"]
        },
        {
          q: "Pets?",
          type: "choice",
          options: ["Dog lover", "Cat person", "Both", "Other pets", "Not a pet person", "Love all animals"]
        },
        {
          q: "Collection hobby?",
          type: "choice",
          options: ["Collect items", "Minimalist", "Depends on item", "Not into collecting"]
        },
        {
          q: "Gardening?",
          type: "choice",
          options: ["Love plants", "Have few plants", "Kills plants", "Not interested"]
        },
        {
          q: "Learning new skills?",
          type: "choice",
          options: ["Always learning", "Occasionally", "Specific interests", "Not much time"]
        },
        {
          q: "Photography?",
          type: "choice",
          options: ["Love clicking photos", "Occasional", "Hate photos", "Like being photographed"]
        }
      ]
    },
    {
      name: "Social Life",
      icon: "👥",
      gradient: "from-green-500 to-teal-500",
      questions: [
        {
          q: "Social battery?",
          type: "choice",
          options: ["Social butterfly", "Selective socializing", "Introvert", "Ambivert"]
        },
        {
          q: "Party preference?",
          type: "choice",
          options: ["Love parties", "Small gatherings", "One-on-one hangouts", "Homebody", "Depends on mood"]
        },
        {
          q: "Friend circle?",
          type: "choice",
          options: ["Large friend group", "Small close group", "Few best friends", "Prefer alone", "Quality over quantity"]
        },
        {
          q: "Making new friends?",
          type: "choice",
          options: ["Very friendly", "Takes time to open", "Selective", "Not looking for new friends"]
        },
        {
          q: "Texting style?",
          type: "choice",
          options: ["Quick replies", "Long messages", "Voice notes", "Calls preferred", "Depends on person"]
        },
        {
          q: "Social media posting?",
          type: "choice",
          options: ["Regular posts", "Story person", "Occasional posts", "Lurker", "Very private"]
        },
        {
          q: "Gifts giving?",
          type: "choice",
          options: ["Thoughtful gifts", "Practical gifts", "Handmade gifts", "Experience gifts", "Not good at gifts"]
        },
        {
          q: "Helping others?",
          type: "choice",
          options: ["Always helping", "When I can", "Close ones only", "Prefer not to", "Depends on situation"]
        },
        {
          q: "Gossip?",
          type: "choice",
          options: ["Hate gossip", "Harmless fun", "Sometimes listen", "Source of updates"]
        },
        {
          q: "Conflict handling?",
          type: "choice",
          options: ["Confront directly", "Avoid conflict", "Need time to process", "Talk it out"]
        }
      ]
    },
    {
      name: "Travel & Adventure",
      icon: "✈️",
      gradient: "from-blue-500 to-cyan-500",
      questions: [
        {
          q: "Travel enthusiasm?",
          type: "choice",
          options: ["Love traveling", "Occasional trips", "Homebody", "Would love to travel more"]
        },
        {
          q: "Travel style?",
          type: "choice",
          options: ["Planned itinerary", "Spontaneous trips", "Mix of both", "Luxury travel", "Budget backpacking"]
        },
        {
          q: "Domestic or International?",
          type: "choice",
          options: ["Explore India first", "International travel", "Both equally", "Nearby places"]
        },
        {
          q: "Solo or Group travel?",
          type: "choice",
          options: ["Solo traveler", "With friends", "Family trips", "Partner travel", "Small groups"]
        },
        {
          q: "Bucket list destination?",
          type: "choice",
          options: ["Europe", "USA", "Asia", "Australia", "Africa", "South America", "Multiple places", "Happy anywhere"]
        },
        {
          q: "Road trip or Flight?",
          type: "choice",
          options: ["Road trips", "Flights", "Train journeys", "Depends on distance"]
        },
        {
          q: "Beach vacation or City tour?",
          type: "choice",
          options: ["Beach relaxation", "City exploration", "Mountain getaway", "Mix of everything"]
        },
        {
          q: "Souvenirs?",
          type: "choice",
          options: ["Collect souvenirs", "Photos are enough", "Local items", "Not into souvenirs"]
        },
        {
          q: "Adventure activities?",
          type: "choice",
          options: ["Thrill seeker", "Some activities", "Watch others", "Prefer relaxation"]
        },
        {
          q: "Tourist spots or Off-beat?",
          type: "choice",
          options: ["Famous tourist spots", "Off-beat places", "Local experiences", "Mix of both"]
        }
      ]
    },
    {
      name: "Future Dreams",
      icon: "🌟",
      gradient: "from-purple-500 to-pink-500",
      questions: [
        {
          q: "Career aspiration?",
          type: "choice",
          options: ["Corporate career", "Entrepreneur", "Creative field", "Service profession", "Still exploring", "Work-life balance matters"]
        },
        {
          q: "Education goals?",
          type: "choice",
          options: ["Higher studies", "Professional courses", "Content with current", "Skill-based learning", "Lifelong learner"]
        },
        {
          q: "Living preference?",
          type: "choice",
          options: ["Big city", "Small town", "Abroad", "Hometown", "Flexible", "Wherever life takes"]
        },
        {
          q: "Own house dream?",
          type: "choice",
          options: ["Dream house", "Apartment", "Villa", "Doesn't matter", "Not priority"]
        },
        {
          q: "Family planning?",
          type: "choice",
          options: ["Want kids", "No kids", "Maybe someday", "Haven't thought", "Depends on partner"]
        },
        {
          q: "Pet dreams?",
          type: "choice",
          options: ["Definitely want pets", "Maybe pets", "No pets", "Already have/had pets"]
        },
        {
          q: "Work from home or Office?",
          type: "choice",
          options: ["WFH preferred", "Office person", "Hybrid", "Flexible", "Doesn't matter"]
        },
        {
          q: "Retirement age?",
          type: "choice",
          options: ["Early retirement", "Standard age", "Never retire", "Haven't thought", "Depends on finances"]
        },
        {
          q: "Hobbies to pursue?",
          type: "choice",
          options: ["Have dream hobbies", "Want to learn new", "Content with current", "Too many interests"]
        },
        {
          q: "Life goal?",
          type: "choice",
          options: ["Financial freedom", "Happy family", "Make a difference", "Personal growth", "Adventure and experiences", "Balance everything"]
        }
      ]
    },
    {
      name: "Love & Relationships",
      icon: "💕",
      gradient: "from-rose-500 to-pink-500",
      questions: [
        {
          q: "Love language (receiving)?",
          type: "choice",
          options: ["Words of affirmation", "Quality time", "Physical touch", "Acts of service", "Gifts", "All of them"]
        },
        {
          q: "Relationship priority?",
          type: "choice",
          options: ["Very high priority", "Important but balanced", "Part of life", "Takes time"]
        },
        {
          q: "Ideal date?",
          type: "choice",
          options: ["Fancy dinner", "Netflix and chill", "Adventure activity", "Long drive", "Home-cooked meal", "Surprise me"]
        },
        {
          q: "Communication in relationship?",
          type: "choice",
          options: ["Talk everything out", "Need space sometimes", "Mix of both", "Actions over words"]
        },
        {
          q: "Jealousy feeling?",
          type: "choice",
          options: ["Get jealous sometimes", "Very secure", "Depends on situation", "Protective feelings"]
        },
        {
          q: "Past relationships impact?",
          type: "choice",
          options: ["Learned from past", "Past is past", "Still healing", "No past relationships", "Shaped who I am"]
        },
        {
          q: "Expressing love?",
          type: "choice",
          options: ["Very expressive", "Through actions", "Words and actions", "Need encouragement", "Depends on comfort"]
        },
        {
          q: "Relationship goals?",
          type: "choice",
          options: ["Marriage minded", "Take it slow", "Living in present", "Serious commitment", "Still figuring out"]
        },
        {
          q: "Deal breakers?",
          type: "choice",
          options: ["Lying", "Disrespect", "Cheating", "Lack of effort", "Multiple things", "Few things"]
        },
        {
          q: "Love at first sight?",
          type: "choice",
          options: ["Believe in it", "Doesn't happen", "Happened to me", "Skeptical", "Love grows over time"]
        }
      ]
    },
    {
      name: "Random Fun Facts",
      icon: "🎯",
      gradient: "from-cyan-500 to-blue-500",
      questions: [
        {
          q: "Superpower choice?",
          type: "choice",
          options: ["Invisibility", "Flying", "Time travel", "Mind reading", "Teleportation", "Super strength"]
        },
        {
          q: "Zombie apocalypse?",
          type: "choice",
          options: ["Leader", "Strategist", "First to panic", "Survival mode", "Team player"]
        },
        {
          q: "Lucky number?",
          type: "choice",
          options: ["Have one", "Don't believe in it", "Multiple numbers", "Changes"]
        },
        {
          q: "Astrology belief?",
          type: "choice",
          options: ["Strongly believe", "Fun to read", "Skeptical", "Don't believe", "Depends"]
        },
        {
          q: "Dream job as kid?",
          type: "choice",
          options: ["Doctor", "Teacher", "Artist", "Astronaut", "Actor", "Something else", "Many dreams"]
        },
        {
          q: "Pineapple on pizza?",
          type: "choice",
          options: ["Love it", "Hate it", "Neutral", "Never tried", "Depends on mood"]
        },
        {
          q: "Morning or Evening person?",
          type: "choice",
          options: ["Morning", "Evening", "Night", "Afternoon", "All times"]
        },
        {
          q: "Rain mood?",
          type: "choice",
          options: ["Love rain", "Cozy inside", "Gets me down", "Neutral", "Depends on plans"]
        },
        {
          q: "Texting 'K' means?",
          type: "choice",
          options: ["I'm upset", "Just okay", "In a hurry", "Nothing much", "Depends"]
        },
        {
          q: "If you could meet anyone?",
          type: "choice",
          options: ["Historical figure", "Celebrity", "Family ancestor", "Fictional character", "Future self", "You already know who"]
        }
      ]
    }
  ];

  const handleAnswer = (questionIndex: number, answer: string) => {
    const key = `${currentCategory}-${questionIndex}`;
    setAnswers(prev => ({ ...prev, [key]: answer }));
  };

  const totalQuestions = categories.reduce((acc, cat) => acc + cat.questions.length, 0);
  const answeredQuestions = Object.keys(answers).length;
  const progress = (answeredQuestions / totalQuestions) * 100;

  return (
    <SectionInner>
      <GlowOrb color="pink" className="top-20 left-10" />
      <GlowOrb color="rose" className="bottom-20 right-10" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <SectionHeader 
          emoji="💝" 
          title="Let Me Know You" 
          subtitle="Every little detail, every preference, everything that makes you YOU"
        />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <p className="text-white/40 text-base max-w-3xl mx-auto leading-relaxed mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            I want to know you deeper than anyone ever has. Your favorite foods, your dreams, your quirks, 
            your preferences — everything. Don't skip anything, even the smallest details matter to me. 
            Because knowing you is how I learn to love you better.
          </p>
          <p className="text-pink-400/60 text-sm italic">
            {totalQuestions} questions across {categories.length} categories
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/30 text-sm">Progress</span>
            <span className="text-pink-400 text-sm font-medium">{answeredQuestions}/{totalQuestions}</span>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-pink-500 to-rose-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Category Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-10">
          {categories.map((cat, idx) => (
            <motion.button
              key={idx}
              onClick={() => setCurrentCategory(idx)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-4 rounded-2xl border transition-all duration-300 ${
                currentCategory === idx
                  ? `bg-gradient-to-br ${cat.gradient} border-white/20 shadow-[0_0_30px_rgba(255,45,138,0.2)]`
                  : "bg-white/[0.02] border-white/[0.06] hover:border-white/[0.12]"
              }`}
            >
              <div className="text-3xl mb-2">{cat.icon}</div>
              <div className="text-xs font-medium text-white/70">{cat.name}</div>
              <div className="text-[10px] text-white/40 mt-1">
                {categories[idx].questions.filter((_, qIdx) => answers[`${idx}-${qIdx}`]).length}/{categories[idx].questions.length}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Questions */}
        <div className="space-y-6">
          <motion.div
            key={currentCategory}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className={`text-2xl font-bold mb-8 bg-gradient-to-r ${categories[currentCategory].gradient} bg-clip-text text-transparent`}>
              {categories[currentCategory].icon} {categories[currentCategory].name}
            </h3>
            
            {categories[currentCategory].questions.map((question, qIdx) => (
              <motion.div
                key={qIdx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: qIdx * 0.05 }}
                className="mb-8 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-all"
              >
                <h4 className="text-white/90 font-medium mb-4 text-lg">
                  {qIdx + 1}. {question.q}
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {question.options.map((option, oIdx) => {
                    const key = `${currentCategory}-${qIdx}`;
                    const isSelected = answers[key] === option;
                    
                    return (
                      <motion.button
                        key={oIdx}
                        onClick={() => handleAnswer(qIdx, option)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-4 rounded-xl text-left transition-all duration-300 ${
                          isSelected
                            ? `bg-gradient-to-r ${categories[currentCategory].gradient} text-white shadow-[0_0_20px_rgba(255,45,138,0.3)]`
                            : "bg-white/[0.03] border border-white/[0.08] text-white/60 hover:bg-white/[0.06] hover:border-white/[0.15] hover:text-white/80"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                            isSelected ? "border-white" : "border-white/20"
                          }`}>
                            {isSelected && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-3 h-3 rounded-full bg-white"
                              />
                            )}
                          </div>
                          <span className="text-sm font-medium">{option}</span>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-10">
          <button
            onClick={() => setCurrentCategory(Math.max(0, currentCategory - 1))}
            disabled={currentCategory === 0}
            className="px-6 py-3 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white/60 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/[0.08] transition-all"
          >
            ← Previous
          </button>
          
          <button
            onClick={() => {
              if (currentCategory < categories.length - 1) {
                setCurrentCategory(currentCategory + 1);
              } else {
                setShowResults(true);
              }
            }}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium shadow-[0_0_30px_rgba(255,45,138,0.3)] hover:shadow-[0_0_40px_rgba(255,45,138,0.5)] transition-all"
          >
            {currentCategory < categories.length - 1 ? "Next →" : "Complete"}
          </button>
        </div>

        {/* Results Modal */}
        <AnimatePresence>
          {showResults && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/95 backdrop-blur-xl"
              onClick={() => setShowResults(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-2xl w-full bg-gradient-to-br from-dark-900 to-dark-950 rounded-3xl p-8 border border-white/10 max-h-[80vh] overflow-y-auto"
              >
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">💖</div>
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent mb-2">
                    I Know You Better Now
                  </h3>
                  <p className="text-white/50">
                    You've shared {answeredQuestions} things about yourself
                  </p>
                </div>
                
                <div className="space-y-4 mb-6">
                  <p className="text-white/70 leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Thank you for opening up to me. Every answer you gave is a piece of the puzzle that is you. 
                    I feel closer to you now, like I understand your heart a little better. 
                    This means the world to me. 💕
                  </p>
                  <p className="text-pink-400/70 text-sm italic text-center">
                    "The more I know you, the more I fall for you"
                  </p>
                </div>
                
                <button
                  onClick={() => setShowResults(false)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium"
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionInner>
  );
}

function ForeverContent() {
  const [showMessage, setShowMessage] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => { setClickCount((c) => c + 1); setShowMessage(true); };

  return (
    <SectionInner className="min-h-[80vh] flex items-center justify-center">
      <GlowOrb color="pink" className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <GlowOrb color="purple" className="top-10 right-10" />
      <GlowOrb color="magenta" className="bottom-10 left-10" />
      <div className="text-center max-w-3xl mx-auto relative z-10">
        <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 60, delay: 0.3 }} className="mb-10">
          <InfinityIcon className="w-20 h-20 text-pink-500 mx-auto drop-shadow-[0_0_30px_rgba(255,45,138,0.5)]" />
        </motion.div>
        <motion.h2 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-glow bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 bg-clip-text text-transparent mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>
          Forever & Always
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="text-white/30 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
          No matter what life throws at us, no matter where the road takes us, I will always find my way back to you. Because you are my home, my heart, and my forever.
        </motion.p>
        <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleClick} className="relative px-10 py-5 rounded-2xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 text-white font-semibold text-lg shadow-[0_0_40px_rgba(255,45,138,0.3)] hover:shadow-[0_0_60px_rgba(255,45,138,0.5)] transition-all inline-flex items-center gap-3 overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
          <Heart className="w-5 h-5 fill-white animate-heartbeat relative z-10" />
          <span className="relative z-10">{clickCount === 0 ? "Click If You Love Me Too" : `Clicked ${clickCount} time${clickCount > 1 ? "s" : ""}! 💕`}</span>
          <Heart className="w-5 h-5 fill-white animate-heartbeat relative z-10" />
        </motion.button>
        <AnimatePresence>
          {showMessage && (
            <motion.div initial={{ opacity: 0, y: 40, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="mt-14">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-br from-pink-500/15 via-transparent to-purple-500/15 rounded-[32px] blur-xl" />
                <div className="relative glass-strong rounded-[24px] p-8 md:p-10 gradient-border">
                  <div className="text-6xl mb-6">🥺💖</div>
                  <h3 className="text-3xl md:text-4xl font-extrabold text-pink-400 text-glow mb-5" style={{ fontFamily: "'Poppins', sans-serif" }}>I LOVE YOU SO MUCH!</h3>
                  <div className="text-white/40 text-base md:text-lg leading-relaxed space-y-2 max-w-lg mx-auto">
                    <p>You just made my heart explode! 💕</p>
                    <p>You are the best thing that has ever happened to me.</p>
                    <p>Never forget that. Never forget how special you are.</p>
                    <p className="text-pink-400/70 font-semibold pt-2">You are loved. You are cherished. You are mine. 💖</p>
                  </div>
                  <div className="flex items-center justify-center gap-2 mt-8">
                    {["💖", "💕", "💗", "💓", "💝", "💘", "💞", "❤️‍🔥"].map((e, i) => (
                      <motion.span key={i} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.08, type: "spring" }} className="text-xl md:text-2xl">{e}</motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionInner>
  );
}

// =============================================
// SECTION RENDERER MAP
// =============================================
const sectionContentMap: Record<string, () => React.ReactNode> = {
  reasons: () => <ReasonsContent />,
  story: () => <StoryContent />,
  memories: () => <MemoriesContent />,
  playlist: () => <PlaylistContent />,
  dreamboy: () => <DreamBoyContent />,
  knowyou: () => <KnowYouContent />,
  promises: () => <PromisesContent />,
  compliments: () => <ComplimentsContent />,
  lovefacts: () => <LoveFactsContent />,
  quiz: () => <QuizContent />,
  quotes: () => <QuotesContent />,
  forever: () => <ForeverContent />,
};

// =============================================
// MAIN SITE EXPORT
// =============================================
export default function MainSite() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const activeTile = sectionTiles.find((t) => t.id === activeSection);

  return (
    <div className="bg-[#030306] min-h-screen relative">
      <AnimatePresence mode="wait">
        {activeSection === null ? (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <TileHomepage onOpenSection={(id) => setActiveSection(id)} />
          </motion.div>
        ) : (
          <motion.div key={activeSection} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <SectionView
              id={activeSection}
              onBack={() => setActiveSection(null)}
              gradient={activeTile?.gradient || "from-pink-500 to-purple-500"}
              emoji={activeTile?.emoji || "💖"}
              title={activeTile?.title || ""}
            >
              {sectionContentMap[activeSection]?.()}
            </SectionView>
          </motion.div>
        )}
      </AnimatePresence>

      <FloatingNav
        onOpenSection={(id) => setActiveSection(id)}
        currentSection={activeSection}
        onBack={() => setActiveSection(null)}
      />
    </div>
  );
}
