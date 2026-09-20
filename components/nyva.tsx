'use client';
import { useEffect, useState, useRef } from 'react';
import { ArrowUpRight, ArrowRight, ArrowDown, Sun, Moon, Search, ShoppingBag, Menu, Minus, Plus, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { motion, MotionConfig, useScroll, useTransform, useReducedMotion } from 'framer-motion';
export type Product = {
    name: string;
    note: string;
    image: string;
    formula: string;
    category: string;
};
export const products: Product[] = [
  {
    "name": "NYVA Gentle Cleanser",
    "note": "Cleansers",
    "category": "Cleansers",
    "image": "cleanser",
    "formula": "Explore NYVA Gentle Cleanser from the NYVA SKIN collection. Full ingredients, directions, sizes and pricing will be added when available."
  },
  {
    "name": "NYVA Cleansing Balm",
    "note": "Cleansers",
    "category": "Cleansers",
    "image": "cream",
    "formula": "Explore NYVA Cleansing Balm from the NYVA SKIN collection. Full ingredients, directions, sizes and pricing will be added when available."
  },
  {
    "name": "NYVA Hydrating Essence",
    "note": "Essence",
    "category": "Essence",
    "image": "cleanser",
    "formula": "Explore NYVA Hydrating Essence from the NYVA SKIN collection. Full ingredients, directions, sizes and pricing will be added when available."
  },
  {
    "name": "NYVA Hyaluronic Serum",
    "note": "Serums",
    "category": "Serums",
    "image": "serum",
    "formula": "Explore NYVA Hyaluronic Serum from the NYVA SKIN collection. Full ingredients, directions, sizes and pricing will be added when available."
  },
  {
    "name": "NYVA Vitamin C Serum",
    "note": "Serums",
    "category": "Serums",
    "image": "serum",
    "formula": "Explore NYVA Vitamin C Serum from the NYVA SKIN collection. Full ingredients, directions, sizes and pricing will be added when available."
  },
  {
    "name": "NYVA Peptide Serum",
    "note": "Serums",
    "category": "Serums",
    "image": "serum",
    "formula": "Explore NYVA Peptide Serum from the NYVA SKIN collection. Full ingredients, directions, sizes and pricing will be added when available."
  },
  {
    "name": "NYVA Niacinamide Serum",
    "note": "Serums",
    "category": "Serums",
    "image": "serum",
    "formula": "Explore NYVA Niacinamide Serum from the NYVA SKIN collection. Full ingredients, directions, sizes and pricing will be added when available."
  },
  {
    "name": "NYVA Retinal Serum",
    "note": "Serums",
    "category": "Serums",
    "image": "serum",
    "formula": "Explore NYVA Retinal Serum from the NYVA SKIN collection. Full ingredients, directions, sizes and pricing will be added when available."
  },
  {
    "name": "NYVA Brightening Serum",
    "note": "Serums",
    "category": "Serums",
    "image": "serum",
    "formula": "Explore NYVA Brightening Serum from the NYVA SKIN collection. Full ingredients, directions, sizes and pricing will be added when available."
  },
  {
    "name": "NYVA Barrier Serum",
    "note": "Serums",
    "category": "Serums",
    "image": "serum",
    "formula": "Explore NYVA Barrier Serum from the NYVA SKIN collection. Full ingredients, directions, sizes and pricing will be added when available."
  },
  {
    "name": "NYVA Daily Moisturiser",
    "note": "Moisturisers",
    "category": "Moisturisers",
    "image": "cream",
    "formula": "Explore NYVA Daily Moisturiser from the NYVA SKIN collection. Full ingredients, directions, sizes and pricing will be added when available."
  },
  {
    "name": "NYVA Barrier Cream",
    "note": "Moisturisers",
    "category": "Moisturisers",
    "image": "cream",
    "formula": "Explore NYVA Barrier Cream from the NYVA SKIN collection. Full ingredients, directions, sizes and pricing will be added when available."
  },
  {
    "name": "NYVA Renewal Cream",
    "note": "Moisturisers",
    "category": "Moisturisers",
    "image": "cream",
    "formula": "Explore NYVA Renewal Cream from the NYVA SKIN collection. Full ingredients, directions, sizes and pricing will be added when available."
  },
  {
    "name": "NYVA Eye Cream",
    "note": "Eye care",
    "category": "Eye care",
    "image": "cream",
    "formula": "Explore NYVA Eye Cream from the NYVA SKIN collection. Full ingredients, directions, sizes and pricing will be added when available."
  },
  {
    "name": "NYVA Overnight Treatment",
    "note": "Treatments",
    "category": "Treatments",
    "image": "cream",
    "formula": "Explore NYVA Overnight Treatment from the NYVA SKIN collection. Full ingredients, directions, sizes and pricing will be added when available."
  },
  {
    "name": "NYVA Exfoliating Treatment",
    "note": "Treatments",
    "category": "Treatments",
    "image": "cleanser",
    "formula": "Explore NYVA Exfoliating Treatment from the NYVA SKIN collection. Full ingredients, directions, sizes and pricing will be added when available."
  },
  {
    "name": "NYVA Clarifying Treatment",
    "note": "Treatments",
    "category": "Treatments",
    "image": "serum",
    "formula": "Explore NYVA Clarifying Treatment from the NYVA SKIN collection. Full ingredients, directions, sizes and pricing will be added when available."
  },
  {
    "name": "NYVA Hydrating Mask",
    "note": "Masks",
    "category": "Masks",
    "image": "cream",
    "formula": "Explore NYVA Hydrating Mask from the NYVA SKIN collection. Full ingredients, directions, sizes and pricing will be added when available."
  },
  {
    "name": "NYVA Facial Oil",
    "note": "Facial oils",
    "category": "Facial oils",
    "image": "oil",
    "formula": "Explore NYVA Facial Oil from the NYVA SKIN collection. Full ingredients, directions, sizes and pricing will be added when available."
  },
  {
    "name": "NYVA SPF 50+",
    "note": "Sun care",
    "category": "Sun care",
    "image": "cleanser",
    "formula": "Explore NYVA SPF 50+ from the NYVA SKIN collection. Full ingredients, directions, sizes and pricing will be added when available."
  }
];
const links = [['Shop', 'collection'], ['Ritual', 'ritual'], ['Ingredients', 'ingredients'], ['Journal', 'journal'], ['About', 'about']];
const ingredients = [
  {
    "name": "Hyaluronic",
    "sub": "NYVA Hyaluronic Serum",
    "text": "Discover the Hyaluronic Serum in the NYVA SKIN collection. Complete formulation details will be shared with the product information.",
    "image": "water"
  },
  {
    "name": "Vitamin C",
    "sub": "NYVA Vitamin C Serum",
    "text": "Meet the Vitamin C Serum, one of seven serums in the collection. Explore the range and find your next ritual.",
    "image": "texture"
  },
  {
    "name": "Peptides",
    "sub": "NYVA Peptide Serum",
    "text": "A dedicated serum within the NYVA SKIN range. Full ingredients and directions will be added when available.",
    "image": "water"
  },
  {
    "name": "Niacinamide",
    "sub": "NYVA Niacinamide Serum",
    "text": "Explore the Niacinamide Serum alongside the other NYVA serums. Product details will include the complete ingredient list.",
    "image": "texture"
  },
  {
    "name": "Retinal",
    "sub": "NYVA Retinal Serum",
    "text": "Meet the Retinal Serum in the NYVA SKIN collection. Refer to the final product information for directions and formulation details.",
    "image": "leaves"
  }
];
function Reveal({ children, className = '' }: {
    children: React.ReactNode;
    className?: string;
}) { const reduced = useReducedMotion(); return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .12 }} transition={{ duration: .8, ease: [.22, 1, .36, 1] }}>{children}</motion.div>; }
function LinkButton({ href, children, secondary = false }: {
    href: string;
    children: React.ReactNode;
    secondary?: boolean;
}) { return <a onMouseMove={e => { if (matchMedia('(pointer:fine) and (prefers-reduced-motion: no-preference)').matches) {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .07}px,${(e.clientY - r.top - r.height / 2) * .1}px)`;
} }} onMouseLeave={e => e.currentTarget.style.transform = ''} data-cursor="VIEW" href={href} className={secondary ? 'text-link' : 'button'}>{children}<ArrowUpRight size={16}/></a>; }
function ThemeToggle({ dark, setDark }: {
    dark: boolean;
    setDark: (v: boolean) => void;
}) { return <button className="icon-button theme-toggle" aria-label={`Switch to ${dark ? 'light' : 'dark'} theme`} onClick={() => setDark(!dark)}>{dark ? <Sun size={18}/> : <Moon size={18}/>}</button>; }
export function Navbar({ dark, setDark, onSearch, onBag, count }: {
    dark: boolean;
    setDark: (v: boolean) => void;
    onSearch: () => void;
    onBag: () => void;
    count: number;
}) { const [menu, setMenu] = useState(false); const [scrolled, setScrolled] = useState(false); useEffect(() => { const fn = () => setScrolled(window.scrollY > 30); window.addEventListener('scroll', fn, { passive: true }); return () => window.removeEventListener('scroll', fn); }, []); return <><header className={`navbar ${scrolled ? 'scrolled' : ''}`}><a className="wordmark" href="#" aria-label="NYVA SKIN home">✦ NYVA<span>SKIN</span></a><nav className="desktop-nav" aria-label="Main navigation">{links.map(([l, id]) => <a key={id} href={`#${id}`}>{l}</a>)}</nav><div className="nav-actions"><button className="icon-button desktop-tool" aria-label="Search products" onClick={onSearch}><Search size={19}/></button><button className="icon-button desktop-tool bag-button" aria-label={`Shopping bag, ${count} items`} onClick={onBag}><ShoppingBag size={19}/>{count > 0 && <span>{count}</span>}</button><ThemeToggle dark={dark} setDark={setDark}/><button className="icon-button mobile-menu-button" aria-label="Open menu" onClick={() => setMenu(true)}><Menu size={22}/></button></div></header><Dialog open={menu} onOpenChange={setMenu}><DialogContent className="mobile-menu"><DialogHeader><DialogTitle className="wordmark">✦ NYVA SKIN</DialogTitle><DialogDescription>Your skin. Your ritual.</DialogDescription></DialogHeader><nav>{links.map(([l, id], i) => <a key={id} href={`#${id}`} onClick={() => setMenu(false)}><small>0{i + 1}</small>{l}<ArrowUpRight /></a>)}</nav><div className="flex gap-5"><button onClick={() => { setMenu(false); onSearch(); }}>Search</button><button onClick={() => { setMenu(false); onBag(); }}>Shopping bag ({count})</button></div></DialogContent></Dialog></>; }
export function ProductShowcase({ onProduct }: {
    onProduct: (p: Product) => void;
}) { const ref = useRef<HTMLElement>(null); const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] }); const rotate = useTransform(scrollYProgress, [0, 1], [-4, 4]); return <section id="ritual" className="showcase section-pad" ref={ref}><Reveal className="showcase-intro"><p className="eyebrow">LESS, BUT CONSIDERED.</p><h2>A moment for you.<br /><em>A little more radiance.</em></h2><p>Not another step. A moment to slow down.<br />Essential formulas. Exceptional everyday rituals.</p></Reveal><div className="showcase-layout"><div className="showcase-number">01<span>THE ESSENTIAL</span></div><motion.div className="showcase-photo" style={{ rotate }}><img src="/images/serum.webp" alt="NYVA SKIN serum packaging visual" loading="lazy"/><span className="bottle-glint"/></motion.div><Reveal className="showcase-copy"><p className="eyebrow">01 — NYVA VITAMIN C SERUM</p><h3>Your skin.<br /><em>In its best light.</em></h3><p>Meet NYVA Vitamin C Serum, part of our seven-serum collection. Explore a range that includes Hyaluronic, Peptide, Niacinamide, Retinal, Brightening and Barrier Serums.</p><button className="text-link" onClick={() => onProduct(products[4])}>Explore Serum <ArrowRight size={18}/></button><div className="formula-notes"><span>NYVA SKIN</span><span>THE SERUM COLLECTION</span></div></Reveal></div></section>; }
export function ProductCollection({ onProduct }: {
    onProduct: (p: Product) => void;
}) { return <section id="collection" className="collection section-pad"><Reveal className="section-heading"><div><p className="eyebrow">GOOD SKIN STARTS WITH A RITUAL</p><h2>The daily <em>ritual.</em></h2></div><a href="#products" className="text-link">Explore all 20 products <ArrowUpRight size={17}/></a></Reveal><p className="collection-note">The complete NYVA SKIN collection. Packaging visuals are illustrative; final product photography and pricing are coming soon.</p><div className="product-grid" id="products">{products.map((p, i) => <Reveal className="product" key={p.name}><button className="product-image" data-cursor="EXPLORE" onClick={() => onProduct(p)}><span className="product-index">{String(i + 1).padStart(2, '0')} / NYVA SKIN</span><img src={`/images/${p.image}.webp`} alt={`Illustrative NYVA SKIN packaging for ${p.name}`} loading="lazy"/><span className="product-discover">Explore product <Plus size={19}/></span></button><div className="product-title"><h3>{p.name}</h3></div><p>{p.note}</p><button className="product-explore text-link" onClick={() => onProduct(p)}>Explore <ArrowUpRight size={14}/></button></Reveal>)}</div></section>; }
export function IngredientStory() { const ref = useRef<HTMLElement>(null); const [active, setActive] = useState(0); const touchStart = useRef(0); useEffect(() => { const onScroll = () => { if (!ref.current || window.innerWidth < 850)
    return; const r = ref.current.getBoundingClientRect(); setActive(Math.min(4, Math.max(0, Math.floor(-r.top / (r.height - window.innerHeight) * 5)))); }; window.addEventListener('scroll', onScroll, { passive: true }); return () => window.removeEventListener('scroll', onScroll); }, []); return <section id="ingredients" className="ingredient-story" ref={ref}><div className="ingredient-sticky"><div className="ingredient-heading"><p className="eyebrow">EXPLORE THE SERUM COLLECTION.</p><h2>The serum <em>edit.</em><br />Find your ritual.</h2></div><div className="ingredient-layout"><div className="ingredient-visual" onTouchStart={e => { touchStart.current = e.touches[0].clientX; }} onTouchEnd={e => { const delta = touchStart.current - e.changedTouches[0].clientX; if (Math.abs(delta) > 45)
    setActive(v => Math.max(0, Math.min(4, v + (delta > 0 ? 1 : -1)))); }}>{ingredients.map((item, i) => <img key={i} className={i === active ? 'active' : ''} src={`/images/${item.image}.webp`} alt={'Editorial texture for the ' + item.name + ' serum story'} loading="lazy"/>)}<span className="image-footnote">THE SERUM INDEX / 0{active + 1}</span></div><div className="ingredient-copy"><div className="ingredient-tabs" role="tablist" aria-label="Ingredients">{ingredients.map((item, i) => <button key={item.name} role="tab" aria-selected={i === active} onClick={() => setActive(i)} className={i === active ? 'active' : ''}>0{i + 1}</button>)}</div><motion.div key={active} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .5 }}><p className="eyebrow">THE NYVA COLLECTION / 0{active + 1}</p><h3>{ingredients[active].name}</h3><h4>{ingredients[active].sub}</h4><p>{ingredients[active].text}</p></motion.div><div className="ingredient-progress"><span style={{ width: `${(active + 1) * 20}%` }}/></div><p className="ingredient-scroll">SCROLL TO EXPLORE <ArrowDown size={15}/></p></div></div></div></section>; }
export function BeforeAfter() { const [value, setValue] = useState(50); return <section className="transformation section-pad"><Reveal className="transformation-copy"><p className="eyebrow">A MOMENT FOR YOUR SKIN</p><h2>Your skin.<br /><em>Your daily<br />ritual.</em></h2><p>A little consistency. A little care.<br />A ritual that puts your skin first.</p><div className="metrics"><div><strong>20</strong><span>Products</span></div><div><strong>7</strong><span>Serums</span></div><div><strong>3</strong><span>Treatments</span></div></div><small className="claim-note">Editorial image comparison only. Generated imagery does not show NYVA product results or a real before-and-after transformation.</small></Reveal><Reveal className="comparison-wrap"><div className="comparison"><img src="/images/after.webp" alt="Illustrative luminous skin texture" loading="lazy"/><img className="before-image" style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }} src="/images/before.webp" alt="Illustrative natural skin texture" loading="lazy"/><div className="comparison-line" style={{ left: `${value}%` }}><span>‹ ›</span></div><span className="before-label">TEXTURE</span><span className="after-label">LUMINOSITY</span><Slider className="comparison-slider" aria-label="Editorial skin image comparison" value={[value]} onValueChange={v => setValue(Array.isArray(v) ? v[0] : v)} min={0} max={100}/></div><p className="comparison-caption">AN EDITORIAL SKIN STUDY <span>DRAG TO COMPARE ↔</span></p></Reveal></section>; }
export function BrandStory() { return <section id="about" className="brand-story"><img src="/images/leaves.webp" alt="Sunlight through botanical leaves" loading="lazy"/><div className="brand-overlay"/><Reveal><p className="eyebrow">THE NYVA SKIN PHILOSOPHY</p><h2>Skincare should feel<br />like a <em>ritual.</em></h2><p>From cleansers and serums to creams, treatments and SPF,<br className="desktop-break"/> explore twenty products from NYVA SKIN.</p><LinkButton href="#philosophy" secondary>Discover Our Story</LinkButton></Reveal><p id="philosophy" className="brand-bottom">THOUGHTFUL FORMULAS. <span>BEAUTIFUL SIMPLICITY.</span> EVERY SINGLE DAY.</p></section>; }
export function CollectionNotes() { const [i, setI] = useState(0); const notes = [ ['A fresh beginning.', 'NYVA Gentle Cleanser · NYVA Cleansing Balm · NYVA Hydrating Essence'], ['The serum edit.', 'Hyaluronic · Vitamin C · Peptide · Niacinamide · Retinal · Brightening · Barrier'], ['Make time for your ritual.', 'NYVA Hydrating Mask · NYVA Facial Oil · NYVA SPF 50+'] ]; return <section className="testimonials section-pad"><p className="eyebrow">MEET NYVA SKIN</p><motion.blockquote key={i} initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} transition={{duration:.6}}>{notes[i][0]}</motion.blockquote><p className="quote-author">{notes[i][1]}</p><div className="quote-controls">{notes.map((_,n)=><button key={n} className={i===n?'active':''} onClick={()=>setI(n)} aria-label={`View collection note ${n+1}`} aria-pressed={i===n}/>)}</div><LinkButton href="#collection" secondary>Explore Collection</LinkButton></section>; }
export const articles = [{ title: 'The Art of a Skin Ritual', image: 'leaves', category: 'RITUALS', body: 'Make a little space for yourself. A daily skincare ritual can be as simple as cleansing gently, applying a moisturiser and giving each step your attention. In the morning, finish with sunscreen. Start small and let your routine become a comfortable part of your day.' }, { title: 'Understanding Your Skin Barrier', image: 'before', category: 'SKIN NOTES', body: 'Your skin’s outer layer helps retain moisture and protect against the environment. A gentle routine gives it room to do its work. Avoid over-cleansing, introduce products gradually, and choose a moisturiser that feels comfortable. Persistent irritation deserves guidance from a qualified professional.' }, { title: 'Botanical Ingredients Worth Knowing', image: 'rosehip', category: 'THE INGREDIENT EDIT', body: 'Botanicals bring a rich vocabulary to skincare. Rosehip oil is known for its fatty acid content; bakuchiol is a plant-derived ingredient used in evening formulas. The complete formulation matters more than a single celebrated ingredient. Patch test new products and choose what suits your skin.' }];
export function Journal({ onArticle }: {
    onArticle: (i: number) => void;
}) { return <section id="journal" className="journal section-pad"><Reveal className="section-heading"><div><p className="eyebrow">A LITTLE KNOWLEDGE. A DEEPER RITUAL.</p><h2>The <em>journal.</em></h2></div><span className="journal-note">Notes on skin & slow living.</span></Reveal><div className="journal-grid">{articles.map((a, i) => <Reveal key={a.title}><button className="journal-card" onClick={() => onArticle(i)} data-cursor="EXPLORE"><div className="journal-image"><img src={`/images/${a.image}.webp`} alt={a.title} loading="lazy"/></div><p className="eyebrow">{a.category}<span>3 MIN READ</span></p><h3>{a.title}<ArrowUpRight size={19}/></h3><span className="text-link">Read the story</span></button></Reveal>)}</div></section>; }
export function Newsletter() { const [email, setEmail] = useState(''); const [sent, setSent] = useState(false); return <section className="newsletter section-pad"><div><p className="eyebrow">LET GOOD THINGS FIND YOU</p><h2>A little more <em>glow.</em></h2><p>Join the NYVA SKIN journal for rituals, ingredients, and skincare notes.</p></div><form onSubmit={e => { e.preventDefault(); setSent(true); }}><div className="email-input"><input aria-label="Your email address" type="email" placeholder="Your email address" value={email} onChange={e => { setEmail(e.target.value); setSent(false); }} required/><button type="submit" aria-label="Subscribe">Subscribe <ArrowRight size={19}/></button></div><p role="status">{sent ? 'Thank you for your interest. Subscriptions are not open yet; your email has not been saved.' : 'Newsletter sign-ups are not open yet.'}</p></form></section>; }
export function Footer({ onInfo }: {
    onInfo: (s: string) => void;
}) { return <footer className="footer section-pad"><div className="footer-top"><div><a href="#" className="wordmark">✦ NYVA SKIN</a><p>YOUR SKIN. YOUR RITUAL.</p></div><nav aria-label="Footer navigation">{links.map(([l, id]) => <a key={id} href={`#${id}`}>{l}</a>)}<button onClick={() => onInfo('Contact')}>Contact</button></nav><nav aria-label="Social links">{['Instagram', 'Pinterest', 'TikTok'].map(x => <button key={x} onClick={() => onInfo(x)}>{x}<ArrowUpRight size={13}/></button>)}</nav></div><div className="footer-bottom"><span>© {new Date().getFullYear()} NYVA SKIN. All rights reserved.</span><div>{['Privacy', 'Terms', 'Shipping', 'Returns'].map(x => <button key={x} onClick={() => onInfo(x)}>{x}</button>)}</div><a href="#">BACK TO TOP ↑</a></div></footer>; }
export function Cursor() { const ref = useRef<HTMLDivElement>(null); useEffect(() => { if (!matchMedia('(pointer:fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches)
    return; const fn = (e: MouseEvent) => { if (!ref.current)
    return; ref.current.style.transform = `translate(${e.clientX}px,${e.clientY}px)`; const target = (e.target as HTMLElement).closest('[data-cursor]'); ref.current.dataset.active = target ? 'true' : 'false'; ref.current.textContent = target?.getAttribute('data-cursor') || ''; }; window.addEventListener('mousemove', fn); return () => window.removeEventListener('mousemove', fn); }, []); return <div ref={ref} className="custom-cursor" aria-hidden="true"/>; }
