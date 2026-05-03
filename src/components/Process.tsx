import { motion } from 'motion/react';

const steps = [
  {
    number: '01',
    title: 'Strategy & Context',
    description: 'We start by understanding your market. Who are your users in Addis? What payment systems do they use? We define the technical and cultural goals.'
  },
  {
    number: '02',
    title: 'Precision Forge',
    description: 'Our designers and developers build with pixel-perfect intent. No templates. No generic code. Everything is built from scratch for performance.'
  },
  {
    number: '03',
    title: 'Local Polish',
    description: 'We optimize for Ethiopian realities. Fast loading on mobile data, intuitive UX for diverse digital literacy levels, and secure integrations.'
  },
  {
    number: '04',
    title: 'Launch & Bloom',
    description: 'We don\'t just hand over code. We help you scale, monitor performance, and ensure your digital presence continues to grow as Ethiopia does.'
  }
];

export default function Process() {
  return (
    <section className="bg-paper py-24 md:py-40 px-6 md:px-12 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-border pb-8 gap-8">
          <div>
            <div className="flex items-center gap-4 text-mono text-[10px] tracking-[0.2em] uppercase text-text-muted mb-4">
              <div className="w-5 h-px bg-current" />
              How we work
            </div>
          <h2 className="text-serif text-4xl font-bold tracking-tight">The Forging Process</h2>
          </div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-text-muted">High-Touch · Efficient · Native</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col gap-6"
            >
              <div className="text-serif text-3xl font-bold text-accent italic opacity-20">{step.number}</div>
              <h3 className="text-serif text-xl font-bold">{step.title}</h3>
              <p className="text-text-muted text-base leading-relaxed font-light">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
