import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, ArrowRight, Code, Layout, Smartphone, ShieldCheck, 
  Settings2, Database, Users, Calendar, Check, Send, Phone, Mail, MapPin, 
  CreditCard, Award, HelpCircle, CheckCircle2, AlertCircle, GraduationCap,
  Building2, Briefcase, BookOpen, UserCheck, Shield, Trophy
} from 'lucide-react';
import { useStageStore } from '../../store/stageStore';

export default function LandingPage() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const { filieres, subscribeNewsletter, sessions, config } = useStageStore();

  // Contact form state
  const [contactName, setContactName] = React.useState('');
  const [contactEmail, setContactEmail] = React.useState('');
  const [contactMsg, setContactMsg] = React.useState('');
  const [contactSuccess, setContactSuccess] = React.useState(false);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = React.useState('');
  const [newsletterSuccess, setNewsletterSuccess] = React.useState(false);

  // Bridging section state
  const [activeBridgeTab, setActiveBridgeTab] = React.useState<'academic' | 'self_taught' | 'career_change'>('academic');

  // active session details
  const activeSession = sessions.find(s => s.isActive) || sessions[0];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMsg) return;
    setContactSuccess(true);
    setContactName('');
    setContactEmail('');
    setContactMsg('');
    setTimeout(() => setContactSuccess(false), 5000);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    subscribeNewsletter(newsletterEmail, 'LANDING');
    setNewsletterSuccess(true);
    setNewsletterEmail('');
    setTimeout(() => setNewsletterSuccess(false), 5000);
  };

  const getFiliereIcon = (code: string) => {
    switch (code) {
      case 'UML': return <Database className="w-6 h-6 text-[#15803D]" />;
      case 'WEB': return <Code className="w-6 h-6 text-[#15803D]" />;
      case 'MOBILE': return <Smartphone className="w-6 h-6 text-[#15803D]" />;
      case 'DESIGN': return <Layout className="w-6 h-6 text-[#15803D]" />;
      case 'NET': return <ShieldCheck className="w-6 h-6 text-[#15803D]" />;
      case 'DEVOPS': return <Settings2 className="w-6 h-6 text-[#15803D]" />;
      default: return <Code className="w-6 h-6 text-[#15803D]" />;
    }
  };

  const renderFiliereBanner = (code: string) => {
    let imageUrl = "";
    let category = "";
    let tagline = "";
    let mentorImage = "";
    let mentorName = "";
    let mentorRole = "";
    let accentColor = "from-emerald-950/90 via-[#0C1630]/90 to-[#0C1630]/98";

    switch (code) {
      case 'WEB':
        imageUrl = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop";
        category = "WEB DEVELOPMENT";
        tagline = currentLang === 'fr' ? "Applications de Grade Production" : "Production Grade Applications";
        mentorImage = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop";
        mentorName = "Sarah Kamdem";
        mentorRole = "Lead React Engineer";
        accentColor = "from-emerald-950/90 via-[#0C1630]/90 to-[#0C1630]/98";
        break;
      case 'DESIGN':
        imageUrl = "https://images.unsplash.com/photo-1561070791-26c113006238?q=80&w=600&auto=format&fit=crop";
        category = "UI/UX DESIGN";
        tagline = currentLang === 'fr' ? "Figma & Design de Systèmes" : "Figma & Design Systems";
        mentorImage = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop";
        mentorName = "David Nguene";
        mentorRole = "UI/UX Director";
        accentColor = "from-purple-950/90 via-[#0C1630]/90 to-[#0C1630]/98";
        break;
      case 'MOBILE':
        imageUrl = "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=600&auto=format&fit=crop";
        category = "MOBILE DEVELOPMENT";
        tagline = currentLang === 'fr' ? "Flutter & Apps Cross-Platform" : "Flutter & Cross-Platform Apps";
        mentorImage = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=120&auto=format&fit=crop";
        mentorName = "Arlette Tchakouté";
        mentorRole = "Mobile Team Lead";
        accentColor = "from-blue-950/90 via-[#0C1630]/90 to-[#0C1630]/98";
        break;
      case 'UML':
        imageUrl = "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=600&auto=format&fit=crop";
        category = "ANALYSIS & DATABASE";
        tagline = currentLang === 'fr' ? "UML, SQL & Conception SI" : "UML, SQL & IS Engineering";
        mentorImage = "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=120&auto=format&fit=crop";
        mentorName = "Marc Onana";
        mentorRole = "Solutions Architect";
        accentColor = "from-amber-950/90 via-[#0C1630]/90 to-[#0C1630]/98";
        break;
      case 'NET':
        imageUrl = "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&auto=format&fit=crop";
        category = "NETWORK & SECURITY";
        tagline = currentLang === 'fr' ? "Administration Réseaux & Linux" : "Network Admin & Linux";
        mentorImage = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop";
        mentorName = "Jean-Pierre Bella";
        mentorRole = "SecOps Lead";
        accentColor = "from-red-950/90 via-[#0C1630]/90 to-[#0C1630]/98";
        break;
      case 'DEVOPS':
        imageUrl = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop";
        category = "DEVOPS & CLOUD";
        tagline = currentLang === 'fr' ? "Docker, CI/CD & Deployments" : "Docker, CI/CD & Deployments";
        mentorImage = "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=120&auto=format&fit=crop";
        mentorName = "Fabiola Mbarga";
        mentorRole = "Cloud Infrastructure Engineer";
        accentColor = "from-cyan-950/90 via-[#0C1630]/90 to-[#0C1630]/98";
        break;
      default:
        imageUrl = "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=600&auto=format&fit=crop";
        category = "IT SPECIALTY";
        tagline = "Professional IT Internship";
        mentorImage = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop";
        mentorName = "HR Skills Mentor";
        mentorRole = "Senior Instructor";
        accentColor = "from-slate-950/90 via-[#0C1630]/90 to-[#0C1630]/98";
    }

    return (
      <div className="relative h-[220px] w-full shrink-0 overflow-hidden group/banner">
        {/* Main cover background image */}
        <img 
          src={imageUrl} 
          alt={category} 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/banner:scale-110"
          referrerPolicy="no-referrer"
        />
        {/* Dark overlay with elegant accent color gradient */}
        <div className={`absolute inset-0 bg-gradient-to-t ${accentColor} opacity-95 transition-opacity duration-300`} />

        {/* Card content aligned beautifully */}
        <div className="absolute inset-0 p-6 flex flex-col justify-between z-10 text-white">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-sans font-black tracking-widest text-[#E57B24] uppercase">
              {category}
            </span>
            <span className="font-serif text-[10px] font-black tracking-widest text-white/40 uppercase">
              HR SKILLS
            </span>
          </div>

          {/* Centered Avatar/Mentor badge representing the experiential style of the reference image */}
          <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm p-2 rounded-2xl border border-white/10 shadow-lg max-w-[240px]">
            <img 
              src={mentorImage} 
              alt={mentorName} 
              className="w-10 h-10 rounded-xl object-cover border border-white/20 shadow-md shrink-0"
              referrerPolicy="no-referrer"
            />
            <div className="min-w-0">
              <span className="block font-sans text-xs font-bold truncate text-white leading-tight">
                {mentorName}
              </span>
              <span className="block text-[9px] text-slate-300 font-medium truncate">
                {mentorRole}
              </span>
            </div>
          </div>

          {/* Subtitle / tag at bottom */}
          <p className="text-[11px] text-slate-300 font-sans font-medium line-clamp-1 italic">
            "{tagline}"
          </p>
        </div>
      </div>
    );
  };

  // Data for the Bridge Section (Matching Reference Image but aligned to company's internship model)
  const bridgeData = {
    academic: {
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop",
      badgeIcon: <GraduationCap className="w-5 h-5 text-white" />,
      tagline: currentLang === 'fr' ? "Étudiants Académiques" : "Academic Students",
      description: currentLang === 'fr' 
        ? "Validez votre stage de fin de cycle (BTS, Licence, Master) avec un encadrement rigoureux et des projets réels."
        : "Validate your end-of-cycle internship (Associate's, Bachelor's, Master's) with rigorous guidance and real-world projects.",
      features: [
        {
          title: currentLang === 'fr' ? "Encadrement personnalisé" : "Personalized mentorship",
          desc: currentLang === 'fr'
            ? "Soyez guidé au quotidien par un mentor senior qui vous aide à appliquer vos connaissances théoriques."
            : "Be guided daily by a senior mentor who helps you apply your theoretical classroom knowledge."
        },
        {
          title: currentLang === 'fr' ? "Sujet de stage & Rapport validé" : "Internship report & defense preparation",
          desc: currentLang === 'fr'
            ? "Définissez un sujet de stage pertinent et recevez une aide précieuse pour la rédaction de votre rapport."
            : "Define a relevant internship topic and receive expert help in writing your thesis or report."
        },
        {
          title: currentLang === 'fr' ? "Projets informatiques concrets" : "Real IT projects",
          desc: currentLang === 'fr'
            ? "Participez au développement de vraies applications au sein de notre entreprise."
            : "Participate in the development of real software applications within our company."
        },
        {
          title: currentLang === 'fr' ? "Signature des conventions" : "Signed academic agreements",
          desc: currentLang === 'fr'
            ? "Toutes nos conventions et fiches d'évaluation sont rigoureusement signées et transmises à votre établissement."
            : "All internship agreements and evaluation sheets are fully signed and sent to your university."
        }
      ]
    },
    self_taught: {
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop",
      badgeIcon: <Briefcase className="w-5 h-5 text-white" />,
      tagline: currentLang === 'fr' ? "Apprenants Autodidactes" : "Self-Taught Learners",
      description: currentLang === 'fr'
        ? "Sortez des tutoriels vidéo. Travaillez en équipe et apprenez à livrer du code propre en production."
        : "Move beyond video tutorials. Work in an agile team and learn to deliver clean, production-ready code.",
      features: [
        {
          title: currentLang === 'fr' ? "Pratique de l'Agilité" : "Agile methodology in practice",
          desc: currentLang === 'fr'
            ? "Participez aux réunions quotidiennes, utilisez Git/GitHub de manière professionnelle et collaborez sur Slack."
            : "Join daily standups, use Git/GitHub professionally, and collaborate productively on Slack."
        },
        {
          title: currentLang === 'fr' ? "Revues de code constructives" : "Constructive code reviews",
          desc: currentLang === 'fr'
            ? "Faites analyser vos Pull Requests par nos ingénieurs pour améliorer rapidement la qualité de votre code."
            : "Get your Pull Requests reviewed by our senior engineers to rapidly improve your code quality."
        },
        {
          title: currentLang === 'fr' ? "Enrichissement de portfolio" : "Portfolio enrichment",
          desc: currentLang === 'fr'
            ? "Construisez un portfolio solide de projets réels déployés, prouvant vos compétences auprès des futurs recruteurs."
            : "Build a strong portfolio of deployed real-world projects to demonstrate your practical skills to recruiters."
        },
        {
          title: currentLang === 'fr' ? "Autonomie & Résolution de problèmes" : "Autonomy & problem-solving",
          desc: currentLang === 'fr'
            ? "Apprenez à chercher de façon autonome et à résoudre les bogues complexes de production."
            : "Learn to self-educate and troubleshoot complex production-level bugs effectively."
        }
      ]
    },
    career_change: {
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop",
      badgeIcon: <Building2 className="w-5 h-5 text-white" />,
      tagline: currentLang === 'fr' ? "Reconversion Professionnelle" : "Career Changers",
      description: currentLang === 'fr'
        ? "Rejoignez un écosystème bienveillant pour acquérir des compétences techniques en forte demande et changer de vie."
        : "Join a supportive ecosystem to gain high-demand technical skills and pivot your professional career.",
      features: [
        {
          title: currentLang === 'fr' ? "Immersion totale" : "Full immersion training",
          desc: currentLang === 'fr'
            ? "Plongez directement dans un environnement professionnel axé sur le résultat et la pratique intensive."
            : "Dive straight into a results-driven professional environment with intense hands-on practice."
        },
        {
          title: currentLang === 'fr' ? "Technologies les plus demandées" : "High-demand tech stack",
          desc: currentLang === 'fr'
            ? "Formez-vous sur les frameworks modernes (React, Flutter, Node.js) plébiscités par le marché."
            : "Get experience on modern frameworks (React, Flutter, Node.js) highly requested by employers."
        },
        {
          title: currentLang === 'fr' ? "Accompagnement de carrière" : "Career coaching",
          desc: currentLang === 'fr'
            ? "Préparez vos entretiens d'embauche techniques et optimisez votre profil LinkedIn/CV avec nos experts RH."
            : "Prepare for technical job interviews and optimize your LinkedIn/CV with our HR experts."
        },
        {
          title: currentLang === 'fr' ? "Réseau de professionnels" : "Professional network",
          desc: currentLang === 'fr'
            ? "Élargissez votre cercle professionnel en travaillant au coude-à-coude avec des développeurs chevronnés."
            : "Expand your professional network by working alongside seasoned developers and engineers."
        }
      ]
    }
  };

  return (
    <div id="home" className="space-y-0">
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 md:pt-28 md:pb-32 overflow-hidden bg-[#FBF7F0] border-b border-slate-200">
        {/* Decorative background grid pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:20px_20px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Narrative Column */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              
              {/* Aggressive Sans Headline */}
              <h1 className="text-[34px] sm:text-[46px] lg:text-[58px] font-sans font-black tracking-tighter text-[#0F172A] uppercase leading-[1.05]">
                {currentLang === 'fr' ? (
                  <>
                    L'OPPORTUNITÉ DE STAGE <span className="text-[#15803D]">APPLIQUÉ</span> N° 1 POUR LES ÉTUDIANTS ET APPRENANTS.
                  </>
                ) : (
                  <>
                    THE #1 <span className="text-[#15803D]">APPLIED INTERNSHIP</span> OPPORTUNITY FOR STUDENTS &amp; LEARNERS.
                  </>
                )}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {currentLang === 'fr'
                  ? "HR Skills SARL accueille et encadre vos stages en Informatique à Yaoundé. Une transition fluide, pratique et encadrée de votre parcours d'apprentissage vers le monde professionnel."
                  : "HR Skills SARL hosts and mentors your IT internships in Yaounde. A smooth, practical, and guided transition from your learning path to the professional world."}
              </p>

              {/* Exact twin-capsule button layout */}
              <div className="flex flex-col sm:flex-row gap-8 pt-4 justify-center lg:justify-start">
                {/* Column 1: Students */}
                <div className="space-y-2 flex flex-col items-center lg:items-start">
                  <span className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">
                    {currentLang === 'fr' ? "Stagiaires & Apprenants" : "Students & Learners"}
                  </span>
                  <Link
                    to="/register"
                    className="flex items-center gap-4 bg-[#15803D] hover:bg-[#166534] text-white px-6 py-2.5 rounded-full shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group"
                  >
                    <span className="font-black text-[14px] pl-1 uppercase tracking-wider">
                      {currentLang === 'fr' ? "S'inscrire" : "Sign up"}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-[#0F172A] text-white flex items-center justify-center transition-transform group-hover:translate-x-1 shrink-0">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                  </Link>
                </div>

                {/* Column 2: Our Specialties */}
                <div className="space-y-2 flex flex-col items-center lg:items-start">
                  <span className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">
                    {currentLang === 'fr' ? "Nos Spécialités" : "Our Specialties"}
                  </span>
                  <a
                    href="#stages"
                    className="flex items-center gap-4 bg-white border border-slate-200 text-[#0F172A] hover:text-[#15803D] hover:border-[#15803D] px-6 py-2.5 rounded-full shadow-sm hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group"
                  >
                    <span className="font-black text-[14px] pl-1 uppercase tracking-wider">
                      {currentLang === 'fr' ? "Découvrir les stages" : "Explore fields"}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-slate-200 text-[#0F172A] flex items-center justify-center transition-transform group-hover:translate-x-1 shrink-0">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Graphical Column (Exact Replica of Collage Aesthetic) */}
            <div className="lg:col-span-5 relative mt-12 lg:mt-0 flex justify-center">
              <div className="relative w-full max-w-[440px] h-[420px] select-none">
                
                {/* 1. Tilted blue parallelogram (top right) */}
                <div className="absolute top-2 right-8 w-[210px] h-[270px] rounded-[3rem] bg-[#15803D]/10 rotate-[-12deg] shadow-2xl overflow-hidden z-10 border-4 border-white">
                  {/* Portrait of happy professional with glasses */}
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop" 
                    alt="Young Professional" 
                    className="w-full h-full object-cover scale-110 rotate-[12deg] hover:scale-115 transition-transform duration-500 opacity-90"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* 2. Green circle portrait (center left) */}
                <div className="absolute top-24 left-4 w-[210px] h-[210px] rounded-full bg-[#15803D] shadow-2xl overflow-hidden z-20 border-4 border-white">
                  {/* Portrait of happy woman with glasses & curly hair */}
                  <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop" 
                    alt="Student Intern" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 opacity-95"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* 3. Orange-red/peach circle sphere (bottom right) */}
                <div className="absolute bottom-6 right-2 w-[160px] h-[160px] rounded-full bg-gradient-to-tr from-[#D97706]/10 to-[#FBF7F0] shadow-md z-0 border border-slate-200" />

                {/* 4. Green slanted rounded block (bottom left-ish) */}
                <div className="absolute bottom-4 left-36 w-[130px] h-[80px] rounded-2xl bg-[#15803D]/10 border border-[#15803D]/20 rotate-[-15deg] shadow-xs z-0" />

                {/* Subtle custom Cameroon context floating cards */}
                <div className="absolute bottom-28 right-0 bg-white border border-slate-100 rounded-xl p-3 shadow-xl rotate-[3deg] z-30 flex items-center gap-2 max-w-[170px] hover:rotate-0 transition-transform duration-300">
                  <div className="w-6 h-6 rounded-lg bg-[#15803D]/10 text-[#15803D] flex items-center justify-center shrink-0">
                    <UserCheck className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <h5 className="font-extrabold text-[9px] text-[#0F172A] truncate uppercase tracking-wider">Rapport de stage</h5>
                    <p className="text-[8px] text-[#15803D] font-bold">100% Signé &amp; Validé</p>
                  </div>
                </div>

                <div className="absolute top-10 left-0 bg-white border border-slate-100 rounded-xl p-2.5 shadow-xl rotate-[-4deg] z-30 flex items-center gap-2 max-w-[160px] hover:rotate-0 transition-transform duration-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#15803D] animate-pulse shrink-0" />
                  <span className="text-[8px] font-bold text-slate-600 uppercase tracking-wider">M. Jean-Marc (Senior)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Notre Impact Section overlay matching the reference design */}
          <div className="mt-24 relative z-10 w-full">           
            {/* 4. Large light sage green slanted capsule behind the bottom-right of the card */}
            <div className="absolute -bottom-16 md:-bottom-24 -right-8 md:-right-20 w-[90px] h-[260px] md:w-[140px] md:h-[400px] rounded-[2rem] md:rounded-[3.5rem] bg-[#B0C8B5] rotate-[26deg] pointer-events-none z-0" />

            {/* Main white card */}
            <div className="relative z-10 bg-white border border-slate-100/50 rounded-[2rem] p-8 md:p-16 shadow-[0_25px_60px_-15px_rgba(15,23,42,0.06)]">
              {/* Card Title: Our impact. */}
              <h3 className="font-serif text-[32px] md:text-[40px] font-medium text-center text-[#0B1530] mb-12 tracking-tight">
                {currentLang === 'fr' ? "Notre impact." : "Our impact."}
              </h3>

              {/* Grid of 4 Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-4 divide-y sm:divide-y-0 divide-slate-100/80">
                {/* Stat 1 */}
                <div className="text-center pt-6 sm:pt-0">
                  <span className="block text-[34px] md:text-[42px] font-extrabold text-[#0B1530] tracking-tight">350+</span>
                  <div className="w-10 h-[2px] bg-[#E57B24] mx-auto mt-3 mb-4" />
                  <p className="text-xs sm:text-sm font-medium text-slate-500 leading-relaxed max-w-[180px] mx-auto">
                    {currentLang === 'fr' ? "Stages finalisés" : "Finalized internships"}
                  </p>
                </div>

                {/* Stat 2 */}
                <div className="text-center pt-6 sm:pt-0">
                  <span className="block text-[34px] md:text-[42px] font-extrabold text-[#0B1530] tracking-tight">100+</span>
                  <div className="w-10 h-[2px] bg-[#E57B24] mx-auto mt-3 mb-4" />
                  <p className="text-xs sm:text-sm font-medium text-slate-500 leading-relaxed max-w-[210px] mx-auto">
                    {currentLang === 'fr' ? "Projets d'entreprise réalisés" : "Company projects completed"}
                  </p>
                </div>

                {/* Stat 3 */}
                <div className="text-center pt-6 sm:pt-0">
                  <span className="block text-[34px] md:text-[42px] font-extrabold text-[#0B1530] tracking-tight">100%</span>
                  <div className="w-10 h-[2px] bg-[#E57B24] mx-auto mt-3 mb-4" />
                  <p className="text-xs sm:text-sm font-medium text-slate-500 leading-relaxed max-w-[180px] mx-auto">
                    {currentLang === 'fr' ? "Soutenances validées" : "Successful defenses"}
                  </p>
                </div>

                {/* Stat 4 */}
                <div className="text-center pt-6 sm:pt-0">
                  <span className="block text-[34px] md:text-[42px] font-extrabold text-[#0B1530] tracking-tight">125K+</span>
                  <div className="w-10 h-[2px] bg-[#E57B24] mx-auto mt-3 mb-4" />
                  <p className="text-xs sm:text-sm font-medium text-slate-500 leading-relaxed max-w-[180px] mx-auto">
                    {currentLang === 'fr' ? "Heures d'apprentissage appliqué" : "Hours of applied learning"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bridging Education to Employment Section (Exactly matching reference design) */}
      <section className="py-24 md:py-32 bg-[#FBF7F0] relative overflow-hidden">
        {/* Background Decorative Grid */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header Content */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-[42px] font-serif font-medium text-[#0B1530] tracking-tight leading-tight">
              {currentLang === 'fr' 
                ? "Propulsez vos compétences vers l'emploi." 
                : "Propel your skills into employment."}
            </h2>
            <p className="text-sm sm:text-base text-slate-500 leading-relaxed max-w-2xl mx-auto">
              {currentLang === 'fr'
                ? "HR Skills SARL accueille des profils variés pour des stages pratiques de haut niveau. Nous offrons un encadrement expert pour transformer vos connaissances théoriques en compétences de production."
                : "HR Skills SARL hosts various profiles for high-level practical internships. We provide expert mentorship to transform your theoretical knowledge into production-ready skills."}
            </p>
          </div>

          {/* Tab Selection Row (White Pill exactly like reference) */}
          <div className="max-w-3xl mx-auto mb-16 bg-white border border-slate-100 rounded-2xl sm:rounded-full p-2 shadow-[0_4px_20px_rgba(15,23,42,0.02)] flex flex-col sm:flex-row gap-2 sm:gap-0 items-center justify-between">
            <button
              onClick={() => setActiveBridgeTab('academic')}
              className={`w-full sm:w-auto flex-1 text-center py-3 px-4 text-xs sm:text-sm font-bold transition-all rounded-xl sm:rounded-full relative ${
                activeBridgeTab === 'academic' ? 'text-[#0B1530]' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {currentLang === 'fr' ? 'Étudiants Académiques' : 'Academic Students'}
              {activeBridgeTab === 'academic' && (
                <div className="absolute bottom-1 left-4 right-4 h-[3px] bg-[#15803D] rounded-full hidden sm:block" />
              )}
            </button>
            <button
              onClick={() => setActiveBridgeTab('self_taught')}
              className={`w-full sm:w-auto flex-1 text-center py-3 px-4 text-xs sm:text-sm font-bold transition-all rounded-xl sm:rounded-full relative ${
                activeBridgeTab === 'self_taught' ? 'text-[#0B1530]' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {currentLang === 'fr' ? 'Apprenants Autodidactes' : 'Self-Taught Learners'}
              {activeBridgeTab === 'self_taught' && (
                <div className="absolute bottom-1 left-4 right-4 h-[3px] bg-[#15803D] rounded-full hidden sm:block" />
              )}
            </button>
            <button
              onClick={() => setActiveBridgeTab('career_change')}
              className={`w-full sm:w-auto flex-1 text-center py-3 px-4 text-xs sm:text-sm font-bold transition-all rounded-xl sm:rounded-full relative ${
                activeBridgeTab === 'career_change' ? 'text-[#0B1530]' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {currentLang === 'fr' ? 'Reconversion' : 'Career Changers'}
              {activeBridgeTab === 'career_change' && (
                <div className="absolute bottom-1 left-4 right-4 h-[3px] bg-[#15803D] rounded-full hidden sm:block" />
              )}
            </button>
          </div>

          {/* Tab Content Display Area (Left Image & Left info | Right feature list) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column (Image & Description & Badge icon) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="relative w-full rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_-10px_rgba(15,23,42,0.05)] border border-slate-100/50">
                <img 
                  src={bridgeData[activeBridgeTab].image}
                  alt={bridgeData[activeBridgeTab].tagline}
                  className="w-full h-[280px] sm:h-[340px] object-cover hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating green circle icon on the bottom-left of the image */}
                <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full bg-[#15803D] flex items-center justify-center shadow-lg border-2 border-white">
                  {bridgeData[activeBridgeTab].badgeIcon}
                </div>
              </div>

              <div className="space-y-3 pl-2">
                <h3 className="font-serif text-2xl font-semibold text-[#0B1530] tracking-tight">
                  {bridgeData[activeBridgeTab].tagline}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {bridgeData[activeBridgeTab].description}
                </p>
              </div>
            </div>

            {/* Right Column (Feature List + CTA Buttons) */}
            <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-10">
              <div className="space-y-8">
                {bridgeData[activeBridgeTab].features.map((feat, idx) => (
                  <div key={idx} className="space-y-1.5 group">
                    <h4 className="font-serif text-base sm:text-lg font-bold text-[#0B1530] tracking-tight group-hover:text-[#15803D] transition-colors">
                      {feat.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-2xl">
                      {feat.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Bottom CTAs exactly like reference image */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-6 border-t border-slate-100">
                {/* Get Started pill button */}
                <Link
                  to="/register"
                  className="inline-flex items-center gap-4 bg-white border border-slate-200/60 hover:border-slate-300 px-6 py-3 rounded-full shadow-[0_2px_10px_rgba(15,23,42,0.02)] hover:shadow-md transition-all group shrink-0"
                >
                  <span className="font-bold text-xs sm:text-sm text-[#0B1530] uppercase tracking-wider pl-1">
                    {currentLang === 'fr' ? "S'inscrire" : "Get started"}
                  </span>
                  <div className="w-6 h-6 rounded-full bg-[#E57B24] text-white flex items-center justify-center transition-transform group-hover:translate-x-1 shrink-0">
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </div>
                </Link>

                {/* Learn more link button */}
                <a
                  href="#stages"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-[#15803D] transition-colors group py-2"
                >
                  <span>{currentLang === 'fr' ? "Découvrir les stages" : "Learn more"}</span>
                  <ArrowRight className="w-4 h-4 text-[#15803D] transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Partners/Universities Logo Section (Exactly matching the style of the reference image) */}
      <section className="py-16 bg-white border-y border-slate-100 relative overflow-hidden">
        {/* Decorative Grid Line */}
        <div className="absolute inset-0 opacity-[0.01] pointer-events-none bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:20px_20px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Centered Title exactly matching typography of reference */}
          <h3 className="text-xl sm:text-2xl md:text-[26px] font-serif text-[#0B1530] text-center mb-12 font-medium tracking-tight">
            {currentLang === 'fr' 
              ? "Provenances académiques de nos stagiaires" 
              : "Academic origins of our interns"}
          </h3>

          {/* Scrolling/Flex Row of Logos matching reference style */}
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-10 md:gap-x-16 opacity-85 hover:opacity-100 transition-opacity duration-300">
            {/* ENSPY (Polytech Yaoundé) */}
            <div className="flex items-center gap-2.5 grayscale hover:grayscale-0 transition-all duration-300">
              <svg className="w-8 h-8 text-[#15803D]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              <div className="flex flex-col leading-none">
                <span className="font-sans font-black text-xs tracking-wider text-slate-800">POLYTECH</span>
                <span className="font-mono text-[9px] text-slate-500 tracking-widest">YAOUNDE</span>
              </div>
            </div>

            {/* UCAC */}
            <div className="flex items-center gap-2.5 grayscale hover:grayscale-0 transition-all duration-300">
              <svg className="w-8 h-8 text-[#E57B24]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 12 10 10-4.48 10-12S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.53c-.26-.81-1-1.4-1.9-1.4h-1v-3c0-.55-.45-1-1-1h-6v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
              </svg>
              <div className="flex flex-col leading-none">
                <span className="font-serif font-black text-sm tracking-tight text-slate-800">UCAC</span>
                <span className="font-sans text-[8px] text-slate-400 font-bold uppercase tracking-widest">L'excellence</span>
              </div>
            </div>

            {/* IAI Cameroun */}
            <div className="flex items-center gap-2.5 grayscale hover:grayscale-0 transition-all duration-300">
              <svg className="w-8 h-8 text-[#0B1530]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-12.87V17h2v-7.87l3.197 3.197 1.414-1.414L12 5.172 6.389 10.91l1.414 1.414L11 9.13z" />
              </svg>
              <div className="flex flex-col leading-none">
                <span className="font-sans font-black text-base tracking-tighter text-slate-800">IAI</span>
                <span className="font-sans text-[8px] text-slate-500 font-bold tracking-widest uppercase">Cameroun</span>
              </div>
            </div>

            {/* Université de Yaoundé I */}
            <div className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all duration-300">
              <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center font-serif text-[11px] font-black text-slate-700 border border-slate-200">
                UY1
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-serif font-bold text-xs text-slate-800">Université de</span>
                <span className="font-sans text-[10px] text-slate-500 font-black tracking-wider uppercase">Yaoundé I</span>
              </div>
            </div>

            {/* PKFokam */}
            <div className="flex items-center gap-2.5 grayscale hover:grayscale-0 transition-all duration-300">
              <svg className="w-8 h-8 text-[#15803D]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L1 21h22L12 2zm0 4l6.5 11h-13L12 6z" />
              </svg>
              <div className="flex flex-col leading-none">
                <span className="font-serif font-black text-xs text-slate-800">PKFokam</span>
                <span className="font-sans text-[8px] text-slate-400 font-bold tracking-widest uppercase">Institute</span>
              </div>
            </div>

            {/* Université de Douala */}
            <div className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all duration-300">
              <div className="w-8 h-8 rounded-full bg-[#E57B24]/10 flex items-center justify-center font-sans text-[11px] font-black text-[#E57B24]">
                UD
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-serif font-bold text-xs text-slate-800">Université de</span>
                <span className="font-sans text-[10px] text-slate-500 font-black tracking-wider uppercase">Douala</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Specialties/Filières Catalog Section (Matching the Experiential Learning Resources Layout) */}
      <section id="stages" className="py-24 bg-[#FBF7F0] border-t border-slate-200 relative overflow-hidden">
        {/* Two-tone background split: top is beige, bottom is deep navy */}
        <div className="absolute bottom-0 left-0 right-0 h-[280px] sm:h-[350px] lg:h-[440px] bg-[#0C1630] z-0" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-[40px] font-serif font-medium text-[#0B1530] tracking-tight leading-tight">
              {currentLang === 'fr' 
                ? "Découvrez nos filières en Informatique" 
                : "Discover our IT specialties"}
            </h2>
            <p className="text-sm sm:text-base text-slate-500 leading-relaxed max-w-2xl mx-auto">
              {currentLang === 'fr'
                ? "Des spécialités de stage adaptées aux exigences réelles du marché de l’emploi informatique."
                : "Practical internship specialties tailored to the requirements of the modern IT job market."}
            </p>
            <div className="text-[#15803D] text-xs font-black uppercase tracking-widest mt-2">
              {t('stages.duration')}
            </div>
          </div>
 
          {/* Specialties Grid overlapping the background split */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filieres.map((filiere) => (
              <div 
                key={filiere.id}
                className="group bg-white rounded-[2rem] border border-slate-100 shadow-[0_15px_35px_-5px_rgba(15,23,42,0.06)] hover:shadow-[0_25px_50px_-12px_rgba(15,23,42,0.12)] hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col h-full"
              >
                {/* Visual Header Banner matching reference image design rules */}
                {renderFiliereBanner(filiere.code)}

                {/* Details / Content area of card */}
                <div className="p-8 flex flex-col justify-between flex-grow bg-white">
                  <div>
                    {/* Tiny metadata tag line mimicking 'Date | read time' style */}
                    <div className="text-[11px] font-bold text-slate-400 tracking-wider uppercase mb-3">
                      {currentLang === 'fr' ? 'Niveau requis' : 'Required level'} : {filiere.code === 'WEB' || filiere.code === 'MOBILE' || filiere.code === 'DEVOPS' ? 'BAC+2 / Licence' : 'BAC+2 / BTS / Master'}
                    </div>

                    {/* Title in elegant serif font matching image style */}
                    <h3 className="font-serif text-lg sm:text-xl font-semibold text-[#0B1530] tracking-tight leading-snug group-hover:text-[#15803D] transition-colors mb-4">
                      {currentLang === 'fr' ? filiere.nameFr : filiere.nameEn}
                    </h3>

                    {/* Short description */}
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-6">
                      {currentLang === 'fr' ? filiere.descriptionFr : filiere.descriptionEn}
                    </p>
                  </div>

                  {/* Read More button style at the bottom of card */}
                  <div className="pt-4 border-t border-slate-100 mt-auto">
                    <Link
                      to={`/register?filiere=${filiere.id}`}
                      className="inline-flex items-center text-xs sm:text-sm font-bold text-slate-700 hover:text-[#15803D] transition-colors group/btn"
                    >
                      <span className="relative">
                        {currentLang === 'fr' ? 'S’inscrire à cette filière' : 'Apply for this specialty'}
                        <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#15803D] transition-all group-hover/btn:w-full" />
                      </span>
                      <ArrowRight className="w-4 h-4 text-[#15803D] transition-transform group-hover/btn:translate-x-1.5 ml-2 shrink-0" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process / Comment ça marche Section */}
      <section id="process" className="py-24 bg-[#FBF7F0] border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] uppercase tracking-tighter">
              {t('process.title')}
            </h2>
            <p className="text-base text-slate-600">
              {t('process.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 hover:border-[#15803D]/50 transition-all duration-300 relative space-y-4 shadow-sm">
              <span className="text-xs font-black text-[#15803D] uppercase tracking-wider">
                {currentLang === 'fr' ? 'Étape 1' : 'Step 1'}
              </span>
              <h3 className="font-black text-base text-[#0F172A] uppercase tracking-tight pt-1">
                {currentLang === 'fr' ? 'Choix de la filière' : 'Choose Field'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t('process.step1Desc')}
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 hover:border-[#15803D]/50 transition-all duration-300 relative space-y-4 shadow-sm">
              <span className="text-xs font-black text-[#15803D] uppercase tracking-wider">
                {currentLang === 'fr' ? 'Étape 2' : 'Step 2'}
              </span>
              <h3 className="font-black text-base text-[#0F172A] uppercase tracking-tight pt-1">
                {currentLang === 'fr' ? 'Formulaire & Dossier' : 'Register & Upload'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t('process.step2Desc')}
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 hover:border-[#15803D]/50 transition-all duration-300 relative space-y-4 shadow-sm">
              <span className="text-xs font-black text-[#15803D] uppercase tracking-wider">
                {currentLang === 'fr' ? 'Étape 3' : 'Step 3'}
              </span>
              <h3 className="font-black text-base text-[#0F172A] uppercase tracking-tight pt-1">
                {currentLang === 'fr' ? 'Inscription Directe' : 'Pay Registration'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t('process.step3Desc')}
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 hover:border-[#D97706] transition-all duration-300 relative space-y-4 shadow-sm">
              <span className="text-xs font-black text-[#D97706] uppercase tracking-wider">
                {currentLang === 'fr' ? 'Étape 4' : 'Step 4'}
              </span>
              <h3 className="font-black text-base text-[#D97706] uppercase tracking-tight pt-1">
                {currentLang === 'fr' ? 'Début Immédiat' : 'Start Internship'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t('process.step4Desc')}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Fees / Tarifs Section */}
      <section id="fees" className="py-24 bg-[#FBF7F0] border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] uppercase tracking-tighter">
              {t('fees.title')}
            </h2>
            <p className="text-base text-slate-600">
              {t('fees.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            
            {/* Box 1: Registration (Mandatory, Blocking) */}
            <div className="bg-white border-2 border-dashed border-slate-200 hover:border-[#D97706]/30 rounded-2xl p-6 flex flex-col justify-between relative transition-all duration-300 shadow-sm">
              <div className="space-y-4">
                <span className="text-xs text-[#D97706] font-black tracking-widest uppercase inline-block">
                  {currentLang === 'fr' ? 'ÉTAPE INDISPENSABLE' : 'REQUIRED FIRST'}
                </span>
                <h3 className="font-black text-lg text-[#0F172A] uppercase tracking-tight">{t('fees.registrationTitle')}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{t('fees.registrationNote')}</p>
              </div>
              <div className="pt-8 space-y-4">
                <span className="block text-3xl font-black text-[#D97706]">{config.registrationFee} XAF</span>
                <span className="text-xs text-slate-500 font-semibold block">{currentLang === 'fr' ? 'Frais fixes uniques' : 'One-time static fee'}</span>
              </div>
            </div>

            {/* Box 2: Tuition Level 1 */}
            <div className="bg-white border border-slate-200 hover:border-[#15803D] rounded-2xl p-6 flex flex-col justify-between relative shadow-sm transition-all duration-300 group">
              <div className="space-y-4">
                <span className="text-xs text-[#15803D] font-black tracking-widest uppercase inline-block">
                  {currentLang === 'fr' ? 'NIVEAU 1' : 'LEVEL 1'}
                </span>
                <h3 className="font-black text-lg text-[#0F172A] uppercase tracking-tight">{t('fees.level1Title')}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{t('fees.level1Note')}</p>
                <div className="pt-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Check className="w-4 h-4 text-[#15803D]" />
                    <span>{currentLang === 'fr' ? 'Tranche 1 (50%) : 15 000 XAF' : 'Installment 1 (50%): 15,000 XAF'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Check className="w-4 h-4 text-[#15803D]" />
                    <span>{currentLang === 'fr' ? 'Tranche 2 (50%) : 15 000 XAF' : 'Installment 2 (50%): 15,000 XAF'}</span>
                  </div>
                </div>
              </div>
              <div className="pt-8 space-y-4">
                <span className="block text-3xl font-black text-[#0F172A]">{config.tuitionFeeLevel1} XAF</span>
                <Link
                  to="/register"
                  className="w-full text-center py-2.5 rounded-xl border border-[#15803D] text-[#15803D] hover:bg-[#15803D] hover:text-white font-extrabold text-xs uppercase tracking-wider transition-all block"
                >
                  {t('hero.ctaRegister')}
                </Link>
              </div>
            </div>

            {/* Box 3: Tuition Level 2+ */}
            <div className="bg-white border-2 border-[#15803D] rounded-2xl p-6 flex flex-col justify-between relative shadow-md">
              <div className="space-y-4">
                <span className="text-xs text-[#15803D] font-black tracking-widest uppercase inline-block">
                  {currentLang === 'fr' ? 'NIVEAU 2+' : 'LEVEL 2+'}
                </span>
                <h3 className="font-black text-lg text-[#0F172A] uppercase tracking-tight">{t('fees.level2Title')}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{t('fees.level2Note')}</p>
                <div className="pt-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Check className="w-4 h-4 text-[#15803D]" />
                    <span>{currentLang === 'fr' ? 'Tranche 1 (50%) : 20 000 XAF' : 'Installment 1 (50%): 20,000 XAF'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Check className="w-4 h-4 text-[#15803D]" />
                    <span>{currentLang === 'fr' ? 'Tranche 2 (50%) : 20 000 XAF' : 'Installment 2 (50%): 20,000 XAF'}</span>
                  </div>
                </div>
              </div>
              <div className="pt-8 space-y-4">
                <span className="block text-3xl font-black text-[#15803D]">{config.tuitionFeeLevel2} XAF</span>
                <Link
                  to="/register"
                  className="w-full text-center py-2.5 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white font-black text-xs uppercase tracking-wider transition-colors block shadow-md"
                >
                  {t('hero.ctaRegister')}
                </Link>
              </div>
            </div>

          </div>

          <div className="mt-12 p-6 bg-white border border-slate-200 rounded-2xl text-center max-w-3xl mx-auto shadow-sm">
            <h4 className="font-black text-xs tracking-wider uppercase text-slate-700 mb-2">{t('fees.installmentsTitle')}</h4>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              {t('fees.installmentsDesc')} {currentLang === 'fr' 
                ? "Un retard de paiement sur une tranche fait passer temporairement votre statut d'accès à 'Suspendu'." 
                : "An overdue payment installment changes your access status to 'Suspended' until settled."}
            </p>
          </div>

        </div>
      </section>

      {/* Auto-Newsletter Subscription section */}
      <section className="py-16 bg-[#0C1630] text-white border-t border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-white/5 blur-xl" />
        <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full bg-[#D97706]/10 blur-xl" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter text-white">
            {t('newsletter.title')}
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            {t('newsletter.subtitle')}
          </p>

          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder={t('newsletter.placeholder')}
              className="flex-1 bg-white/5 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-hidden focus:border-[#D97706] placeholder-slate-500"
            />
            <button
              type="submit"
              className="bg-[#D97706] hover:bg-[#b25e04] text-white font-black text-xs px-6 py-3.5 rounded-xl shrink-0 transition-all cursor-pointer shadow-md"
            >
              {t('newsletter.subscribe')}
            </button>
          </form>

          {newsletterSuccess && (
            <div className="max-w-xs mx-auto p-2.5 rounded-xl bg-[#15803D]/15 border border-[#15803D]/25 text-[#15803D] text-xs font-semibold">
              {t('newsletter.success')}
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-[#FBF7F0] border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            {/* Contact Information Cards */}
            <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs text-[#15803D] font-black tracking-widest uppercase inline-block">
                  {currentLang === 'fr' ? 'NOS COORDONNÉES' : 'GET IN TOUCH'}
                </span>
                <h2 className="text-3xl font-black text-[#0F172A] uppercase tracking-tighter">{t('contact.title')}</h2>
                <p className="text-sm text-slate-600 leading-relaxed">{t('contact.subtitle')}</p>
              </div>

              <div className="space-y-4">
                {/* Card Localisation */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-4 shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-[#FBF7F0] border border-slate-100 flex items-center justify-center text-[#15803D]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-[#0F172A]">{currentLang === 'fr' ? 'Adresse Yaoundé' : 'Yaounde Address'}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{t('contact.address')}</p>
                  </div>
                </div>

                {/* Card WhatsApp */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-4 shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-[#FBF7F0] border border-slate-100 flex items-center justify-center text-[#15803D]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-[#0F172A]">WhatsApp direct</h4>
                    <a href="https://wa.me/237686002112" target="_blank" rel="noopener noreferrer" className="text-xs text-[#15803D] hover:underline block mt-0.5 font-semibold">
                      +237 686 002 112
                    </a>
                  </div>
                </div>

                {/* Card Email */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-4 shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-[#FBF7F0] border border-slate-100 flex items-center justify-center text-[#15803D]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-[#0F172A]">Email de contact</h4>
                    <a href="mailto:contact@hrskills.com" className="text-xs text-[#15803D] hover:underline block mt-0.5 font-semibold">
                      contact@hrskills.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form Box */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    {t('contact.formName')}
                  </label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-[#0F172A] focus:outline-hidden focus:border-[#15803D] focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    {t('contact.formEmail')}
                  </label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-[#0F172A] focus:outline-hidden focus:border-[#15803D] focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    {t('contact.formMessage')}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={contactMsg}
                    onChange={(e) => setContactMsg(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-[#0F172A] focus:outline-hidden focus:border-[#15803D] focus:bg-white transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#15803D] hover:bg-[#166534] text-white font-black text-xs py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  {t('contact.formSubmit')}
                  <Send className="w-4 h-4 text-white" />
                </button>

                {contactSuccess && (
                  <div className="p-3 bg-[#15803D]/10 border border-[#15803D]/20 text-[#15803D] rounded-xl text-xs font-semibold">
                    {t('contact.successMsg')}
                  </div>
                )}
              </form>
            </div>
          </div>

        </div>
      </section>

      {/* Map Location Section */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <h2 className="text-3xl font-black text-[#0F172A] uppercase tracking-tighter">
              {currentLang === 'fr' ? 'Nous situer sur la carte' : 'Locate us on the map'}
            </h2>
            <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
              {currentLang === 'fr'
                ? "Retrouvez-nous facilement à Yaoundé. Nos locaux sont situés au niveau du Carrefour Tropicana, quartier Odza."
                : "Find us easily in Yaounde. Our offices are located at the Tropicana Junction in the Odza district."}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-[#FBF7F0] p-6 rounded-3xl border border-slate-200 shadow-sm">
            {/* Directions Sidebar */}
            <div className="lg:col-span-4 space-y-6 flex flex-col justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#15803D] flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-[#0F172A] uppercase tracking-wide">
                      Carrefour Tropicana
                    </h3>
                    <p className="text-[11px] text-[#15803D] font-bold">Odza, Yaoundé — Cameroun</p>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4 space-y-3.5">
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                      {currentLang === 'fr' ? 'Repères d’accès' : 'Access landmarks'}
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {currentLang === 'fr'
                        ? "Situé sur l’axe principal reliant le centre-ville à l’Aéroport de Nsimalen. Accès rapide en taxi ou véhicule personnel."
                        : "Located on the main axis connecting city center to Nsimalen Airport. Easy access by cab or private vehicle."}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                      {currentLang === 'fr' ? 'Horaires d’ouverture' : 'Opening Hours'}
                    </span>
                    <p className="text-xs text-slate-600 leading-normal">
                      <strong>{currentLang === 'fr' ? 'Lun - Ven' : 'Mon - Fri'} :</strong> 08:00 - 17:00
                    </p>
                    <p className="text-xs text-slate-600 leading-normal">
                      <strong>{currentLang === 'fr' ? 'Samedi' : 'Saturday'} :</strong> 09:00 - 13:00
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2">
                <a
                  href="https://maps.google.com/maps?q=Carrefour%20Tropicana,%20Odza,%20Yaounde,%20Cameroon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-2.5 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white font-black text-xs uppercase tracking-wider transition-all block cursor-pointer shadow-md"
                >
                  {currentLang === 'fr' ? 'Ouvrir dans Google Maps' : 'Open in Google Maps'}
                </a>
              </div>
            </div>

            {/* Google Map Embed Iframe */}
            <div className="lg:col-span-8 min-h-[350px] lg:min-h-[450px] relative rounded-2xl overflow-hidden border border-slate-200 shadow-inner bg-slate-100">
              <iframe
                title="HR Skills Location - Tropicana Yaounde"
                src="https://maps.google.com/maps?q=Carrefour%20Tropicana,%20Odza,%20Yaounde,%20Cameroon&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '350px', height: '100%' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
