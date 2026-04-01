import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import PageTransition from '@/src/components/PageTransition';
import { cn } from '@/src/lib/utils';
import { Send, CheckCircle, ArrowRight, Instagram, Twitter, Linkedin, Mail, MapPin, Plus, Minus, ArrowDownRight, Phone } from 'lucide-react';

import FloatingElements from '@/src/components/FloatingElements';
import ScrollReveal from '@/src/components/ScrollReveal';

function MagneticButton({ children, className, onClick, disabled, type = "button" }: any) {
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

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={cn("relative", className)}
    >
      <button type={type} onClick={onClick} disabled={disabled} className="w-full h-full">
        {children}
      </button>
    </motion.div>
  );
}

const faqs = [
  { question: "How do we start a project?", answer: "We begin with a deep-dive discovery session to understand your vision, goals, and the emotional resonance you want to achieve. From there, we craft a bespoke roadmap." },
  { question: "What is your typical timeline?", answer: "Timelines vary based on complexity, but most immersive digital experiences take between 8 to 16 weeks from discovery to launch." },
  { question: "Do you work with startups?", answer: "Yes, we partner with bold founders who are looking to disrupt their industry through superior design and technical excellence." },
  { question: "What are your core services?", answer: "Our expertise spans Digital Strategy, Experience Design (UX/UI), Motion Design, and High-End Technical Development." },
];

function FAQItem({ faq, index }: { faq: any; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="border-b border-ink/10"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-12 flex items-center justify-between text-left group"
      >
        <div className="flex items-center gap-8">
          <span className="text-accent text-[10px] font-bold opacity-40 group-hover:opacity-100 transition-opacity">0{index + 1}</span>
          <h3 className="text-3xl md:text-5xl font-display font-bold tracking-tighter group-hover:translate-x-4 transition-transform duration-700">
            {faq.question}
          </h3>
        </div>
        <div className={cn(
          "w-12 h-12 rounded-full border border-ink/10 flex items-center justify-center transition-all duration-500",
          isOpen ? "bg-accent border-accent" : "group-hover:border-accent"
        )}>
          {isOpen ? <Minus className="w-5 h-5 text-cream" /> : <Plus className="w-5 h-5 text-accent group-hover:rotate-90 transition-transform duration-500" />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-12 text-xl md:text-2xl text-ink/50 font-light leading-relaxed max-w-3xl">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Contact() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setFormState('success');
  };

  return (
    <PageTransition>
      <div ref={containerRef} className="relative min-h-screen bg-cream text-ink overflow-hidden">
        {/* Noise Overlay */}
        <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        {/* Hero Section */}
        <section className="pt-32 pb-16 md:pt-64 md:pb-48 px-6 md:px-24">
          <div className="max-w-[1800px] mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 md:gap-32 items-end">
              <div className="space-y-8 md:space-y-16">
                <div className="space-y-6 md:space-y-8">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    className="flex items-center gap-4 md:gap-6"
                  >
                    <span className="w-12 md:w-16 h-px bg-accent" />
                    <span className="text-accent text-[10px] tracking-[0.6em] uppercase font-bold">Contact / 01</span>
                  </motion.div>
                  
                  <h1 className="text-6xl md:text-[12vw] font-display font-bold tracking-tighter leading-[0.85] pb-4 md:pb-8">
                    <div className="overflow-hidden">
                      {"LET'S BRING".split('').map((char, i) => (
                        <motion.span
                          key={i}
                          initial={{ y: "100%" }}
                          animate={{ y: 0 }}
                          transition={{ duration: 1, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                          className="inline-block"
                        >
                          {char === ' ' ? '\u00A0' : char}
                        </motion.span>
                      ))}
                    </div>
                    <div className="overflow-hidden">
                      <motion.span
                        initial={{ opacity: 0, y: "100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="block serif italic font-light text-accent ml-[5vw] md:ml-[10vw]"
                      >
                        Magic
                      </motion.span>
                    </div>
                  </h1>
                </div>
                <ScrollReveal delay={0.6}>
                  <p className="text-xl md:text-4xl text-ink/50 font-light leading-tight max-w-xl">
                    Whether you have a fully-formed vision or just a spark of an idea, we're here to bring it to life with precision and soul.
                  </p>
                </ScrollReveal>
              </div>

              <div className="flex flex-col gap-8 md:gap-12 lg:items-end">
                <div className="space-y-2 md:space-y-4 text-left lg:text-right">
                  <p className="text-accent text-[10px] uppercase tracking-[0.5em] font-bold">New Business</p>
                  <a href="mailto:hello@aether.studio" className="text-2xl md:text-5xl font-display font-bold hover:text-accent transition-colors border-b-2 border-accent/10 hover:border-accent pb-1 md:pb-2">
                    hello@aether.studio
                  </a>
                </div>
                <div className="space-y-2 md:space-y-4 text-left lg:text-right">
                  <p className="text-accent text-[10px] uppercase tracking-[0.5em] font-bold">Studio Address</p>
                  <p className="text-xl md:text-3xl font-display font-bold text-ink/80">
                    124 Creative Lane, <br />
                    Digital District, NY 10012
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-24 md:py-48 bg-ink text-cream px-6 md:px-24 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent rounded-full blur-[150px]" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent rounded-full blur-[150px]" />
          </div>

          <div className="max-w-[1800px] mx-auto relative z-10">
            <div className="grid lg:grid-cols-12 gap-16 md:gap-32">
              <div className="lg:col-span-5 space-y-12 md:space-y-16">
                <ScrollReveal>
                  <div className="space-y-6 md:space-y-8">
                    <div className="flex items-center gap-4 md:gap-6">
                      <span className="w-12 h-px bg-accent" />
                      <span className="text-accent text-[10px] tracking-[0.6em] uppercase font-bold block">Inquiry / 02</span>
                    </div>
                    <h2 className="text-5xl md:text-8xl font-display font-bold tracking-tighter leading-[0.85] pb-4 md:pb-8">
                      TELL US <br /> 
                      <span className="serif italic font-light text-accent">Everything</span>
                    </h2>
                  </div>
                </ScrollReveal>
                
                <div className="space-y-8 md:space-y-12">
                  <div className="flex gap-6 md:gap-8">
                    {[Instagram, Twitter, Linkedin].map((Icon, i) => (
                      <ScrollReveal key={i} delay={0.2 + i * 0.1}>
                        <MagneticButton>
                          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-cream/10 flex items-center justify-center hover:bg-accent hover:border-accent transition-all duration-500 group">
                            <Icon className="w-5 h-5 md:w-6 md:h-6 text-cream group-hover:scale-110 transition-transform" />
                          </div>
                        </MagneticButton>
                      </ScrollReveal>
                    ))}
                  </div>
                  <ScrollReveal delay={0.5}>
                    <p className="text-cream/30 text-xs md:text-sm font-light max-w-xs">
                      Follow our journey and see what we're crafting behind the scenes.
                    </p>
                  </ScrollReveal>
                </div>
              </div>

              <div className="lg:col-span-7">
                <AnimatePresence mode="wait">
                  {formState === 'success' ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="h-full flex flex-col items-center justify-center text-center space-y-8 md:space-y-12 py-16 md:py-24 bg-cream/5 rounded-[2rem] md:rounded-[3rem] border border-cream/10"
                    >
                      <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-accent flex items-center justify-center">
                        <CheckCircle className="w-10 h-10 md:w-12 md:h-12 text-ink" />
                      </div>
                      <div className="space-y-2 md:space-y-4">
                        <h3 className="text-4xl md:text-7xl font-display font-bold tracking-tighter">Message Received</h3>
                        <p className="text-xl md:text-2xl text-cream/50 font-light">We'll get back to you within 24 hours.</p>
                      </div>
                      <button 
                        onClick={() => setFormState('idle')}
                        className="text-accent text-[10px] uppercase tracking-[0.5em] font-bold hover:text-cream transition-colors"
                      >
                        Send Another Message
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      onSubmit={handleSubmit}
                      className="space-y-8 md:space-y-12"
                    >
                      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                        {[
                          { id: 'name', label: 'Your Name', type: 'text' },
                          { id: 'email', label: 'Email Address', type: 'email' },
                        ].map((field) => (
                          <div key={field.id} className="relative group">
                            <input
                              type={field.type}
                              id={field.id}
                              required
                              value={(formData as any)[field.id]}
                              onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                              onFocus={() => setFocusedField(field.id)}
                              onBlur={() => setFocusedField(null)}
                              className="w-full bg-transparent border-b border-cream/20 py-4 md:py-6 text-xl md:text-2xl font-display font-bold focus:outline-none focus:border-accent transition-colors peer"
                              placeholder=" "
                            />
                            <label
                              htmlFor={field.id}
                              className={cn(
                                "absolute left-0 top-4 md:top-6 text-xl md:text-2xl font-display font-bold text-cream/30 transition-all duration-500 pointer-events-none",
                                "peer-focus:-top-4 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-[0.5em] peer-focus:text-accent",
                                "peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.5em] peer-[:not(:placeholder-shown)]:text-accent"
                              )}
                            >
                              {field.label}
                            </label>
                          </div>
                        ))}
                      </div>

                      <div className="relative group">
                        <textarea
                          id="message"
                          required
                          rows={4}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          onFocus={() => setFocusedField('message')}
                          onBlur={() => setFocusedField(null)}
                          className="w-full bg-transparent border-b border-cream/20 py-4 md:py-6 text-xl md:text-2xl font-display font-bold focus:outline-none focus:border-accent transition-colors peer resize-none"
                          placeholder=" "
                        />
                        <label
                          htmlFor="message"
                          className={cn(
                            "absolute left-0 top-4 md:top-6 text-xl md:text-2xl font-display font-bold text-cream/30 transition-all duration-500 pointer-events-none",
                            "peer-focus:-top-4 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-[0.5em] peer-focus:text-accent",
                            "peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.5em] peer-[:not(:placeholder-shown)]:text-accent"
                          )}
                        >
                          Your Message
                        </label>
                      </div>

                      <MagneticButton type="submit" className="w-full">
                        <div className="group relative w-full py-8 md:py-12 bg-accent text-ink rounded-full overflow-hidden transition-all duration-700 shadow-2xl">
                          <div className="relative z-10 flex items-center justify-center gap-4 md:gap-6">
                            <span className="text-xl md:text-3xl font-display font-bold tracking-tighter">
                              {formState === 'submitting' ? 'SENDING...' : 'SEND MESSAGE'}
                            </span>
                            <ArrowRight className={cn("w-6 h-6 md:w-8 md:h-8 transition-transform duration-500", formState === 'submitting' ? 'translate-x-12 opacity-0' : 'group-hover:translate-x-2')} />
                          </div>
                          <div className="absolute inset-0 bg-cream translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                        </div>
                      </MagneticButton>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section - Brutalist */}
        <section className="py-24 md:py-64 px-6 md:px-24 bg-cream relative overflow-hidden">
          <FloatingElements count={6} className="opacity-10" />
          <div className="max-w-[1800px] mx-auto">
            <div className="grid lg:grid-cols-12 gap-16 md:gap-32">
              <div className="lg:col-span-4 space-y-6 md:space-y-8">
                <ScrollReveal>
                  <div className="flex items-center gap-4 md:gap-6">
                    <span className="w-12 h-px bg-accent" />
                    <span className="text-accent text-[10px] tracking-[0.6em] uppercase font-bold block">FAQ / 03</span>
                  </div>
                  <h2 className="text-5xl md:text-8xl font-display font-bold tracking-tighter leading-[0.85] pb-4 md:pb-8">
                    COMMON <br /> 
                    <span className="serif italic font-light text-accent">Questions</span>
                  </h2>
                </ScrollReveal>
                <ScrollReveal delay={0.2}>
                  <p className="text-lg md:text-xl text-ink/50 font-light leading-relaxed max-w-xs">
                    Everything you need to know before we embark on this journey together.
                  </p>
                </ScrollReveal>
              </div>
              
              <div className="lg:col-span-8">
                <div className="border-t border-ink/10">
                  {faqs.map((faq, i) => (
                    <FAQItem key={i} faq={faq} index={i} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 md:py-64 bg-ink text-cream px-6 md:px-24 text-center overflow-hidden relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02] select-none pb-20"
          >
            <h2 className="text-[60vw] md:text-[40vw] font-display font-bold tracking-tighter leading-[0.85]">AETHER</h2>
          </motion.div>
          
          <div className="max-w-4xl mx-auto space-y-12 md:space-y-16 relative z-10">
            <ScrollReveal>
              <h2 className="text-5xl md:text-9xl font-display font-bold tracking-tighter leading-[0.85] pb-4 md:pb-8">
                READY TO <br /> 
                <span className="serif italic font-light text-accent">Begin?</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-xl md:text-3xl text-cream/50 font-light leading-tight">
                We're currently accepting new projects for Q3 2026.
              </p>
            </ScrollReveal>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 pt-4 md:pt-8">
              <ScrollReveal delay={0.4}>
                <a href="tel:+1234567890" className="flex items-center gap-4 md:gap-6 group">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-cream/10 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-500">
                    <Phone className="w-5 h-5 md:w-6 md:h-6 text-accent group-hover:text-ink transition-colors" />
                  </div>
                  <span className="text-xl md:text-2xl font-display font-bold">+1 (234) 567-890</span>
                </a>
              </ScrollReveal>
              <ScrollReveal delay={0.5}>
                <a href="mailto:hello@aether.studio" className="flex items-center gap-4 md:gap-6 group">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-cream/10 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-500">
                    <Mail className="w-5 h-5 md:w-6 md:h-6 text-accent group-hover:text-ink transition-colors" />
                  </div>
                  <span className="text-xl md:text-2xl font-display font-bold">hello@aether.studio</span>
                </a>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}

