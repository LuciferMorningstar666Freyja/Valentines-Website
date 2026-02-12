import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Heart } from "lucide-react";

export function Section({
  children,
  className = "",
  id = "",
  dark = false,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  dark?: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
      className={`relative py-24 md:py-32 px-4 md:px-8 overflow-hidden ${
        dark ? "bg-dark-800/30" : ""
      } ${className}`}
    >
      {children}
    </motion.section>
  );
}

export function SectionTitle({
  children,
  sub,
  emoji,
}: {
  children: React.ReactNode;
  sub?: string;
  emoji?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
      className="text-center mb-16 md:mb-20"
    >
      {emoji && (
        <span className="text-4xl block mb-4">{emoji}</span>
      )}
      <h2
        className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-glow-pink via-glow-rose to-glow-purple bg-clip-text text-transparent animate-gradient-shift leading-tight"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        {children}
      </h2>
      {sub && (
        <p className="text-white/30 mt-4 text-base md:text-lg font-light max-w-lg mx-auto">
          {sub}
        </p>
      )}
      <div className="flex items-center justify-center gap-3 mt-6">
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-glow-pink/40" />
        <Heart className="w-3 h-3 text-glow-pink/40 fill-glow-pink/40 animate-heartbeat" />
        <div className="h-px w-12 bg-gradient-to-l from-transparent to-glow-pink/40" />
      </div>
    </motion.div>
  );
}

export function GlowOrb({
  color = "pink",
  size = "md",
  className = "",
}: {
  color?: "pink" | "purple" | "blue" | "cyan" | "magenta";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const colorMap = {
    pink: "bg-glow-pink/8",
    purple: "bg-glow-purple/8",
    blue: "bg-glow-blue/8",
    cyan: "bg-glow-cyan/5",
    magenta: "bg-glow-magenta/6",
  };
  const sizeMap = {
    sm: "w-40 h-40",
    md: "w-64 h-64",
    lg: "w-96 h-96",
    xl: "w-[500px] h-[500px]",
  };
  return (
    <div
      className={`absolute rounded-full blur-[100px] animate-glow-pulse pointer-events-none ${colorMap[color]} ${sizeMap[size]} ${className}`}
    />
  );
}

export function ParticleField() {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 5,
    dur: Math.random() * 4 + 2,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-glow-pink/20 animate-twinkle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.dur}s`,
          }}
        />
      ))}
    </div>
  );
}

export function Card({
  children,
  className = "",
  hover = true,
  glow = "pink",
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: "pink" | "purple";
}) {
  return (
    <motion.div
      whileHover={hover ? { y: -6, scale: 1.02 } : undefined}
      transition={{ duration: 0.3 }}
      className={`glass rounded-2xl p-6 transition-all duration-300 ${
        hover
          ? glow === "pink"
            ? "hover:box-glow cursor-default hover:border-glow-pink/15"
            : "hover:box-glow-purple cursor-default hover:border-glow-purple/15"
          : ""
      } ${className}`}
    >
      {children}
    </motion.div>
  );
}
