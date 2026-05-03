import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const faqs = [
  {
    q: "How much does website development cost in Ethiopia?",
    a: "Website development at Semay Systems starts from $4,000 USD (or equivalent ETB) for a professional marketing site. Custom development starts at $6,000, e-commerce from $8,000, and web applications from $12,000."
  },
  {
    q: "Is Semay Systems the best web development company in Ethiopia?",
    a: "We combine international-standard design and engineering with deep local knowledge of the Ethiopian market, user behavior, and payment infrastructure. Our client success speaks for itself."
  },
  {
    q: "Do you work with clients outside of Addis Ababa?",
    a: "Absolutely. We have active clients in Dire Dawa, Hawassa, and Bahir Dar, plus international clients across East Africa and diaspora businesses globally."
  },
  {
    q: "How long does it take to build a website in Ethiopia?",
    a: "A standard marketing website takes 4–6 weeks from kick-off to launch. E-commerce projects take 6–10 weeks. We move quickly because we run focused sprints."
  },
  {
    q: "Can you integrate TeleBirr and local Ethiopian payment systems?",
    a: "Yes — this is a core capability. We integrate TeleBirr, CBE Birr, Dashen Bank mobile banking, and international providers like Stripe."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 md:py-40 px-6 md:px-12 bg-paper" id="faq">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-32">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-4 text-mono text-[10px] tracking-[0.2em] uppercase text-text-muted mb-8">
            <div className="w-5 h-px bg-current" />
            Common inquiries
          </div>
          <h2 className="text-serif text-4xl md:text-5xl font-bold leading-[1.05] tracking-tight mb-10">Frequently asked</h2>
          <p className="text-text-muted text-sm md:text-base leading-relaxed font-light max-w-sm">
            Everything you want to know about working with Ethiopia's leading digital studio.
          </p>
        </div>

        <div className="lg:col-span-2 border-t border-border">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-border">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full py-6 flex justify-between items-center text-left group"
              >
                <span className="text-serif text-lg md:text-xl font-bold group-hover:text-accent transition-colors leading-snug pr-8">{faq.q}</span>
                <span className={`w-8 h-8 rounded-full border border-border flex items-center justify-center font-mono text-[10px] transition-all shrink-0 ${openIndex === i ? 'bg-accent text-paper border-accent transform rotate-135' : ''}`}>
                  +
                </span>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-8 text-sm md:text-base text-text-muted leading-relaxed max-w-xl font-light">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
