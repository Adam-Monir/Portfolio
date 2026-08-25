import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github, Linkedin, Mail, Code2, Cpu, Layout, ChevronRight,
  Award, Briefcase, ExternalLink, Terminal, Brain, Database,
  Microscope, Download, Menu, X, MapPin, GraduationCap,
  BookOpen, Globe, Calendar, Building2, Eye, Lightbulb,
  Cloud, Heart, Layers, Users, Wrench, FileText
} from 'lucide-react';

import profileImg from './assets/profile.jpg';
import cvPdf from '../Resources/Adam Rany KamalEldin .pdf';
import profile from '../Resources/profile.json';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// ─────────────────────────────────────────────
//  FRONTMATTER PARSER (browser-safe, no deps)
// ─────────────────────────────────────────────
const parseFrontmatter = (raw) => {
  const match = /^---\s*\r?\n([\s\S]*?)\r?\n---\s*(?:\r?\n|$)/.exec(raw);
  if (!match) return { data: {}, content: raw.trim() };

  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();

    if (value.startsWith('[') && value.endsWith(']')) {
      value = value
        .slice(1, -1)
        .split(',')
        .map((v) => v.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean);
    } else {
      value = value.replace(/^["']|["']$/g, '');
      if (/^-?\d+(\.\d+)?$/.test(value)) value = Number(value);
    }
    data[key] = value;
  }
  return { data, content: raw.slice(match[0].length).trim() };
};

// ─────────────────────────────────────────────
//  MEDIA QUERY HOOK
// ─────────────────────────────────────────────
// Starts false so the mobile branch renders first, then corrects on mount.
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const apply = () => setMatches(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, [query]);
  return matches;
};

// ─────────────────────────────────────────────
//  CYBER BACKGROUND
// ─────────────────────────────────────────────
const CyberBackground = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  // The spotlight is a pointer effect — never register it on touch devices.
  const canHover = useMediaQuery('(hover: hover) and (pointer: fine)');

  useEffect(() => {
    if (!canHover) return;
    let frame = 0;
    const handleMove = (e) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setMousePos({ x: e.clientX, y: e.clientY }));
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', handleMove);
    };
  }, [canHover]);

  return (
    <div className="fixed inset-0 -z-10 bg-[#080808]">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#00ff9d 1px, transparent 1px), linear-gradient(90deg, #00ff9d 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />
      {canHover && (
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-500"
          style={{
            background: `radial-gradient(600px at ${mousePos.x}px ${mousePos.y}px, rgba(0, 255, 157, 0.08), transparent 80%)`,
          }}
        />
      )}
    </div>
  );
};

// ─────────────────────────────────────────────
//  TYPING ANIMATION HOOK
// ─────────────────────────────────────────────
const useTypingEffect = (roles) => {
  const [displayed, setDisplayed] = useState('');
  const [roleIdx, setRoleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIdx];
    let timeout;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), 75);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), 40);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setRoleIdx((r) => (r + 1) % roles.length);
    }

    setDisplayed(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, roleIdx, roles]);

  return displayed;
};

// Isolated so the typewriter's ~20 state updates/sec re-render this heading
// only, instead of reconciling the whole page.
const TypedRole = ({ roles }) => {
  const typed = useTypingEffect(roles);
  return (
    <h2 className="text-[#00ff9d] font-mono text-[11px] sm:text-xs lg:text-sm leading-5 min-h-5 mb-3 sm:mb-4 tracking-[0.15em] sm:tracking-[0.2em] lg:tracking-[0.3em] uppercase">
      {typed}
      <span
        className="inline-block ml-0.5 w-[2px] h-[1em] bg-[#00ff9d] align-middle"
        style={{ animation: 'blink 1s step-end infinite' }}
      />
    </h2>
  );
};

// ─────────────────────────────────────────────
//  SKILL BOXES (unchanged)
// ─────────────────────────────────────────────
const SNAP = { type: 'spring', stiffness: 400, damping: 28, mass: 0.8 };

const SkillBox = ({ icon: Icon, title, items }) => (
  <motion.div
    whileHover={{ y: -6, scale: 1.02, boxShadow: '0 0 25px rgba(0,255,157,0.08)' }}
    transition={SNAP}
    className="p-5 sm:p-6 lg:p-8 bg-[#111] border border-white/5 rounded-3xl group"
    style={{ borderColor: 'rgba(255,255,255,0.05)' }}
  >
    <motion.div whileHover={{ rotate: 12, scale: 1.1 }} transition={SNAP} className="inline-block mb-4 sm:mb-6">
      <Icon className="text-[#00ff9d]" size={32} />
    </motion.div>
    <h4 className="text-lg sm:text-xl font-bold mb-3">{title}</h4>
    <p className="text-gray-500 text-sm leading-relaxed">{items}</p>
  </motion.div>
);

const SkillCard = ({ icon: Icon, title, items }) => (
  <motion.div
    whileHover={{ y: -6, scale: 1.02, boxShadow: '0 0 25px rgba(0,255,157,0.08)' }}
    transition={SNAP}
    className="p-5 sm:p-6 lg:p-8 bg-[#111] border border-white/5 rounded-3xl group lg:col-span-1"
  >
    <motion.div whileHover={{ rotate: 12, scale: 1.1 }} transition={SNAP} className="inline-block mb-4 sm:mb-6">
      <Icon className="text-[#00ff9d]" size={32} />
    </motion.div>
    <h4 className="text-lg sm:text-xl font-bold mb-3">{title}</h4>
    <p className="text-gray-500 text-sm leading-relaxed">{items}</p>
  </motion.div>
);

// ─────────────────────────────────────────────
//  DATA
// ─────────────────────────────────────────────
// Certifications grouped by provider
const certGroups = [
  {
    provider: 'DeepLearning.AI',
    items: [
      { n: 'Neural Networks and Deep Learning', date: 'May 2026', cat: 'AI' },
      { n: 'NLP with Classification and Vector Spaces', date: 'Dec 2025', cat: 'NLP' },
      { n: 'NLP in TensorFlow', date: 'Dec 2025', cat: 'NLP' },
    ],
  },
  {
    provider: 'Microsoft',
    items: [
      { n: 'Building Multi-Agent Systems', date: 'Apr 2026', cat: 'AI' },
    ],
  },
  {
    provider: 'MathWorks',
    items: [
      { n: 'Object Tracking and Motion Detection with Computer Vision', date: 'May 2026', cat: 'CV' },
    ],
  },
  {
    provider: 'Pearson',
    items: [
      { n: 'Programming Generative AI', date: 'May 2026', cat: 'AI' },
    ],
  },
  {
    provider: 'UC San Diego',
    items: [
      { n: 'Algorithmic Toolbox', date: 'Apr 2025', cat: 'CS' },
      { n: 'Algorithms on Graphs', date: 'Apr 2025', cat: 'CS' },
    ],
  },
  {
    provider: 'Northwestern University',
    items: [
      { n: 'Fundamentals of Digital Image and Video Processing', date: 'May 2025', cat: 'CV' },
    ],
  },
  {
    provider: 'Georgia Institute of Technology',
    items: [
      { n: 'Linear Circuits 1: DC Analysis', date: 'Dec 2023', cat: 'Systems' },
      { n: 'Linear Circuits 2: AC Analysis', date: 'Dec 2023', cat: 'Systems' },
    ],
  },
  {
    provider: 'KAIST',
    items: [
      { n: 'Practical Python for AI Coding 1', date: 'Oct 2023', cat: 'Python' },
      { n: 'Practical Python for AI Coding 2', date: 'Nov 2023', cat: 'Python' },
    ],
  },
  {
    provider: 'IBM',
    items: [
      { n: 'Introduction to Artificial Intelligence', date: 'Oct 2023', cat: 'AI' },
      { n: 'Databases and SQL for Data Science with Python', date: 'May 2024', cat: 'Data' },
      { n: 'Introduction to Relational Databases', date: 'May 2024', cat: 'Data' },
      { n: 'Introduction to Agile Development and Scrum', date: 'May 2025', cat: 'Dev' },
    ],
  },
  {
    provider: 'Meta',
    items: [
      { n: 'Introduction to Databases', date: 'May 2024', cat: 'Data' },
    ],
  },
  {
    provider: 'University of London',
    items: [
      { n: 'Machine Learning for All', date: 'May 2024', cat: 'AI' },
    ],
  },
  {
    provider: 'University of Minnesota',
    items: [
      { n: 'Engineering Practices for Building Quality Software', date: 'May 2025', cat: 'Dev' },
    ],
  },
];

const experiences = [
  {
    role: 'Quantum Computing Trainee',
    company: 'AIU & Alexandria Quantum Computing Group (AleQCG)',
    period: 'June – December 2025',
    desc: 'Completed a 12-week quantum computing program with 50+ hours of lectures and hands-on lab work, finishing with an independent final project.',
  },
  {
    role: 'Full Stack Web Development (PHP)',
    company: 'National Telecommunication Institute (NTI) — ITIDA',
    period: '2024',
    desc: 'Finished an ITIDA-certified 120-hour program in full-stack PHP web development plus freelancing skills.',
  },
  {
    role: 'ICPC Participant',
    company: 'International Collegiate Programming Contest',
    period: '2024',
    desc: 'Competed as a team member in the ICPC Alexandria regional round solving algorithmic problems under timed conditions.',
  },
];

// ── PROJECTS (from Resources/projects/*.mdx) ──
const projectFiles = import.meta.glob('/Resources/projects/*.mdx', {
  query: '?raw',
  import: 'default',
  eager: true,
});

const projects = Object.values(projectFiles)
  .map((raw) => {
    const { data, content } = parseFrontmatter(raw);
    return { ...data, body: content };
  })
  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

const PROJECT_CATEGORIES = ['All', ...new Set(projects.map((p) => p.category))];

// ── TECHNICAL EXPERTISE DATA ──
const expertiseCategories = [
  {
    icon: Layout,
    title: 'Web Development',
    skills: ['HTML', 'CSS', 'PHP', 'React', 'Tailwind CSS', 'Bootstrap'],
  },
  {
    icon: Code2,
    title: 'Programming Languages',
    skills: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C'],
  },
  {
    icon: Database,
    title: 'Data & Analytics',
    skills: ['SQL', 'R Studio', 'Pandas', 'NumPy'],
  },
  {
    icon: Cloud,
    title: 'Cloud & DevOps',
    skills: ['AWS (Amazon Web Services)', 'Git'],
  },
  {
    icon: Brain,
    title: 'AI & Machine Learning',
    skills: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenCV', 'Hugging Face'],
  },
  {
    icon: Users,
    title: 'Soft Skills',
    skills: ['Team Collaboration', 'Adaptability', 'Technical Mentoring', 'Analytical Problem Solving', 'Communication'],
  },
];

const ICONS = { MapPin, GraduationCap, Award, Globe };

// ─────────────────────────────────────────────
//  SECTION HEADER
// ─────────────────────────────────────────────
const SectionHeader = ({ icon: Icon, children }) => (
  <h3 className="text-2xl sm:text-3xl font-black leading-tight mb-6 sm:mb-8 lg:mb-12 flex items-center gap-3 sm:gap-4">
    <Icon className="text-[#00ff9d] shrink-0" />
    {children}
  </h3>
);

// ─────────────────────────────────────────────
//  MAIN APP
// ─────────────────────────────────────────────
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [certFilter, setCertFilter] = useState('All');
  const [cvOpen, setCvOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const canEmbedPdf = useMediaQuery('(min-width: 768px) and (pointer: fine)');

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Expertise' },
    { href: '#expertise', label: 'Skills' },
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Projects' },
    { href: '#certifications', label: 'Credentials' },
    { href: '#contact', label: 'Contact' },
  ];

  // The browser's CSS smooth scroll is fire-and-forget and gets cancelled by
  // competing layout work. Closing the menu (a React commit plus framer-motion's
  // height collapse) raced it, so mobile taps never landed. Drive the scroll
  // ourselves, once the menu has finished collapsing.
  const handleMobileNavClick = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    setMenuOpen(false);
    if (!el) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Keep in sync with the dropdown's exit transition duration below (0.25s).
    window.setTimeout(() => {
      el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      // replaceState, not pushState: Back should leave the site, not walk
      // back through every anchor the user tapped.
      window.history.replaceState(null, '', href);
    }, reduce ? 0 : 280);
  };

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  // Flatten all certs into a single array for the timeline
  const allCerts = certGroups.flatMap((g) =>
    g.items.map((item) => ({ ...item, provider: g.provider }))
  );
  const CERT_FILTER_CATS = ['All', 'AI', 'NLP', 'CV', 'CS', 'Data', 'Dev', 'Systems', 'Python'];
  const filteredCerts =
    certFilter === 'All' ? allCerts : allCerts.filter((c) => c.cat === certFilter);

  return (
    <div className="min-h-screen text-white font-sans selection:bg-[#00ff9d]/30">
      <CyberBackground />

      {/* ── CV PREVIEW MODAL ── */}
      <AnimatePresence>
        {cvOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-start sm:items-center justify-center overflow-y-auto overscroll-contain p-3 sm:p-6 md:py-10"
            onClick={() => setCvOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-3xl bg-[#0f0f0f] border border-[#00ff9d]/20 rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(0,255,157,0.1)] flex flex-col max-h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100dvh-3rem)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className="flex justify-between items-center gap-3 px-4 sm:px-6 py-3 sm:py-4 border-b border-white/5 shrink-0">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="font-mono text-[#00ff9d] text-xs sm:text-sm tracking-wider truncate">{profile.brand.cvModalTitle}</span>
                  <a
                    href={cvPdf}
                    download={profile.brand.cvDownloadName}
                    className="hidden sm:inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 text-[10px] font-mono uppercase tracking-widest text-[#00ff9d] border border-[#00ff9d]/30 bg-[#00ff9d]/5 px-3 py-1 rounded-full hover:bg-[#00ff9d]/15 transition-colors ml-2"
                  >
                    <Download size={12} /> Download
                  </a>
                </div>
                <button
                  onClick={() => setCvOpen(false)}
                  className="p-2 -m-2 shrink-0 text-gray-400 hover:text-[#00ff9d] transition-colors"
                  aria-label="Close CV preview"
                >
                  <X size={20} />
                </button>
              </div>
              {/* Mobile browsers (iOS Safari especially) do not render PDFs in an
                  iframe, so hand the file to the OS viewer instead. */}
              {canEmbedPdf ? (
                <iframe
                  src={cvPdf}
                  title="Adam Monir CV"
                  className="w-full h-[75vh] border-0 block"
                />
              ) : (
                <div className="px-5 py-8 flex flex-col items-center text-center gap-5 overflow-y-auto">
                  <div className="p-4 bg-[#00ff9d]/10 rounded-2xl">
                    <FileText className="text-[#00ff9d]" size={32} />
                  </div>
                  <div>
                    <p className="text-white font-bold text-base break-words">{profile.brand.cvDownloadName}</p>
                    <p className="text-gray-500 text-xs font-mono mt-1">PDF — best viewed full screen</p>
                  </div>
                  <div className="flex flex-col w-full gap-3">
                    <a
                      href={cvPdf}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full bg-[#00ff9d] text-black px-6 py-3.5 rounded-lg font-bold flex items-center justify-center gap-2"
                    >
                      <Eye size={18} /> Open CV
                    </a>
                    <a
                      href={cvPdf}
                      download={profile.brand.cvDownloadName}
                      className="w-full border border-[#00ff9d] text-[#00ff9d] px-6 py-3.5 rounded-lg font-bold flex items-center justify-center gap-2"
                    >
                      <Download size={18} /> Download PDF
                    </a>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── PROJECT READ-MORE MODAL ── */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-start sm:items-center justify-center overflow-y-auto overscroll-contain p-3 sm:p-6 md:py-10"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-3xl bg-[#0f0f0f] border border-[#00ff9d]/20 rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(0,255,157,0.1)] flex flex-col max-h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100dvh-3rem)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start sm:items-center gap-3 px-4 sm:px-6 py-3 sm:py-4 border-b border-white/5 shrink-0">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 min-w-0">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#00ff9d] bg-[#00ff9d]/10 border border-[#00ff9d]/20 px-3 py-1 rounded shrink-0">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-white leading-snug min-w-0 break-words">{selectedProject.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 -m-2 shrink-0 text-gray-400 hover:text-[#00ff9d] transition-colors"
                  aria-label="Close project details"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="px-4 sm:px-6 py-5 sm:py-6 overflow-y-auto overscroll-contain flex-1">
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-5 sm:mb-6">
                  {selectedProject.tags.map((tag) => (
                    <span key={tag} className="text-[10px] bg-white/5 border border-white/10 text-gray-400 px-2 py-0.5 rounded font-mono">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="markdown-body">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {selectedProject.body}
                  </ReactMarkdown>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 w-full z-50 bg-[#080808]/80 backdrop-blur-md border-b border-white/5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center h-14 lg:h-16">
          <div className="text-lg sm:text-xl font-black text-[#00ff9d] tracking-tighter uppercase">
            {profile.brand.name}
          </div>

          {/* Desktop links */}
          <div className="hidden lg:flex gap-5 xl:gap-8 text-xs font-mono text-gray-400 uppercase tracking-widest">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="relative group text-xs font-mono text-gray-400 uppercase tracking-widest transition-colors hover:text-[#00ff9d]"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#00ff9d] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden -mr-2 p-2.5 text-gray-400 hover:text-[#00ff9d] transition-colors"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              id="mobile-menu"
              className="lg:hidden overflow-hidden bg-[#0d0d0d] border-t border-white/5"
            >
              <div className="flex flex-col py-2 px-4 sm:px-6 max-h-[calc(100dvh-3.5rem)] overflow-y-auto">
                {navLinks.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={(e) => handleMobileNavClick(e, l.href)}
                    className="relative group w-fit py-2.5 text-xs font-mono text-gray-400 uppercase tracking-widest hover:text-[#00ff9d] transition-colors"
                  >
                    {l.label}
                    <span className="absolute bottom-1.5 left-0 w-0 h-[2px] bg-[#00ff9d] transition-all duration-300 group-hover:w-full" />
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 lg:pt-32">

        {/* ── HERO ── */}
        <section id="home" className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center py-6 sm:py-8 lg:py-10">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            {/* Typing subtitle */}
            <TypedRole roles={profile.hero.roles} />

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-6 leading-none">
              {profile.hero.nameParts.first}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff9d] to-emerald-500">
                {profile.hero.nameParts.last}
              </span>
            </h1>
            <p className="text-gray-400 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed max-w-lg">
              {profile.hero.summary.lead}{' '}
              <span className="text-white underline decoration-[#00ff9d]">
                {profile.hero.summary.highlight}
              </span>
              {profile.hero.summary.tail}
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3 sm:gap-4 items-center">
              <a
                href={profile.hero.cta.connect.href}
                className="flex-1 sm:flex-none justify-center bg-[#00ff9d] text-black px-5 sm:px-6 py-3 rounded-lg font-bold hover:scale-105 transition-transform flex items-center gap-2"
              >
                {profile.hero.cta.connect.label} <ChevronRight size={18} />
              </a>
              <button
                onClick={() => setCvOpen(true)}
                className="flex-1 sm:flex-none justify-center border border-[#00ff9d] text-[#00ff9d] px-5 sm:px-6 py-3 rounded-lg font-bold hover:bg-[#00ff9d]/10 transition-all flex items-center gap-2"
              >
                <FileText size={16} /> {profile.hero.cta.previewCv.label}
              </button>
              <div className="flex gap-2 w-full sm:w-auto">
                <a
                  href={profile.hero.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-white/5 rounded-lg hover:text-[#00ff9d] transition-colors"
                >
                  <Github />
                </a>
                <a
                  href={profile.hero.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-white/5 rounded-lg hover:text-[#00ff9d] transition-colors"
                >
                  <Linkedin />
                </a>
              </div>
            </div>
          </motion.div>

          <div className="relative justify-self-center lg:justify-self-end">
            <div className="relative w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full border-2 border-[#00ff9d]/30 overflow-hidden group">
              <div className="scan-line" />
              <img
                src={profileImg}
                alt="Adam Monir"
                className="w-full h-full object-cover can-hover:grayscale can-hover:group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>
        </section>

        {/* ── STATS (original "about" section) ── */}
        <section className="py-12 sm:py-16 lg:py-20 grid gap-4 sm:grid-cols-3 sm:gap-5 lg:gap-8 text-center">
          <div className="p-5 sm:p-6 lg:p-8 bg-[#111] rounded-2xl border border-white/5">
            <div className="text-[#00ff9d] text-3xl sm:text-4xl font-black mb-2">25+</div>
            <div className="text-gray-500 uppercase text-xs tracking-widest font-mono">Certifications</div>
          </div>
          <div className="p-5 sm:p-6 lg:p-8 bg-[#111] rounded-2xl border border-white/5">
            <div className="text-[#00ff9d] text-3xl sm:text-4xl font-black mb-2">AI</div>
            <div className="text-gray-500 uppercase text-xs tracking-widest font-mono">Major Concentration</div>
          </div>
          <div className="p-5 sm:p-6 lg:p-8 bg-[#111] rounded-2xl border border-white/5">
            <div className="text-[#00ff9d] text-3xl sm:text-4xl font-black mb-2">3+</div>
            <div className="text-gray-500 uppercase text-xs tracking-widest font-mono">Years Experience</div>
          </div>
        </section>

        {/* ── ABOUT ME ── */}
        <section id="about" className="py-12 sm:py-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeader icon={Brain}>About Me</SectionHeader>

            <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-3xl mb-8 sm:mb-12">
              {profile.about.paragraph.lead}
              <span className="text-white font-bold">{profile.about.paragraph.highlight}</span>
              {profile.about.paragraph.tail}
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {profile.about.infoCards.map(({ icon, label, value }) => {
                const Icon = ICONS[icon];
                return (
                  <motion.div
                    key={label}
                    whileHover={{ y: -6, scale: 1.02, boxShadow: '0 0 25px rgba(0,255,157,0.08)' }}
                    transition={SNAP}
                    className="p-5 sm:p-6 bg-[#111] border border-white/5 rounded-2xl"
                  >
                    <motion.div whileHover={{ rotate: 12, scale: 1.1 }} transition={SNAP} className="inline-block mb-3">
                      {Icon && <Icon className="text-[#00ff9d]" size={22} />}
                    </motion.div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-1">{label}</div>
                    <div className="text-sm text-white font-medium leading-snug">{value}</div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </section>

        {/* ── SKILLS BENTO (unchanged) ── */}
        <section id="skills" className="py-12 sm:py-16 lg:py-20">
          <SectionHeader icon={Terminal}>Technical Domains</SectionHeader>
          <div className="grid gap-4 sm:gap-5 md:grid-cols-3 lg:gap-6">
            <SkillBox icon={Brain} title="Artificial Intelligence" items="NLP, Computer Vision, Machine Learning, TensorFlow, Deep Learning." />
            <SkillBox icon={Code2} title="Software Engineering" items="Java (OOP), Python, C, Agile/Scrum, Software Quality Engineering." />
            <SkillCard icon={Database} title="Data & Systems" items="SQL (IBM/Meta), Relational Databases, Unix, Linear Circuits." />
          </div>
        </section>

        {/* ── TECHNICAL EXPERTISE ── */}
        <section id="expertise" className="py-12 sm:py-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeader icon={Wrench}>Technical Expertise</SectionHeader>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
              {expertiseCategories.map(({ icon: Icon, title, skills }, idx) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -6, scale: 1.02, boxShadow: '0 0 25px rgba(0,255,157,0.08)' }}
                  transition={{ ...SNAP, delay: idx * 0.08 }}
                  className="p-5 sm:p-6 lg:p-8 bg-[#111] border border-white/5 rounded-3xl"
                >
                  <motion.div whileHover={{ rotate: 12, scale: 1.1 }} transition={SNAP} className="inline-block mb-4 sm:mb-5">
                    <Icon className="text-[#00ff9d]" size={28} />
                  </motion.div>
                  <h4 className="text-lg font-bold mb-4">{title}</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((s) => (
                      <span key={s} className="text-[11px] bg-white/5 border border-white/10 text-gray-400 px-2.5 py-1 rounded-full font-mono">
                        {s}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── EXPERIENCE ── */}
        <section id="experience" className="py-12 sm:py-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeader icon={Briefcase}>Experience</SectionHeader>

            <div className="relative">
              {/* vertical line */}
              <div className="absolute left-[9px] sm:left-[11px] top-0 bottom-0 w-px bg-[#00ff9d]/20" />

              <div className="flex flex-col gap-6 sm:gap-8 lg:gap-10">
                {experiences.map((exp, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ ...SNAP, delay: i * 0.15 }}
                    className="relative pl-7 sm:pl-10"
                  >
                    {/* dot — framer motion pulse */}
                    <motion.div
                      whileHover={{ scale: 1.4 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                      className="absolute left-0 top-1.5 w-[18px] h-[18px] sm:w-[22px] sm:h-[22px] rounded-full border-2 border-[#00ff9d] bg-[#080808] flex items-center justify-center"
                    >
                      <div className="w-2 h-2 rounded-full bg-[#00ff9d]" />
                    </motion.div>

                    <motion.div
                      whileHover={{ y: -4, boxShadow: '0 0 25px rgba(0,255,157,0.08)' }}
                      transition={SNAP}
                      className="p-4 sm:p-5 lg:p-6 bg-[#111] border border-white/5 rounded-2xl"
                    >
                      <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-start sm:justify-between gap-2 sm:gap-3 mb-2">
                        <div className="min-w-0">
                          <h4 className="text-base sm:text-lg font-bold text-white leading-snug">{exp.role}</h4>
                          <div className="flex items-start gap-2 mt-1 min-w-0">
                            <Building2 size={13} className="text-[#00ff9d] shrink-0 mt-[3px]" />
                            <span className="text-xs text-gray-400 font-mono break-words">{exp.company}</span>
                          </div>
                        </div>
                        <div className="self-start shrink-0 whitespace-nowrap inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-[#00ff9d] bg-[#00ff9d]/10 border border-[#00ff9d]/20 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full">
                          <Calendar size={11} />
                          {exp.period}
                        </div>
                      </div>
                      <p className="text-gray-500 text-sm leading-relaxed">{exp.desc}</p>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* ── PROJECTS ── */}
        <section id="projects" className="py-12 sm:py-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeader icon={Code2}>Projects</SectionHeader>

            {/* Filter tabs */}
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8 lg:mb-10">
              {PROJECT_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-4 py-2.5 sm:py-2 rounded-full text-xs font-mono uppercase tracking-widest transition-all border ${
                    activeFilter === cat
                      ? 'bg-[#00ff9d] text-black border-[#00ff9d] font-bold'
                      : 'border-white/10 text-gray-400 hover:border-[#00ff9d]/50 hover:text-[#00ff9d]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
              <AnimatePresence>
                {filteredProjects.map((proj, i) => (
                  <motion.div
                    key={proj.title}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    whileHover={{ y: -6, scale: 1.02, boxShadow: '0 0 25px rgba(0,255,157,0.08)' }}
                    transition={{ ...SNAP, delay: i * 0.05 }}
                    onClick={() => setSelectedProject(proj)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedProject(proj);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    className="group p-5 sm:p-6 bg-[#111] border border-white/5 rounded-2xl flex flex-col cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#00ff9d] bg-[#00ff9d]/10 border border-[#00ff9d]/20 px-2 py-1 rounded">
                        {proj.category}
                      </span>
                      {proj.github ? (
                        <a
                          href={proj.github}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-1.5 bg-white/5 rounded-lg hover:text-[#00ff9d] transition-colors"
                          aria-label="View on GitHub"
                        >
                          <Github size={15} />
                        </a>
                      ) : (
                        <span />
                      )}
                    </div>
                    <h4 className="font-bold text-base mb-2 text-white">{proj.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed flex-1">{proj.summary}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {proj.tags.map((tag) => (
                        <span key={tag} className="text-[10px] bg-white/5 border border-white/10 text-gray-400 px-2 py-0.5 rounded font-mono">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest text-[#00ff9d] mt-4 sm:mt-5 opacity-70 can-hover:opacity-0 can-hover:group-hover:opacity-100 transition-opacity">
                      Read more <ChevronRight size={12} />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </section>

        {/* ── CERTIFICATIONS ── */}
        <section id="certifications" className="py-12 sm:py-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeader icon={Award}>Verified Credentials</SectionHeader>

            {/* Filter bar */}
            <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
              {CERT_FILTER_CATS.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCertFilter(cat)}
                  className={`px-3 py-2 sm:py-1.5 rounded-full text-xs font-mono uppercase tracking-widest transition-all border ${
                    certFilter === cat
                      ? 'bg-[#00ff9d] text-black border-[#00ff9d] font-bold'
                      : 'border-white/10 text-gray-400 hover:border-[#00ff9d]/50 hover:text-[#00ff9d]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Timeline list */}
            <div className="border border-white/5 rounded-2xl overflow-hidden">
              <AnimatePresence initial={false}>
                {filteredCerts.map((c, i) => (
                  <motion.div
                    key={`${c.provider}-${c.n}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    whileHover={{ x: 8 }}
                    transition={SNAP}
                    className={`flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-1.5 px-4 sm:px-5 py-3.5 sm:py-4 cursor-default ${
                      i !== filteredCerts.length - 1 ? 'border-b border-white/5' : ''
                    }`}
                  >
                    <span className="order-1 sm:order-none text-[10px] bg-[#00ff9d]/10 text-[#00ff9d] border border-[#00ff9d]/20 px-2 py-1 rounded uppercase shrink-0 w-14 sm:w-16 text-center">
                      {c.cat}
                    </span>
                    <span className="order-3 sm:order-none text-sm sm:text-base font-bold w-full sm:w-auto sm:flex-1 sm:min-w-0">{c.n}</span>
                    <div className="order-2 sm:order-none flex items-center gap-2 sm:gap-4 min-w-0 ml-auto sm:ml-0 sm:shrink-0">
                      <span className="text-[11px] sm:text-sm text-gray-400 font-mono truncate">{c.provider}</span>
                      <span className="text-[11px] sm:text-xs text-gray-500 font-mono shrink-0">{c.date}</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {filteredCerts.length === 0 && (
                <div className="py-12 text-center text-gray-600 font-mono text-sm">
                  No certifications in this category.
                </div>
              )}
            </div>
          </motion.div>
        </section>

        {/* ── GET IN TOUCH ── */}
        <footer id="contact" className="py-12 sm:py-16 lg:py-20 border-t border-white/5">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeader icon={Mail}>Get In Touch</SectionHeader>

            <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-2xl mb-6 sm:mb-8">
              I'm always open to discussing new opportunities, collaborations, or just having a chat
              about AI and technology. Feel free to reach out via any of the channels below!
            </p>

            {/* Language badges */}
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-10">
              <span className="flex items-center gap-2 text-xs font-mono text-[#00ff9d] border border-[#00ff9d]/30 bg-[#00ff9d]/5 px-4 py-1 rounded-full">
                🇪🇬 Arabic — Native
              </span>
              <span className="flex items-center gap-2 text-xs font-mono text-[#00ff9d] border border-[#00ff9d]/30 bg-[#00ff9d]/5 px-4 py-1 rounded-full">
                🇬🇧 English — Upper Intermediate
              </span>
            </div>

            {/* Contact cards 2x2 */}
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 mb-10 sm:mb-14">
              {[
                { href: 'mailto:adam.mounir.business0@gmail.com', icon: Mail, label: 'Email', value: 'adam.mounir.business0@gmail.com', external: false },
                { href: null, icon: MapPin, label: 'Location', value: 'Alexandria, Egypt', external: false },
                { href: 'https://github.com/Adam-Monir', icon: Github, label: 'GitHub', value: 'github.com/Adam-Monir', external: true },
                { href: 'https://www.linkedin.com/in/adam-kamal-11ab41349/', icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/adam-kamal-11ab41349', external: true },
              ].map(({ href, icon: Icon, label, value, external }) => (
                <motion.div
                  key={label}
                  whileHover={{ y: -4, scale: 1.02, boxShadow: '0 0 25px rgba(0,255,157,0.08)' }}
                  transition={SNAP}
                  className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden"
                >
                  {href ? (
                    <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined} className="flex items-center gap-4 sm:gap-5 p-4 sm:p-6">
                      <div className="p-2.5 sm:p-3 bg-[#00ff9d]/10 rounded-xl shrink-0"><Icon className="text-[#00ff9d]" size={22} /></div>
                      <div className="min-w-0 flex-1"><div className="text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-0.5">{label}</div><div className="text-[13px] sm:text-sm text-white font-medium break-words">{value}</div></div>
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 sm:gap-5 p-4 sm:p-6">
                      <div className="p-2.5 sm:p-3 bg-[#00ff9d]/10 rounded-xl shrink-0"><Icon className="text-[#00ff9d]" size={22} /></div>
                      <div className="min-w-0 flex-1"><div className="text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-0.5">{label}</div><div className="text-[13px] sm:text-sm text-white font-medium break-words">{value}</div></div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Footer bar */}
            <div className="border-t border-white/5 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-gray-600 text-xs font-mono text-center sm:text-left">
                © {new Date().getFullYear()} Adam Rany Kamaleldin — All rights reserved.
              </p>
              <div className="flex gap-3">
                <a href="mailto:adam.mounir.business0@gmail.com" className="p-2 text-gray-500 hover:text-[#00ff9d] transition-colors">
                  <Mail size={18} />
                </a>
                <a href="https://github.com/Adam-Monir" className="p-2 text-gray-500 hover:text-[#00ff9d] transition-colors">
                  <Github size={18} />
                </a>
                <a href="https://www.linkedin.com/in/adam-kamal-11ab41349/" className="p-2 text-gray-500 hover:text-[#00ff9d] transition-colors">
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </motion.div>
        </footer>
      </main>

      {/* Cursor blink keyframe */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </div>
  );
}