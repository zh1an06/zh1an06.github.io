import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import HomePage from './components/HomePage';
import CakePage from './components/CakePage';
import MemoryPage from './components/MemoryPage';
import FinalPage from './components/FinalPage';

const pages = [HomePage, CakePage, MemoryPage, FinalPage];

export default function App() {
  const [page, setPage] = useState(0);
  const Current = pages[page];
  const next = () => setPage((value) => Math.min(value + 1, pages.length - 1));

  return (
    <main className="h-full w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          className="h-full w-full"
          initial={{ opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.015 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <Current onNext={next} />
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
