import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

interface FloatingElementsProps {
  count?: number;
  className?: string;
}

export default function FloatingElements({ count = 5, className }: FloatingElementsProps) {
  const [elements, setElements] = useState<any[]>([]);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 100 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const newElements = Array.from({ length: count }).map((_, i) => ({
      id: i,
      size: Math.random() * 100 + 50,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.1 + 0.02,
      rotation: Math.random() * 360,
      shape: Math.floor(Math.random() * 3), // 0: circle, 1: square, 2: triangle
    }));
    setElements(newElements);

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth) - 0.5);
      mouseY.set((clientY / innerHeight) - 0.5);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [count, mouseX, mouseY]);

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {elements.map((el) => (
        <FloatingShape key={el.id} el={el} smoothX={smoothX} smoothY={smoothY} />
      ))}
    </div>
  );
}

function FloatingShape({ el, smoothX, smoothY }: { el: any; smoothX: any; smoothY: any }) {
  const x = useTransform(smoothX, [-0.5, 0.5], [el.x - 5, el.x + 5], { clamp: false });
  const y = useTransform(smoothY, [-0.5, 0.5], [el.y - 5, el.y + 5], { clamp: false });
  const rotate = useTransform(smoothX, [-0.5, 0.5], [el.rotation - 20, el.rotation + 20]);

  return (
    <motion.div
      style={{
        left: `${el.x}%`,
        top: `${el.y}%`,
        width: el.size,
        height: el.size,
        opacity: el.opacity,
        x,
        y,
        rotate,
      }}
      animate={{
        y: [0, -20, 0],
        rotate: [el.rotation, el.rotation + 10, el.rotation],
      }}
      transition={{
        duration: el.duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: el.delay,
      }}
      className="absolute flex items-center justify-center"
    >
      {el.shape === 0 && (
        <div className="w-full h-full rounded-full border border-accent/30 backdrop-blur-[2px]" />
      )}
      {el.shape === 1 && (
        <div className="w-full h-full border border-accent/30 rotate-45 backdrop-blur-[2px]" />
      )}
      {el.shape === 2 && (
        <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-accent/30 stroke-[1px] backdrop-blur-[2px]">
          <path d="M 50,10 L 90,90 L 10,90 Z" />
        </svg>
      )}
    </motion.div>
  );
}
