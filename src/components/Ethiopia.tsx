import React from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import EthiopiaMap from './EthiopiaMap';

export default function Ethiopia() {
  return (
    <section className="bg-ink text-paper py-24 md:py-40 px-6 md:px-12" id="ethiopia">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <EthiopiaMap />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-8"
        >
          <div className="flex items-center gap-4 text-mono text-[10px] tracking-[0.2em] uppercase text-paper/30">
            <div className="w-5 h-px bg-current" />
            Our home
          </div>
          <h2 className="text-serif text-4xl md:text-5xl font-bold leading-[1.05] tracking-tight">
            Rooted in Ethiopia.<br/><span className="text-neon italic font-normal text-glow-neon">Built for the world.</span>
          </h2>
          <div className="text-sm md:text-base leading-relaxed text-paper/50 space-y-6 font-light max-w-xl">
            <p>Semay Systems was founded in Addis Ababa because we believe Ethiopia deserves world-class digital infrastructure. We've watched our country's startup and business ecosystem explode — and we want to be the studio that helps those businesses look and perform the part.</p>
            <p>We understand the Ethiopian market from the inside: mobile-first users, TeleBirr and CBE Birr payments, local bandwidth realities, and the cultural nuances that foreign agencies simply don't have.</p>
          </div>
          
          <div className="grid grid-cols-3 gap-px bg-paper/10 border border-paper/10 mt-4">
            {[
              { name: 'Addis Ababa', label: 'HQ · Primary market' },
              { name: 'Dire Dawa', label: 'Active clients' },
              { name: 'Hawassa', label: 'Active clients' }
            ].map(city => (
              <div key={city.name} className="bg-ink p-6 hover:bg-paper/5 transition-colors group">
                <div className="text-serif text-base font-bold text-paper mb-1">{city.name}</div>
                <div className="text-mono text-[9px] uppercase tracking-widest text-paper/20 group-hover:text-neon transition-colors">{city.label}</div>
              </div>
            ))}
          </div>

          <div className="border-l-2 border-et-green bg-et-green/5 p-8 mt-6">
            <p className="text-serif text-xl italic text-paper/70 leading-relaxed font-light">
              "Ethiopia has a 3,000-year history of extraordinary craft. We bring that same spirit of precision and pride to every digital product we forge."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
