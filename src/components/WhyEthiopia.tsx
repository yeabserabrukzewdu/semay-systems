import { motion } from 'motion/react';
import { Shield, Zap, Globe, Cpu } from 'lucide-react';

const reasons = [
  {
    icon: <Shield />,
    title: 'Local Sovereignty',
    description: 'We believe Ethiopian data should be handled by Ethiopian studios. We build systems that are sovereign, secure, and locally owned.'
  },
  {
    icon: <Zap />,
    title: 'Performance-First',
    description: 'Addis is mobile. We build lightweight, high-performance web apps that work flawlessly even on 3G and edge connections.'
  },
  {
    icon: <Globe />,
    title: 'Cultural Fluency',
    description: 'From Amharic font rendering to intuitive navigation for First-Time users, we bridge the gap between global tech and local hearts.'
  },
  {
    icon: <Cpu />,
    title: 'Modern Stack',
    description: 'We use the same tech as Silicon Valley — React, Next.js, Framer Motion — but deploy it with Ethiopian grit and determination.'
  }
];

export default function WhyEthiopia() {
  return (
    <section className="bg-ink text-paper py-24 md:py-40 px-6 md:px-12 overflow-hidden relative" id="why-ethiopia">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/5 pb-8 gap-8">
          <div>
            <div className="flex items-center gap-4 text-mono text-[10px] tracking-[0.2em] uppercase text-paper/30 mb-4">
              <div className="w-5 h-px bg-current" />
              Why us
            </div>
            <h2 className="text-serif text-4xl font-bold tracking-tight">Why Semay Systems?</h2>
          </div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-accent text-glow-neon">Native Context · Global Standards</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5">
          {reasons.map((reason, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-ink p-12 md:p-16 flex flex-col gap-8 group hover:bg-white/5 transition-colors"
            >
              <div className="w-10 h-10 rounded-sm bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_rgba(245,200,66,0.1)]">
                {reason.icon}
              </div>
              <div>
                <h3 className="text-serif text-2xl font-bold text-paper mb-4 leading-tight">{reason.title}</h3>
                <p className="text-paper/40 text-base leading-relaxed font-light">
                  {reason.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
