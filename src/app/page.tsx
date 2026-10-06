"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import SafeImage from "@/components/SafeImage";
import Image from "next/image";
import Link from "next/link";
import { featuredFilms } from "@/app/featured-work/data";
import { teamMembers } from "@/app/team/data";
import { pressItems } from "@/app/media/press/data";
import {
  Clapperboard,
  Tv,
  Film,
  Music,
  Sparkles,
  Building2,
  type LucideIcon,
} from "lucide-react";

const TAGLINE = "Touching Emotional Chords";
const DESCRIPTION =
  "At Smiley Films, every project begins with a story that deserves to be told. We believe cinema has the power to move hearts, reflect society, and travel across cultures.";

// Hero banner slider images (4–5 images, fading backdrop)
const HERO_BANNER_IMAGES = [
  "/images/backdrop/Amruta-Subhash.webp",
  "/images/backdrop/Hum-hai-India.png",
  "/images/backdrop/Mahesh-Thakur.png",
  "/images/backdrop/Shreyash-TDP.png",
  "/images/backdrop/Shreyash.png",
  "/images/backdrop/Vinay-Pathak.webp",
];
const BANNER_INTERVAL_MS = 5000;
const BANNER_FADE_DURATION = 1.2;

const aboutCompanyText =
  "Smiley Films is a Mumbai-based film studio focused on creating meaningful stories for cinema and digital platforms. From development to final screen, we bring together strong creative vision and thoughtful production to craft films that connect with audiences across cultures.";

const aboutVisionText =
  "To build a body of work defined by strong storytelling, cinematic craft, and emotional truth.";

const aboutMissionCultureText =
  "At Smiley Films, storytelling comes first. We work with writers, filmmakers, and collaborators who believe in the power of honest narratives, strong craft, and collaborative filmmaking.";

const DEFAULT_PRESS_IMAGE = "/images/placeholder-poster.svg";

const stats = [
  { value: "33+", label: "Projects" },
  { value: "8+", label: "Years" },
  { value: "10+", label: "Awards" },
];

const awards = [
  {
    year: "2017",
    title: "Second Best Film (Golden Knight)",
    event: "Golden Knight International Film Festival",
    location: "Russia",
  },
  {
    year: "2017",
    title: "Second Best Film (Golden Elephant)",
    event: "ICFFI",
    location: "Hyderabad",
  },
  {
    year: "2016",
    title: "Best Debutant Director",
    event: "South Asia International Film Festival",
    location: "New York",
  },
  {
    year: "2016",
    title: "Best Debutant Director",
    event: "Dadasaheb Phalke International Film Festival",
    location: "New Delhi",
  },
  {
    year: "2016",
    title: "Best Film",
    event: "Smile International Film Festival",
    location: "New Delhi",
  },
];

const testimonials = [
  {
    name: "Shabana Azmi",
    role: "Actor",
    quote:
      '"Chidiya: A Rare Precious Pilgrimage Into Precocity" — Shabana Azmi speaks for the film.',
    source: "In an interview with Subhash K. Jha",
  },
  {
    name: "Anurag Kashyap",
    role: "Filmmaker",
    quote: '"I saw and loved Mehran Amrohi\'s Chidiya…"',
    source: "In an interview with Bollywood Hungama",
  },
  {
    name: "Sharib Hashmi",
    role: "Actor",
    quote:
      "Chidiya bahut pyari aur kamaal ki film hai, kayi jagah par aankhon mein pani aa gaya film dekhkar. Dono bachchon Ayush aur Svar ne kamaal ka kaam kiya hai. Amruta Subhash toh outstanding hain.",
  },
  {
    name: "Harsha Bhogle",
    role: "Cricket Commentator",
    quote:
      "One of my oldest colleagues in the profession is the outstanding cameraperson Taqi. His brother Mehran has made what looks like a very interesting film on two young kids and their desire to play badminton against the odds. Do take a look, the trailer is very nice.",
  },
  {
    name: "Jatin Sapru",
    role: "Sports Anchor",
    quote:
      "Dil ko choone waali kahaani hai… saath mein power of sports… aisi movies banana chahiye — TRAILER OUT NOW!",
  },
  {
    name: "Waseem Barelvi",
    role: "Urdu Poet & Lyricist",
    quote:
      "Saaz, awaaz aur alfaaz jab ek jaan teen qaalib ho jaayein toh taseer ko apna jaam maangne ke liye koi sifaarish nahin chahiye. Azizam Mehran ka yeh filmi geet sunkar mujhe aisa hi laga. Aane wale waqt mein is khaksaarana raaye par Inshallah bahut jald ittefaq ki mohar lagegi. Isi yaqeen ke saath bahut duaein.",
  },
  {
    name: "Shri Lalduhoma",
    role: "Hon'ble Chief Minister of Mizoram",
    quote:
      "It is heartening to know that a film celebrating the dreams, resilience, and imagination of children has touched audiences. I commend your team for crafting a cinematic experience that uplifts and unites — a message most relevant in today's world.",
  },
  {
    name: "Adv. Ashish Shelar",
    role: "Minister of Information Technology, Government of Maharashtra",
    quote:
      "Attended the special pre-release screening of Chidiya, a beautiful and emotionally moving film at Ravindra Natya Mandir. The writer-director has powerfully portrayed childhood dreams and struggles through this film. Extended my best wishes to the entire team for the film's success.",
  },
  {
    name: "Kunwar Danish Ali",
    role: "Former Member of Parliament & Senior Leader",
    quote:
      "As someone who has had the honour of representing Amroha, I am filled with pride to see Chidiya — a beautiful film written and directed by Mehran Amrohi, a true son of our soil. I appeal to everyone to watch and support it. Amroha is proud of you, dear Mehran!",
  },
  {
    name: "Rahul Desai",
    role: "Film Critic",
    quote:
      "Chidiya is a rare indie movie that commits to its simplicity. There is no Amir Khan-coded saviour or social-commentary climax.",
  },
  {
    name: "Dhaval Roy",
    role: "Film Critic",
    quote:
      "Chidiya is a must-watch family fare offering simple yet profound storytelling that warms the heart and leaves you smiling.",
  },
  {
    name: "Subhash K. Jha",
    role: "Film Critic",
    quote: "Chidiya: The Most Precious Film Of The Year",
  },
  {
    name: "Sana Farzeen",
    role: "Film Critic",
    quote:
      "Chidiya is a rare gem, it reminds us of why we fell in love with cinema in the first place.",
  },
  {
    name: "Bhawana Somaaya",
    role: "Film Critic",
    quote:
      "Director ko mai sakshaat pranaam karti hoon, itni khoobsurat film banane ke liye.",
  },
];

function AwardCard({
  award,
  index,
}: {
  award: (typeof awards)[0];
  index: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: { opacity: 0, scale: 0.85, y: 30 },
        visible: {
          opacity: 1,
          scale: 1,
          y: 0,
          transition: {
            duration: 0.7,
            delay: index * 0.1,
            ease: [0.23, 1, 0.32, 1],
          },
        },
      }}
      className="award-card-premium relative flex flex-col items-center justify-center text-center min-h-[260px] py-10 px-6"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 rounded-sm group-hover:opacity-100 transition-opacity" />

      {/* Laurel wreath - behind text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <Image
          src="/images/laurel-wreath.png"
          alt=""
          width={600}
          height={600}
          className="w-full h-full max-w-[100%] max-h-[100%] object-contain opacity-90 mix-blend-lighten"
          aria-hidden
        />
      </div>

      {/* Text content - above image with backdrop for readability */}
      <div className="relative z-20 flex flex-col items-center max-w-[68%] py-5 rounded-lg">
        <p className="text-[var(--gold-light)] text-[10px] font-bold uppercase tracking-[0.35em] mb-1">
          Winner
        </p>
        <div className="w-8 h-px bg-[var(--gold)]/50 mb-3" />
        <h3 className="text-white font-medium text-base md:text-lg leading-snug mb-2">
          {award.title}
        </h3>
        <p className="text-white/75 text-xs leading-relaxed">{award.event}</p>
        <p className="text-[var(--gold-light)]/70 text-xs mt-1 font-medium tracking-wide">
          {award.location} · {award.year}
        </p>
      </div>
    </motion.div>
  );
}

const services: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "Film Productions",
    description:
      "Full-scale feature film production from script to screen with world-class crew.",
    icon: Clapperboard,
  },
  {
    title: "Web Series",
    description:
      "Binge-worthy episodic content crafted for modern streaming platforms.",
    icon: Tv,
  },
  {
    title: "Short Films",
    description:
      "Powerful storytelling in compact format for festivals and digital release.",
    icon: Film,
  },
  {
    title: "Music Videos",
    description:
      "Visual storytelling that amplifies the soul of every musical composition.",
    icon: Music,
  },
  {
    title: "Branded Content",
    description:
      "Premium content that weaves brand narratives into compelling stories.",
    icon: Sparkles,
  },
  {
    title: "Corporate Films",
    description:
      "Professional productions that elevate your business communication.",
    icon: Building2,
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] as const },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

function AnimatedNumber({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      className="stat-number text-2xl md:text-3xl font-serif font-light"
    >
      {value}
    </motion.span>
  );
}

function AboutRightCard({
  title,
  content,
  number,
  delay = 0,
}: {
  title: string;
  content: string;
  number: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeInUp}
      transition={{ delay }}
      className="relative rounded-lg bg-[#2C2C2C]/80 overflow-hidden p-6 md:p-8 border border-white/[0.04]"
    >
      <span
        className="absolute right-4 bottom-4 md:right-6 md:bottom-6 text-[120px] md:text-[160px] font-display font-bold leading-none text-[var(--accent)]/10 select-none pointer-events-none"
        aria-hidden
      >
        {number}
      </span>
      <h3 className="relative font-serif text-lg md:text-xl font-light text-[var(--cream-dark)] mb-3">
        {title}
      </h3>
      <p className="relative text-[var(--fg-muted)] text-sm md:text-base leading-relaxed">
        {content}
      </p>
    </motion.div>
  );
}

// Marquee ticker for brand recognition
const tickerItems = [
  "Feature Films",
  "•",
  "Web Series",
  "•",
  "Short Films",
  "•",
  "Feature Films",
  "•",
  "Web Series",
  "•",
  "Short Films",
  "•",
  "Feature Films",
  "•",
  "Web Series",
  "•",
  "Short Films",
  "•",
  "Feature Films",
  "•",
  "Web Series",
  "•",
  "Short Films",
  "•",
  "Feature Films",
  "•",
  "Web Series",
  "•",
  "Short Films",
  "•",
];

export default function Home() {
  const pressScrollRef = useRef<HTMLDivElement>(null);
  const teamScrollRef = useRef<HTMLDivElement>(null);
  const awardScrollRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const featuredPaused = useRef(false);
  const teamPaused = useRef(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const testimonialPaused = useRef(false);
  const [canScrollLeftP, setCanScrollLeftP] = useState(false);
  const [canScrollRightP, setCanScrollRightP] = useState(true);
  const [bannerIndex, setBannerIndex] = useState(0);

  // Auto-advance hero banner slider
  useEffect(() => {
    const timer = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % HERO_BANNER_IMAGES.length);
    }, BANNER_INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  // Parallax for hero
  const { scrollY } = useScroll();
  const heroImgY = useTransform(scrollY, [0, 600], [0, 80]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroTextY = useTransform(scrollY, [0, 400], [0, -60]);

  const updateScrollState = (
    ref: React.RefObject<HTMLDivElement | null>,
    setLeft: (v: boolean) => void,
    setRight: (v: boolean) => void,
  ) => {
    const el = ref.current;
    if (!el) return;
    setLeft(el.scrollLeft > 0);
    setRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const run = () => {
      updateScrollState(pressScrollRef, setCanScrollLeftP, setCanScrollRightP);
    };
    run();
    pressScrollRef.current?.addEventListener("scroll", run);
    window.addEventListener("resize", run);
    return () => {
      pressScrollRef.current?.removeEventListener("scroll", run);
      window.removeEventListener("resize", run);
    };
  }, []);

  const scrollSlider = (
    ref: React.RefObject<HTMLDivElement | null>,
    dir: "left" | "right",
    stepMultiplier = 0.6,
  ) => {
    const el = ref.current;
    if (!el) return;
    const step = el.clientWidth * stepMultiplier;
    el.scrollBy({ left: dir === "left" ? -step : step, behavior: "smooth" });
  };

  const nextFeatured = () =>
    setFeaturedIndex((i) => (i + 1) % featuredFilms.length);
  const prevFeatured = () =>
    setFeaturedIndex(
      (i) => (i - 1 + featuredFilms.length) % featuredFilms.length,
    );

  useEffect(() => {
    const id = setInterval(() => {
      if (!featuredPaused.current) nextFeatured();
    }, 5000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      if (!teamPaused.current) scrollTeamSlider("right");
    }, 3500);
    return () => clearInterval(id);
  }, []);

  const nextTestimonial = () =>
    setTestimonialIndex((i) => (i + 1) % testimonials.length);
  const prevTestimonial = () =>
    setTestimonialIndex(
      (i) => (i - 1 + testimonials.length) % testimonials.length,
    );

  useEffect(() => {
    const id = setInterval(() => {
      if (!testimonialPaused.current) nextTestimonial();
    }, 6000);
    return () => clearInterval(id);
  }, []);

  /** Awards carousel: always show both arrows, infinite wrap on prev/next */
  const scrollAwardSlider = (dir: "left" | "right") => {
    const el = awardScrollRef.current;
    if (!el) return;
    const threshold = 10;
    const atStart = el.scrollLeft <= threshold;
    const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - threshold;
    if (dir === "right" && atEnd) {
      el.scrollTo({ left: 0, behavior: "smooth" });
    } else if (dir === "left" && atStart) {
      el.scrollTo({
        left: el.scrollWidth - el.clientWidth,
        behavior: "smooth",
      });
    } else {
      scrollSlider(awardScrollRef, dir, 0.8);
    }
  };

  /** Team carousel: always show both arrows, infinite wrap on prev/next */
  const scrollTeamSlider = (dir: "left" | "right") => {
    const el = teamScrollRef.current;
    if (!el) return;
    const threshold = 10;
    const atStart = el.scrollLeft <= threshold;
    const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - threshold;
    if (dir === "right" && atEnd) {
      el.scrollTo({ left: 0, behavior: "smooth" });
    } else if (dir === "left" && atStart) {
      el.scrollTo({
        left: el.scrollWidth - el.clientWidth,
        behavior: "smooth",
      });
    } else {
      scrollSlider(teamScrollRef, dir, 0.8);
    }
  };

  return (
    <>
      {/* ——— HERO ——— */}
      <section
        id="home"
        ref={heroRef}
        className="relative flex min-h-screen flex-col justify-center pt-20 overflow-hidden"
      >
        {/* Animated orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="gradient-orb gradient-orb-1 animate-pulse-glow" />
          <div
            className="gradient-orb gradient-orb-2 animate-pulse-glow"
            style={{ animationDelay: "-5s" }}
          />
          <div
            className="gradient-orb gradient-orb-3 animate-pulse-glow"
            style={{ animationDelay: "-10s" }}
          />
          <div
            className="gradient-orb gradient-orb-4 animate-pulse-glow"
            style={{ animationDelay: "-15s" }}
          />

          {/* Spotlight */}
          <div className="spotlight" style={{ top: "20%", left: "30%" }} />

          {/* Scanline effect */}
          <div className="film-line" />
        </div>

        {/* Hero image slider with fade + parallax */}
        <div className="absolute inset-0">
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            style={{ y: heroImgY }}
            className="absolute inset-0"
          >
            {HERO_BANNER_IMAGES.map((src, index) => (
              <motion.div
                key={src}
                initial={false}
                animate={{
                  opacity: index === bannerIndex ? 0.2 : 0,
                  scale: index === bannerIndex ? 1 : 1.02,
                }}
                transition={{
                  duration: BANNER_FADE_DURATION,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="absolute inset-0"
                aria-hidden
              >
                <SafeImage
                  src={src}
                  alt=""
                  fill
                  className="object-cover object-center"
                  priority={index === 0}
                  sizes="100vw"
                />
              </motion.div>
            ))}
            {/* Multi-layer gradient overlays (backdrop for readability) */}
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)] via-transparent to-[var(--bg)]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg)] via-transparent to-[var(--bg)]/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/80 via-transparent to-transparent" />
          </motion.div>
        </div>

        {/* Hero content */}
        <motion.div
          style={{ y: heroTextY, opacity: heroOpacity }}
          className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-12 text-center pt-24 md:pt-0"
        >
          {/* Pre-title label */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-8 flex items-center justify-center gap-6"
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[var(--accent)]" />
            <span className="text-[var(--accent)] text-xs font-semibold tracking-[0.4em] uppercase">
              Mumbai · Est. 2017
            </span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[var(--accent)]" />
          </motion.div>

          {/* Main tagline with dramatic reveal */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.23, 1, 0.32, 1] }}
            className="relative inline-block mb-8"
          >
            {/* Corner bracket decorations */}
            <div className="absolute -top-4 left-5 md:-left-5 w-10 h-10 pointer-events-none">
              <div className="absolute top-0 left-0 w-8 h-0.5 bg-[var(--accent)]" />
              <div className="absolute top-0 left-0 w-0.5 h-8 bg-[var(--accent)]" />
            </div>
            <div className="absolute -top-4 right-5 md:-right-5 w-10 h-10 pointer-events-none">
              <div className="absolute top-0 right-0 w-8 h-0.5 bg-[var(--accent)]" />
              <div className="absolute top-0 right-0 w-0.5 h-8 bg-[var(--accent)]" />
            </div>
            <div className="absolute -bottom-4 left-5 md:-left-5 w-10 h-10 pointer-events-none">
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-[var(--accent)]" />
              <div className="absolute bottom-0 left-0 w-0.5 h-8 bg-[var(--accent)]" />
            </div>
            <div className="absolute -bottom-4 right-5 md:-right-5 w-10 h-10 pointer-events-none">
              <div className="absolute bottom-0 right-0 w-8 h-0.5 bg-[var(--accent)]" />
              <div className="absolute bottom-0 right-0 w-0.5 h-8 bg-[var(--accent)]" />
            </div>

            <div className="px-8 py-5 md:px-12 md:py-7">
              <h1 className="text-shimmer font-display text-xl md:text-2xl lg:text-3xl font-bold uppercase tracking-[0.2em]">
                {TAGLINE}
              </h1>
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="max-w-xl mx-auto text-base text-[var(--fg-muted)] leading-relaxed md:text-lg mb-10"
          >
            {DESCRIPTION}
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.6 }}
            className="mt-20 md:mt-24 flex flex-col items-center gap-3"
          >
            <span className="text-[var(--fg-dim)] text-[10px] tracking-[0.3em] uppercase">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-px h-12 bg-gradient-to-b from-[var(--accent)] to-transparent"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ——— TICKER / MARQUEE ——— */}
      <div className="py-5 bg-[var(--accent)] overflow-hidden">
        <div className="marquee-track flex items-center gap-8 text-white text-xs font-semibold uppercase tracking-[0.2em]">
          {tickerItems.map((item, i) => (
            <span
              key={i}
              className={
                item === "•" ? "text-white/40 text-base" : "whitespace-nowrap"
              }
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ——— FEATURED WORK ——— */}
      <section
        id="featured-work"
        className="py-24 md:py-32 scroll-mt-24 relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[var(--accent)]/4 blur-[120px] pointer-events-none" />

        {/* Centered title block */}
        <div className="mx-auto max-w-7xl px-6 md:px-12 mb-14">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center"
          >
            <span className="section-label">Showcase</span>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl lg:text-6xl font-light text-white">
              Featured <span className="text-gradient">Work</span>
            </h2>
            <div className="mt-6 w-16 h-0.5 bg-gradient-to-r from-[var(--accent)] to-transparent mx-auto" />
          </motion.div>
        </div>

        {/* Full-width infinite carousel */}
        <div
          className="relative w-full"
          onMouseEnter={() => (featuredPaused.current = true)}
          onMouseLeave={() => (featuredPaused.current = false)}
        >
          <button
            type="button"
            onClick={prevFeatured}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 glass flex items-center justify-center text-white hover:bg-[var(--accent)]/30 hover:border-[var(--accent)]/40 transition-all duration-300 hover:scale-110"
            aria-label="Previous"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={nextFeatured}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 glass flex items-center justify-center text-white hover:bg-[var(--accent)]/30 hover:border-[var(--accent)]/40 transition-all duration-300 hover:scale-110"
            aria-label="Next"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          <div className="aspect-[10/9] md:aspect-[21/9] relative overflow-hidden bg-[var(--bg)]">
            {featuredFilms.map((film, index) => (
              <Link
                key={film.slug}
                href={`/featured-work/${film.slug}`}
                className={`group absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  index === featuredIndex
                    ? "opacity-100 z-[1] pointer-events-auto"
                    : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <SafeImage
                  src={film.poster}
                  alt={film.title}
                  fill
                  priority={index <= 1}
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg)]/60 via-transparent to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                  <h3 className="font-serif text-xl md:text-4xl mb-3 lg:text-5xl font-light text-white group-hover:text-[var(--accent)] transition-colors duration-300">
                    {film.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 bg-[var(--accent)]/90 px-3 py-1 text-white text-[10px] font-semibold tracking-widest uppercase">
                      {film.category}
                    </span>
                    {film.platform && (
                      <>
                        <span className="text-[var(--accent)]/60">·</span>
                        <span className="text-[var(--fg-muted)] text-xs">
                          {film.platform}
                        </span>
                      </>
                    )}
                    {film.duration && (
                      <>
                        <span className="text-[var(--accent)]/60">·</span>
                        <span className="text-[var(--fg-muted)] text-xs">
                          {film.duration}
                        </span>
                      </>
                    )}
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-white/50 group-hover:text-white/90 transition-all duration-300 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="text-xs tracking-widest uppercase font-medium">
                      View Details
                    </span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px divider-gradient opacity-60" />
      </section>

      {/* ——— AWARDS ——— */}
      <section
        id="awards"
        className="py-24 md:py-36 px-6 md:px-12 scroll-mt-24 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-px divider-gradient opacity-60" />
        {/* Dramatic background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-black via-transparent" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-[var(--gold)]/4 blur-[150px]" />
        </div>

        <div className="mx-auto max-w-6xl relative">
          {/* Section header — cinematic dark */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
            className="mb-20 text-center relative"
          >
            {/* Ambient glow behind heading — red to match theme */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-40 bg-[var(--accent)]/8 blur-[80px] pointer-events-none rounded-full" />

            {/* Trophy icon */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: 0.15,
                type: "spring",
                stiffness: 200,
              }}
              className="inline-flex items-center justify-center w-14 h-14 mb-6 relative"
            >
              <div className="absolute inset-0 rounded-full bg-[var(--accent)]/10 ring-1 ring-[var(--accent)]/30" />
              <span className="text-2xl relative z-10 grayscale brightness-150">
                🏆
              </span>
            </motion.div>

            {/* Label */}
            <div className="flex items-center justify-center gap-5 mb-5">
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-[var(--accent)]/60" />
              <span className="text-[var(--accent)] text-[10px] font-bold tracking-[0.45em] uppercase">
                Recognition
              </span>
              <div className="h-px w-20 bg-gradient-to-l from-transparent to-[var(--accent)]/60" />
            </div>

            {/* Headline */}
            <h2 className="relative font-serif text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-none text-[var(--fg)]">
              Awards
              <br />
              <span className="font-serif font-light text-3xl md:text-5xl lg:text-6xl tracking-widest text-[var(--fg-muted)] not-italic normal-case">
                &amp; Accolades
              </span>
              <span className="text-[var(--accent)] text-2xl">(Chidiya)</span>
            </h2>

            {/* Dot divider — accent red */}
            <div className="mt-8 flex items-center justify-center gap-4">
              {[...Array(7)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.06, duration: 0.4 }}
                  className={`rounded-full ${i === 3 ? "w-3 h-3 bg-[var(--accent)]" : "w-1.5 h-1.5 bg-[var(--accent)]/35"}`}
                />
              ))}
            </div>
          </motion.div>

          {/* Award cards - click-to-slide carousel, arrows both sides, infinite wrap */}
          <div className="mt-14 relative mx-auto max-w-[948px] md:max-w-[1084px]">
            <button
              type="button"
              onClick={() => scrollAwardSlider("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 glass flex items-center justify-center text-white hover:bg-[var(--accent)]/30 hover:border-[var(--accent)]/40 transition-all duration-300 -translate-x-2 hover:scale-110"
              aria-label="Previous award"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scrollAwardSlider("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 glass flex items-center justify-center text-white hover:bg-[var(--accent)]/30 hover:border-[var(--accent)]/40 transition-all duration-300 translate-x-2 hover:scale-110"
              aria-label="Next award"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            <div
              ref={awardScrollRef}
              className="slider-track w-full flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory pb-4"
              style={{ scrollSnapType: "x mandatory" }}
            >
              {awards.map((award, i) => (
                <div
                  key={`${award.event}-${award.year}-${i}`}
                  className="flex-shrink-0 w-[300px] md:w-[340px] snap-center"
                >
                  <AwardCard award={award} index={i} />
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials — one at a time, infinite carousel */}
          <div
            className="mt-20 md:mt-28 relative"
            onMouseEnter={() => (testimonialPaused.current = true)}
            onMouseLeave={() => (testimonialPaused.current = false)}
          >
            <div className="flex items-center justify-center gap-5 mb-8">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--accent)]/50" />
              <span className="text-[var(--accent)] text-[10px] font-bold tracking-[0.35em] uppercase">
                Testimonials
              </span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--accent)]/50" />
            </div>
            <div className="relative max-w-3xl mx-auto min-h-[220px] md:min-h-[200px]">
              <button
                type="button"
                onClick={prevTestimonial}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 glass flex items-center justify-center text-white hover:bg-[var(--accent)]/30 hover:border-[var(--accent)]/40 transition-all duration-300 -translate-x-2 hover:scale-110"
                aria-label="Previous testimonial"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={nextTestimonial}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 glass flex items-center justify-center text-white hover:bg-[var(--accent)]/30 hover:border-[var(--accent)]/40 transition-all duration-300 translate-x-2 hover:scale-110"
                aria-label="Next testimonial"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
              <div
                key={testimonialIndex}
                className="flex flex-col items-center justify-center text-center px-4 md:px-12 py-8 transition-opacity duration-700 ease-in-out"
              >
                <blockquote className="text-[var(--fg)] text-lg md:text-xl lg:text-2xl font-light leading-relaxed italic">
                  {testimonials[testimonialIndex]?.quote}
                </blockquote>
                <footer className="mt-6">
                  <p className="text-white font-medium">
                    {testimonials[testimonialIndex]?.name}
                  </p>
                  <p className="text-[var(--accent)] text-sm mt-0.5">
                    {testimonials[testimonialIndex]?.role}
                  </p>
                  {testimonials[testimonialIndex]?.source && (
                    <p className="text-[var(--fg-muted)] text-xs mt-2">
                      {testimonials[testimonialIndex]?.source}
                    </p>
                  )}
                </footer>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ——— ABOUT US ——— */}
      <section
        id="about"
        className="py-24 md:py-36 px-6 md:px-12 scroll-mt-24 bg-[#1A1A1A] relative overflow-hidden"
      >
        {/* Background decorations */}
        <div className="absolute top-0 left-0 right-0 h-px divider-gradient opacity-60" />
        <div className="absolute bottom-0 right-0 left-0 h-px divider-gradient opacity-60" />
        {/* Faded "Smiley" watermark - left panel */}
        <div
          className="absolute left-0 bottom-[15%] md:bottom-[20%] text-[clamp(120px,20vw,240px)] font-display font-bold leading-none text-[var(--accent)]/[0.06] select-none pointer-events-none"
          aria-hidden
        >
          Smiley
        </div>

        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1fr] gap-12 lg:gap-16 items-start">
            {/* Left column: WHO WE ARE, ABOUT, The Company, tag, BORN IN MUMBAI, built for the world, description, divider, stats */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="relative text-center md:text-left"
            >
              <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
                <span className="section-label">Our Story</span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
                Who we are
              </h2>
              <p className="mt-6 text-[#B0B0B0] text-sm md:text-base leading-relaxed max-w-xl">
                {aboutCompanyText}
              </p>
              <div className="mt-8 h-px w-full max-w-xl bg-white/10" />
              {/* Stats row */}
              <div className="mt-8 flex flex-wrap gap-10 md:gap-14 justify-center md:justify-start">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                    className="flex flex-col"
                  >
                    <span className="text-2xl md:text-3xl font-display font-bold text-[var(--accent)] tabular-nums">
                      {stat.value}
                    </span>
                    <span className="mt-1 text-[11px] text-[var(--fg-muted)] uppercase tracking-wider font-medium">
                      {stat.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right column: Vision + Mission & Culture cards — top padding aligns first card with "Born in Mumbai" / company block on the left */}
            <div className="flex flex-col gap-6 md:gap-8">
              <AboutRightCard
                title="Vision"
                content={aboutVisionText}
                number="01"
                delay={0.1}
              />
              <AboutRightCard
                title="Culture"
                content={aboutMissionCultureText}
                number="02"
                delay={0.2}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ——— TEAM ——— */}
      <section
        id="team"
        className="py-24 md:py-32 px-6 md:px-12 scroll-mt-24 relative overflow-hidden"
      >
        <div className="absolute bottom-1/4 left-0 w-96 h-96 rounded-full bg-[var(--accent)]/4 blur-[120px] pointer-events-none" />

        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-14 text-center"
          >
            <span className="section-label">People</span>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl font-light text-white">
              The <span className="text-gradient">Team</span>
            </h2>
            <div className="mt-6 w-16 h-0.5 bg-gradient-to-r from-[var(--accent)] to-transparent mx-auto" />
          </motion.div>

          <div
            className="relative"
            onMouseEnter={() => (teamPaused.current = true)}
            onMouseLeave={() => (teamPaused.current = false)}
          >
            <button
              type="button"
              onClick={() => scrollTeamSlider("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 glass flex items-center justify-center text-white hover:bg-[var(--accent)]/30 hover:border-[var(--accent)]/40 transition-all duration-300 -translate-x-2 hover:scale-110"
              aria-label="Previous team member"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scrollTeamSlider("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 glass flex items-center justify-center text-white hover:bg-[var(--accent)]/30 hover:border-[var(--accent)]/40 transition-all duration-300 translate-x-2 hover:scale-110"
              aria-label="Next team member"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            <div
              ref={teamScrollRef}
              className="slider-track flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory pb-4 -mx-2 px-2 md:mx-0 md:px-0"
              style={{ scrollSnapType: "x mandatory" }}
            >
              {teamMembers.map((member, i) => (
                <motion.div
                  key={member.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.6 }}
                >
                  <Link
                    href={`/team#${member.slug}`}
                    className="team-card group flex-shrink-0 w-56 md:w-64 snap-center block relative"
                  >
                    <div className="aspect-square overflow-hidden relative border border-[var(--border)] group-hover:border-[var(--accent)]/40 transition-colors duration-300">
                      <SafeImage
                        src={member.image}
                        alt={member.name}
                        width={224}
                        height={224}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:filter group-hover:contrast-105"
                      />
                      {/* Hover overlay */}
                      <div className="team-card-overlay">
                        <div className="w-6 h-0.5 bg-[var(--accent)] mb-2" />
                        <span className="text-[var(--accent)] text-[10px] tracking-widest uppercase font-medium">
                          View Profile
                        </span>
                      </div>
                      {/* Bottom gradient always */}
                      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[var(--bg)]/60 to-transparent" />
                    </div>
                    <div className="mt-3">
                      <h3 className="font-serif text-base font-light text-white group-hover:text-[var(--accent)] transition-colors duration-300">
                        {member.name}
                      </h3>
                      <p className="text-xs text-[var(--accent)] mt-1 tracking-wide font-medium">
                        {member.designation}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ——— PRESS ——— */}
      <section
        id="press"
        className="py-24 md:py-32 px-6 md:px-12 bg-[var(--bg-elevated)] scroll-mt-24 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-px divider-gradient opacity-40" />
        <div className="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-[var(--accent)]/4 blur-[120px] pointer-events-none" />

        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-14 text-center"
          >
            <span className="section-label">Coverage</span>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl font-light text-white">
              In the <span className="text-gradient">Press</span>
            </h2>
            <div className="mt-6 w-16 h-0.5 bg-gradient-to-r from-[var(--accent)] to-transparent mx-auto" />
          </motion.div>

          <div className="relative">
            {canScrollLeftP && (
              <button
                type="button"
                onClick={() => scrollSlider(pressScrollRef, "left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 glass flex items-center justify-center text-white hover:bg-[var(--accent)]/30 hover:border-[var(--accent)]/40 transition-all duration-300 -translate-x-4 hover:scale-110"
                aria-label="Previous"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            )}
            {canScrollRightP && (
              <button
                type="button"
                onClick={() => scrollSlider(pressScrollRef, "right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 glass flex items-center justify-center text-white hover:bg-[var(--accent)]/30 hover:border-[var(--accent)]/40 transition-all duration-300 translate-x-4 hover:scale-110"
                aria-label="Next"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            )}

            <div
              ref={pressScrollRef}
              className="slider-track flex gap-4 md:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory"
              style={{ scrollSnapType: "x mandatory" }}
            >
              {pressItems.slice(0, 8).map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  className="flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-[380px] snap-center"
                >
                  <Link href="/press" className="block h-full">
                    <div className="quote-card glass-card h-full min-h-[200px] border border-[var(--border)] relative overflow-hidden">
                      <div className="p-7 md:p-8 relative">
                        {/* Quote mark decoration */}
                        <div className="absolute top-4 right-6 text-[var(--accent)]/15 text-8xl font-serif leading-none select-none pointer-events-none">
                          &#8221;
                        </div>
                        <p className="text-[var(--fg)] leading-relaxed line-clamp-4 text-sm relative z-10">
                          &ldquo;{item.quote}&rdquo;
                        </p>
                        <div className="mt-5 pt-4 border-t border-[var(--border)] flex items-center gap-3">
                          <div className="w-0.5 h-4 bg-[var(--accent)]" />
                          <p className="text-xs text-[var(--accent)] font-semibold tracking-wide">
                            {item.source}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 flex justify-center"
          >
            <Link
              href="/press"
              className="btn-outline px-10 py-4 text-[11px] font-semibold uppercase tracking-widest group flex items-center gap-3"
            >
              <span>View All Coverage</span>
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Mobile FAB */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
        className="md:hidden fixed bottom-6 right-6 z-30"
      >
        <a
          href="#contact-form"
          aria-label="Start a conversation"
          className="flex items-center justify-center w-14 h-14 rounded-full bg-[var(--accent)] text-white shadow-[0_4px_20px_rgba(192,57,43,0.5),0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_6px_28px_rgba(192,57,43,0.7),0_12px_40px_rgba(0,0,0,0.35)] active:scale-95 transition-all duration-300 animate-float-fab"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <path d="m22 6-10 7L2 6" />
          </svg>
        </a>
      </motion.div>
    </>
  );
}
