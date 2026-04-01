import { motion, useInView, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import PageTransition from '@/src/components/PageTransition';
import ScrollReveal from '@/src/components/ScrollReveal';
import { cn } from '@/src/lib/utils';
import { ArrowRight, Globe, Award, Users, Zap, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import FloatingElements from '@/src/components/FloatingElements';

function Counter({ value, duration = 2 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const totalFrames = duration * 60;
      let frame = 0;

      const timer = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        const currentCount = Math.round(end * progress);
        setCount(currentCount);

        if (frame === totalFrames) {
          clearInterval(timer);
        }
      }, 1000 / 60);

      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}</span>;
}

const team = [
  { name: 'Alex Rivera', role: 'Creative Director', image: 'https://picsum.photos/seed/alex/800/1000', fact: 'Loves vintage synths.' },
  { name: 'Sarah Chen', role: 'Lead Designer', image: 'https://picsum.photos/seed/sarah/800/1000', fact: 'Has 50+ indoor plants.' },
  { name: 'Marcus Thorne', role: 'Tech Lead', image: 'https://picsum.photos/seed/marcus/800/1000', fact: 'Competitive chess player.' },
];

const timeline = [
  { year: '2018', title: 'The Genesis', description: 'Aether Studio was founded in a small garage with a big vision to redefine digital storytelling.' },
  { year: '2020', title: 'Global Reach', description: 'Expanded our team to 15+ creatives across 3 continents, embracing remote collaboration.' },
  { year: '2022', title: 'Award Winning', description: 'Won our first Awwwards Site of the Year for Lumina, setting a new industry standard.' },
  { year: '2024', title: 'Future Forward', description: 'Pioneering the next generation of immersive web experiences with AI and 3D tech.' },
];

const values = [
  { icon: Globe, title: 'Global Vision', description: 'We think beyond borders, creating experiences that resonate with a worldwide audience.' },
  { icon: Award, title: 'Excellence', description: 'We don\'t just meet standards; we set them. Every pixel and every line of code matters.' },
  { icon: Users, title: 'Collaboration', description: 'The best work comes from a fusion of diverse perspectives and shared passion.' },
  { icon: Zap, title: 'Innovation', description: 'We are constantly exploring new technologies to push the boundaries of the digital realm.' },
];

function ParallaxText({ children, baseVelocity = 100 }: { children: string; baseVelocity?: number }) {
  const { scrollY } = useScroll();
  const scrollVelocity = useSpring(scrollY, {
    stiffness: 1000,
    damping: 50,
    restDelta: 0.001
  });
  
  const x = useTransform(scrollVelocity, [0, 1000], [0, baseVelocity]);

  return (
    <div className="overflow-hidden whitespace-nowrap flex flex-nowrap">
      <motion.div style={{ x }} className="flex flex-nowrap">
        <span className="block mr-12">{children}</span>
        <span className="block mr-12">{children}</span>
        <span className="block mr-12">{children}</span>
        <span className="block mr-12">{children}</span>
      </motion.div>
    </div>
  );
}

export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, 500]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  return (
    <PageTransition>
      <div ref={containerRef} className="relative min-h-screen bg-cream overflow-hidden">
        {/* Floating Background Text */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.02] select-none pt-32">
          <motion.div style={{ x: x1 }} className="text-[25vw] font-display font-bold whitespace-nowrap leading-[0.85] mb-24 pb-8">
            AETHER STUDIO AETHER STUDIO
          </motion.div>
          <motion.div style={{ x: x2 }} className="text-[25vw] font-display font-bold whitespace-nowrap leading-[0.85] pb-8">
            CRAFTING EMOTIONS CRAFTING EMOTIONS
          </motion.div>
        </div>

        {/* Hero Section */}
        <section className="relative pt-32 md:pt-64 pb-16 md:pb-32 px-6 md:px-12 z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-8 md:gap-12 items-end mb-24 md:mb-64">
              <div className="lg:col-span-9">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1 }}
                  className="flex items-center gap-4 mb-6 md:mb-8"
                >
                  <span className="w-10 md:w-12 h-px bg-accent" />
                  <span className="text-accent text-[10px] tracking-[0.4em] uppercase font-bold">Our Story / 2018-2026</span>
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                  className="text-6xl md:text-[12vw] font-display font-bold tracking-tighter leading-[0.85] text-ink pb-4 md:pb-8"
                >
                  WE ARE <br /> 
                  <span className="serif italic font-light text-accent">Aether</span> STUDIO<span className="text-accent">.</span>
                </motion.h1>
              </div>
              <div className="lg:col-span-3 pb-4 md:pb-6">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 1 }}
                  className="text-lg md:text-2xl text-ink/60 font-light leading-relaxed border-l border-ink/10 pl-6 md:pl-8"
                >
                  A collective of visionaries dedicated to the intersection of art and technology. We don't just build; we evoke.
                </motion.p>
              </div>
            </div>

            <div className="grid md:grid-cols-12 gap-12 md:gap-24 items-start">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5 }}
                className="md:col-span-7 aspect-[4/5] rounded-[2rem] md:rounded-[3rem] overflow-hidden relative group"
              >
                <img
                  src="https://picsum.photos/seed/studio/1200/1500"
                  alt="Studio"
                  className="w-full h-full object-cover transition-all duration-1500 scale-110 group-hover:scale-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-ink/10 group-hover:bg-transparent transition-colors duration-1000" />
                <div className="absolute top-8 md:top-12 right-8 md:right-12 w-24 h-24 md:w-32 md:h-32 bg-accent rounded-full flex items-center justify-center text-cream font-display font-bold text-[10px] md:text-xs tracking-widest rotate-12 group-hover:rotate-0 transition-transform duration-700">
                  EST. 2018
                </div>
              </motion.div>
              
              <div className="md:col-span-5 space-y-12 md:space-y-16 pt-8 md:pt-48">
                <div className="space-y-6 md:space-y-8">
                  <ScrollReveal>
                    <h2 className="text-4xl md:text-7xl font-display font-bold tracking-tighter leading-tight">
                      PUSHING THE <br /> <span className="serif italic font-light text-accent">Boundaries</span> OF DIGITAL.
                    </h2>
                  </ScrollReveal>
                  <div className="space-y-4 md:space-y-6 text-lg md:text-xl text-ink/60 font-light leading-relaxed">
                    <ScrollReveal delay={0.4}>
                      <p>
                        Founded in 2018, Aether Studio emerged from a desire to bridge the gap between cold technology and warm human emotion. We believe that every digital touchpoint is an opportunity to create a lasting impression.
                      </p>
                    </ScrollReveal>
                    <ScrollReveal delay={0.6}>
                      <p>
                        Our approach is holistic, blending strategic thinking with unbridled creativity. We partner with brands that aren't afraid to challenge the status quo and venture into the unknown.
                      </p>
                    </ScrollReveal>
                  </div>
                </div>
                
                <div className="pt-4 md:pt-8">
                  <Link to="/work" className="group flex items-center gap-4 md:gap-6">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-ink/10 flex items-center justify-center group-hover:bg-ink group-hover:border-ink transition-all duration-500">
                      <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-accent group-hover:text-cream transition-colors" />
                    </div>
                    <span className="text-xl md:text-2xl font-display font-bold tracking-tighter">VIEW OUR WORK</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy Section - Artistic & Immersive */}
        <section className="py-24 md:py-48 bg-ink text-cream relative overflow-hidden">
          <FloatingElements count={8} className="opacity-20" />
          <motion.div 
            style={{ rotate }}
            className="absolute top-[-10%] md:top-[-20%] right-[-10%] w-[80vw] md:w-[60vw] h-[80vw] md:h-[60vw] border border-accent/10 rounded-full pointer-events-none"
          />
          
          <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
            <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
              <div className="space-y-8 md:space-y-12">
                <div className="space-y-4 md:space-y-6">
                  <span className="text-accent text-[10px] tracking-[0.4em] uppercase font-bold block">Philosophy / 01</span>
                  <ScrollReveal>
                    <h2 className="text-5xl md:text-9xl font-display font-bold tracking-tighter leading-[0.85] pb-4 md:pb-8">
                      ART <br /> 
                      <span className="serif italic font-light text-accent">Meets</span> <br />
                      CODE<span className="text-accent">.</span>
                    </h2>
                  </ScrollReveal>
                </div>
                <ScrollReveal delay={0.4}>
                  <p className="text-xl md:text-3xl text-cream/60 font-light leading-relaxed serif italic">
                    "We believe that code is the canvas of the modern age, and every interaction is a brushstroke."
                  </p>
                </ScrollReveal>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                {values.map((value, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="p-6 md:p-8 border border-cream/10 rounded-2xl md:rounded-3xl hover:border-accent transition-colors group"
                  >
                    <value.icon className="w-6 h-6 md:w-8 md:h-8 text-accent mb-4 md:mb-6 group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl md:text-2xl font-display font-bold tracking-tighter mb-2 md:mb-4">{value.title}</h3>
                    <p className="text-cream/40 text-xs md:text-sm font-light leading-relaxed">{value.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 md:py-48 bg-cream text-ink relative z-10">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-24">
              {[
                { label: 'Projects Completed', value: 120, suffix: '+' },
                { label: 'Global Clients', value: 35, suffix: '' },
                { label: 'Awards Won', value: 12, suffix: '' },
                { label: 'Years of Magic', value: 6, suffix: '' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="space-y-2 md:space-y-4 border-l border-ink/10 pl-6 md:pl-8"
                >
                  <div className="text-5xl md:text-8xl font-display font-bold tracking-tighter text-accent leading-[0.85] pb-2 md:pb-4">
                    <Counter value={stat.value} />{stat.suffix}
                  </div>
                  <div className="text-[8px] md:text-[10px] tracking-[0.3em] uppercase opacity-40 font-bold">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-24 md:py-48 px-6 md:px-12 bg-ink text-cream z-10 relative">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-32 gap-8">
              <div className="space-y-4 md:space-y-6">
                <span className="text-accent text-[10px] tracking-[0.4em] uppercase font-bold block">Evolution / 02</span>
                <h2 className="text-5xl md:text-9xl font-display font-bold tracking-tighter leading-[0.85] pb-4 md:pb-8">OUR <br /> <span className="serif italic font-light text-accent">Journey</span></h2>
              </div>
              <p className="text-cream/40 text-lg md:text-xl font-light max-w-sm border-l border-cream/10 pl-6 md:pl-8">
                A chronological look at how we evolved from a garage startup to a global creative powerhouse.
              </p>
            </div>
            <div className="space-y-0">
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="grid md:grid-cols-[1fr_2fr] gap-8 md:gap-12 py-12 md:py-24 border-b border-cream/10 group relative"
                >
                  <div className="text-5xl md:text-[10vw] font-display font-bold tracking-tighter text-cream/5 group-hover:text-accent/20 transition-colors duration-700">
                    {item.year}
                  </div>
                  <div className="space-y-4 md:space-y-8 self-center">
                    <h3 className="text-3xl md:text-6xl font-display font-bold tracking-tighter group-hover:translate-x-4 md:group-hover:translate-x-8 transition-transform duration-700">{item.title}</h3>
                    <p className="text-lg md:text-2xl text-cream/60 font-light max-w-2xl leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-24 md:py-48 px-6 md:px-12 z-10 relative bg-cream">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 md:mb-32 space-y-4 md:space-y-6">
              <span className="text-accent text-[10px] tracking-[0.4em] uppercase font-bold block">The Collective / 03</span>
              <h2 className="text-4xl md:text-8xl font-display font-bold tracking-tighter">THE <span className="serif italic font-light text-accent">Minds</span> BEHIND IT.</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 md:gap-24">
              {team.map((member, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="group"
                >
                  <div className="aspect-[3/4] rounded-[2rem] md:rounded-[3rem] overflow-hidden mb-6 md:mb-12 relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-all duration-1500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-ink/20 group-hover:bg-transparent transition-colors duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-end p-8 md:p-12">
                      <p className="text-cream text-xl md:text-2xl serif italic font-light leading-relaxed">
                        "{member.fact}"
                      </p>
                    </div>
                  </div>
                  <div className="space-y-1 md:space-y-2 px-4">
                    <h3 className="text-3xl md:text-4xl font-display font-bold tracking-tighter">{member.name}</h3>
                    <p className="text-accent text-[10px] tracking-[0.4em] uppercase font-bold">{member.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 md:py-64 bg-ink text-cream z-10 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center select-none pb-20">
            <h2 className="text-[60vw] md:text-[40vw] font-display font-bold tracking-tighter leading-[0.85] whitespace-nowrap">
              CONNECT
            </h2>
          </div>
          
          <div className="max-w-5xl mx-auto text-center relative z-10 space-y-12 md:space-y-16">
            <div className="space-y-4 md:space-y-6">
              <span className="text-accent text-[10px] tracking-[0.4em] uppercase font-bold block">Next Step / 04</span>
              <ScrollReveal className="mx-auto">
                <h2 className="text-5xl md:text-[10vw] font-display font-bold tracking-tighter leading-[0.85] pb-4 md:pb-8">
                  READY TO <br /> <span className="serif italic font-light text-accent">Collaborate?</span>
                </h2>
              </ScrollReveal>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
              <ScrollReveal delay={0.4}>
                <Link
                  to="/contact"
                  className="group relative px-12 md:px-16 py-6 md:py-8 bg-cream text-ink rounded-full overflow-hidden transition-all duration-700"
                >
                  <span className="relative z-10 text-lg md:text-xl font-display font-bold tracking-tighter">START A PROJECT</span>
                  <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                </Link>
              </ScrollReveal>
              
              <ScrollReveal delay={0.6}>
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
      </div>
    </PageTransition>
  );
}
