export default function Marquee() {
  const items = [
    "Web Design Ethiopia",
    "Website Development Addis Ababa",
    "E-commerce Ethiopia",
    "React & Next.js Ethiopia",
    "Digital Agency Addis Ababa",
    "Web Apps Ethiopia",
    "UI/UX Design Ethiopia"
  ];

  return (
    <div className="bg-ink py-4 overflow-hidden border-y border-white/5">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center gap-12 font-mono text-[10px] uppercase tracking-[0.2em] text-warm-mid/60 px-6 shrink-0">
            {item}
            <div className="flex flex-col gap-0.5">
              <div className="w-1 h-1 rounded-full bg-et-green" />
              <div className="w-1 h-1 rounded-full bg-et-yellow" />
              <div className="w-1 h-1 rounded-full bg-et-red" />
            </div>
          </span>
        ))}
      </div>
    </div>
  );
}
