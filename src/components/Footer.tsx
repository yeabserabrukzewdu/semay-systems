export default function Footer() {
  return (
    <footer className="bg-ink text-paper py-24 md:py-40 px-6 md:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col gap-24">
        <div className="flex flex-col md:flex-row justify-between gap-20">
          <div className="max-w-md">
            <a href="#" className="flex items-center gap-2 mb-8 group">
              <div className="flex flex-col gap-[1.5px] w-[13px]">
                <span className="block h-[3px] rounded-sm bg-et-green"></span>
                <span className="block h-[3px] rounded-sm bg-et-yellow"></span>
                <span className="block h-[3px] rounded-sm bg-et-red"></span>
              </div>
              <span className="text-serif text-2xl font-bold tracking-tight">Semay<span className="text-accent">Systems</span></span>
            </a>
            <p className="text-paper/40 text-lg leading-relaxed font-light mb-12">
              Building the next generation of digital infrastructure for the Horn of Africa. Rooted in Addis, built for the world.
            </p>
            <div className="flex gap-4">
              {['Instagram', 'TikTok', 'Telegram'].map(social => (
                <a key={social} href="#" className="text-mono text-[10px] uppercase tracking-widest text-paper/30 hover:text-accent transition-colors">
                  {social}
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-16 md:gap-32">
            <div>
              <div className="text-mono text-[10px] uppercase tracking-widest text-paper/20 mb-8">Navigation</div>
              <div className="flex flex-col gap-4">
                {['Work', 'Services', 'Ethiopia', 'FAQ'].map(link => (
                  <a key={link} href={`#${link.toLowerCase()}`} className="text-serif text-lg text-paper/60 hover:text-paper transition-colors leading-none">
                    {link}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <div className="text-mono text-[10px] uppercase tracking-widest text-paper/20 mb-8">Contact</div>
              <div className="flex flex-col gap-4">
                <a href="mailto:hello@semaysystems.com" className="text-serif text-lg text-paper/60 hover:text-accent transition-colors leading-none underline underline-offset-8 decoration-white/10 decoration-1">
                  hello@semaysystems.com
                </a>
                <a href="tel:+251911479662" className="text-serif text-lg text-paper/60 hover:text-accent transition-colors leading-none">
                  0911479662
                </a>
                <p className="text-serif text-lg text-paper/40 leading-none">
                  Addis Ababa, Ethiopia
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-white/5 text-mono text-[10px] uppercase tracking-widest text-paper/20">
          <div>© {new Date().getFullYear()} Semay Systems. Proudly forged in Ethiopia.</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-paper transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-paper transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
