import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Lock, Unlock, Sparkles, KeyRound } from "lucide-react";

interface Props {
  onUnlock: () => void;
}

export default function PasswordScreen({ onUnlock }: Props) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; x: number; delay: number; size: number; dur: number }[]>([]);
  const [focused, setFocused] = useState(false);

  const SECRET = "iloveyou";

  useEffect(() => {
    const newHearts = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 12,
      size: Math.random() * 18 + 8,
      dur: Math.random() * 8 + 6,
    }));
    setHearts(newHearts);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase().trim() === SECRET) {
      onUnlock();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 600);
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center relative overflow-hidden">
      {/* Stars background */}
      {Array.from({ length: 60 }).map((_, i) => (
        <div
          key={`star-${i}`}
          className="absolute w-px h-px bg-white rounded-full animate-twinkle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
          }}
        />
      ))}

      {/* Floating hearts */}
      {hearts.map((h) => (
        <div
          key={h.id}
          className="absolute text-glow-pink/10 animate-fall pointer-events-none select-none"
          style={{
            left: `${h.x}%`,
            animationDelay: `${h.delay}s`,
            animationDuration: `${h.dur}s`,
            fontSize: `${h.size}px`,
          }}
        >
          ♥
        </div>
      ))}

      {/* Ambient glow orbs */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-glow-pink/8 rounded-full blur-[120px] animate-glow-pulse pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-glow-purple/8 rounded-full blur-[100px] animate-glow-pulse pointer-events-none" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-glow-magenta/5 rounded-full blur-[80px] animate-glow-pulse pointer-events-none" style={{ animationDelay: "4s" }} />

      {/* Orbiting elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="animate-orbit" style={{ animationDuration: "25s" }}>
          <Sparkles className="w-3 h-3 text-glow-pink/30" />
        </div>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="animate-orbit" style={{ animationDuration: "30s", animationDelay: "-10s" }}>
          <Heart className="w-3 h-3 text-glow-purple/20 fill-glow-purple/20" />
        </div>
      </div>

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1, x: shake ? [0, -12, 12, -8, 8, -4, 4, 0] : 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 w-full max-w-[420px] mx-4"
      >
        {/* Card glow behind */}
        <div className="absolute -inset-1 bg-gradient-to-br from-glow-pink/20 via-glow-purple/10 to-glow-blue/20 rounded-[28px] blur-xl opacity-50" />
        
        <div className="relative glass-strong rounded-[24px] p-8 md:p-10 gradient-border">
          {/* Top decoration */}
          <div className="absolute -top-px left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-glow-pink to-transparent" />
          
          <div className="text-center mb-8">
            {/* Animated heart with ripple */}
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 rounded-full bg-glow-pink/20 animate-ripple" />
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-glow-pink/20 to-glow-purple/20 flex items-center justify-center">
                  <Heart className="w-10 h-10 text-glow-pink fill-glow-pink drop-shadow-[0_0_20px_rgba(255,45,138,0.6)]" />
                </div>
              </motion.div>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold mb-2"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              <span className="bg-gradient-to-r from-glow-pink via-glow-rose to-glow-purple bg-clip-text text-transparent">
                For Your Eyes Only
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-white/30 text-sm"
            >
              This secret place is waiting for you...
            </motion.p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="relative group"
            >
              <div className={`absolute -inset-px rounded-2xl bg-gradient-to-r from-glow-pink/50 to-glow-purple/50 opacity-0 transition-opacity duration-300 blur-sm ${focused ? "opacity-100" : "group-hover:opacity-50"}`} />
              <div className="relative flex items-center">
                <div className="absolute left-4 z-10">
                  <KeyRound className={`w-4 h-4 transition-colors duration-300 ${focused ? "text-glow-pink" : "text-white/20"}`} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  placeholder="Type the magic words..."
                  className="w-full bg-dark-800/80 border border-white/8 rounded-2xl py-3.5 pl-11 pr-4 text-white text-sm placeholder-white/15 focus:outline-none transition-all relative z-[1]"
                />
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(255,45,138,0.4)" }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-glow-pink via-glow-magenta to-glow-purple text-white font-semibold text-sm flex items-center justify-center gap-2.5 shadow-[0_0_25px_rgba(255,45,138,0.25)] transition-all relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
              <Unlock className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Unlock My Heart</span>
            </motion.button>
          </form>

          {/* Hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex items-center justify-center gap-1.5 mt-6"
          >
            <Lock className="w-3 h-3 text-white/15" />
            <p className="text-white/15 text-xs italic">Hint: What do I feel for you?</p>
            <Sparkles className="w-3 h-3 text-white/15" />
          </motion.div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="mt-4 text-center"
              >
                <p className="text-red-400/80 text-sm">💔 That's not it... try again, love</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
