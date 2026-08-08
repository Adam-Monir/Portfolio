import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github, Linkedin, Mail, Code2, Cpu, Layout, ChevronRight,
  Award, Briefcase, ExternalLink, Terminal, Brain, Database,
  Microscope, Download, Menu, X, MapPin, GraduationCap,
  BookOpen, Globe, Calendar, Building2, Eye, Lightbulb,
  Cloud, Heart, Layers, Users, Wrench, FileText
} from 'lucide-react';

import profileImg from './assets/profile.jpg';

// ─────────────────────────────────────────────
//  CYBER BACKGROUND
// ─────────────────────────────────────────────
const CyberBackground = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 bg-[#080808]">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#00ff9d 1px, transparent 1px), linear-gradient(90deg, #00ff9d 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px at ${mousePos.x}px ${mousePos.y}px, rgba(0, 255, 157, 0.08), transparent 80%)`,
        }}
      />
    </div>
  );
};

// ─────────────────────────────────────────────
//  TYPING ANIMATION HOOK
// ─────────────────────────────────────────────
const roles = [
  'AI Engineering Student',
  'Machine Learning Developer',
  'Frontend Developer',
  'Problem Solver',
];

const useTypingEffect = () => {
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
  }, [charIdx, deleting, roleIdx]);

  return displayed;
};

// ─────────────────────────────────────────────
//  SKILL BOXES (unchanged)
// ─────────────────────────────────────────────
const SNAP = { type: 'spring', stiffness: 400, damping: 28, mass: 0.8 };

const SkillBox = ({ icon: Icon, title, items }) => (
  <motion.div
    whileHover={{ y: -6, scale: 1.02, boxShadow: '0 0 25px rgba(0,255,157,0.08)' }}
    transition={SNAP}
    className="p-8 bg-[#111] border border-white/5 rounded-3xl group"
    style={{ borderColor: 'rgba(255,255,255,0.05)' }}
  >
    <motion.div whileHover={{ rotate: 12, scale: 1.1 }} transition={SNAP} className="inline-block mb-6">
      <Icon className="text-[#00ff9d]" size={32} />
    </motion.div>
    <h4 className="text-xl font-bold mb-3">{title}</h4>
    <p className="text-gray-500 text-sm leading-relaxed">{items}</p>
  </motion.div>
);

const SkillCard = ({ icon: Icon, title, items }) => (
  <motion.div
    whileHover={{ y: -6, scale: 1.02, boxShadow: '0 0 25px rgba(0,255,157,0.08)' }}
    transition={SNAP}
    className="p-8 bg-[#111] border border-white/5 rounded-3xl group lg:col-span-1"
  >
    <motion.div whileHover={{ rotate: 12, scale: 1.1 }} transition={SNAP} className="inline-block mb-6">
      <Icon className="text-[#00ff9d]" size={32} />
    </motion.div>
    <h4 className="text-xl font-bold mb-3">{title}</h4>
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

const projects = [
  {
    title: 'Multi-Task BERT for Text Analysis',
    category: 'NLP & AI',
    desc: 'Enhanced a PyTorch BERT model to simultaneously handle sentiment analysis, paraphrase detection (82% accuracy), and semantic similarity using a custom task-weighted loss function.',
    tags: ['PyTorch', 'BERT', 'NLP', 'Deep Learning'],
  },
  {
    title: 'Reinforcement Learning Game',
    category: 'ML & AI',
    desc: 'Designed a 2D Python game environment and implemented Dynamic Programming, Q-Learning/SARSA, and Policy Gradient algorithms from scratch to compare RL performance.',
    tags: ['Python', 'Q-Learning', 'SARSA', 'Policy Gradient'],
  },
  {
    title: 'Smart City Optimization',
    category: 'Algorithms & Backend',
    desc: 'Built a graph-based routing system for Egyptian city infrastructure using Dijkstra\'s algorithm and Minimum Spanning Tree to optimize network connectivity.',
    tags: ['Python', 'Dijkstra', 'MST', 'Graph Theory'],
  },
  {
    title: 'Coursera Management System',
    category: 'Data & Backend',
    desc: 'Architected a relational database with SQL for course enrollment and student tracking, applying ERD modeling and query optimization.',
    tags: ['SQL', 'ERD', 'Database Design', 'Query Optimization'],
  },
  {
    title: 'Blood Sugar Detection',
    category: 'ML & AI',
    desc: 'Built an ML diagnostic tool using Scikit-learn to predict blood sugar levels through data preprocessing, feature engineering, and classification algorithms.',
    tags: ['Python', 'Scikit-learn', 'ML', 'Healthcare'],
  },
  {
    title: 'Smart Classroom Assistant',
    category: 'Computer Vision',
    desc: 'Built a CV-based classroom assistant using face recognition for automatic attendance, emotion detection (CNN/fer) for mood analysis, speech recognition (Google API) for question transcription, and NLP (TF-IDF) to classify student questions into topics.',
    tags: ['OpenCV', 'face_recognition', 'CNN', 'SpeechRecognition', 'TF-IDF', 'NLP'],
  },
  {
    title: 'Medical Diagnosis Expert System',
    category: 'AI & Knowledge Systems',
    desc: 'Designed and developed a Knowledge-Based System for clinical triage and preliminary diagnosis. The system analyzes patient symptoms, history, and health indicators using rule-based reasoning to suggest possible conditions and urgency levels — supporting early decision-making without replacing a doctor.',
    tags: ['Knowledge-Based Systems', 'Rule-Based Reasoning', 'Python', 'Expert System'],
  },
];

const PROJECT_CATEGORIES = [
  'All', 'ML & AI', 'NLP & AI', 'Algorithms & Backend',
  'Data & Backend', 'Computer Vision', 'AI & Knowledge Systems',
];

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

const infoCards = [
  { icon: MapPin, label: 'Location', value: 'Alexandria, Egypt' },
  {
    icon: GraduationCap,
    label: 'Education',
    value: 'B.Sc. AI Engineering — Alamein International University (2022–2027)',
  },
  { icon: Award, label: 'GPA', value: '3.00 / 4.0' },
  { icon: Globe, label: 'Languages', value: 'Arabic (Native), English (Upper Intermediate)' },
];

// ─────────────────────────────────────────────
//  SECTION HEADER
// ─────────────────────────────────────────────
const SectionHeader = ({ icon: Icon, children }) => (
  <h3 className="text-3xl font-black mb-12 flex items-center gap-4">
    <Icon className="text-[#00ff9d]" />
    {children}
  </h3>
);

// ─────────────────────────────────────────────
//  MAIN APP
// ─────────────────────────────────────────────
export default function App() {
  const typedRole = useTypingEffect();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [certFilter, setCertFilter] = useState('All');
  const [cvOpen, setCvOpen] = useState(false);

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
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-start justify-center overflow-y-auto py-10 px-4"
            onClick={() => setCvOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-3xl bg-[#0f0f0f] border border-[#00ff9d]/20 rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(0,255,157,0.1)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className="flex justify-between items-center px-6 py-4 border-b border-white/5">
                <span className="font-mono text-[#00ff9d] text-sm tracking-wider">Adam Monir — CV</span>
                <button
                  onClick={() => setCvOpen(false)}
                  className="text-gray-400 hover:text-[#00ff9d] transition-colors"
                  aria-label="Close CV preview"
                >
                  <X size={20} />
                </button>
              </div>
              {/* iframe body */}
              <iframe
                src="#"
                width="100%"
                height="80vh"
                style={{ border: 'none', display: 'block', minHeight: '80vh' }}
                title="Adam Monir CV"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 w-full z-50 bg-[#080808]/80 backdrop-blur-md border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-xl font-black text-[#00ff9d] tracking-tighter uppercase">
            Adam.AI
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex gap-8 text-xs font-mono text-gray-400 uppercase tracking-widest">
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
            className="md:hidden p-2 text-gray-400 hover:text-[#00ff9d] transition-colors"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
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
              className="md:hidden overflow-hidden bg-[#0d0d0d] border-t border-white/5"
            >
              <div className="flex flex-col py-4 px-6 gap-5">
                {navLinks.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="relative group w-fit text-xs font-mono text-gray-400 uppercase tracking-widest hover:text-[#00ff9d] transition-colors"
                  >
                    {l.label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-[2px] bg-[#00ff9d] transition-all duration-300 group-hover:w-full" />
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-32">

        {/* ── HERO ── */}
        <section id="home" className="grid lg:grid-cols-2 gap-12 items-center py-10">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            {/* Typing subtitle */}
            <h2 className="text-[#00ff9d] font-mono text-sm mb-4 tracking-[0.3em] uppercase h-5">
              {typedRole}
              <span
                className="inline-block ml-0.5 w-[2px] h-[1em] bg-[#00ff9d] align-middle"
                style={{ animation: 'blink 1s step-end infinite' }}
              />
            </h2>

            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-none">
              ADAM{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff9d] to-emerald-500">
                MONIR
              </span>
            </h1>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed max-w-lg">
              4th-year AI Engineering student at{' '}
              <span className="text-white underline decoration-[#00ff9d]">
                Alamein International University
              </span>
              . Bridging the gap between software architecture and complex neural systems.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4 items-center">
              <a
                href="tel:010159272926"
                className="bg-[#00ff9d] text-black px-6 py-3 rounded-lg font-bold hover:scale-105 transition-transform flex items-center gap-2"
              >
                Connect Now <ChevronRight size={18} />
              </a>
              <button
                onClick={() => setCvOpen(true)}
                className="border border-[#00ff9d] text-[#00ff9d] px-6 py-3 rounded-lg font-bold hover:bg-[#00ff9d]/10 transition-all flex items-center gap-2"
              >
                <FileText size={16} /> Preview CV
              </button>
              <div className="flex gap-2">
                <a
                  href="https://github.com/Adam-Monir"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-white/5 rounded-lg hover:text-[#00ff9d] transition-colors"
                >
                  <Github />
                </a>
                <a
                  href="https://www.linkedin.com/in/adam-kamal-11ab41349/"
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
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border-2 border-[#00ff9d]/30 overflow-hidden group">
              <div className="scan-line" />
              <img
                src={profileImg}
                alt="Adam Monir"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>
        </section>

        {/* ── STATS (original "about" section) ── */}
        <section className="py-20 grid md:grid-cols-3 gap-8 text-center">
          <div className="p-8 bg-[#111] rounded-2xl border border-white/5">
            <div className="text-[#00ff9d] text-4xl font-black mb-2">25+</div>
            <div className="text-gray-500 uppercase text-xs tracking-widest font-mono">Certifications</div>
          </div>
          <div className="p-8 bg-[#111] rounded-2xl border border-white/5">
            <div className="text-[#00ff9d] text-4xl font-black mb-2">AI</div>
            <div className="text-gray-500 uppercase text-xs tracking-widest font-mono">Major Concentration</div>
          </div>
          <div className="p-8 bg-[#111] rounded-2xl border border-white/5">
            <div className="text-[#00ff9d] text-4xl font-black mb-2">3+</div>
            <div className="text-gray-500 uppercase text-xs tracking-widest font-mono">Years Experience</div>
          </div>
        </section>

        {/* ── ABOUT ME ── */}
        <section id="about" className="py-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeader icon={Brain}>About Me</SectionHeader>

            <p className="text-gray-400 text-lg leading-relaxed max-w-3xl mb-12">
              I'm <span className="text-white font-bold">Adam Rany Kamaleldin</span>, an AI Engineering
              undergraduate at Alamein International University. Over three years I've built smart
              systems, NLP models, RL environments, and full-stack platforms — combining software
              architecture with real-world AI to solve meaningful problems.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {infoCards.map(({ icon: Icon, label, value }) => (
                <motion.div
                  key={label}
                  whileHover={{ y: -6, scale: 1.02, boxShadow: '0 0 25px rgba(0,255,157,0.08)' }}
                  transition={SNAP}
                  className="p-6 bg-[#111] border border-white/5 rounded-2xl"
                >
                  <motion.div whileHover={{ rotate: 12, scale: 1.1 }} transition={SNAP} className="inline-block mb-3">
                    <Icon className="text-[#00ff9d]" size={22} />
                  </motion.div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-1">{label}</div>
                  <div className="text-sm text-white font-medium leading-snug">{value}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── SKILLS BENTO (unchanged) ── */}
        <section id="skills" className="py-20">
          <SectionHeader icon={Terminal}>Technical Domains</SectionHeader>
          <div className="grid md:grid-cols-3 gap-6">
            <SkillBox icon={Brain} title="Artificial Intelligence" items="NLP, Computer Vision, Machine Learning, TensorFlow, Deep Learning." />
            <SkillBox icon={Code2} title="Software Engineering" items="Java (OOP), Python, C, Agile/Scrum, Software Quality Engineering." />
            <SkillCard icon={Database} title="Data & Systems" items="SQL (IBM/Meta), Relational Databases, Unix, Linear Circuits." />
          </div>
        </section>

        {/* ── TECHNICAL EXPERTISE ── */}
        <section id="expertise" className="py-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeader icon={Wrench}>Technical Expertise</SectionHeader>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {expertiseCategories.map(({ icon: Icon, title, skills }, idx) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -6, scale: 1.02, boxShadow: '0 0 25px rgba(0,255,157,0.08)' }}
                  transition={{ ...SNAP, delay: idx * 0.08 }}
                  className="p-8 bg-[#111] border border-white/5 rounded-3xl"
                >
                  <motion.div whileHover={{ rotate: 12, scale: 1.1 }} transition={SNAP} className="inline-block mb-5">
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
        <section id="experience" className="py-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeader icon={Briefcase}>Experience</SectionHeader>

            <div className="relative">
              {/* vertical line */}
              <div className="absolute left-[11px] top-0 bottom-0 w-px bg-[#00ff9d]/20" />

              <div className="flex flex-col gap-10">
                {experiences.map((exp, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ ...SNAP, delay: i * 0.15 }}
                    className="relative pl-10"
                  >
                    {/* dot — framer motion pulse */}
                    <motion.div
                      whileHover={{ scale: 1.4 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                      className="absolute left-0 top-1.5 w-[22px] h-[22px] rounded-full border-2 border-[#00ff9d] bg-[#080808] flex items-center justify-center"
                    >
                      <div className="w-2 h-2 rounded-full bg-[#00ff9d]" />
                    </motion.div>

                    <motion.div
                      whileHover={{ y: -4, boxShadow: '0 0 25px rgba(0,255,157,0.08)' }}
                      transition={SNAP}
                      className="p-6 bg-[#111] border border-white/5 rounded-2xl"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                        <div>
                          <h4 className="text-lg font-bold text-white">{exp.role}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Building2 size={13} className="text-[#00ff9d]" />
                            <span className="text-xs text-gray-400 font-mono">{exp.company}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-[#00ff9d] bg-[#00ff9d]/10 border border-[#00ff9d]/20 px-3 py-1.5 rounded-full">
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
        <section id="projects" className="py-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeader icon={Code2}>Projects</SectionHeader>

            {/* Filter tabs */}
            <div className="flex flex-wrap gap-3 mb-10">
              {PROJECT_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-widest transition-all border ${
                    activeFilter === cat
                      ? 'bg-[#00ff9d] text-black border-[#00ff9d] font-bold'
                      : 'border-white/10 text-gray-400 hover:border-[#00ff9d]/50 hover:text-[#00ff9d]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((proj, i) => (
                  <motion.div
                    key={proj.title}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    whileHover={{ y: -6, scale: 1.02, boxShadow: '0 0 25px rgba(0,255,157,0.08)' }}
                    transition={{ ...SNAP, delay: i * 0.05 }}
                    className="p-6 bg-[#111] border border-white/5 rounded-2xl flex flex-col"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#00ff9d] bg-[#00ff9d]/10 border border-[#00ff9d]/20 px-2 py-1 rounded">
                        {proj.category}
                      </span>
                      <a href="#" className="p-1.5 bg-white/5 rounded-lg hover:text-[#00ff9d] transition-colors" aria-label="View on GitHub">
                        <Github size={15} />
                      </a>
                    </div>
                    <h4 className="font-bold text-base mb-2 text-white">{proj.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed flex-1">{proj.desc}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {proj.tags.map((tag) => (
                        <span key={tag} className="text-[10px] bg-white/5 border border-white/10 text-gray-400 px-2 py-0.5 rounded font-mono">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </section>

        {/* ── CERTIFICATIONS ── */}
        <section id="certifications" className="py-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeader icon={Award}>Verified Credentials</SectionHeader>

            {/* Filter bar */}
            <div className="flex flex-wrap gap-2 mb-8">
              {CERT_FILTER_CATS.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCertFilter(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest transition-all border ${
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
              <AnimatePresence mode="popLayout">
                {filteredCerts.map((c, i) => (
                  <motion.div
                    key={`${c.provider}-${c.n}`}
                    layout
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    whileHover={{ x: 8 }}
                    transition={SNAP}
                    className={`flex flex-wrap sm:flex-nowrap items-center gap-4 px-5 py-4 cursor-default ${
                      i !== filteredCerts.length - 1 ? 'border-b border-white/5' : ''
                    }`}
                  >
                    <span className="text-[10px] bg-[#00ff9d]/10 text-[#00ff9d] border border-[#00ff9d]/20 px-2 py-1 rounded uppercase shrink-0 w-16 text-center">
                      {c.cat}
                    </span>
                    <span className="text-base font-bold flex-1 min-w-0">{c.n}</span>
                    <div className="flex items-center gap-4 shrink-0">
                      <span className="text-sm text-gray-400 font-mono hidden sm:block">{c.provider}</span>
                      <span className="text-xs text-gray-500 font-mono">{c.date}</span>
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
        <footer id="contact" className="py-20 border-t border-white/5">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeader icon={Mail}>Get In Touch</SectionHeader>

            <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mb-8">
              I'm always open to discussing new opportunities, collaborations, or just having a chat
              about AI and technology. Feel free to reach out via any of the channels below!
            </p>

            {/* Language badges */}
            <div className="flex flex-wrap gap-3 mb-10">
              <span className="flex items-center gap-2 text-xs font-mono text-[#00ff9d] border border-[#00ff9d]/30 bg-[#00ff9d]/5 px-4 py-1 rounded-full">
                🇪🇬 Arabic — Native
              </span>
              <span className="flex items-center gap-2 text-xs font-mono text-[#00ff9d] border border-[#00ff9d]/30 bg-[#00ff9d]/5 px-4 py-1 rounded-full">
                🇬🇧 English — Upper Intermediate
              </span>
            </div>

            {/* Contact cards 2x2 */}
            <div className="grid sm:grid-cols-2 gap-5 mb-14">
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
                    <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined} className="flex items-center gap-5 p-6">
                      <div className="p-3 bg-[#00ff9d]/10 rounded-xl shrink-0"><Icon className="text-[#00ff9d]" size={22} /></div>
                      <div><div className="text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-0.5">{label}</div><div className="text-sm text-white font-medium">{value}</div></div>
                    </a>
                  ) : (
                    <div className="flex items-center gap-5 p-6">
                      <div className="p-3 bg-[#00ff9d]/10 rounded-xl shrink-0"><Icon className="text-[#00ff9d]" size={22} /></div>
                      <div><div className="text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-0.5">{label}</div><div className="text-sm text-white font-medium">{value}</div></div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Footer bar */}
            <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-gray-600 text-xs font-mono">
                © {new Date().getFullYear()} Adam Rany Kamaleldin — All rights reserved.
              </p>
              <div className="flex gap-5">
                <a href="mailto:adam.mounir.business0@gmail.com" className="text-gray-500 hover:text-[#00ff9d] transition-colors">
                  <Mail size={18} />
                </a>
                <a href="https://github.com/Adam-Monir" className="text-gray-500 hover:text-[#00ff9d] transition-colors">
                  <Github size={18} />
                </a>
                <a href="https://www.linkedin.com/in/adam-kamal-11ab41349/" className="text-gray-500 hover:text-[#00ff9d] transition-colors">
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