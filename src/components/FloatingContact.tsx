import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Phone, Mail, Send } from 'lucide-react';

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-[100] md:flex flex-col items-end gap-4 hidden">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="bg-paper border border-border shadow-2xl rounded-sm p-4 w-64 overflow-hidden"
          >
            <div className="text-mono text-[10px] uppercase tracking-widest text-text-muted mb-4 pb-2 border-b border-border">Quick Contact</div>
            <div className="space-y-4">
              <a href="tel:+251911479662" className="flex items-center gap-3 p-2 hover:bg-ink hover:text-paper transition-colors group">
                <div className="w-8 h-8 rounded-sm bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-ink transition-colors">
                  <Phone size={14} />
                </div>
                <div>
                  <div className="text-[10px] opacity-50 uppercase tracking-tighter">Call Us</div>
                  <div className="text-serif font-bold text-sm tracking-tight">0911479662</div>
                </div>
              </a>
              <a href="mailto:hello@semaysystems.com" className="flex items-center gap-3 p-2 hover:bg-ink hover:text-paper transition-colors group">
                <div className="w-8 h-8 rounded-sm bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-ink transition-colors">
                  <Mail size={14} />
                </div>
                <div>
                  <div className="text-[10px] opacity-50 uppercase tracking-tighter">Email</div>
                  <div className="text-serif font-bold text-sm tracking-tight">hello@semaysystems.com</div>
                </div>
              </a>
              <a href="#" className="flex items-center gap-3 p-2 hover:bg-ink hover:text-paper transition-colors group">
                <div className="w-8 h-8 rounded-sm bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-ink transition-colors">
                  <Send size={14} />
                </div>
                <div>
                  <div className="text-[10px] opacity-50 uppercase tracking-tighter">Telegram</div>
                  <div className="text-serif font-bold text-sm tracking-tight">@semaysystems</div>
                </div>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-16 h-16 bg-accent text-hero-bg rounded-sm shadow-[0_0_30px_rgba(245,200,66,0.3)] flex items-center justify-center relative overflow-hidden group border border-accent"
      >
        <motion.div
           animate={{ rotate: isOpen ? 90 : 0 }}
           transition={{ type: 'spring', damping: 20 }}
           className="relative z-10"
        >
          {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        </motion.div>
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
      </motion.button>
    </div>
  );
}
