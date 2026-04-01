import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';

// Components
import Navbar from '@/src/components/Navbar';
import CustomCursor from '@/src/components/CustomCursor';
import SmoothScroll from '@/src/components/SmoothScroll';
import ThreeScene from '@/src/components/ThreeScene';
import Loader from '@/src/components/Loader';

// Pages
import Home from '@/src/pages/Home';
import About from '@/src/pages/About';
import Work from '@/src/pages/Work';
import Services from '@/src/pages/Services';
import Contact from '@/src/pages/Contact';
import ProjectDetail from '@/src/pages/ProjectDetail';

function AppContent() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  return (
    <>
      <AnimatePresence mode="wait">
        {loading ? (
          <Loader key="loader" onComplete={() => setLoading(false)} />
        ) : (
          <div key="main-content" className="relative min-h-screen">
            <div className="noise-overlay" />
            <CustomCursor />
            <SmoothScroll />
            <ThreeScene />
            <Navbar />
            
            <main>
              <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/work" element={<Work />} />
                  <Route path="/work/:id" element={<ProjectDetail />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </AnimatePresence>
            </main>

            {/* Global Footer */}
            <footer className="py-24 px-6 md:px-12 bg-ink text-cream">
              <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
                <div className="col-span-2 space-y-8">
                  <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tighter leading-tight">
                    AETHER STUDIO<span className="text-accent">.</span>
                  </h2>
                  <p className="text-xl text-cream/40 font-light max-w-md">
                    Crafting digital experiences that push the boundaries of design and technology.
                  </p>
                </div>
                <div className="space-y-6">
                  <span className="text-accent text-xs tracking-widest uppercase">Navigation</span>
                  <ul className="space-y-4 text-lg font-display font-bold tracking-tighter">
                    <li><Link to="/" className="hover:text-accent transition-colors">Home</Link></li>
                    <li><Link to="/work" className="hover:text-accent transition-colors">Work</Link></li>
                    <li><Link to="/about" className="hover:text-accent transition-colors">About</Link></li>
                    <li><Link to="/services" className="hover:text-accent transition-colors">Services</Link></li>
                    <li><Link to="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
                  </ul>
                </div>
                <div className="space-y-6">
                  <span className="text-accent text-xs tracking-widest uppercase">Social</span>
                  <ul className="space-y-4 text-lg font-display font-bold tracking-tighter">
                    <li><a href="#" className="hover:text-accent transition-colors">Instagram</a></li>
                    <li><a href="#" className="hover:text-accent transition-colors">Twitter</a></li>
                    <li><a href="#" className="hover:text-accent transition-colors">LinkedIn</a></li>
                    <li><a href="#" className="hover:text-accent transition-colors">Behance</a></li>
                  </ul>
                </div>
              </div>
              <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-cream/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs tracking-widest uppercase text-cream/40">
                <p>&copy; 2026 Aether Studio x CursorBits. All rights reserved.</p>
                <p>Created with passion by <span className="text-accent font-bold">CursorBits</span>.</p>
              </div>
            </footer>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
