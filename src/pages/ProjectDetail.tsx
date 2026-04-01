import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import PageTransition from '@/src/components/PageTransition';
import { ArrowLeft, ExternalLink, ArrowRight, Share2, Plus } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import FloatingElements from '@/src/components/FloatingElements';
import ScrollReveal from '@/src/components/ScrollReveal';

const projects = [
  { 
    id: 1, 
    title: 'Lumina', 
    category: 'Digital Experience', 
    image: 'https://picsum.photos/seed/lumina/1920/1080', 
    year: '2023', 
    description: 'A revolutionary digital experience for a luxury watch brand, blending heritage with futuristic interaction design.',
    client: 'Lumina Horology',
    role: 'Creative Direction, UI/UX, Motion',
    challenge: 'Lumina wanted to break away from traditional luxury marketing and create a digital space that felt as precise and intricate as their timepieces.',
    approach: 'We developed a fluid, 3D-driven interface that allowed users to explore the internal mechanics of the watches in real-time, creating a sense of wonder and technical mastery.',
    results: 'A 45% increase in online engagement and a significant boost in brand perception among younger luxury consumers.',
    gallery: [
      'https://picsum.photos/seed/lumina1/1200/800',
      'https://picsum.photos/seed/lumina2/1200/800',
      'https://picsum.photos/seed/lumina3/1200/800',
    ]
  },
  { 
    id: 2, 
    title: 'Vortex', 
    category: 'Motion Design', 
    image: 'https://picsum.photos/seed/vortex/1920/1080', 
    year: '2024', 
    description: 'Exploring the boundaries of fluid motion and abstract forms in a series of experimental digital installations.',
    client: 'Vortex Labs',
    role: 'Motion Design, Art Direction',
    challenge: 'Vortex Labs needed a visual language that could represent the complexity of their data processing algorithms without being overly technical.',
    approach: 'We used generative art techniques to create organic, ever-evolving forms that mirrored the behavior of complex datasets, resulting in a mesmerizing visual experience.',
    results: 'The installation was featured in 5 global design exhibitions and won multiple awards for innovation in motion design.',
    gallery: [
      'https://picsum.photos/seed/vortex1/1200/800',
      'https://picsum.photos/seed/vortex2/1200/800',
      'https://picsum.photos/seed/vortex3/1200/800',
    ]
  },
  { 
    id: 3, 
    title: 'Aura', 
    category: 'Branding', 
    image: 'https://picsum.photos/seed/aura/1920/1080', 
    year: '2022', 
    description: 'A complete brand identity for a sustainable fashion house, focused on transparency and organic growth.',
    client: 'Aura Fashion',
    role: 'Branding, Strategy, Web Design',
    challenge: 'Aura needed to communicate their deep commitment to sustainability without falling into the "greenwashing" clichés of the fashion industry.',
    approach: 'We created a minimalist, earth-toned identity that emphasized raw materials and ethical production processes, supported by a highly transparent digital platform.',
    results: 'Successfully launched in 12 countries with a 30% higher-than-projected initial sales volume.',
    gallery: [
      'https://picsum.photos/seed/aura1/1200/800',
      'https://picsum.photos/seed/aura2/1200/800',
      'https://picsum.photos/seed/aura3/1200/800',
    ]
  },
  { 
    id: 4, 
    title: 'Nova', 
    category: 'Web Development', 
    image: 'https://picsum.photos/seed/nova/1920/1080', 
    year: '2023', 
    description: 'High-performance e-commerce platform for a tech startup, prioritizing speed and seamless user journeys.',
    client: 'Nova Tech',
    role: 'Web Development, UX Research',
    challenge: 'Nova Tech had a groundbreaking product but a clunky checkout process that was causing high cart abandonment rates.',
    approach: 'We rebuilt their entire platform from the ground up, focusing on micro-interactions and a "one-click" philosophy that removed all friction from the buying process.',
    results: 'Cart abandonment dropped by 60%, and overall site performance improved by 300%.',
    gallery: [
      'https://picsum.photos/seed/nova1/1200/800',
      'https://picsum.photos/seed/nova2/1200/800',
      'https://picsum.photos/seed/nova3/1200/800',
    ]
  },
];

function MagneticLink({ children, to, className }: any) {
  const ref = useRef<HTMLAnchorElement>(null);
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

  return (
    <motion.div
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      <Link
        ref={ref}
        to={to}
        onMouseMove={handleMouse}
        onMouseLeave={reset}
        className={className}
      >
        {children}
      </Link>
    </motion.div>
  );
}

export default function ProjectDetail() {
  const { id } = useParams();
  const projectIndex = projects.findIndex(p => p.id === Number(id));
  const project = projectIndex !== -1 ? projects[projectIndex] : projects[0];
  const nextProject = projects[(projectIndex + 1) % projects.length];

  const containerRef = useRef(null);
  const heroRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <PageTransition>
      <div ref={containerRef} className="bg-cream min-h-screen text-ink overflow-hidden">
        {/* Noise Overlay */}
        <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        {/* Hero Section */}
        <section ref={heroRef} className="relative h-screen overflow-hidden bg-ink">
          <motion.div style={{ y, scale, opacity }} className="absolute inset-0">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover opacity-60"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink/20 to-ink/80" />
          </motion.div>
          
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-24 z-10">
            <div className="max-w-[1800px] mx-auto w-full">
              <div className="grid lg:grid-cols-2 gap-12 items-end">
                <div className="space-y-8">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    className="flex items-center gap-6"
                  >
                    <MagneticLink to="/work" className="w-16 h-16 rounded-full border border-cream/20 flex items-center justify-center text-cream hover:bg-accent hover:border-accent transition-all duration-500 group">
                      <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                    </MagneticLink>
                    <span className="text-cream/60 text-[10px] tracking-[0.6em] uppercase font-bold">{project.category} / {project.year}</span>
                  </motion.div>
                  
                  <h1 className="text-[15vw] font-display font-bold tracking-tighter leading-[0.85] pb-8 text-cream">
                    {project.title.split('').map((char, i) => (
                      <motion.span
                        key={i}
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                        className="inline-block"
                      >
                        {char}
                      </motion.span>
                    ))}
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1, type: "spring" }}
                      className="text-accent inline-block"
                    >
                      .
                    </motion.span>
                  </h1>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 1 }}
                  className="lg:pb-12 lg:pl-12"
                >
                  <p className="text-2xl md:text-3xl text-cream/60 font-light leading-tight max-w-md">
                    {project.description}
                  </p>
                </motion.div>
              </div>
            </div>
          </div>

          <motion.div
            style={{ opacity }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-cream/40"
          >
            <span className="text-[10px] tracking-[0.5em] uppercase font-bold">Scroll</span>
            <div className="w-px h-16 bg-gradient-to-b from-accent to-transparent" />
          </motion.div>
        </section>

        {/* Overview Section */}
        <section className="py-32 md:py-64 px-6 md:px-24">
          <div className="max-w-[1800px] mx-auto">
            <div className="grid lg:grid-cols-12 gap-32">
              <div className="lg:col-span-8 space-y-16">
                <ScrollReveal>
                  <div className="space-y-8">
                    <div className="flex items-center gap-6">
                      <span className="w-12 h-px bg-accent" />
                      <span className="text-accent text-[10px] tracking-[0.6em] uppercase font-bold block">Overview / 01</span>
                    </div>
                    <h2 className="text-6xl md:text-9xl font-display font-bold tracking-tighter leading-[0.85] pb-8">
                      THE <br /> 
                      <span className="serif italic font-light text-accent">Vision</span>
                    </h2>
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={0.2}>
                  <p className="text-3xl md:text-5xl text-ink font-bold tracking-tighter leading-[0.95] pb-4 max-w-4xl">
                    We embarked on a journey to redefine how users interact with <span className="text-accent">{project.client}</span>, focusing on emotional resonance and technical precision.
                  </p>
                </ScrollReveal>
              </div>

              <div className="lg:col-span-4 space-y-16 lg:pt-32">
                <ScrollReveal delay={0.4}>
                  <div className="grid grid-cols-2 lg:grid-cols-1 gap-12">
                    <div className="space-y-4">
                      <p className="text-accent text-[10px] uppercase tracking-[0.5em] font-bold">Client</p>
                      <p className="text-2xl font-display font-bold">{project.client}</p>
                    </div>
                    <div className="space-y-4">
                      <p className="text-accent text-[10px] uppercase tracking-[0.5em] font-bold">Role</p>
                      <p className="text-2xl font-display font-bold">{project.role}</p>
                    </div>
                    <div className="space-y-4">
                      <p className="text-accent text-[10px] uppercase tracking-[0.5em] font-bold">Year</p>
                      <p className="text-2xl font-display font-bold">{project.year}</p>
                    </div>
                  </div>
                </ScrollReveal>
                
                <ScrollReveal delay={0.6}>
                  <div className="pt-8 border-t border-ink/10">
                    <button className="flex items-center gap-4 text-ink/40 hover:text-accent transition-colors group">
                      <Share2 className="w-5 h-5" />
                      <span className="text-[10px] tracking-[0.4em] uppercase font-bold">Share Case Study</span>
                    </button>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <section className="py-32 md:py-64 px-6 md:px-24 bg-beige/10 relative overflow-hidden">
          <FloatingElements count={10} className="opacity-10" />
          <div className="max-w-[1800px] mx-auto space-y-64">
            {/* Challenge */}
            <div className="grid lg:grid-cols-2 gap-32 items-center">
              <ScrollReveal>
                <div className="space-y-12">
                  <div className="space-y-6">
                    <span className="text-accent text-[10px] tracking-[0.6em] uppercase font-bold block">01 / Challenge</span>
                    <h3 className="text-5xl md:text-8xl font-display font-bold tracking-tighter leading-[0.85] pb-8">
                      THE <br /> <span className="serif italic font-light text-accent">Problem</span>
                    </h3>
                  </div>
                  <p className="text-2xl text-ink/60 font-light leading-relaxed max-w-xl">
                    {project.challenge}
                  </p>
                </div>
              </ScrollReveal>
              <motion.div
                initial={{ opacity: 0, clipPath: "inset(100% 0 0 0)" }}
                whileInView={{ opacity: 1, clipPath: "inset(0% 0 0 0)" }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl"
              >
                <img src={project.gallery[0]} alt="Challenge" className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000" referrerPolicy="no-referrer" />
              </motion.div>
            </div>

            {/* Approach */}
            <div className="grid lg:grid-cols-2 gap-32 items-center">
              <motion.div
                initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
                whileInView={{ opacity: 1, clipPath: "inset(0% 0 0 0)" }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl lg:order-1 order-2"
              >
                <img src={project.gallery[1]} alt="Approach" className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000" referrerPolicy="no-referrer" />
              </motion.div>
              <ScrollReveal>
                <div className="space-y-12 lg:order-2 order-1">
                  <div className="space-y-6">
                    <span className="text-accent text-[10px] tracking-[0.6em] uppercase font-bold block">02 / Approach</span>
                    <h3 className="text-5xl md:text-8xl font-display font-bold tracking-tighter leading-[0.85] pb-8">
                      THE <br /> <span className="serif italic font-light text-accent">Process</span>
                    </h3>
                  </div>
                  <p className="text-2xl text-ink/60 font-light leading-relaxed max-w-xl">
                    {project.approach}
                  </p>
                </div>
              </ScrollReveal>
            </div>

            {/* Results */}
            <div className="grid lg:grid-cols-2 gap-32 items-center">
              <ScrollReveal>
                <div className="space-y-12">
                  <div className="space-y-6">
                    <span className="text-accent text-[10px] tracking-[0.6em] uppercase font-bold block">03 / Results</span>
                    <h3 className="text-5xl md:text-8xl font-display font-bold tracking-tighter leading-[0.85] pb-8">
                      THE <br /> <span className="serif italic font-light text-accent">Impact</span>
                    </h3>
                  </div>
                  <p className="text-2xl text-ink/60 font-light leading-relaxed max-w-xl">
                    {project.results}
                  </p>
                  <div className="pt-8">
                    <MagneticLink to="#" className="inline-flex items-center gap-6 px-12 py-6 bg-ink text-cream rounded-full font-display font-bold tracking-tighter text-xl hover:bg-accent transition-all duration-500 group">
                      Launch Site <ExternalLink className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </MagneticLink>
                  </div>
                </div>
              </ScrollReveal>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="aspect-video rounded-[3rem] overflow-hidden shadow-2xl"
              >
                <img src={project.gallery[2]} alt="Results" className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000" referrerPolicy="no-referrer" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Next Project Transition */}
        <Link to={`/work/${nextProject.id}`} className="block relative h-screen overflow-hidden group">
          <motion.div
            initial={{ scale: 1.2 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 2 }}
            className="absolute inset-0"
          >
            <img
              src={nextProject.image}
              alt={nextProject.title}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <div className="absolute inset-0 bg-ink/80 group-hover:bg-ink/60 transition-colors duration-700" />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-8">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-accent text-[10px] tracking-[0.8em] uppercase font-bold block"
              >
                Next Project
              </motion.span>
              <h2 className="text-8xl md:text-[15vw] font-display font-bold tracking-tighter text-cream leading-[0.85] pb-8 group-hover:scale-105 transition-transform duration-1000">
                {nextProject.title}<span className="text-accent">.</span>
              </h2>
              <div className="flex items-center justify-center gap-6 text-cream pt-12 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-8 group-hover:translate-y-0">
                <span className="text-3xl font-display font-bold tracking-tighter">View Case Study</span>
                <div className="w-16 h-16 rounded-full border border-cream/20 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-500">
                  <ArrowRight className="w-8 h-8" />
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 w-full h-2 bg-cream/10">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 2, ease: "linear" }}
              className="h-full bg-accent origin-left"
            />
          </div>
        </Link>
      </div>
    </PageTransition>
  );
}
