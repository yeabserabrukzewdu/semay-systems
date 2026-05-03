import { motion } from 'motion/react';
import { Instagram, Send, Phone, Mail, Music } from 'lucide-react';

export default function TopBar() {
  return (
    <div className="bg-ink text-paper/60 border-b border-white/5 h-10 px-6 md:px-12 relative z-[101] hidden md:block">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-full">
        <div className="flex items-center gap-6">
          <a href="mailto:hello@semaysystems.com" className="flex items-center gap-2 hover:text-accent transition-colors">
            <Mail size={12} className="text-accent" />
            <span className="font-mono text-[9px] uppercase tracking-widest">hello@semaysystems.com</span>
          </a>
          <a href="tel:+251911479662" className="flex items-center gap-2 hover:text-accent transition-colors">
            <Phone size={12} className="text-accent" />
            <span className="font-mono text-[9px] uppercase tracking-widest">0911479662</span>
          </a>
        </div>

        <div className="flex items-center gap-5 border-l border-white/10 pl-6 h-4">
          <a href="#" className="hover:text-accent transition-colors" title="Instagram">
            <Instagram size={13} />
          </a>
          {/* Using Music as a placeholder for TikTok as per Lucide limitations */}
          <a href="#" className="hover:text-accent transition-colors" title="TikTok">
            <Music size={13} />
          </a>
          <a href="#" className="hover:text-accent transition-colors" title="Telegram">
            <Send size={13} />
          </a>
        </div>
      </div>
    </div>
  );
}
