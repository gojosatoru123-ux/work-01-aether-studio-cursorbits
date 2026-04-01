import { motion } from 'motion/react';
import { ReactNode } from 'react';
import { cn } from '@/src/lib/utils';

interface ScrollRevealProps {
  children: ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
  duration?: number;
  y?: number;
  className?: string;
  noPadding?: boolean;
  fullHeight?: boolean;
}

export default function ScrollReveal({ 
  children, 
  width = "fit-content", 
  delay = 0.2, 
  duration = 0.8,
  y = 40,
  className = "",
  noPadding = false,
  fullHeight = false
}: ScrollRevealProps) {
  return (
    <div 
      className={cn(
        "relative overflow-hidden",
        !noPadding && "pb-4",
        fullHeight && "h-full",
        className
      )} 
      style={{ width }}
    >
      <motion.div
        initial={{ opacity: 0, y }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ 
          duration, 
          delay,
          ease: [0.215, 0.61, 0.355, 1] // cubic-bezier for smooth slide
        }}
        className={cn(fullHeight && "h-full")}
      >
        {children}
      </motion.div>
    </div>
  );
}
