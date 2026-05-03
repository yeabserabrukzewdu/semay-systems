import { motion } from 'motion/react';

export default function Contact() {
  return (
    <section className="py-32 md:py-48 px-6 md:px-12 relative overflow-hidden bg-paper" id="contact">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(46,125,79,0.05),transparent)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-4 text-mono text-[10px] tracking-[0.2em] uppercase text-text-muted mb-8">
            <div className="w-5 h-px bg-current" />
            Ready when you are
            <div className="w-5 h-px bg-current" />
          </div>
          <h2 className="text-serif text-4xl md:text-6xl lg:text-7xl font-bold leading-[1] tracking-tight mb-8">
            Let's build something<br/><span className="italic text-accent font-normal drop-shadow-sm">Ethiopia is proud of.</span>
          </h2>
          <p className="text-sm md:text-base text-text-muted max-w-lg mx-auto mb-16 leading-relaxed font-light">
            Tell us about your project. We respond within one business day with honest thoughts and a no-obligation proposal.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <a 
              href="mailto:hello@semaysystems.com" 
              className="w-full md:w-auto bg-ink text-paper px-12 py-6 rounded-sm font-mono text-[10px] uppercase tracking-widest hover:bg-accent transition-all hover:-translate-y-1 shadow-2xl"
            >
              hello@semaysystems.com
            </a>
            <div className="text-mono text-[10px] uppercase tracking-widest text-text-muted hidden md:block">or</div>
            <a 
              href="tel:+251911479662" 
              className="w-full md:w-auto border border-border px-12 py-6 rounded-sm font-mono text-[10px] uppercase tracking-widest hover:border-ink transition-all hover:-translate-y-1"
            >
              0911479662
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
