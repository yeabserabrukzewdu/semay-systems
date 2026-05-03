import { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

export default function Cursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [trail, setTrail] = useState<{ id: number; x: number; y: number }[]>([]);
  const trailIdCounter = useRef(0);
  const lastTrailPos = useRef({ x: 0, y: 0 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 35, stiffness: 450 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      mouseX.set(x);
      mouseY.set(y);

      // Trail effect logic
      const dist = Math.hypot(x - lastTrailPos.current.x, y - lastTrailPos.current.y);
      if (dist > 30) {
        lastTrailPos.current = { x, y };
        const id = trailIdCounter.current++;
        setTrail((prev) => [...prev.slice(-12), { id, x, y }]);
        setTimeout(() => {
          setTrail((prev) => prev.filter((t) => t.id !== id));
        }, 500);
      }
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = target.closest('a, button, [role="button"], .group, input, textarea');
      setIsHovered(!!isClickable);
    };

    const handleMouseLeave = () => {
      mouseX.set(-100);
      mouseY.set(-100);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleHover);
    window.addEventListener('mouseout', handleHover);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHover);
      window.removeEventListener('mouseout', handleHover);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      <div id="cursor-trail" className="fixed inset-0 pointer-events-none z-[9998] overflow-hidden">
        {trail.map((t) => (
          <div
            key={t.id}
            className="absolute w-[3px] h-[3px] bg-neon rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-[trailFade_0.6s_ease_forwards]"
            style={{ left: t.x, top: t.y }}
          />
        ))}
      </div>
      
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-accent rounded-full pointer-events-none z-[10000] mix-blend-difference hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 1.5 : 1,
          backgroundColor: isHovered ? 'rgba(245, 200, 66, 0.15)' : 'rgba(245, 200, 66, 0)',
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      />
      
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-accent rounded-full pointer-events-none z-[10000] hidden md:block shadow-[0_0_10px_var(--color-accent)]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      <style>{`
        @keyframes trailFade {
          from { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
          to { opacity: 0; transform: translate(-50%, -50%) scale(0); }
        }
      `}</style>
    </>
  );
}
