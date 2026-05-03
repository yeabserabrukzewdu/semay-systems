import { motion } from 'motion/react';

const services = [
  {
    num: "01",
    name: "Web Design — Ethiopia",
    desc: "Brand-driven visual design for Ethiopian businesses. Marketing sites, landing pages, and digital products built to convert and impress.",
    tags: ["Figma", "UI/UX", "Prototyping"],
    price: "From $4k"
  },
  {
    num: "02",
    name: "Web Development",
    desc: "Fast, accessible, maintainable code built with React and Next.js — optimized for Ethiopian mobile users and global performance standards.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind"],
    price: "From $6k"
  },
  {
    num: "03",
    name: "E-commerce — Ethiopia",
    desc: "Custom storefronts built for the Ethiopian market with TeleBirr, CBE Birr, and international payment integrations from day one.",
    tags: ["Shopify", "TeleBirr", "CBE Birr", "Headless"],
    price: "From $8k"
  },
  {
    num: "04",
    name: "Web Applications",
    desc: "Complex, data-driven applications — dashboards, portals, SaaS products for Addis Ababa startups and Ethiopian enterprises.",
    tags: ["Fullstack", "APIs", "Auth", "Databases"],
    price: "From $12k"
  }
];

export default function Services() {
  return (
    <section className="bg-ink text-paper py-24 md:py-40 px-6 md:px-12" id="services">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-32">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-4 text-mono text-[10px] tracking-[0.2em] uppercase text-paper/30 mb-8">
            <div className="w-5 h-px bg-current" />
            Specializations
          </div>
          <h2 className="text-serif text-4xl md:text-5xl font-bold leading-[1.05] tracking-tight mb-10">
            Digital craftsmanship.<br/><span className="text-accent italic font-normal">Modern & native.</span>
          </h2>
          <p className="text-paper/40 text-base leading-relaxed font-light max-w-sm mb-12">
            Every project starts with listening. We learn your goals, your users, and your constraints — then we build exactly what's needed. No templates, no shortcuts.
          </p>
          <div className="flex flex-col gap-4">
             <a href="#contact" className="text-mono text-[10px] uppercase tracking-widest text-accent hover:text-white transition-colors flex items-center gap-4 group">
               Start a project <div className="w-8 h-px bg-current group-hover:w-12 transition-all" />
             </a>
          </div>
        </div>

        <div className="lg:col-span-2 border-t border-white/10">
          {services.map((s, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group py-12 border-b border-white/10 flex flex-col md:flex-row gap-8 transition-all cursor-pointer hover:bg-white/[0.02] px-4 -mx-4"
            >
              <div className="text-mono text-[11px] text-accent font-bold mt-1.5 opacity-50 group-hover:opacity-100 transition-opacity">
                {s.num}
              </div>
              <div className="flex-1">
                <h3 className="text-serif text-3xl font-bold mb-6 group-hover:text-accent transition-colors">{s.name}</h3>
                <p className="text-paper/40 text-lg leading-relaxed max-w-md mb-8 font-light">{s.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {s.tags.map(tag => (
                    <span key={tag} className="text-mono text-[9px] uppercase tracking-widest border border-white/10 px-3 py-1 rounded-sm text-warm-mid bg-white/[0.02]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-serif text-lg italic text-paper/20 group-hover:text-warm-mid transition-colors pt-1.5 font-light">
                {s.price}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
