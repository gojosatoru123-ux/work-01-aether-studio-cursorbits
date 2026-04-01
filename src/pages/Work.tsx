import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'motion/react';
import { useRef, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import PageTransition from '@/src/components/PageTransition';
import { ArrowRight, ExternalLink, Filter, Plus } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import FloatingElements from '@/src/components/FloatingElements';
import ScrollReveal from '@/src/components/ScrollReveal';

const categories = ['All', 'Digital Experience', 'Motion Design', 'Branding', 'Web Development', '3D & Interactive', 'UI/UX Design'];

const projects = [
  { id: 1, title: 'Lumina', category: 'Digital Experience', image: 'https://picsum.photos/seed/lumina/1200/800', year: '2023', size: 'large' },
  { id: 2, title: 'Vortex', category: 'Motion Design', image: 'https://picsum.photos/seed/vortex/1200/800', year: '2024', size: 'small' },
  { id: 3, title: 'Aura', category: 'Branding', image: 'https://picsum.photos/seed/aura/1200/800', year: '2022', size: 'medium' },
  { id: 4, title: 'Nova', category: 'Web Development', image: 'https://picsum.photos/seed/nova/1200/800', year: '2023', size: 'large' },
  { id: 5, title: 'Ethereal', category: '3D & Interactive', image: 'https://picsum.photos/seed/ethereal/1200/800', year: '2024', size: 'medium' },
  { id: 6, title: 'Prism', category: 'UI/UX Design', image: 'https://picsum.photos/seed/prism/1200/800', year: '2022', size: 'small' },
];

function ProjectCard({ project, index }: { project: any; index: number }) {
  const sizeClasses = {
    large: "col-span-12 md:col-span-8 aspect-[16/9]",
    medium: "col-span-12 md:col-span-6 aspect-[4/5]",
    small: "col-span-12 md:col-span-4 aspect-square",
  };

  return (
    <div className={cn(
      "relative group overflow-hidden rounded-2xl md:rounded-3xl bg-ink/5",
      sizeClasses[project.size as keyof typeof sizeClasses]
    )}>
      <ScrollReveal
        delay={index % 3 * 0.1}
        noPadding
        fullHeight
        width="100%"
        className="h-full"
      >
        <Link to={`/work/${project.id}`} className="block w-full h-full">
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-opacity duration-700 group-hover:opacity-80"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 p-6 md:p-16 flex flex-col justify-end bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="space-y-4 md:space-y-6">
              <div className="flex justify-between items-end">
                <div className="space-y-1 md:space-y-2">
                  <span className="text-accent text-[10px] tracking-[0.4em] uppercase font-bold block">{project.category}</span>
                  <h3 className="text-cream text-3xl md:text-7xl font-display font-bold tracking-tighter leading-[0.85] pb-1 md:pb-2">{project.title}</h3>
                </div>
                <div className="serif italic text-cream/40 text-xl md:text-4xl font-light">{project.year}</div>
              </div>
              <div className="w-full h-px bg-cream/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 delay-100" />
              <div className="flex items-center gap-3 md:gap-4 text-cream text-[10px] tracking-[0.3em] uppercase font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                Explore Case Study <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </div>
        </Link>
      </ScrollReveal>
    </div>
  );
}

export default function Work() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return projects;
    return projects.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <PageTransition>
      <section className="pt-32 md:pt-64 pb-16 md:pb-32 px-6 md:px-12 bg-cream min-h-screen relative overflow-hidden">
        <FloatingElements count={12} className="opacity-10" />
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-12 gap-8 md:gap-12 mb-16 md:mb-48 items-end">
            <div className="md:col-span-8 pb-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                className="flex items-center gap-4 mb-6 md:mb-8"
              >
                <span className="w-10 md:w-12 h-px bg-accent" />
                <span className="text-accent text-[10px] tracking-[0.4em] uppercase font-bold">Our Portfolio / 2026</span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-6xl md:text-[12vw] font-display font-bold tracking-tighter leading-[0.85] text-ink pb-4"
              >
                SELECTED <br />
                <span className="serif italic font-light text-accent">Artifacts</span>
              </motion.h1>
            </div>
            <div className="md:col-span-4 pb-4">
              <ScrollReveal delay={0.8}>
                <p className="text-lg md:text-2xl text-ink/60 font-light leading-relaxed border-l border-ink/10 pl-6 md:pl-8"
                >
                  A curated selection of digital experiences that define our pursuit of excellence and artistic innovation.
                </p>
              </ScrollReveal>
            </div>
          </div>

          {/* Filtering */}
          <ScrollReveal delay={1}>
            <div className="mb-12 md:mb-24 overflow-x-auto no-scrollbar">
              <div className="flex md:flex-wrap gap-3 md:gap-8 min-w-max pb-4">
                {categories.map((category, i) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={cn(
                      "text-[10px] md:text-xs tracking-[0.3em] uppercase font-bold px-5 md:px-6 py-2.5 md:py-3 rounded-full border transition-all duration-500",
                      activeCategory === category
                        ? "bg-ink text-cream border-ink"
                        : "bg-transparent text-ink/40 border-ink/10 hover:border-accent hover:text-accent"
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <motion.div
            className="grid grid-cols-12 gap-6 md:gap-12"
          >
            <AnimatePresence>
              {filteredProjects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Interactive CTA */}
      <section className="py-24 md:py-64 bg-ink text-cream px-6 md:px-12 overflow-hidden relative">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center select-none pb-20">
          <h2 className="text-[60vw] md:text-[40vw] font-display font-bold tracking-tighter leading-[0.85] whitespace-nowrap">
            FUTURE
          </h2>
        </div>

        <div className="max-w-5xl mx-auto text-center space-y-12 md:space-y-16 relative z-10">
          <ScrollReveal>
            <div className="space-y-4 pb-4 md:pb-8">
              <span className="text-accent text-[10px] tracking-[0.4em] uppercase font-bold">Next Step / 03</span>
              <h2 className="text-5xl md:text-[10vw] font-display font-bold tracking-tighter leading-[0.85] pb-4">
                READY TO <br />
                <span className="serif italic font-light text-accent">Elevate?</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
            <ScrollReveal delay={0.2}>
              <Link
                to="/contact"
              ><div className="group relative px-12 md:px-24 py-6 md:py-12 bg-cream text-ink rounded-full overflow-hidden transition-all duration-700 shadow-2xl">
                  <span className="relative z-10 text-xl md:text-3xl font-display font-bold tracking-tighter">START A PROJECT</span>
                  <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                </div>
              </Link>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <div className="text-center md:text-left space-y-1 md:space-y-2">
                <p className="text-cream/40 text-[8px] md:text-[10px] uppercase tracking-widest font-bold">Direct Line</p>
                <a href="mailto:hello@aether.studio" className="text-xl md:text-2xl font-display font-bold hover:text-accent transition-colors border-b border-accent/20 hover:border-accent">
                  hello@aether.studio
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
