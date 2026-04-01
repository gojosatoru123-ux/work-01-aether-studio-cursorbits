import { motion } from 'motion/react';
import { ReactNode } from 'react';

export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen">
      {/* Subtle Parallax Background Elements during transition */}
      <motion.div
        initial={{ y: "20vh", opacity: 0, rotate: 10 }}
        animate={{ y: "0vh", opacity: 0.03, rotate: 0 }}
        exit={{ y: "-20vh", opacity: 0, rotate: -10 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none z-[-1] overflow-hidden"
      >
        <div className="w-[150vw] h-[150vh] border-[1px] border-accent rounded-full opacity-50" />
      </motion.div>

      <motion.div
        initial={{ y: "40vh", opacity: 0, rotate: -5 }}
        animate={{ y: "0vh", opacity: 0.02, rotate: 0 }}
        exit={{ y: "-40vh", opacity: 0, rotate: 5 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none z-[-1] overflow-hidden"
      >
        <div className="w-[120vw] h-[120vh] border-[1px] border-accent rounded-full opacity-30" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </div>
  );
}
