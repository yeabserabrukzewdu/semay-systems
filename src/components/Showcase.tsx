import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: "Meridian Analytics — Dashboard & Platform",
    tag: "SaaS · Web App · 2024",
    location: "Addis Ababa, Ethiopia",
    variant: "col-span-12 lg:col-span-7",
    bg: "bg-gradient-to-br from-[#1e3a5f] to-[#0a1628]",
    patternId: "g1"
  },
  {
    title: "Aurum — Luxury Goods Storefront",
    tag: "E-commerce · 2024",
    location: "Addis Ababa, Ethiopia",
    variant: "col-span-12 lg:col-span-5",
    bg: "bg-gradient-to-bl from-[#2d1f3d] to-[#0f0a18]",
    patternId: "g2"
  },
  {
    title: "Verdant — Climate Tech Landing Page",
    tag: "Marketing · Brand · 2023",
    location: "Hawassa, Ethiopia",
    variant: "col-span-12 lg:col-span-6",
    bg: "bg-gradient-to-br from-[#1a2e1a] to-[#0b150b]",
    patternId: "g3"
  },
  {
    title: "Halcyon — Booking & Scheduling",
    tag: "Web App · 2025",
    location: "Dire Dawa, Ethiopia",
    variant: "col-span-12 lg:col-span-6",
    bg: "bg-gradient-to-br from-[#3d2010] to-[#1a0d06]",
    patternId: "g4"
  }
];

export default function Showcase() {
  return (
    <section className="py-24 md:py-40 px-6 md:px-12" id="work">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-border pb-8 gap-8">
          <div>
            <div className="flex items-center gap-4 text-mono text-[10px] tracking-[0.2em] uppercase text-text-muted mb-4">
              <div className="w-5 h-px bg-current" />
              Selected work
            </div>
            <h2 className="text-serif text-4xl font-bold tracking-tight">What we've built</h2>
          </div>
          <div className="font-serif text-base italic text-text-muted">2023 — 2025</div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {projects.map((project, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`${project.variant} group cursor-pointer`}
            >
              <div className={`relative ${i === 1 ? 'aspect-[4/5]' : 'aspect-video'} lg:min-h-[350px] overflow-hidden rounded-sm shadow-2xl bg-ink`}>
                <div className={`absolute inset-0 transition-transform duration-700 group-hover:scale-105 ${project.bg}`} />
                <div className="absolute inset-0 opacity-10 pointer-events-none p-12">
                   <svg viewBox="0 0 100 100" className="w-full h-full stroke-white stroke-[0.3] fill-none">
                    <defs>
                      <pattern id={project.patternId} width="10" height="10" patternUnits="userSpaceOnUse">
                        <circle cx="1" cy="1" r="0.5" fill="white" />
                      </pattern>
                    </defs>
                    <rect width="100" height="100" fill={`url(#${project.patternId})`} />
                  </svg>
                </div>
                <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 backdrop-blur-sm">
                  <ArrowUpRight className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="mt-8 border-t border-border/5 pt-6">
                <div className="text-mono text-[9px] uppercase tracking-widest text-warm-mid mb-2">{project.tag}</div>
                <h3 className="text-serif text-2xl font-bold mb-2 group-hover:text-accent transition-colors leading-tight">{project.title}</h3>
                <div className="text-mono text-[9px] uppercase tracking-wider text-et-green">📍 {project.location}</div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
