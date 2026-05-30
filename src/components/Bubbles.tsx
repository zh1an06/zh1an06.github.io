import { motion } from 'framer-motion';

export default function Bubbles({ count = 18 }: { count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, index) => {
        const size = 32 + (index % 5) * 15;
        return (
          <motion.span
            key={index}
            className="absolute rounded-full border border-white/45 bg-white/10 backdrop-blur-sm"
            style={{ left: `${(index * 29) % 100}%`, bottom: -90, width: size, height: size }}
            animate={{ y: [0, -920], x: [0, index % 2 ? 26 : -26, 0], opacity: [0, 0.58, 0] }}
            transition={{ duration: 9 + (index % 5), repeat: Infinity, delay: index * 0.45, ease: 'easeInOut' }}
          />
        );
      })}
    </div>
  );
}
