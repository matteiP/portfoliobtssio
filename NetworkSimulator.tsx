import { useState, useEffect, useRef } from 'react';
import { 
  Menu, 
  X, 
  Download, 
  Mail, 
  ArrowUp, 
  ExternalLink, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Terminal, 
  Settings, 
  Shield, 
  Activity, 
  Database, 
  Network, 
  Cpu, 
  MapPin, 
  Send,
  Loader2,
  ChevronRight
} from 'lucide-react';

import { 
  EDUCATION_DATA, 
  SKILLS_DATA, 
  STAGES_DATA, 
  PROJECTS_DATA, 
  CERTIFICATIONS_DATA,
  Project 
} from './data/portfolioData';

import NetworkSimulator from './components/NetworkSimulator';
import TerminalConsole from './components/TerminalConsole';
import ProjectModal from './components/ProjectModal';

export default function App() {
  // Navigation & UI States
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  // Dynamic Dashboard States (Simulated)
  const [cpuUsage, setCpuUsage] = useState<number>(24);
  const [ramUsage, setRamUsage] = useState<string>('4.8 GB / 16 GB');
  const [uptimeDays] = useState<number>(15);
  
  // Filter States
  const [skillsFilter, setSkillsFilter] = useState<string>('all');
  const [projectsFilter, setProjectsFilter] = useState<string>('all');
  
  // Modal State
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Contact Form States
  const [contactName, setContactName] = useState<string>('');
  const [contactEmail, setContactEmail] = useState<string>('');
  const [contactSubject, setContactSubject] = useState<string>('');
  const [contactMessage, setContactMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [smtpLogs, setSmtpLogs] = useState<string[]>([]);
  const smtpLogEndRef = useRef<HTMLDivElement>(null);

  // Fluctuating CPU and stats simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(Math.floor(Math.random() * 20) + 12);
      const val = (4.7 + Math.random() * 0.5).toFixed(1);
      setRamUsage(`${val} GB / 16 GB`);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Monitor scroll for header & back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      // Toggle back-to-top button
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      // Highlight active section on scroll
      const sections = ['home', 'atelier', 'parcours', 'competences', 'stages', 'projets', 'certifications', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll SMTP log box
  useEffect(() => {
    smtpLogEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [smtpLogs]);

  // Handle mock SMTP mail sending
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;

    setIsSubmitting(true);
    setSmtpLogs([]);
    setSubmitSuccess(false);

    const logMessages = [
      `Connexion au serveur mail.pasquet.tech:587...`,
      `[OK] Connecté au serveur SMTP de redirection.`,
      `>>> EHLO client.pasquet.tech`,
      `<<< 250-mail.pasquet.tech Hello, 250-STARTTLS, 250-8BITMIME`,
      `>>> STARTTLS`,
      `<<< 220 2.0.0 Ready to start TLS`,
      `[SECURE] Négociation TLS 1.3 établie (Chiffrement AES-256)`,
      `>>> MAIL FROM: <${contactEmail}>`,
      `<<< 250 2.1.0 Sender <${contactEmail}> OK`,
      `>>> RCPT TO: <pasquet.mattei@gmail.com>`,
      `<<< 250 2.1.5 Recipient <pasquet.mattei@gmail.com> OK`,
      `>>> DATA`,
      `<<< 354 Start mail input; end with <CR><LF>.<CR><LF>`,
      `Envoi des en-têtes et du message...`,
      `Sujet: ${contactSubject || 'Message du Portfolio'}`,
      `Expéditeur: ${contactName}`,
      `>>> .`,
      `<<< 250 2.0.0 Message accepté et mis en file d'attente (ID: srv-mail-49271)`,
      `>>> QUIT`,
      `<<< 221 2.0.0 Service closing transmission channel`,
      `[SUCCESS] Message envoyé avec succès !`
    ];

    let currentLogIndex = 0;
    const logInterval = setInterval(() => {
      if (currentLogIndex < logMessages.length) {
        setSmtpLogs(prev => [...prev, logMessages[currentLogIndex]]);
        currentLogIndex++;
      } else {
        clearInterval(logInterval);
        setIsSubmitting(false);
        setSubmitSuccess(true);
        // Reset form
        setContactName('');
        setContactEmail('');
        setContactSubject('');
        setContactMessage('');
      }
    }, 450);
  };

  const getSkillCategoryIcon = (category: string) => {
    switch (category) {
      case 'networks': return <Network className="w-5 h-5 text-indigo-400" />;
      case 'systems': return <Terminal className="w-5 h-5 text-emerald-400" />;
      case 'security': return <Shield className="w-5 h-5 text-rose-400" />;
      case 'virtualization': return <Cpu className="w-5 h-5 text-purple-400" />;
      default: return <Database className="w-5 h-5 text-indigo-400" />;
    }
  };

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="grid-bg min-h-screen text-slate-100 relative">
      
      {/* Dynamic Header System Ticker */}
      <div className="bg-slate-950 border-b border-slate-900 text-[10px] sm:text-xs text-slate-400 py-1.5 px-4 font-mono z-50 sticky top-0 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping"></span>
            SYS_STATUS: <span className="text-emerald-400">ONLINE</span>
          </span>
          <span className="hidden md:inline">|</span>
          <span className="hidden md:flex items-center gap-1">
            <Cpu size={11} className="text-indigo-400" /> CPU: <span className="text-white">{cpuUsage}%</span>
          </span>
          <span className="hidden md:inline">|</span>
          <span className="hidden md:flex items-center gap-1">
            <Settings size={11} className="text-indigo-400" /> RAM: <span className="text-white">{ramUsage}</span>
          </span>
          <span className="hidden md:inline">|</span>
          <span className="hidden md:flex items-center gap-1">
            <Activity size={11} className="text-indigo-400" /> UPTIME: <span className="text-white">{uptimeDays}d 10h 32m</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-indigo-400 font-bold select-none">[BTS SIO SISR]</span>
          <span>Mattei Pasquet</span>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-[28px] sm:top-[32px] w-full bg-slate-950/70 backdrop-blur-md border-b border-slate-900 z-40 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <button 
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="p-1.5 rounded-lg bg-indigo-900/40 border border-indigo-800 text-indigo-400 font-mono font-bold text-sm tracking-wider group-hover:bg-indigo-900/60 transition-colors">
              &lt;MP /&gt;
            </div>
            <div className="flex flex-col text-left">
              <span className="text-white font-extrabold text-sm tracking-tight leading-none">Mattei Pasquet</span>
              <span className="text-[10px] text-indigo-400 font-mono font-semibold">Administrateur SISR</span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-300">
            <button 
              onClick={() => scrollToSection('home')}
              className={`hover:text-indigo-400 cursor-pointer transition-colors ${activeSection === 'home' ? 'nav-link-active' : ''}`}
            >
              Accueil
            </button>
            <button 
              onClick={() => scrollToSection('atelier')}
              className={`hover:text-indigo-400 cursor-pointer transition-colors ${activeSection === 'atelier' ? 'nav-link-active' : ''}`}
            >
              Atelier Réseau
            </button>
            <button 
              onClick={() => scrollToSection('parcours')}
              className={`hover:text-indigo-400 cursor-pointer transition-colors ${activeSection === 'parcours' ? 'nav-link-active' : ''}`}
            >
              Parcours
            </button>
            <button 
              onClick={() => scrollToSection('competences')}
              className={`hover:text-indigo-400 cursor-pointer transition-colors ${activeSection === 'competences' ? 'nav-link-active' : ''}`}
            >
              Compétences
            </button>
            <button 
              onClick={() => scrollToSection('stages')}
              className={`hover:text-indigo-400 cursor-pointer transition-colors ${activeSection === 'stages' ? 'nav-link-active' : ''}`}
            >
              Stages
            </button>
            <button 
              onClick={() => scrollToSection('projets')}
              className={`hover:text-indigo-400 cursor-pointer transition-colors ${activeSection === 'projets' ? 'nav-link-active' : ''}`}
            >
              Projets
            </button>
            <button 
              onClick={() => scrollToSection('certifications')}
              className={`hover:text-indigo-400 cursor-pointer transition-colors ${activeSection === 'certifications' ? 'nav-link-active' : ''}`}
            >
              Certifications
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className={`hover:text-indigo-400 cursor-pointer transition-colors ${activeSection === 'contact' ? 'nav-link-active' : ''}`}
            >
              Contact
            </button>
          </nav>

          {/* Socials & Download CV */}
          <div className="hidden lg:flex items-center gap-3">
            <a 
              href="https://github.com/mattei-pasquet" 
              target="_blank" 
              rel="noreferrer" 
              className="p-2 text-slate-400 hover:text-white border border-slate-900 hover:border-slate-800 rounded-lg bg-slate-950 transition-all flex items-center justify-center"
              title="GitHub"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
            </a>
            <a 
              href="https://linkedin.com/in/mattei-pasquet" 
              target="_blank" 
              rel="noreferrer" 
              className="p-2 text-slate-400 hover:text-white border border-slate-900 hover:border-slate-800 rounded-lg bg-slate-950 transition-all flex items-center justify-center"
              title="LinkedIn"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs py-2 px-4 rounded-lg flex items-center gap-1.5 cursor-pointer shadow-lg shadow-indigo-600/20 transition-all duration-200"
            >
              <Mail size={14} /> Me Contacter
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-900 rounded-lg border border-slate-800"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 pt-32 bg-slate-950/95 backdrop-blur-lg flex flex-col items-center gap-6 text-lg font-bold text-slate-200 lg:hidden">
          <button onClick={() => scrollToSection('home')} className="hover:text-indigo-400 transition-colors">Accueil</button>
          <button onClick={() => scrollToSection('atelier')} className="hover:text-indigo-400 transition-colors">Atelier Réseau</button>
          <button onClick={() => scrollToSection('parcours')} className="hover:text-indigo-400 transition-colors">Parcours</button>
          <button onClick={() => scrollToSection('competences')} className="hover:text-indigo-400 transition-colors">Compétences</button>
          <button onClick={() => scrollToSection('stages')} className="hover:text-indigo-400 transition-colors">Stages</button>
          <button onClick={() => scrollToSection('projets')} className="hover:text-indigo-400 transition-colors">Projets</button>
          <button onClick={() => scrollToSection('certifications')} className="hover:text-indigo-400 transition-colors">Certifications</button>
          <button onClick={() => scrollToSection('contact')} className="hover:text-indigo-400 transition-colors">Contact</button>
          
          <div className="flex gap-4 mt-4">
            <a 
              href="https://github.com/mattei-pasquet" 
              target="_blank" 
              rel="noreferrer" 
              className="p-3 text-slate-400 hover:text-white border border-slate-800 rounded-xl bg-slate-900 transition-all flex items-center justify-center"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
            </a>
            <a 
              href="https://linkedin.com/in/mattei-pasquet" 
              target="_blank" 
              rel="noreferrer" 
              className="p-3 text-slate-400 hover:text-white border border-slate-800 rounded-xl bg-slate-900 transition-all flex items-center justify-center"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>
        </div>
      )}

      {/* Main Body Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-24 md:space-y-32">
        
        {/* SECTION 1: HERO / ACCUEIL */}
        <section id="home" className="pt-8 md:pt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-indigo-950/40 border border-indigo-900 text-indigo-300 font-mono text-xs px-3 py-1.5 rounded-full">
              <span className="h-2 w-2 rounded-full bg-indigo-400 animate-pulse"></span>
              Disponible pour Alternance / Opportunités Réseaux
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Bonjour, je suis <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 text-glow-blue">
                Mattei Pasquet
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl">
              Étudiant en <strong className="text-indigo-400 font-semibold">BTS SIO option SISR</strong> (Solutions d’Infrastructure, Systèmes et Réseaux). Passionné par le déploiement réseau, l'administration de serveurs et les techniques avancées en cybersécurité.
            </p>

            {/* Quick Cyber Badges */}
            <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs">
              <span className="bg-slate-900 border border-slate-800/80 px-3 py-1 rounded text-slate-400 hover:border-slate-700 transition-colors">#Routing_Switching</span>
              <span className="bg-slate-900 border border-slate-800/80 px-3 py-1 rounded text-slate-400 hover:border-slate-700 transition-colors">#SysAdmin_Linux</span>
              <span className="bg-slate-900 border border-slate-800/80 px-3 py-1 rounded text-slate-400 hover:border-slate-700 transition-colors">#Active_Directory</span>
              <span className="bg-slate-900 border border-slate-800/80 px-3 py-1 rounded text-slate-400 hover:border-slate-700 transition-colors">#CyberSecurity</span>
              <span className="bg-slate-900 border border-slate-800/80 px-3 py-1 rounded text-slate-400 hover:border-slate-700 transition-colors">#Virtualization</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => scrollToSection('projets')}
                className="bg-indigo-600 hover:bg-indigo-750 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-indigo-600/30 transition-all duration-200 group"
              >
                <span>Voir mon portfolio</span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="bg-slate-900/60 hover:bg-slate-900 text-slate-200 border border-slate-800 hover:border-slate-700 font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all duration-200"
              >
                <span>Prendre contact</span>
                <Mail className="w-4 h-4 text-slate-400" />
              </button>
              <a 
                href="/cv-mattei-pasquet.pdf" 
                download
                className="bg-slate-950 hover:bg-slate-900 text-slate-400 hover:text-white border border-slate-900 hover:border-slate-800 font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-200"
              >
                <span>Télécharger mon CV</span>
                <Download className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Hero Right Visual: High-Tech Interactive Server Mockup */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Background glowing blob */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full blur-3xl opacity-20 animate-pulse-glow"></div>

            {/* Server Rack Illustration */}
            <div className="relative w-full max-w-[380px] bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-5 backdrop-blur-xl">
              
              {/* Top Bar with power switch & indicators */}
              <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                  <span className="text-[10px] font-mono text-slate-500">CABINET_01 // SECURE</span>
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-slate-950"></div>
              </div>

              {/* Server Unit 1: Cisco Router */}
              <div className="bg-slate-900/60 border border-slate-850 rounded-xl p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-indigo-400">UNIT_01: Cisco 2911 Router</span>
                  <span className="text-[10px] font-mono text-slate-500">IP: 192.168.1.1</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] font-mono text-slate-500">VLAN_10:</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  <span className="text-[9px] font-mono text-slate-500">VLAN_20:</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="text-[9px] font-mono text-slate-500">VLAN_30:</span>
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                </div>
                <div className="w-full bg-slate-950 h-1.5 rounded overflow-hidden">
                  <div className="bg-indigo-500 h-full w-[80%] rounded"></div>
                </div>
              </div>

              {/* Server Unit 2: Linux server */}
              <div className="bg-slate-900/60 border border-slate-850 rounded-xl p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-emerald-400">UNIT_02: Debian 12 (Nginx/DNS)</span>
                  <span className="text-[10px] font-mono text-slate-500">IP: 10.0.0.20</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                  <span>HTTPS (443): <span className="text-emerald-400 font-bold">ON</span></span>
                  <span>BIND9 (53): <span className="text-emerald-400 font-bold">ON</span></span>
                </div>
                <div className="w-full bg-slate-950 h-1.5 rounded overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[65%] rounded animate-pulse"></div>
                </div>
              </div>

              {/* Server Unit 3: Windows Server */}
              <div className="bg-slate-900/60 border border-slate-850 rounded-xl p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-purple-400">UNIT_03: Active Directory DS</span>
                  <span className="text-[10px] font-mono text-slate-500">IP: 10.0.0.10</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                  <span>Domain: pasquet.local</span>
                  <span>GPOs: 14 Active</span>
                </div>
                <div className="w-full bg-slate-950 h-1.5 rounded overflow-hidden">
                  <div className="bg-purple-500 h-full w-[50%] rounded"></div>
                </div>
              </div>

              {/* Hardware logs terminal preview */}
              <div className="bg-black border border-slate-850 rounded p-2.5 font-mono text-[9px] text-cyan-400 space-y-0.5 leading-tight">
                <div>[SYSTEM] kernel: eth0 UP - 1000Mbps Full Duplex</div>
                <div>[SECURITY] snort: signatures database updated</div>
                <div>[MONITOR] zabbix: agent report client-pc (OK)</div>
              </div>

            </div>
          </div>

        </section>

        {/* SECTION 2: ATELIER TECHNIQUE / LABORATOIRE (SIMULATOR + TERMINAL) */}
        <section id="atelier" className="space-y-10 scroll-mt-24">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold font-mono">Atelier Technique & Laboratoire</span>
            <h2 className="text-3xl font-extrabold text-white">Laboratoire Virtuel SISR</h2>
            <p className="text-slate-400 text-sm md:text-base">
              Explorez mon laboratoire interactif. Vous pouvez cliquer sur les nœuds réseau pour lancer des pings de diagnostic ou utiliser la ligne de commande linux pour interagir avec le site.
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            <div className="xl:col-span-7">
              <NetworkSimulator />
            </div>
            <div className="xl:col-span-5">
              <TerminalConsole />
            </div>
          </div>
        </section>

        {/* SECTION 3: MON PARCOURS SCOLAIRE */}
        <section id="parcours" className="space-y-12 scroll-mt-24">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest text-purple-400 font-bold font-mono">Curriculum Vitae</span>
            <h2 className="text-3xl font-extrabold text-white">Mon Parcours Scolaire</h2>
            <p className="text-slate-400 text-sm md:text-base">
              Mon itinéraire académique alliant enseignement technologique et spécialisation dans les infrastructures et réseaux d'entreprise.
            </p>
          </div>

          {/* Timeline container */}
          <div className="relative max-w-4xl mx-auto pl-6 sm:pl-8 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-indigo-500 before:via-purple-500 before:to-transparent">
            {EDUCATION_DATA.map((edu) => (
              <div key={edu.id} className="relative mb-12 last:mb-0 pl-6 sm:pl-10 group">
                
                {/* Timeline node */}
                <span className="absolute -left-6 sm:-left-8 top-1.5 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-slate-950 border-2 border-indigo-500 group-hover:border-purple-400 transition-colors z-10 shadow-[0_0_10px_rgba(99,102,241,0.5)]">
                  <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-indigo-500 group-hover:bg-purple-400 transition-colors"></span>
                </span>

                {/* Content Card */}
                <div className="bg-slate-900/50 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-6 glow-purple transition-all duration-300 hover:transform hover:-translate-y-1 relative overflow-hidden backdrop-blur-xl">
                  
                  {/* Floating graduation cap icon */}
                  <div className="absolute top-6 right-6 text-slate-800 group-hover:text-indigo-500/10 transition-colors pointer-events-none">
                    <GraduationCap size={72} />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div className="space-y-1">
                      <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wide bg-indigo-950/40 border border-indigo-900/60 px-2 py-0.5 rounded">
                        {edu.period}
                      </span>
                      <h3 className="text-xl font-extrabold text-white">{edu.degree}</h3>
                    </div>
                    <div className="text-xs font-semibold text-slate-400 font-mono flex items-center gap-1.5">
                      <MapPin size={13} className="text-purple-400" />
                      <span>{edu.school}, {edu.location}</span>
                    </div>
                  </div>

                  <p className="text-sm font-semibold text-indigo-300 font-mono mb-3">{edu.specialization}</p>
                  
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    {edu.description}
                  </p>

                  <div className="border-t border-slate-800/80 pt-4">
                    <div className="text-xs font-mono text-slate-500 mb-2 font-bold uppercase tracking-wider">Compétences acquises :</div>
                    <div className="flex flex-wrap gap-2">
                      {edu.skillsAcquired.map(skill => (
                        <span key={skill} className="text-xs font-mono bg-slate-950 border border-slate-850 text-slate-300 px-3 py-1 rounded-md">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: MES COMPÉTENCES */}
        <section id="competences" className="space-y-12 scroll-mt-24">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest text-cyan-400 font-bold font-mono">Expertise Technique</span>
            <h2 className="text-3xl font-extrabold text-white">Mes Compétences</h2>
            <p className="text-slate-400 text-sm md:text-base">
              Un aperçu détaillé de mes capacités opérationnelles en infrastructures, administration systèmes, sécurité et outils de virtualisation.
            </p>
          </div>

          {/* Filter Categories */}
          <div className="flex flex-wrap items-center justify-center gap-3 max-w-2xl mx-auto">
            <button
              onClick={() => setSkillsFilter('all')}
              className={`px-4 py-2 text-xs font-bold font-mono rounded-lg border transition-all cursor-pointer ${
                skillsFilter === 'all' 
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20' 
                  : 'bg-slate-950 border-slate-900 text-slate-400 hover:text-white hover:border-slate-800'
              }`}
            >
              Tous ({SKILLS_DATA.length})
            </button>
            <button
              onClick={() => setSkillsFilter('networks')}
              className={`px-4 py-2 text-xs font-bold font-mono rounded-lg border transition-all cursor-pointer ${
                skillsFilter === 'networks' 
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20' 
                  : 'bg-slate-950 border-slate-900 text-slate-400 hover:text-white hover:border-slate-800'
              }`}
            >
              Réseaux ({SKILLS_DATA.filter(s => s.category === 'networks').length})
            </button>
            <button
              onClick={() => setSkillsFilter('systems')}
              className={`px-4 py-2 text-xs font-bold font-mono rounded-lg border transition-all cursor-pointer ${
                skillsFilter === 'systems' 
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20' 
                  : 'bg-slate-950 border-slate-900 text-slate-400 hover:text-white hover:border-slate-800'
              }`}
            >
              Systèmes ({SKILLS_DATA.filter(s => s.category === 'systems').length})
            </button>
            <button
              onClick={() => setSkillsFilter('security')}
              className={`px-4 py-2 text-xs font-bold font-mono rounded-lg border transition-all cursor-pointer ${
                skillsFilter === 'security' 
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20' 
                  : 'bg-slate-950 border-slate-900 text-slate-400 hover:text-white hover:border-slate-800'
              }`}
            >
              Cybersécurité ({SKILLS_DATA.filter(s => s.category === 'security').length})
            </button>
            <button
              onClick={() => setSkillsFilter('virtualization')}
              className={`px-4 py-2 text-xs font-bold font-mono rounded-lg border transition-all cursor-pointer ${
                skillsFilter === 'virtualization' 
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20' 
                  : 'bg-slate-950 border-slate-900 text-slate-400 hover:text-white hover:border-slate-800'
              }`}
            >
              Virtualisation ({SKILLS_DATA.filter(s => s.category === 'virtualization').length})
            </button>
          </div>

          {/* Grid of Skill Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {SKILLS_DATA.filter(s => skillsFilter === 'all' || s.category === skillsFilter).map((skill) => (
              <div 
                key={skill.name}
                className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 hover:border-slate-750 transition-all duration-300 relative group overflow-hidden backdrop-blur-xl"
              >
                
                {/* Visual Category Border Highlight */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 ${
                  skill.category === 'networks' ? 'bg-indigo-500' :
                  skill.category === 'systems' ? 'bg-emerald-500' :
                  skill.category === 'security' ? 'bg-rose-500' : 'bg-purple-500'
                }`}></div>

                {/* Header */}
                <div className="flex items-center justify-between mb-4 pl-1">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-slate-950 border border-slate-850">
                      {getSkillCategoryIcon(skill.category)}
                    </div>
                    <span className="font-extrabold text-white text-base leading-snug">{skill.name}</span>
                  </div>
                  <span className="text-sm font-bold font-mono text-indigo-400 bg-indigo-950/40 border border-indigo-900/60 px-2 py-0.5 rounded">
                    {skill.level}%
                  </span>
                </div>

                {/* Progress bar wrapper */}
                <div className="space-y-4 pl-1">
                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-900">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${
                        skill.category === 'networks' ? 'bg-indigo-500' :
                        skill.category === 'systems' ? 'bg-emerald-500' :
                        skill.category === 'security' ? 'bg-rose-500' : 'bg-purple-500'
                      }`}
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>

                  {/* Bullet details */}
                  <div className="space-y-1.5">
                    {skill.details.map((detail, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-400 font-mono">
                        <span className="text-slate-600 mt-0.5">❯</span>
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: MES STAGES */}
        <section id="stages" className="space-y-12 scroll-mt-24">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold font-mono">Expériences Terrain</span>
            <h2 className="text-3xl font-extrabold text-white">Mes Stages Professionnels</h2>
            <p className="text-slate-400 text-sm md:text-base">
              Expériences d'intégration en entreprise menées en cours de cycle BTS SIO, validant mes compétences en situation réelle de production.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {STAGES_DATA.map((stage) => (
              <div 
                key={stage.id}
                className="bg-slate-900/50 border border-slate-800 hover:border-slate-750/80 rounded-2xl p-6 glow-purple transition-all duration-300 hover:transform hover:-translate-y-1.5 flex flex-col relative overflow-hidden backdrop-blur-xl"
              >
                
                {/* Top header */}
                <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-4">
                  <div>
                    <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-slate-500 block mb-1">
                      {stage.period}
                    </span>
                    <h3 className="text-2xl font-extrabold text-white leading-snug">{stage.company}</h3>
                  </div>
                  <div className={`p-2 rounded-xl bg-gradient-to-br ${stage.logoColor} text-white`}>
                    <Briefcase size={22} />
                  </div>
                </div>

                <p className="text-sm font-semibold text-indigo-300 font-mono mb-2.5">{stage.role}</p>
                <p className="text-slate-400 text-sm leading-relaxed mb-5">{stage.description}</p>

                {/* Missions */}
                <div className="space-y-3 flex-1 border-t border-slate-800/80 pt-4">
                  <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">Principales missions :</h4>
                  <ul className="space-y-2.5">
                    {stage.missions.map((mission, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                        <span className="mt-1 flex h-1.5 w-1.5 rounded-full bg-indigo-500 shrink-0"></span>
                        <span>{mission}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Techs */}
                <div className="border-t border-slate-800/80 pt-4 mt-5">
                  <div className="text-xs font-mono text-slate-500 mb-2 font-bold uppercase tracking-wider">Technologies utilisées :</div>
                  <div className="flex flex-wrap gap-1.5">
                    {stage.technologies.map(tech => (
                      <span key={tech} className="text-[10px] font-mono bg-slate-950 border border-slate-850 text-indigo-300 px-2 py-0.5 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </section>

        {/* SECTION 6: MES PROJETS */}
        <section id="projets" className="space-y-12 scroll-mt-24">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold font-mono">Dossier Technique</span>
            <h2 className="text-3xl font-extrabold text-white">Mes Projets Réalisés</h2>
            <p className="text-slate-400 text-sm md:text-base">
              Sélection de projets d’intégration d’infrastructures réseau, d’administration de serveurs et d’audits de sécurité rédigés et validés.
            </p>
          </div>

          {/* Filter Navigation */}
          <div className="flex flex-wrap items-center justify-center gap-3 max-w-xl mx-auto">
            <button
              onClick={() => setProjectsFilter('all')}
              className={`px-4 py-2 text-xs font-bold font-mono rounded-lg border transition-all cursor-pointer ${
                projectsFilter === 'all' 
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20' 
                  : 'bg-slate-950 border-slate-900 text-slate-400 hover:text-white hover:border-slate-800'
              }`}
            >
              Tous
            </button>
            <button
              onClick={() => setProjectsFilter('reseau')}
              className={`px-4 py-2 text-xs font-bold font-mono rounded-lg border transition-all cursor-pointer ${
                projectsFilter === 'reseau' 
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20' 
                  : 'bg-slate-950 border-slate-900 text-slate-400 hover:text-white hover:border-slate-800'
              }`}
            >
              Réseau
            </button>
            <button
              onClick={() => setProjectsFilter('systeme')}
              className={`px-4 py-2 text-xs font-bold font-mono rounded-lg border transition-all cursor-pointer ${
                projectsFilter === 'systeme' 
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20' 
                  : 'bg-slate-950 border-slate-900 text-slate-400 hover:text-white hover:border-slate-800'
              }`}
            >
              Système
            </button>
            <button
              onClick={() => setProjectsFilter('cybersecurite')}
              className={`px-4 py-2 text-xs font-bold font-mono rounded-lg border transition-all cursor-pointer ${
                projectsFilter === 'cybersecurite' 
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20' 
                  : 'bg-slate-950 border-slate-900 text-slate-400 hover:text-white hover:border-slate-800'
              }`}
            >
              Cybersécurité
            </button>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS_DATA.filter(p => projectsFilter === 'all' || p.category === projectsFilter).map((project) => (
              <div 
                key={project.id}
                className="bg-slate-900/40 border border-slate-800 hover:border-slate-750/80 rounded-2xl p-5 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group overflow-hidden backdrop-blur-xl relative"
              >
                
                <div>
                  {/* Category Pill */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-indigo-400 font-bold bg-indigo-950/40 border border-indigo-900/60 px-2 py-0.5 rounded">
                      {project.category.replace('systeme', 'système').replace('reseau', 'réseau')}
                    </span>
                    <span className="text-slate-600 font-mono text-[10px]">#{project.id}</span>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-indigo-400 transition-colors">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-450 text-xs sm:text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Technologies tags list */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.technologies.slice(0, 3).map(tech => (
                      <span key={tech} className="text-[10px] font-mono bg-slate-950 border border-slate-850 text-slate-400 px-2 py-0.5 rounded">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-[10px] font-mono bg-slate-950 text-slate-500 px-2 py-0.5 rounded">
                        +{project.technologies.length - 3} de plus
                      </span>
                    )}
                  </div>
                </div>

                {/* Action button */}
                <button
                  onClick={() => setSelectedProject(project)}
                  className="w-full bg-slate-950 hover:bg-indigo-600/20 text-slate-300 hover:text-indigo-300 font-mono font-semibold py-2 px-3 border border-slate-800 hover:border-indigo-800 text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>Voir le projet</span>
                  <ExternalLink size={12} />
                </button>

              </div>
            ))}
          </div>
        </section>

        {/* SECTION 7: CERTIFICATIONS */}
        <section id="certifications" className="space-y-12 scroll-mt-24">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold font-mono">Reconnaissance Professionnelle</span>
            <h2 className="text-3xl font-extrabold text-white">Mes Certifications</h2>
            <p className="text-slate-400 text-sm md:text-base">
              Badges et formations complémentaires validant mes connaissances pratiques en réseaux et en hygiène informatique.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {CERTIFICATIONS_DATA.map((cert) => (
              <div 
                key={cert.id}
                className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700/80 transition-all duration-300 relative overflow-hidden backdrop-blur-xl group"
              >
                
                {/* Floating Award Icon */}
                <div className="absolute top-5 right-5 text-slate-800/25 group-hover:text-indigo-400/10 transition-colors pointer-events-none">
                  <Award size={48} />
                </div>

                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold block mb-1">
                    {cert.date}
                  </span>
                  
                  <h3 className="text-base font-extrabold text-white mb-2 leading-tight group-hover:text-indigo-400 transition-colors">
                    {cert.name}
                  </h3>
                  
                  <span className="inline-block text-xs font-semibold text-indigo-300 font-mono mb-3.5 bg-indigo-950/40 border border-indigo-900/60 px-2 py-0.5 rounded">
                    {cert.issuer}
                  </span>

                  <p className="text-xs text-slate-450 leading-relaxed mb-4">
                    {cert.description}
                  </p>
                </div>

                {/* Certified badges tags */}
                <div className="border-t border-slate-800/80 pt-4 mt-2">
                  <div className="text-[10px] font-mono text-slate-500 mb-2 font-bold uppercase tracking-wider">Sujets clés :</div>
                  <div className="flex flex-wrap gap-1">
                    {cert.skills.map(skill => (
                      <span key={skill} className="text-[9px] font-mono bg-slate-950 border border-slate-850 text-slate-300 px-2 py-0.5 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </section>

        {/* SECTION 8: CONTACT */}
        <section id="contact" className="space-y-12 scroll-mt-24">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest text-purple-400 font-bold font-mono">Me Joindre</span>
            <h2 className="text-3xl font-extrabold text-white">Prendre Contact</h2>
            <p className="text-slate-400 text-sm md:text-base">
              N'hésitez pas à m'envoyer un message pour toute opportunité de stage, d'alternance ou de collaboration sur des projets systèmes et réseaux.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto items-stretch">
            
            {/* Contact Information & Channels */}
            <div className="lg:col-span-5 bg-slate-900/40 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between gap-6 backdrop-blur-xl">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Informations de Contact</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    Vous pouvez me joindre directement via mon adresse e-mail ou sur les réseaux professionnels listés ci-dessous.
                  </p>
                </div>

                <div className="space-y-4">
                  
                  {/* Email */}
                  <a 
                    href="mailto:pasquet.mattei@gmail.com" 
                    className="flex items-center gap-3.5 group p-3 rounded-xl border border-slate-850 hover:border-slate-750 bg-slate-950/40 transition-all"
                  >
                    <div className="p-2.5 rounded-lg bg-indigo-950/40 border border-indigo-900 text-indigo-400 group-hover:bg-indigo-900/60 transition-colors">
                      <Mail size={16} />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-[10px] font-mono text-slate-500 uppercase font-bold">E-mail</span>
                      <span className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-indigo-400 transition-colors">
                        pasquet.mattei@gmail.com
                      </span>
                    </div>
                  </a>

                  {/* LinkedIn */}
                  <a 
                    href="https://linkedin.com/in/mattei-pasquet" 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-3.5 group p-3 rounded-xl border border-slate-850 hover:border-slate-750 bg-slate-950/40 transition-all"
                  >
                    <div className="p-2.5 rounded-lg bg-indigo-950/40 border border-indigo-900 text-indigo-400 group-hover:bg-indigo-900/60 transition-colors flex items-center justify-center">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-[10px] font-mono text-slate-500 uppercase font-bold">LinkedIn</span>
                      <span className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-indigo-400 transition-colors">
                        linkedin.com/in/mattei-pasquet
                      </span>
                    </div>
                  </a>

                  {/* GitHub */}
                  <a 
                    href="https://github.com/mattei-pasquet" 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-3.5 group p-3 rounded-xl border border-slate-850 hover:border-slate-750 bg-slate-950/40 transition-all"
                  >
                    <div className="p-2.5 rounded-lg bg-indigo-950/40 border border-indigo-900 text-indigo-400 group-hover:bg-indigo-900/60 transition-colors flex items-center justify-center">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                      </svg>
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-[10px] font-mono text-slate-500 uppercase font-bold">GitHub</span>
                      <span className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-indigo-400 transition-colors">
                        github.com/mattei-pasquet
                      </span>
                    </div>
                  </a>

                </div>
              </div>

              {/* Server Info or Nice Tip */}
              <div className="border-t border-slate-850 pt-4 flex items-center gap-2 text-xs font-mono text-slate-500">
                <Terminal size={14} className="text-indigo-400" />
                <span>SSH Port: 22 (Fermé au public)</span>
              </div>
            </div>

            {/* Form & Simulated SMTP Logs */}
            <div className="lg:col-span-7 bg-slate-900/40 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between gap-6 backdrop-blur-xl relative">
              <form onSubmit={handleContactSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Nom */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-slate-400 uppercase font-bold">Nom complet :</label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      disabled={isSubmitting}
                      className="w-full bg-slate-950 border border-slate-850 text-slate-200 rounded-xl p-3 focus:outline-none focus:border-indigo-600 font-mono text-xs disabled:opacity-50"
                      placeholder="Jean Dupont"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-slate-400 uppercase font-bold">Adresse E-mail :</label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      disabled={isSubmitting}
                      className="w-full bg-slate-950 border border-slate-850 text-slate-200 rounded-xl p-3 focus:outline-none focus:border-indigo-600 font-mono text-xs disabled:opacity-50"
                      placeholder="jean.dupont@gmail.com"
                    />
                  </div>
                </div>

                {/* Objet */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-400 uppercase font-bold">Objet :</label>
                  <input
                    type="text"
                    required
                    value={contactSubject}
                    onChange={(e) => setContactSubject(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full bg-slate-950 border border-slate-850 text-slate-200 rounded-xl p-3 focus:outline-none focus:border-indigo-600 font-mono text-xs disabled:opacity-50"
                    placeholder="Offre de stage / d'alternance..."
                  />
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-400 uppercase font-bold">Message :</label>
                  <textarea
                    required
                    rows={4}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full bg-slate-950 border border-slate-850 text-slate-200 rounded-xl p-3 focus:outline-none focus:border-indigo-600 font-mono text-xs disabled:opacity-50 resize-none"
                    placeholder="Votre message ici..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-indigo-600 hover:bg-indigo-750 disabled:bg-slate-800 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-indigo-600/30 transition-all duration-200"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Protocole SMTP en cours...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Envoyer le Message</span>
                    </>
                  )}
                </button>

              </form>

              {/* Simulated SMTP log screen */}
              {(smtpLogs.length > 0 || submitSuccess) && (
                <div className="bg-black border border-slate-850 rounded-xl p-4 font-mono text-[10px] text-emerald-400 space-y-1 leading-normal overflow-y-auto max-h-[160px] scrollbar-thin">
                  <div className="text-slate-500 font-bold border-b border-slate-900 pb-1.5 mb-1.5 flex items-center justify-between">
                    <span>SMTP_LOG_MONITOR (mail.pasquet.tech:587)</span>
                    {submitSuccess && <span className="text-emerald-400">[SUCCESS]</span>}
                  </div>
                  {smtpLogs.map((log, idx) => (
                    <div key={idx} className={log.includes('[SUCCESS]') || log.includes('[SECURE]') || log.includes('[OK]') ? 'text-emerald-300 font-bold' : log.includes('>>>') ? 'text-indigo-400' : 'text-slate-400'}>
                      {log}
                    </div>
                  ))}
                  <div ref={smtpLogEndRef} />
                </div>
              )}

            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-slate-950 border-t border-slate-900 py-10 mt-16 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 space-y-4">
          <div className="flex justify-center gap-6 text-sm text-slate-400">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="mailto:pasquet.mattei@gmail.com" className="hover:text-white transition-colors">E-mail</a>
          </div>
          
          <p>© {new Date().getFullYear()} Mattei Pasquet. Tous droits réservés.</p>
          <p>
            Développé avec <strong className="text-indigo-400">React</strong> & <strong className="text-indigo-400">Tailwind CSS</strong>. Hosted on local server node.
          </p>
        </div>
      </footer>

      {/* SCROLL-TO-TOP BUTTON */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 p-3 bg-indigo-600 hover:bg-indigo-750 text-white rounded-full shadow-lg shadow-indigo-600/30 cursor-pointer transition-all hover:scale-105 duration-200 z-50 animate-in fade-in slide-in-from-bottom-5"
          title="Retour en haut"
        >
          <ArrowUp size={18} />
        </button>
      )}

      {/* DETAILED PROJECT MODAL OVERLAY */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}

    </div>
  );
}
