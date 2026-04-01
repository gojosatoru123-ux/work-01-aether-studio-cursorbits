import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import PageTransition from '@/src/components/PageTransition';
import { cn } from '@/src/lib/utils';
import { ArrowRight, Plus, X, ArrowDownRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import FloatingElements from '@/src/components/FloatingElements';
import ScrollReveal from '@/src/components/ScrollReveal';

const services = [
  {
    id: 'branding',
    title: 'Branding',
    subtitle: 'Identity Architecture',
    description: 'We define your identity and tell your story through powerful visuals and strategy.',
    details: ['Visual Identity', 'Brand Strategy', 'Logo Design', 'Brand Guidelines', 'Typography & Color'],
    image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 'uiux',
    title: 'UI/UX Design',
    subtitle: 'Experience Engineering',
    description: 'We create intuitive and beautiful interfaces that provide seamless user journeys.',
    details: ['User Experience', 'User Interface', 'Prototyping', 'User Research', 'Design Systems'],
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563dc4c?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 'motion',
    title: 'Motion Design',
    subtitle: 'Temporal Storytelling',
    description: 'We bring your brand to life through fluid animations and cinematic storytelling.',
    details: ['2D & 3D Animation', 'Interaction Design', 'Video Production', 'Micro-interactions', 'Sound Design'],
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 'web',
    title: 'Web Development',
    subtitle: 'Technical Craftsmanship',
    description: 'We build high-performance, scalable websites using the latest technologies.',
    details: ['Frontend Dev', 'Backend Dev', 'E-commerce', 'CMS Integration', 'Optimization'],
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '3d',
    title: '3D & Interactive',
    subtitle: 'Spatial Computing',
    description: 'We push the boundaries of the web with immersive 3D and interactive experiences.',
    details: ['WebGL & Three.js', '3D Modeling', 'Interactive Art', 'AR/VR', 'Creative Coding'],
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1000',
  },
];

const processes = [
  { step: '01', title: 'Discovery', description: 'Deep dive into your brand, goals, and audience to find the unique angle.' },
  { step: '02', title: 'Ideation', description: 'Brainstorming and conceptualizing the artistic direction and technical path.' },
  { step: '03', title: 'Creation', description: 'Bringing the vision to life with meticulous attention to detail and craft.' },
  { step: '04', title: 'Refinement', description: 'Polishing every interaction and pixel until it reaches perfection.' },
];

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

function ServiceItem({ service, index }: { service: any; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    mouseX.set(clientX - 200);
    mouseY.set(clientY - 250);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative py-12 md:py-40 border-b border-ink/5 cursor-none"
    >
      <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start relative z-10">
        <div className="md:col-span-1 pt-2 md:pt-4">
          <motion.span 
            animate={{ 
              y: isHovered ? -10 : 0,
              color: isHovered ? "var(--accent)" : "rgba(var(--ink-rgb), 0.4)"
            }}
            className="text-accent text-[10px] font-bold tracking-[0.5em] block"
          >
            0{index + 1}
          </motion.span>
        </div>
        
        <div className="md:col-span-7">
          <div className="space-y-4 md:space-y-6">
            <div className="overflow-hidden">
              <motion.p 
                animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
                className="text-accent text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold serif italic mb-1 md:mb-2"
              >
                {service.subtitle}
              </motion.p>
            </div>
            <h2 className="text-4xl md:text-[12vw] font-display font-bold tracking-tighter leading-[0.85] pb-4 md:pb-8 transition-all duration-1000 md:group-hover:translate-x-12 group-hover:text-accent">
              {service.title.split('').map((char: string, i: number) => (
                <motion.span
                  key={i}
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.02, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block"
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </h2>
          </div>
        </div>

        <div className="md:col-span-3 pt-4 md:pt-32">
          <motion.p 
            animate={{ x: isHovered ? 20 : 0 }}
            className="text-base md:text-lg text-ink/50 font-light leading-relaxed max-w-xs group-hover:text-ink transition-colors duration-500"
          >
            {service.description}
          </motion.p>
          <motion.div 
            animate={{ width: isHovered ? "100%" : "0%" }}
            className="h-px bg-accent mt-6 md:mt-8 origin-left"
          />
        </div>

        <div className="md:col-span-1 pt-6 md:pt-32 flex justify-start md:justify-end">
          <MagneticButton>
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-ink/10 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-500 overflow-hidden relative">
              <ArrowDownRight className="w-6 h-6 md:w-8 md:h-8 text-ink group-hover:text-cream group-hover:rotate-45 transition-all duration-500 relative z-10" />
              <motion.div 
                animate={{ scale: isHovered ? 1 : 0 }}
                className="absolute inset-0 bg-accent rounded-full"
              />
            </div>
          </MagneticButton>
        </div>
      </div>

      {/* Floating Preview Image - Enhanced */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -15, filter: 'blur(20px)' }}
            animate={{ opacity: 1, scale: 1, rotate: -5, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.5, rotate: 15, filter: 'blur(20px)' }}
            style={{ x, y }}
            className="fixed top-0 left-0 w-[35vw] h-[45vw] pointer-events-none z-[100] rounded-[2rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)]"
          >
            <motion.img 
              initial={{ scale: 1.4 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              src={service.image} 
              alt={service.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
            <div className="absolute bottom-16 left-16 right-16 space-y-8">
              <div className="flex flex-wrap gap-3">
                {service.details.map((detail: string, i: number) => (
                  <motion.span 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.05 }}
                    className="px-5 py-2 bg-cream/10 backdrop-blur-2xl border border-cream/20 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold text-cream"
                  >
                    {detail}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Services() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -800]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.5]);

  return (
    <PageTransition>
      <div ref={containerRef} className="relative min-h-screen bg-cream overflow-hidden selection:bg-accent selection:text-cream">
        {/* Immersive Background - Enhanced with more depth */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
          <FloatingElements count={15} className="opacity-30" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,#D4AF3705,transparent_60%)]" />
          
          <motion.div 
            style={{ y: y1, scale }}
            className="absolute top-20 left-10 text-[40vw] font-display font-bold text-ink/[0.01] whitespace-nowrap select-none leading-[0.85] pb-20"
          >
            AETHER
          </motion.div>

          <motion.div 
            style={{ y: y2, rotate }}
            className="absolute top-[20%] right-[-10%] w-[60vw] h-[60vw] border border-accent/5 rounded-full"
          />
          
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay" />
        </div>

        {/* Vertical Rail Text */}
        <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
          <div className="flex flex-col items-center gap-12">
            <span className="w-px h-24 bg-ink/10" />
            <p className="writing-vertical-rl rotate-180 text-[10px] uppercase tracking-[0.5em] font-bold text-ink/30">
              ESTABLISHED MMXXVI — AETHER STUDIO
            </p>
            <span className="w-px h-24 bg-ink/10" />
          </div>
        </div>
        
        <section className="pt-32 md:pt-72 pb-16 md:pb-32 px-6 md:px-24">
          <div className="max-w-[1800px] mx-auto">
            <div className="grid lg:grid-cols-12 gap-8 md:gap-12 mb-24 md:mb-64 items-end">
              <div className="lg:col-span-9">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1 }}
                  className="flex items-center gap-4 md:gap-6 mb-8 md:mb-12"
                >
                  <span className="w-10 md:w-16 h-px bg-accent" />
                  <span className="text-accent text-[10px] tracking-[0.5em] uppercase font-bold">The Architecture of Digital / 2026</span>
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, y: 150 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                  className="text-6xl md:text-[15vw] font-display font-bold tracking-tighter leading-[0.85] text-ink pb-4 md:pb-8"
                >
                  CRAFTING <br /> 
                  <span className="serif italic font-light text-accent ml-[0.1em] md:ml-[0.2em]">Excellence</span>
                </motion.h1>
              </div>
              <div className="lg:col-span-3 pb-4 md:pb-8">
                <ScrollReveal delay={0.4}>
                  <div className="space-y-6 md:space-y-8 border-l-2 border-accent/20 pl-6 md:pl-12">
                    <p className="text-lg md:text-2xl text-ink/60 font-light leading-relaxed">
                      We transcend the ordinary, blending avant-garde aesthetics with rigorous engineering to define the next era of digital interaction.
                    </p>
                    <div className="flex gap-3 md:gap-4">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-ink/10 flex items-center justify-center text-[8px] md:text-[10px] font-bold">A</div>
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-ink/10 flex items-center justify-center text-[8px] md:text-[10px] font-bold">W</div>
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-ink/10 flex items-center justify-center text-[8px] md:text-[10px] font-bold">W</div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>

            <div className="space-y-0">
              {services.map((service, i) => (
                <ServiceItem key={service.id} service={service} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Process Section - Brutalist & Immersive */}
        <section className="py-24 md:py-72 bg-ink text-cream relative overflow-hidden">
          {/* Background Graphic */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 skew-x-12 translate-x-1/4 pointer-events-none" />
          
          <div className="max-w-[1800px] mx-auto px-6 md:px-24">
            <div className="grid lg:grid-cols-2 gap-16 md:gap-32 items-start mb-24 md:mb-72">
              <div className="space-y-8 md:space-y-12">
                <div className="flex items-center gap-4 md:gap-6">
                  <span className="w-10 md:w-12 h-px bg-accent" />
                  <span className="text-accent text-[10px] tracking-[0.5em] uppercase font-bold block">The Methodology</span>
                </div>
                <h2 className="text-5xl md:text-[12vw] font-display font-bold tracking-tighter leading-[0.85] pb-4 md:pb-8">
                  HOW WE <br /> 
                  <span className="serif italic font-light text-accent">Manifest</span>
                </h2>
              </div>
              <div className="pt-4 md:pt-48 space-y-12 md:space-y-16">
                <ScrollReveal>
                  <p className="text-xl md:text-5xl text-cream/60 font-light leading-tight max-w-2xl">
                    A relentless pursuit of perfection. Our process is a dialogue between intuition and data.
                  </p>
                </ScrollReveal>
                <div className="grid grid-cols-2 gap-12 md:gap-24">
                  <ScrollReveal delay={0.2}>
                    <div className="space-y-2 md:space-y-4">
                      <p className="text-accent text-4xl md:text-7xl font-display font-bold">98%</p>
                      <p className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] text-cream/40 font-bold">Precision Rate</p>
                    </div>
                  </ScrollReveal>
                  <ScrollReveal delay={0.3}>
                    <div className="space-y-2 md:space-y-4">
                      <p className="text-accent text-4xl md:text-7xl font-display font-bold">120+</p>
                      <p className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] text-cream/40 font-bold">Awards Won</p>
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-cream/5 border border-cream/5 rounded-2xl md:rounded-[2rem] overflow-hidden">
              {processes.map((process, i) => (
                <motion.div
                  key={process.step}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true }}
                  className="bg-ink p-10 md:p-16 space-y-10 md:space-y-16 group hover:bg-accent transition-all duration-1000 relative overflow-hidden"
                >
                  <div className="flex justify-between items-start relative z-10">
                    <span className="text-5xl md:text-7xl font-display font-bold text-accent/10 group-hover:text-cream/20 transition-colors duration-700">{process.step}</span>
                    <Plus className="w-6 h-6 md:w-8 md:h-8 text-accent group-hover:text-cream transition-colors duration-700" />
                  </div>
                  <div className="space-y-4 md:space-y-8 relative z-10">
                    <h3 className="text-3xl md:text-4xl font-display font-bold tracking-tighter group-hover:text-cream transition-colors duration-700">{process.title}</h3>
                    <p className="text-lg md:text-xl text-cream/40 font-light leading-relaxed group-hover:text-cream/80 transition-colors duration-700">{process.description}</p>
                  </div>
                  <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-1000 ease-[0.22,1,0.36,1]" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA - Dramatic & Bold */}
        <section className="py-24 md:py-96 bg-cream text-ink px-6 md:px-24 overflow-hidden relative">
          <motion.div 
            style={{ x: y1, opacity: 0.03 }}
            className="absolute inset-0 pointer-events-none flex items-center justify-center select-none pb-20"
          >
            <h2 className="text-[80vw] md:text-[60vw] font-display font-bold tracking-tighter leading-[0.85] whitespace-nowrap">
              TRANSFORM
            </h2>
          </motion.div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 md:gap-32 items-center">
              <div className="space-y-12 md:space-y-16">
                <ScrollReveal>
                  <div className="space-y-6 md:space-y-8">
                    <span className="text-accent text-[10px] tracking-[0.5em] uppercase font-bold">Initiate / 05</span>
                    <h2 className="text-6xl md:text-[14vw] font-display font-bold tracking-tighter leading-[0.85] pb-4 md:pb-8">
                      LET'S <br /> 
                      <span className="serif italic font-light text-accent">Begin.</span>
                    </h2>
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={0.2}>
                  <p className="text-xl md:text-3xl text-ink/60 font-light max-w-xl leading-relaxed">
                    Your vision deserves more than just execution. It deserves an artistic legacy that resonates across the digital landscape.
                  </p>
                </ScrollReveal>
              </div>
              
              <div className="flex flex-col items-start lg:items-end gap-12 md:gap-24">
                <ScrollReveal delay={0.4}>
                  <MagneticButton to="/contact">
                    <div className="group relative px-16 md:px-32 py-8 md:py-16 bg-ink text-cream rounded-full overflow-hidden transition-all duration-700 flex items-center justify-center shadow-2xl">
                      <span className="relative z-10 text-xl md:text-3xl font-display font-bold tracking-tighter">START THE JOURNEY</span>
                      <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                    </div>
                  </MagneticButton>
                </ScrollReveal>
                
                <ScrollReveal delay={0.6}>
                  <div className="space-y-4 md:space-y-6 text-left lg:text-right">
                    <p className="text-ink/40 text-[8px] md:text-[10px] uppercase tracking-[0.5em] font-bold">Global Inquiries</p>
                    <a href="mailto:hello@aether.studio" className="text-2xl md:text-6xl font-display font-bold hover:text-accent transition-colors block border-b-2 border-transparent hover:border-accent pb-2">
                      hello@aether.studio
                    </a>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
