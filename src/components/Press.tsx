import Image from 'next/image';

const pressItems = [
  {
    publication: 'POLITICO',
    number: '01',
    headline: `Helping Hollywood crack the Hill’s climate code`,
    date: 'JULY 2024',
    image: null,
  },
  {
    publication: 'AXIOS',
    number: '02',
    headline: `Exclusive: Ex-Biden staffer launches social impact Hollywood fund`,
    date: 'AUGUST 2024',
    image: '/reels/img2.webp',
  },
  {
    publication: 'POLITICO',
    number: '03',
    headline: `Biden, Harris alums have big Hollywood dreams`,
    date: 'APRIL 2025',
    image: null,
  },
  {
    publication: 'MYNEWSLA',
    number: '04',
    headline: `New Firm Seeks to Pair Politics with Hollywood for Educational Entertainment`,
    date: 'JULY 2024',
    image: '/reels/img4.webp',
  },
  {
    publication: 'POLITICO',
    number: '05',
    headline: `Lucas Jinkis joins California-based Phenomena Global Funds...`,
    date: 'SEPTEMBER 2024',
    image: '/reels/img5.webp',
  },
];

export default function Press() {
  return (
    <section className="relative w-full min-h-[70vh] bg-black flex flex-col items-center justify-center py-20 px-4 md:px-8">
      {/* Spotlight effect */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-black/80 to-black" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[30vw] max-w-5xl rounded-full blur-3xl opacity-40 bg-white/10" />
      </div>
      {/* Title */}
      <h2 className="relative z-10 text-[clamp(2.5rem,7vw,5rem)] font-extrabold tracking-widest text-white text-center mb-4 drop-shadow-lg">
        IN THE PRESS
      </h2>
      <div className="relative z-10 w-24 h-1 bg-white/20 rounded-full mb-12" />
      {/* Press Cards */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full max-w-7xl mx-auto">
        {pressItems.map((item, idx) => (
          <div
            key={item.number}
            className="group relative flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/70 to-black/30 rounded-lg overflow-hidden min-h-[260px] h-[320px] shadow-lg border border-white/10 hover:border-white/30 hover:cursor-pointer transition-all duration-300"
          >
            {/* Optional image background */}
            {item.image && (
              <Image
                src={item.image}
                alt={item.headline}
                fill
                className="object-cover object-center opacity-30 group-hover:opacity-40 transition-all duration-300"
                style={{ zIndex: 0 }}
                priority={idx === 0}
              />
            )}
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent z-10" />
            {/* Content */}
            <div className="relative z-20 flex flex-col h-full justify-end p-6">
              <div className="text-xs tracking-widest text-white/60 mb-1">{item.publication}</div>
              <div className="text-4xl font-extrabold text-white/20 mb-2">{item.number}</div>
              <div className='flex-1' />
              <div className="font-semibold text-white text-lg leading-snug mb-2 line-clamp-2">{item.headline}</div>
              <div className="text-xs text-white/50 tracking-widest mt-auto">{item.date}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
