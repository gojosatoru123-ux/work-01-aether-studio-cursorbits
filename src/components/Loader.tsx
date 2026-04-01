import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-ink z-[9999] flex flex-col items-center justify-center gap-8"
    >
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-cream text-4xl md:text-6xl font-display font-bold tracking-tighter"
      >
        AETHER STUDIO<span className="text-accent">.</span>
      </motion.h1>
      
      <div className="w-48 h-[2px] bg-cream/20 relative overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="absolute inset-0 bg-accent"
        />
      </div>
      
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-cream/40 text-xs tracking-widest uppercase"
      >
        Crafting Digital Experiences {progress}%
      </motion.span>
    </motion.div>
  );
}
