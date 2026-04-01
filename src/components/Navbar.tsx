import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { Menu, X, ArrowRight, Instagram, Twitter, Linkedin } from 'lucide-react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Work', path: '/work' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Contact', path: '/contact' },
];

function MagneticLink({ children, to, className, active }: any) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    mouseX.set((clientX - centerX) * 0.4);
    mouseY.set((clientY - centerY) * 0.4);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative"
    >
      <Link
        ref={ref}
        to={to}
        className={cn(
          'relative z-10 px-4 py-2 transition-colors duration-300',
          active ? 'text-accent' : 'text-ink/60 hover:text-ink',
          className
        )}
      >
        {children}
        {active && (
          <motion.span
            layoutId="nav-active"
            className="absolute inset-0 bg-accent/5 rounded-full -z-10"
            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
          />
        )}
      </Link>
    </motion.div>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed top-0 left-0 w-full z-[100] transition-all duration-700 px-6 py-6 md:px-12',
          scrolled ? 'bg-cream/80 backdrop-blur-xl py-4 shadow-sm' : 'bg-transparent py-8 md:py-12'
        )}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="group flex items-center gap-2">
            <motion.div
              whileHover={{ rotate: 90 }}
              className="w-8 h-8 rounded-full border-2 border-accent flex items-center justify-center overflow-hidden"
            >
              <div className="w-4 h-4 bg-accent rounded-full animate-pulse" />
            </motion.div>
            <span className="text-2xl font-display font-bold tracking-tighter text-ink">
              AETHER<span className="text-accent">.</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-4">
            {navLinks.map((link) => (
              <MagneticLink
                key={link.path}
                to={link.path}
                active={location.pathname === link.path}
                className="text-xs tracking-[0.3em] uppercase font-bold"
              >
                {link.name}
              </MagneticLink>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative w-12 h-12 flex items-center justify-center z-[110] group"
          >
            <div className="space-y-1.5">
              <motion.span
                animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="block w-6 h-0.5 bg-ink transition-transform duration-500"
              />
              <motion.span
                animate={isOpen ? { opacity: 0, x: 20 } : { opacity: 1, x: 0 }}
                className="block w-4 h-0.5 bg-ink transition-all duration-500"
              />
              <motion.span
                animate={isOpen ? { rotate: -45, y: -7, width: 24 } : { rotate: 0, y: 0, width: 16 }}
                className="block h-0.5 bg-ink transition-all duration-500 ml-auto"
              />
            </div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="absolute inset-0 border border-ink/10 rounded-full group-hover:border-accent transition-colors"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[105] bg-ink flex items-center justify-center overflow-hidden"
          >
            {/* Background Text */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.02] flex items-center justify-center select-none">
              <h2 className="text-[40vw] font-display font-bold tracking-tighter leading-none">MENU</h2>
            </div>

            <div className="max-w-7xl mx-auto w-full px-6 md:px-12 grid md:grid-cols-2 gap-24 items-center relative z-10">
              <div className="space-y-4">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      to={link.path}
                      className={cn(
                        'text-6xl md:text-9xl font-display font-bold tracking-tighter leading-none block hover:translate-x-8 transition-transform duration-700 group',
                        location.pathname === link.path ? 'text-accent' : 'text-cream'
                      )}
                    >
                      {link.name}<span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity">.</span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="hidden md:block space-y-12">
                <div className="space-y-4">
                  <span className="text-accent text-xs tracking-[0.4em] uppercase font-bold block">Contact</span>
                  <p className="text-3xl font-display font-bold tracking-tighter text-cream">hello@aether.studio</p>
                </div>
                <div className="space-y-4">
                  <span className="text-accent text-xs tracking-[0.4em] uppercase font-bold block">Social</span>
                  <div className="flex gap-8">
                    {[Instagram, Twitter, Linkedin].map((Icon, i) => (
                      <motion.a
                        key={i}
                        href="#"
                        whileHover={{ y: -5, color: '#D4AF37' }}
                        className="text-cream transition-colors"
                      >
                        <Icon className="w-8 h-8" />
                      </motion.a>
                    ))}
                  </div>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="pt-12"
                >
                  <Link to="/contact" className="inline-flex items-center gap-4 px-8 py-4 border border-cream/20 rounded-full text-cream hover:bg-cream hover:text-ink transition-all group">
                    <span className="text-xs tracking-widest uppercase font-bold">Start a Project</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </div>
            </div>

            {/* Decorative Circles */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 50, 0],
                y: [0, -50, 0],
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -top-1/4 -right-1/4 w-[60vw] h-[60vw] bg-accent/10 rounded-full blur-[120px]"
            />
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                x: [0, -30, 0],
                y: [0, 40, 0],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-1/4 -left-1/4 w-[40vw] h-[40vw] bg-accent/5 rounded-full blur-[100px]"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
