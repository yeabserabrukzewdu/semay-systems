import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.85);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-12 transition-all duration-500 ${scrolled ? 'top-0 bg-paper/95 backdrop-blur-xl border-b border-border' : 'top-0 md:top-10 bg-hero-bg/85 backdrop-blur-xl border-b border-white/5 shadow-2xl'}`}>
      <a href="#" className="flex items-center gap-2 group transition-colors duration-500">
        <img 
          src="/logo.png" 
          alt="Semay Systems Logo" 
          className="h-18 w-auto transition-all duration-500"
        />
      </a>
      
      <div className="hidden md:flex items-center gap-10">
        {['Work', 'Services', 'Ethiopia', 'FAQ'].map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className={`font-mono text-[10px] uppercase tracking-[0.12em] transition-colors duration-500 ${scrolled ? 'text-text-muted hover:text-ink' : 'text-white/50 hover:text-white'}`}
          >
            {link}
          </a>
        ))}
        <a 
          href="#contact" 
          className={`font-mono text-[10px] uppercase tracking-[0.1em] px-5 py-2.5 rounded-sm transition-all duration-500 ${scrolled ? 'bg-ink text-paper hover:bg-accent' : 'bg-neon text-hero-bg hover:bg-white shadow-[0_0_15px_var(--color-neon-glow)]'}`}
        >
          Start a project
        </a>
      </div>
    </nav>
  );
}
