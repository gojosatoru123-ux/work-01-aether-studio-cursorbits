import { motion, useScroll, useTransform, useInView, useSpring, useMotionValue, AnimatePresence } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageTransition from '@/src/components/PageTransition';
import ScrollReveal from '@/src/components/ScrollReveal';
import { ArrowRight, Play, Plus, Minus, ArrowDownRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';

import FloatingElements from '@/src/components/FloatingElements';

function MagneticButton({ children, className, to }: { children: React.ReactNode; className?: string; to?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={cn("relative", className)}
    >
      {children}
    </motion.div>
  );

  if (to) {
    return <Link to={to}>{content}</Link>;
  }

  return content;
}

const projects = [
  { id: 1, title: 'Lumina', subtitle: 'Horology', category: 'Digital Experience', image: 'https://picsum.photos/seed/lumina/1200/800', size: 'large', details: ['3D Interaction', 'Luxury Branding'] },
  { id: 2, title: 'Vortex', subtitle: 'Motion', category: 'Motion Design', image: 'https://picsum.photos/seed/vortex/1200/800', size: 'small', details: ['Generative Art', 'Abstract'] },
  { id: 3, title: 'Aura', subtitle: 'Fashion', category: 'Branding', image: 'https://picsum.photos/seed/aura/1200/800', size: 'medium', details: ['Sustainability', 'Minimalism'] },
  { id: 4, title: 'Nova', subtitle: 'E-commerce', category: 'Web Development', image: 'https://picsum.photos/seed/nova/1200/800', size: 'large', details: ['Performance', 'UX Research'] },
];

function ProjectCard({ project, index }: { project: any; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);
  
  const sizeClasses = {
    large: "col-span-12 md:col-span-8 aspect-[16/9]",
    medium: "col-span-12 md:col-span-6 aspect-[4/5]",
    small: "col-span-12 md:col-span-4 aspect-square",
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{ duration: 1.2, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative group overflow-hidden rounded-[2rem] bg-ink/5",
        sizeClasses[project.size as keyof typeof sizeClasses],
        index % 3 === 0 ? "md:mt-32" : "md:mt-0"
      )}
    >
      <Link to={`/work/${project.id}`} className="block w-full h-full">
        <motion.img
          animate={{ scale: isHovered ? 1.05 : 1, filter: isHovered ? 'blur(5px)' : 'blur(0px)' }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-between bg-gradient-to-t from-ink/90 via-ink/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <span className="text-accent text-[10px] tracking-[0.5em] uppercase font-bold block">{project.category}</span>
              <div className="flex gap-2">
                {project.details.map((detail: string, i: number) => (
                  <span key={i} className="text-[8px] uppercase tracking-widest text-cream/40 border border-cream/10 px-2 py-1 rounded-full">{detail}</span>
                ))}
              </div>
            </div>
            <div className="w-12 h-12 rounded-full border border-cream/20 flex items-center justify-center">
              <ArrowDownRight className="w-5 h-5 text-cream group-hover:rotate-45 transition-transform duration-500" />
            </div>
          </div>
          
          <div className="space-y-4">
            <p className="text-accent text-xs serif italic font-light tracking-widest">{project.subtitle}</p>
            <h3 className="text-cream text-5xl md:text-8xl font-display font-bold tracking-tighter leading-[0.85] pb-2">
              {project.title}
            </h3>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  return (
    <PageTransition>
      <div className="relative bg-cream text-ink">
        {/* Noise Overlay */}
        <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
        {/* Hero Section - Immersive & Dynamic */}
        <section ref={containerRef} className="min-h-screen flex flex-col items-center justify-center relative px-6 md:px-24 overflow-hidden bg-cream py-20 md:py-0">
          <motion.div
            style={{ scale: heroScale, opacity: heroOpacity, y: heroY }}
            className="max-w-[1800px] mx-auto w-full relative z-10"
          >
            <div className="space-y-12 md:space-y-24">
              <div className="space-y-6 md:space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="flex items-center gap-4 md:gap-6"
                >
                  <span className="w-12 md:w-16 h-px bg-accent" />
                  <span className="text-accent text-[8px] md:text-[10px] tracking-[0.6em] uppercase font-bold">Design Studio / 2026</span>
                </motion.div>
                
                <h1 className="text-[16vw] md:text-[12vw] font-display font-bold tracking-tighter leading-[0.85] text-ink">
                  <div className="overflow-hidden pb-2 md:pb-4">
                    {"DIGITAL".split('').map((char, i) => (
                      <motion.span
                        key={i}
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                        className="inline-block"
                      >
                        {char}
                      </motion.span>
                    ))}
                  </div>
                  <div className="overflow-hidden pb-2 md:pb-4">
                    <motion.span
                      initial={{ opacity: 0, y: "100%" }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="block serif italic font-light text-accent ml-[10vw] md:ml-[15vw]"
                    >
                      Artifacts
                    </motion.span>
                  </div>
                  <div className="overflow-hidden pb-2 md:pb-4">
                    {"FOR THE BOLD.".split('').map((char, i) => (
                      <motion.span
                        key={i}
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1, delay: 0.8 + i * 0.03, ease: [0.22, 1, 0.36, 1] }}
                        className={cn("inline-block", char === '.' && "text-accent")}
                      >
                        {char === ' ' ? '\u00A0' : char}
                      </motion.span>
                    ))}
                  </div>
                </h1>
              </div>

              <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-end">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5, duration: 1 }}
                  className="md:col-span-7 text-xl md:text-4xl text-ink/50 font-light leading-tight max-w-2xl"
                >
                  We bridge the gap between human emotion and digital precision, crafting experiences that resonate on a primal level.
                </motion.p>
                
                <div className="md:col-span-5 flex justify-start md:justify-end">
                  <MagneticButton>
                    <div className="relative group cursor-pointer">
                      <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border border-ink/10 flex items-center justify-center overflow-hidden transition-all duration-700 group-hover:border-accent">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <svg className="w-full h-full p-3 md:p-4">
                            <path id="heroCirclePath" d="M 20, 80 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0" fill="transparent" />
                            <text className="text-[8px] md:text-[10px] uppercase tracking-[0.4em] fill-ink/30 font-bold">
                              <textPath href="#heroCirclePath">Scroll to explore • Scroll to explore • </textPath>
                            </text>
                          </svg>
                        </motion.div>
                        <ArrowDownRight className="w-6 h-6 md:w-10 md:h-10 text-accent group-hover:rotate-45 transition-all duration-500" />
                      </div>
                    </div>
                  </MagneticButton>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Background Large Text */}
          <motion.div
            style={{ y: useTransform(scrollYProgress, [0, 0.5], [0, 300]) }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.03]"
          >
            <h2 className="text-[60vw] font-display font-bold tracking-tighter leading-none">AETHER</h2>
          </motion.div>
        </section>

        {/* Philosophy Section - Split & Artistic */}
        <section className="min-h-screen bg-ink text-cream relative overflow-hidden py-24 md:py-64">
          <div className="max-w-[1800px] mx-auto px-6 md:px-24 grid md:grid-cols-2 gap-16 md:gap-32 items-center">
            <div className="space-y-12 md:space-y-16 relative z-10">
              <div className="space-y-6 md:space-y-8">
                <div className="flex items-center gap-4 md:gap-6">
                  <span className="w-10 md:w-12 h-px bg-accent" />
                  <span className="text-accent text-[8px] md:text-[10px] tracking-[0.6em] uppercase font-bold block">Philosophy / 01</span>
                </div>
                <ScrollReveal>
                  <h2 className="text-6xl md:text-[10vw] font-display font-bold tracking-tighter leading-[0.85]">
                    BEYOND <br /> 
                    <span className="serif italic font-light text-accent">The Surface</span>
                  </h2>
                </ScrollReveal>
              </div>
              <ScrollReveal delay={0.4}>
                <p className="text-xl md:text-4xl text-cream/50 font-light leading-tight max-w-xl">
                  Digital experiences shouldn't just be seen; they should be felt. We obsess over the micro-interactions that create macro-impact.
                </p>
              </ScrollReveal>
              <div className="flex gap-12 md:gap-24 pt-8 md:pt-12">
                <ScrollReveal delay={0.6}>
                  <div className="space-y-2 md:space-y-4">
                    <span className="text-5xl md:text-8xl font-display font-bold text-accent">12+</span>
                    <p className="text-[8px] md:text-[10px] uppercase tracking-[0.4em] text-cream/30 font-bold">Global Awards</p>
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={0.7}>
                  <div className="space-y-2 md:space-y-4">
                    <span className="text-5xl md:text-8xl font-display font-bold text-accent">150+</span>
                    <p className="text-[8px] md:text-[10px] uppercase tracking-[0.4em] text-cream/30 font-bold">Projects Delivered</p>
                  </div>
                </ScrollReveal>
              </div>
            </div>
            
            <div className="relative aspect-[4/5] rounded-[2rem] md:rounded-[3rem] overflow-hidden group shadow-2xl">
              <motion.img
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 2 }}
                src="https://picsum.photos/seed/art/1200/1500"
                alt="Artistic Vision"
                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-80" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute top-16 right-16 w-32 h-32 border border-cream/10 rounded-full flex items-center justify-center"
              >
                <div className="w-3 h-3 bg-accent rounded-full shadow-[0_0_20px_rgba(212,175,55,0.5)]" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Asymmetrical Project Grid */}
        <section className="py-24 md:py-64 bg-cream px-6 md:px-24">
          <div className="max-w-[1800px] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-32 gap-8 md:gap-16">
              <div className="space-y-6 md:space-y-8">
                <div className="flex items-center gap-4 md:gap-6">
                  <span className="w-10 md:w-12 h-px bg-accent" />
                  <span className="text-accent text-[8px] md:text-[10px] tracking-[0.6em] uppercase font-bold block">Portfolio / 02</span>
                </div>
                <ScrollReveal>
                  <h2 className="text-6xl md:text-[12vw] font-display font-bold tracking-tighter leading-[0.85] text-ink">
                    SELECTED <br /> 
                    <span className="serif italic font-light">Artifacts</span>
                  </h2>
                </ScrollReveal>
              </div>
              <ScrollReveal delay={0.4}>
                <MagneticButton to="/work">
                  <div className="group flex items-center gap-4 md:gap-8 pb-4 md:pb-6 border-b border-ink/10">
                    <span className="text-xs tracking-[0.3em] uppercase font-bold text-ink">View All Projects</span>
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-ink/10 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-500">
                      <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:text-cream transition-colors" />
                    </div>
                  </div>
                </MagneticButton>
              </ScrollReveal>
            </div>

            <div className="grid grid-cols-12 gap-6 md:gap-16">
              {projects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Services Preview - Minimal & Artistic */}
        <section className="py-24 md:py-64 bg-ink text-cream overflow-hidden relative">
          <FloatingElements count={8} className="opacity-20" />
          <div className="max-w-[1800px] mx-auto px-6 md:px-24 grid lg:grid-cols-2 gap-16 md:gap-32 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="absolute -inset-48 bg-accent/5 blur-[150px] rounded-full" />
              <div className="space-y-2 md:space-y-4 relative z-10">
                {['Digital Strategy', 'Experience Design', 'Motion & Visuals', 'Technical Excellence'].map((service, i) => (
                  <motion.div
                    key={service}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="group flex items-center justify-between py-8 md:py-12 border-b border-cream/5 cursor-pointer hover:border-accent transition-colors duration-500"
                  >
                    <div className="flex items-center gap-4 md:gap-8">
                      <span className="text-accent text-[8px] md:text-[10px] font-bold opacity-40 group-hover:opacity-100 transition-opacity">0{i + 1}</span>
                      <h3 className="text-2xl md:text-7xl font-display font-bold tracking-tighter group-hover:translate-x-4 transition-transform duration-700">
                        {service}
                      </h3>
                    </div>
                    <MagneticButton>
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-cream/10 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-500">
                        <Plus className="w-4 h-4 md:w-5 md:h-5 text-accent group-hover:text-cream group-hover:rotate-90 transition-all duration-500" />
                      </div>
                    </MagneticButton>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="order-1 lg:order-2 space-y-12 md:space-y-16">
              <div className="space-y-6 md:space-y-8">
                <div className="flex items-center gap-4 md:gap-6">
                  <span className="w-10 md:w-12 h-px bg-accent" />
                  <span className="text-accent text-[8px] md:text-[10px] tracking-[0.6em] uppercase font-bold block">Capabilities / 03</span>
                </div>
                <ScrollReveal>
                  <h2 className="text-5xl md:text-[10vw] font-display font-bold tracking-tighter leading-[0.85] pb-4">
                    WE CRAFT <br /> 
                    <span className="serif italic font-light text-accent">The Intangible</span>
                  </h2>
                </ScrollReveal>
              </div>
              <ScrollReveal delay={0.4}>
                <p className="text-xl md:text-4xl text-cream/40 font-light leading-tight max-w-xl">
                  From high-level strategy to pixel-perfect execution, we provide a full spectrum of digital services.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.6}>
                <MagneticButton to="/services">
                  <div className="inline-flex items-center gap-4 md:gap-6 px-8 md:px-12 py-4 md:py-6 border border-cream/10 rounded-full text-cream hover:bg-accent hover:border-accent transition-all duration-700 group">
                    <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase font-bold">Explore Services</span>
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-2 transition-transform" />
                  </div>
                </MagneticButton>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Final CTA - Immersive */}
        <section className="min-h-screen flex items-center justify-center relative px-6 md:px-24 bg-cream text-ink overflow-hidden py-24 md:py-0">
          <motion.div 
            style={{ x: useTransform(scrollYProgress, [0.8, 1], [200, -200]) }}
            className="absolute inset-0 pointer-events-none opacity-[0.04] flex items-center justify-center select-none"
          >
            <h2 className="text-[60vw] md:text-[50vw] font-display font-bold tracking-tighter leading-none whitespace-nowrap">CONTACT</h2>
          </motion.div>

          <div className="max-w-7xl w-full text-center space-y-16 md:space-y-24 relative z-10">
            <div className="space-y-6 md:space-y-8">
              <div className="flex items-center justify-center gap-4 md:gap-6">
                <span className="w-10 md:w-12 h-px bg-accent" />
                <span className="text-accent text-[8px] md:text-[10px] tracking-[0.6em] uppercase font-bold">Next Step / 04</span>
                <span className="w-10 md:w-12 h-px bg-accent" />
              </div>
              <ScrollReveal className="mx-auto">
                <h2 className="text-6xl md:text-[15vw] font-display font-bold tracking-tighter leading-[0.85]">
                  LET'S CREATE <br /> 
                  <span className="serif italic font-light text-accent">Magic</span>
                </h2>
              </ScrollReveal>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">
              <ScrollReveal delay={0.4}>
                <MagneticButton to="/contact">
                  <div className="group relative px-12 md:px-24 py-6 md:py-12 bg-ink text-cream rounded-full overflow-hidden transition-all duration-700 shadow-2xl">
                    <span className="relative z-10 text-xl md:text-3xl font-display font-bold tracking-tighter">START A PROJECT</span>
                    <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                  </div>
                </MagneticButton>
              </ScrollReveal>
              
              <ScrollReveal delay={0.6}>
                <div className="text-center md:text-left space-y-2 md:space-y-4">
                  <p className="text-ink/30 text-[8px] md:text-[10px] uppercase tracking-[0.5em] font-bold">Direct Line</p>
                  <a href="mailto:hello@aether.studio" className="text-2xl md:text-6xl font-display font-bold hover:text-accent transition-colors border-b-2 md:border-b-4 border-accent/10 hover:border-accent pb-1 md:pb-2">
                    hello@aether.studio
                  </a>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
