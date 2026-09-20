'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Pause, Play } from 'lucide-react';

const pieces = [
  { name: 'NYVA Gentle Cleanser', image: 'gentle-cleanser', x: -36, y: 8, angle: -17, z: -65, size: .85 },
  { name: 'NYVA Hydrating Essence', image: 'hydrating-essence', x: -18, y: -16, angle: -8, z: -105, size: .81 },
  { name: 'NYVA Vitamin C Serum', image: 'vitamin-c-serum', x: 0, y: 4, angle: 0, z: 105, size: 1.13 },
  { name: 'NYVA Barrier Cream', image: 'barrier-cream', x: 23, y: 23, angle: 13, z: 25, size: .87 },
  { name: 'NYVA Facial Oil', image: 'facial-oil', x: 38, y: -12, angle: 18, z: -55, size: .83 },
];

export default function NyvaHero() {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const inView = useInView(section, { amount: .05 });
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [selected, setSelected] = useState(2);
  const [hovered, setHovered] = useState<number | null>(null);
  const [mobile, setMobile] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateY = useSpring(mouseX, { stiffness: 55, damping: 22 });
  const rotateX = useSpring(mouseY, { stiffness: 55, damping: 22 });
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, .55, 1], [1, 1.09, 1.18]);
  const lift = useTransform(scrollYProgress, [0, 1], [0, -155]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -75]);
  const textOpacity = useTransform(scrollYProgress, [0, .5, .85], [1, .85, 0]);
  const progress = useTransform(scrollYProgress, [0, 1], [.08, 1]);
  const active = hovered ?? selected;
  const moving = inView && visible && !paused && !reduced;

  useEffect(() => {
    const media = matchMedia('(max-width: 849px)');
    const update = () => setMobile(media.matches);
    const visibility = () => setVisible(!document.hidden);
    update();
    media.addEventListener('change', update);
    document.addEventListener('visibilitychange', visibility);
    return () => { media.removeEventListener('change', update); document.removeEventListener('visibilitychange', visibility); };
  }, []);

  return <section ref={section} className="nyva-cinema" aria-label="NYVA SKIN collection introduction">
    <div className="cinema-light" aria-hidden="true" />
    <div className="cinema-grain" aria-hidden="true" />
    <div className="cinema-monogram" aria-hidden="true">NYVA</div>
    <motion.div className="cinema-copy" style={{ y: reduced || mobile ? 0 : textY, opacity: reduced || mobile ? 1 : textOpacity }}>
      <motion.p className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>✦ THE ART OF YOUR DAILY RITUAL</motion.p>
      <h1>{['Your skin.', 'Elevated.'].map((line, i) => <span className="cinema-line" key={line}><motion.span initial={reduced ? false : { y: '115%', rotate: 3 }} animate={{ y: 0, rotate: 0 }} transition={{ duration: 1.15, delay: .15 + i * .14, ease: [.22, 1, .36, 1] }}>{i === 1 ? <em>{line}</em> : line}</motion.span></span>)}</h1>
      <motion.div initial={reduced ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .6 }}>
        <p className="cinema-description">Twenty essentials. One personal ritual.<br />Discover the world of NYVA SKIN.</p>
        <div className="cinema-ctas"><a className="button" data-cursor="VIEW" href="#collection">Explore Collection <ArrowUpRight size={17} /></a><a className="text-link" href="#about">Our Philosophy <ArrowUpRight size={16} /></a></div>
      </motion.div>
      <div className="cinema-edition"><span>THE COLLECTION</span><span>20 ESSENTIALS / NYVA SKIN</span></div>
    </motion.div>
    <motion.div className="cinema-stage-wrap" style={{ scale: reduced || mobile ? 1 : scale, y: reduced || mobile ? 0 : lift }}>
      <div ref={stage} className="cinema-stage" onPointerMove={e => {
        if (reduced || paused || e.pointerType !== 'mouse' || mobile) return;
        const r = e.currentTarget.getBoundingClientRect();
        mouseX.set((e.clientX - r.left - r.width / 2) / r.width * 16);
        mouseY.set(-(e.clientY - r.top - r.height / 2) / r.height * 12);
      }} onPointerLeave={() => { mouseX.set(0); mouseY.set(0); setHovered(null); }}>
        <div className="cinema-orbit orbit-one" aria-hidden="true" /><div className="cinema-orbit orbit-two" aria-hidden="true" />
        <div className="cinema-aura" aria-hidden="true" />
        <motion.div className="cinema-ensemble" style={{ rotateY: reduced || paused ? 0 : rotateY, rotateX: reduced || paused ? 0 : rotateX }}>
          {pieces.map((piece, i) => <motion.div key={piece.image} className={`cinema-product product-${i} ${active === i ? 'is-selected' : ''}`} style={{ left: `${50 + piece.x}%`, top: `${45 + piece.y}%`, width: `${26 * piece.size}%`, zIndex: i === active ? 15 : i === 2 ? 10 : 4 }} initial={reduced ? false : { opacity: 0, y: 110, rotate: piece.angle + 12, scale: .65 }} animate={{ opacity: 1, y: 0, rotate: piece.angle, scale: 1 }} transition={{ duration: 1.4, delay: .25 + i * .13, ease: [.16, 1, .3, 1] }}>
            <motion.button className="cinema-packshot" aria-label={`Feature ${piece.name}`} aria-pressed={selected === i} onClick={() => setSelected(i)} onFocus={() => setHovered(i)} onBlur={() => setHovered(null)} onPointerEnter={() => setHovered(i)} onPointerLeave={() => setHovered(null)} animate={moving ? { y: [0, i % 2 ? -15 : 14, 0], rotateY: [-6, 7, -6], rotateX: [2, -3, 2], z: piece.z } : { y: 0, rotateY: 0, rotateX: 0, z: piece.z }} transition={moving ? { duration: 6.5 + i * .8, repeat: Infinity, ease: 'easeInOut', delay: i * .25 } : { duration: .6 }}>
              <img src={`/images/hero-${piece.image}.webp`} alt={`${piece.name}, illustrative NYVA packaging`} width={300} height={700} fetchPriority={i === 2 ? 'high' : 'auto'} draggable={false} />
            </motion.button>
          </motion.div>)}
        </motion.div>
      </div>
      <div className="cinema-product-caption" aria-live="polite"><span>{String(active + 1).padStart(2, '0')} / 05</span><div><strong>{pieces[active].name}</strong><small>Illustrative packaging</small></div><ArrowUpRight size={18} aria-hidden="true" /></div>
      <div className="cinema-product-dots" aria-label="Featured products">{pieces.map((p, i) => <button key={p.name} aria-label={`Feature ${p.name}`} aria-pressed={selected === i} onClick={() => setSelected(i)} className={selected === i ? 'active' : ''}><span /></button>)}</div>
    </motion.div>
    <div className="cinema-bottom"><a href="#ritual"><ArrowDown size={16} /><span>SCROLL INTO YOUR RITUAL</span></a><span className="cinema-drag-note">MOVE TO EXPLORE</span><button className="cinema-motion-toggle" disabled={!!reduced} onClick={() => setPaused(v => !v)} aria-label={paused ? 'Play product animation' : 'Pause product animation'}>{paused || reduced ? <Play size={14} /> : <Pause size={14} />}<span>{reduced ? 'REDUCED MOTION' : paused ? 'PLAY MOTION' : 'PAUSE MOTION'}</span></button></div>
    <motion.div className="cinema-scroll-progress" style={{ scaleX: progress }} aria-hidden="true" />
  </section>;
}
