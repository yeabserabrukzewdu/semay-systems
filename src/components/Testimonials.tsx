import { motion } from 'motion/react';

const testimonials = [
  {
    quote: "Semay Systems understood our product and our Ethiopian customers better than we expected. The site they built changed how we reach our users in Addis.",
    author: "Sara Reta",
    role: "CEO · Meridian Analytics, Addis Ababa",
    initials: "SR"
  },
  {
    quote: "Three agencies before Semay Systems — none got Ethiopia right. Semay Systems nailed it on the first pass. On time, on budget, no drama.",
    author: "Tadesse Kebede",
    role: "Founder · Aurum, Addis Ababa",
    initials: "TK"
  },
  {
    quote: "Six months after launch, organic traffic up 210%. The SEO and performance work Semay Systems did from day one made the real difference.",
    author: "Mekdes Lema",
    role: "CMO · Verdant, Hawassa",
    initials: "ML"
  }
];

export default function Testimonials() {
  return (
    <section className="bg-ink py-24 md:py-40 px-6 md:px-12" id="testimonials">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 text-mono text-[10px] tracking-[0.2em] uppercase text-paper/30 mb-4">
            <div className="w-5 h-px bg-current" />
            Client words
          </div>
          <h2 className="text-serif text-4xl font-bold text-paper tracking-tight">What Ethiopian businesses say</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-paper/10 border border-paper/10">
          {testimonials.map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-ink p-10 flex flex-col gap-6"
            >
              <span className="text-serif text-4xl text-accent font-serif leading-none opacity-50">"</span>
              <blockquote className="text-serif text-base italic text-paper/90 leading-relaxed font-light mt-[-20px]">
                {t.quote}
              </blockquote>
              <div className="flex items-center gap-4 mt-auto pt-6 border-t border-white/5">
                <div className="w-10 h-10 rounded-full bg-paper/5 flex items-center justify-center text-serif text-xs font-bold text-warm-mid border border-white/5">
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-medium text-paper">{t.author}</div>
                  <div className="text-mono text-[9px] uppercase tracking-widest text-paper/30 mt-0.5">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
