import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const HeroCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const ripples = useRef<{ x: number, y: number, radius: number, life: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const COLS = 42, ROWS = 26;
    const NEON = { r: 245, g: 200, b: 66 };
    const ACCNT = { r: 245, g: 200, b: 66 };
    const GRN = { r: 46, g: 125, b: 79 };
    const RED = { r: 230, g: 33, b: 23 };

    let W: number, H: number, cellW: number, cellH: number;
    let nodes: any[] = [];
    let tick = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      W = Math.ceil(rect.width);
      H = Math.ceil(rect.height);
      
      cellW = W / COLS;
      cellH = H / ROWS;
      
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      
      ctx.scale(dpr, dpr);
      buildNodes();
    };

    const resizeObserver = new ResizeObserver(() => resize());
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    const buildNodes = () => {
      if (!cellW || !cellH) return;
      nodes = [];
      for (let r = 0; r <= ROWS; r++) {
        for (let c = 0; c <= COLS; c++) {
          const rnd = Math.random();
          nodes.push({
            bx: c * cellW, by: r * cellH,
            x: c * cellW, y: r * cellH,
            vx: 0, vy: 0,
            brightness: 0,
            phase: Math.random() * Math.PI * 2,
            col: rnd < 0.05 ? ACCNT : rnd < 0.08 ? GRN : rnd < 0.1 ? RED : NEON,
          });
        }
      }
    };

    const rgba = (c: any, a: number) => {
      const alpha = Number.isFinite(a) ? Math.min(1, Math.max(0, a)) : 0;
      return `rgba(${c.r | 0},${c.g | 0},${c.b | 0},${alpha.toFixed(3)})`;
    };

    const animate = () => {
      tick++;
      if (!W || !H || !cellW || !cellH) {
        requestAnimationFrame(animate);
        return;
      }
      ctx.clearRect(0, 0, W, H);

      // Background
      const bgX = W / 2;
      const bgY = H / 2;
      const bgR = Math.max(W, H) * 0.9;
      
      if (Number.isFinite(bgX) && Number.isFinite(bgY) && Number.isFinite(bgR) && bgR > 0) {
        const bg = ctx.createRadialGradient(bgX, bgY, 0, bgX, bgY, bgR);
        bg.addColorStop(0, '#0a0a0f');
        bg.addColorStop(1, '#050507');
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, W, H);
      } else {
        ctx.fillStyle = '#050507';
        ctx.fillRect(0, 0, W, H);
      }

      // Spotlight
      if (mouse.current.x > 0 && Number.isFinite(mouse.current.x) && Number.isFinite(mouse.current.y)) {
        const sp = ctx.createRadialGradient(mouse.current.x, mouse.current.y, 0, mouse.current.x, mouse.current.y, 350);
        sp.addColorStop(0, 'rgba(245,200,66,0.1)');
        sp.addColorStop(0.2, 'rgba(245,200,66,0.03)');
        sp.addColorStop(0.5, 'rgba(245,200,66,0.01)');
        sp.addColorStop(1, 'transparent');
        ctx.fillStyle = sp;
        ctx.fillRect(0, 0, W, H);
      }

      // Ripples
      ripples.current = ripples.current.filter(r => r.life > 0);
      ripples.current.forEach(r => { r.radius += 5; r.life -= 0.022; });

      const INFL = 200, REPEL = 45, LINE_D = cellW * 2.2;

      nodes.forEach(n => {
        const dx = mouse.current.x - n.bx, dy = mouse.current.y - n.by;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const ang = Math.atan2(n.by - mouse.current.y, n.bx - mouse.current.x);

        if (dist < INFL) {
          const f = (INFL - dist) / INFL;
          // Magnetic pull effect for outer ring
          if (dist < REPEL) {
            n.vx += Math.cos(ang) * f * 3.5;
            n.vy += Math.sin(ang) * f * 3.5;
          } else {
            // Gentle pull towards mouse in the outer influence zone
            n.vx -= Math.cos(ang) * f * 0.7;
            n.vy -= Math.sin(ang) * f * 0.7;
          }
          n.brightness = Math.min(1.2, n.brightness + f * 0.15);
        } else {
          n.brightness = Math.max(0, n.brightness - 0.03);
        }

        ripples.current.forEach(rp => {
          const rd = Math.hypot(n.bx - rp.x, n.by - rp.y);
          const wv = Math.abs(rd - rp.radius);
          if (wv < 28) {
            const wf = (1 - wv / 28) * rp.life;
            n.brightness = Math.min(1, n.brightness + wf * 0.9);
            const ra = Math.atan2(n.by - rp.y, n.bx - rp.x);
            n.vx += Math.cos(ra) * wf * 3.5;
            n.vy += Math.sin(ra) * wf * 3.5;
          }
        });

        const ambient = (Math.sin(tick * 0.015 + n.phase) + 1) / 2;
        if (ambient > 0.88) n.brightness = Math.max(n.brightness, (ambient - 0.88) * 0.15);

        n.vx += (n.bx - n.x) * 0.12;
        n.vy += (n.by - n.y) * 0.12;
        n.vx *= 0.65;
        n.vy *= 0.65;
        n.x += n.vx;
        n.y += n.vy;
      });

      // Lines
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        if (a.brightness < 0.05) continue;
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          if (b.brightness < 0.05) continue;
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d > LINE_D) continue;
          const alpha = ((a.brightness + b.brightness) * 0.5) * (1 - d / LINE_D) * 0.45;
          if (alpha < 0.01) continue;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = rgba(a.col, alpha);
          ctx.lineWidth = 0.4 + alpha * 0.3;
          ctx.stroke();
        }
      }

      // Nodes
      nodes.forEach(n => {
        const b = n.brightness;
        if (b < 0.02) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, 0.6, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255,255,255,0.04)';
          ctx.fill();
          return;
        }
        const sz = 0.7 + b * 2.2;
        if (Number.isFinite(n.x) && Number.isFinite(n.y) && Number.isFinite(sz) && sz > 0) {
          const gr = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, sz * 5);
          gr.addColorStop(0, rgba(n.col, b * 0.45));
          gr.addColorStop(1, rgba(n.col, 0));
          ctx.beginPath();
          ctx.arc(n.x, n.y, sz * 5, 0, Math.PI * 2);
          ctx.fillStyle = gr;
          ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(n.x, n.y, sz, 0, Math.PI * 2);
        ctx.fillStyle = rgba(n.col, Math.min(1, b + 0.3));
        ctx.fill();
      });

      ripples.current.forEach(rp => {
        [1, 0.55].forEach((scale, i) => {
          ctx.beginPath();
          ctx.arc(rp.x, rp.y, rp.radius * scale, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(245,200,66,${(rp.life * (i === 0 ? 0.45 : 0.2)).toFixed(3)})`;
          ctx.lineWidth = i === 0 ? 1.5 : 0.8;
          ctx.stroke();
        });
      });

      requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      // Add window scroll to be absolutely sure if scrolling is involved,
      // though getBoundingClientRect is usually viewport relative for clientX
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      ripples.current.push({ 
        x: e.clientX - rect.left, 
        y: e.clientY - rect.top, 
        radius: 0, 
        life: 1 
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    canvas.addEventListener('click', handleClick);
    resize();
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleClick);
      resizeObserver.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 bg-hero-bg w-full h-full block" />;
};

export default function Hero() {
  const words = ['web studio.', 'dev team.', 'your partner.'];
  const [index, setIndex] = React.useState(0);
  const [displayText, setDisplayText] = React.useState('');
  const [isDeleting, setIsDeleting] = React.useState(false);

  useEffect(() => {
    const type = () => {
      const word = words[index];
      if (isDeleting) {
        setDisplayText(prev => prev.slice(0, -1));
        if (displayText === '') {
          setIsDeleting(false);
          setIndex(prev => (prev + 1) % words.length);
        }
      } else {
        setDisplayText(word.slice(0, displayText.length + 1));
        if (displayText === word) {
          setTimeout(() => setIsDeleting(true), 2000);
          return;
        }
      }
    };

    const timer = setTimeout(type, isDeleting ? 60 : 100);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, index]);

  return (
    <section className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden pt-20" id="hero">
      <HeroCanvas />
      
      <div className="absolute inset-0 pointer-events-none z-[1]">
        <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(46,125,79,0.15)_0%,transparent_70%)] blur-[80px]" />
        <div className="absolute bottom-[-80px] right-[-80px] w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(245,200,66,0.1)_0%,transparent_70%)] blur-[80px]" />
        
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")", backgroundSize: '128px 128px' }} />
      </div>

      <div className="relative z-10 max-w-4xl w-full px-6 text-center py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-10"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-et-green animate-pulse shadow-[0_0_8px_var(--color-et-green)]" />
          <span className="text-mono text-[10px] uppercase tracking-widest text-white/60">Available for new projects · Addis Ababa</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-serif text-4xl md:text-6xl lg:text-8xl font-bold leading-[1.04] tracking-tight text-white mb-6 uppercase min-h-[1.1em] md:min-h-[2.1em] lg:min-h-[2.1em]"
        >
          <span className="text-glow-neon">Ethiopia's</span><br/>
          <em className="text-accent italic font-normal normal-case">premier</em> {displayText}
          <span className="inline-block w-1 md:w-[2px] h-[0.85em] bg-neon ml-1 animate-pulse" />
        </motion.h1>

        <p className="text-sm md:text-base text-white/45 max-w-lg mx-auto mb-10 font-normal leading-relaxed">
          We design and build high-performance websites, e-commerce stores, and web applications for Ethiopian businesses, startups, and global brands. Based in Addis Ababa — delivering everywhere.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <a href="#contact" className="bg-neon text-hero-bg px-6 py-3 rounded-sm font-mono text-[10px] uppercase tracking-widest font-bold shadow-[0_0_20px_var(--color-neon-glow)] transition-all hover:bg-white hover:scale-105">
            Start a project →
          </a>
          <a href="#work" className="border border-white/15 px-6 py-3 rounded-sm font-mono text-[10px] uppercase tracking-widest text-white/70 flex items-center gap-2 hover:border-white/40 hover:text-white transition-all">
            View our work <ArrowRight size={12} />
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded overflow-hidden max-w-2xl mx-auto bg-white/5 backdrop-blur-md">
          {[
            { num: '47+', label: 'Projects shipped' },
            { num: '3yr', label: 'In business' },
            { num: '98%', label: 'Client retention' },
            { num: '4+', label: 'Cities in Ethiopia' }
          ].map((stat, i) => (
            <div key={i} className="bg-hero-bg/40 p-5 group hover:bg-white/5 transition-colors">
              <div className="text-serif text-2xl font-bold text-white mb-0.5 group-hover:text-neon transition-colors">{stat.num}</div>
              <div className="text-mono text-[8px] uppercase tracking-widest text-white/30">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
