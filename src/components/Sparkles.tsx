import { motion } from 'framer-motion';

export default function Sparkles({ count = 34 }: { count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, index) => {
        const size = 5 + (index % 5) * 3;
        return (
          <motion.span
            key={index}
            className="absolute rounded-full bg-white/80 shadow-glow"
            style={{ left: `${(index * 37) % 100}%`, top: `${(index * 53) % 100}%`, width: size, height: size }}
            animate={{ y: [0, -20, 0], opacity: [0.18, 1, 0.18], scale: [0.7, 1.25, 0.7] }}
            transition={{ duration: 3 + (index % 5), repeat: Infinity, delay: index * 0.1 }}
          />
        );
      })}
    </div>
  );
}
