import { AnimatePresence, motion } from 'framer-motion';
import type { Memory } from '../data/memories';

export default function PolaroidModal({ memory, onClose }: { memory: Memory | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {memory && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            onClick={(event) => event.stopPropagation()}
            className="relative w-[min(86vw,560px)] rounded-lg bg-white p-4 pb-9 shadow-2xl"
            initial={{ scale: 0.72, rotate: -6, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0.82, rotate: 5, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 20 }}
          >
            <button onClick={onClose} className="absolute -right-3 -top-3 z-10 h-11 w-11 rounded-full bg-rose text-xl font-black text-bear shadow-card">
              ×
            </button>
            <div className="h-[60vh] max-h-[520px] min-h-[320px] overflow-hidden rounded-md bg-cream">
              <img
                src={memory.image}
                alt={memory.title}
                className="h-full w-full object-cover"
                onError={(event) => {
                  event.currentTarget.style.opacity = '0';
                }}
              />
            </div>
            <h3 className="mt-4 text-center text-2xl font-black text-cocoa">{memory.title}</h3>
            <p className="mx-auto mt-3 max-w-md whitespace-pre-wrap text-center text-base leading-7 text-bear">{memory.message}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
