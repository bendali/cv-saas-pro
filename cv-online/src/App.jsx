import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Download,
  Mail,
  Phone,
  Link,
  MapPin,
  Briefcase,
  Code,
  ArrowUpRight,
  Send
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* ─── DONNÉES ─── */
const profile = {
  name: 'Bendali Abdellah',
  title: 'Développeur Full Stack',
  initials: 'BA',
  about:
    'Ingénieur principal en informatique, j\'ai créé des applications de gestion des investissements publics pour l\'entreprise où je travaille. Je développe les applications web, mobile et de bureau avec une approche rigoureuse et orientée résultats. Je fais l\'analyse des données avec Excel et les statistiques. Passionné par le sport et la performance, j\'applique la même discipline dans chaque ligne de code.',
  stats: [
    { label: '5+ ans d\'expérience', icon: Briefcase },
    { label: '20+ projets', icon: Code },
    { label: 'Alger', icon: MapPin },
  ],
  experiences: [
    {
      period: '2022 — Présent',
      role: 'Ingénieur Principal en Informatique',
      company: 'Entreprise Publique — Gestion des Investissements',
      description:
        'Conception et développement full stack d\'applications critiques de gestion des investissements publics. Architecture de solutions robustes pour le suivi, le reporting et la validation des projets d\'investissement à grande échelle.',
    },
    {
      period: '2019 — 2022',
      role: 'Développeur Full Stack',
      company: 'Freelance & Consulting',
      description:
        'Développement d\'applications web, mobiles et de bureau pour divers clients. Stack moderne avec React, Node.js et bases de données SQL. Livraison de solutions sur mesure avec un fort accent sur l\'expérience utilisateur.',
    },
    {
      period: '2018 — 2019',
      role: 'Analyste de Données',
      company: 'Projets Internes & Recherche',
      description:
        'Analyse statistique avancée et reporting avec Excel et outils de data visualization. Création de tableaux de bord interactifs et modèles prédictifs pour optimiser la prise de décision.',
    },
  ],
  skills: [
    { name: 'Développement Web', level: 95 },
    { name: 'Développement Mobile', level: 85 },
    { name: 'Développement Desktop', level: 80 },
    { name: 'Analyse de Données Excel', level: 90 },
    { name: 'Statistiques', level: 85 },
  ],
  education: [
    {
      year: '2018',
      degree: 'Diplôme d\'Ingénieur en Informatique',
      school: 'École Nationale Supérieure d\'Informatique',
    },
    {
      year: '2020',
      degree: 'Master en Statistiques et Analyse de Données',
      school: 'Université d\'Alger',
    },
  ],
  contact: {
    email: 'abdellah.bendali@email.com',
    phone: '+213 555 123 456',
    linkedin: 'linkedin.com/in/bendali-abdellah',
    github: 'github.com/bendali-abdellah',
  },
}

/* ─── COMPOSANT CIRCULAIRE SKILL ─── */
function SkillCard({ skill, index }) {
  const cardRef = useRef(null)
  const circleRef = useRef(null)
  const numRef = useRef(null)
  const radius = 52
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (skill.level / 100) * circumference

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          delay: index * 0.15,
        }
      )

      gsap.fromTo(
        circleRef.current,
        { strokeDashoffset: circumference },
        {
          strokeDashoffset: offset,
          duration: 1.5,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          delay: index * 0.15 + 0.3,
        }
      )

      const counter = { val: 0 }
      gsap.to(counter, {
        val: skill.level,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        delay: index * 0.15 + 0.3,
        onUpdate: () => {
          if (numRef.current) {
            numRef.current.textContent = Math.round(counter.val) + '%'
          }
        },
      })
    })
    return () => ctx.revert()
  }, [index, offset, circumference, skill.level])

  return (
    <div
      ref={cardRef}
      className="card-hover relative flex flex-col items-center rounded-[2rem] bg-graphite/60 p-8 backdrop-blur-sm border border-white/5"
    >
      <div className="relative mb-4">
        <svg width="120" height="120" className="-rotate-90">
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="rgba(123,97,255,0.15)"
            strokeWidth="6"
            fill="none"
          />
          <circle
            ref={circleRef}
            cx="60"
            cy="60"
            r={radius}
            stroke="#7B61FF"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            style={{ filter: 'drop-shadow(0 0 6px rgba(123,97,255,0.5))' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            ref={numRef}
            className="font-mono text-xl font-semibold text-violet"
          >
            0%
          </span>
        </div>
      </div>
      <h4 className="text-center text-sm font-medium tracking-wide text-fantome/90">
        {skill.name}
      </h4>
    </div>
  )
}

/* ─── COMPOSANT PRINCIPAL ─── */
function App() {
  const [navScrolled, setNavScrolled] = useState(false)

  const heroRef = useRef(null)
  const aboutRef = useRef(null)
  const experienceRef = useRef(null)
  const skillsRef = useRef(null)
  const educationRef = useRef(null)
  const contactRef = useRef(null)
  const footerRef = useRef(null)

  const heroPhotoRef = useRef(null)
  const heroNameRef = useRef(null)
  const heroTitleRef = useRef(null)
  const heroStatsRef = useRef(null)
  const heroCtasRef = useRef(null)

  const aboutTitleRef = useRef(null)
  const aboutTextRef = useRef(null)
  const aboutLineRef = useRef(null)

  const expCardsRef = useRef([])
  const expDotsRef = useRef([])

  const eduCardsRef = useRef([])

  const contactIconsRef = useRef([])

  /* Morphing navbar */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setNavScrolled(!entry.isIntersecting)
      },
      { threshold: 0.1 }
    )
    if (heroRef.current) observer.observe(heroRef.current)
    return () => observer.disconnect()
  }, [])

  /* GSAP animations */
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Hero stagger */
      gsap.fromTo(
        heroPhotoRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 }
      )
      gsap.fromTo(
        heroNameRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.32 }
      )
      gsap.fromTo(
        heroTitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.44 }
      )
      gsap.fromTo(
        heroStatsRef.current?.children || [],
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.12,
          delay: 0.56,
        }
      )
      gsap.fromTo(
        heroCtasRef.current?.children || [],
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.12,
          delay: 0.8,
        }
      )

      /* About */
      gsap.fromTo(
        aboutTitleRef.current,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: aboutRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      )
      gsap.fromTo(
        aboutLineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: aboutRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      )
      gsap.fromTo(
        aboutTextRef.current,
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: aboutRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
          delay: 0.2,
        }
      )

      /* Experience cards */
      expCardsRef.current.forEach((card, i) => {
        if (!card) return
        const fromX = i % 2 === 0 ? -60 : 60
        gsap.fromTo(
          card,
          { opacity: 0, x: fromX },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )
      })

      /* Experience dots pulse */
      expDotsRef.current.forEach((dot, i) => {
        if (!dot) return
        gsap.fromTo(
          dot,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: dot,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
            delay: 0.2,
          }
        )
      })

      /* Education cards */
      eduCardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            delay: i * 0.15,
          }
        )
      })

      /* Contact icons */
      gsap.fromTo(
        contactIconsRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: contactRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      )

      /* Footer */
      gsap.fromTo(
        footerRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      )
    })

    return () => ctx.revert()
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="relative min-h-screen bg-vide text-fantome">
      {/* Noise Overlay SVG */}
      <div className="noise-overlay">
        <svg>
          <filter id="noiseFilter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      {/* ═══ NAVBAR ═══ */}
      <nav
        className={`fixed top-6 left-1/2 z-50 -translate-x-1/2 flex items-center gap-1 px-2 py-2 rounded-full transition-all duration-500 ${
          navScrolled
            ? 'bg-vide/60 backdrop-blur-xl border border-violet/20 shadow-lg shadow-violet/5'
            : 'bg-transparent'
        }`}
      >
        <button
          onClick={() => scrollTo('hero')}
          className={`px-4 py-2 text-sm font-medium tracking-wide rounded-full transition-colors duration-300 ${
            navScrolled ? 'text-violet' : 'text-fantome/80 hover:text-fantome'
          }`}
        >
          Opportunités
        </button>
        <div className="w-px h-4 bg-white/10 mx-1" />
        {[
          { label: 'À propos', id: 'about' },
          { label: 'Expérience', id: 'experience' },
          { label: 'Compétences', id: 'skills' },
          { label: 'Contact', id: 'contact' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className={`px-3 py-2 text-xs font-medium tracking-wide rounded-full lift-hover transition-colors duration-300 ${
              navScrolled
                ? 'text-fantome/70 hover:text-violet'
                : 'text-fantome/60 hover:text-fantome'
            }`}
          >
            {item.label}
          </button>
        ))}
        <div className="w-px h-4 bg-white/10 mx-1" />
        <a
          href="/cv-placeholder.pdf"
          download
          className="magnetic-btn flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wide rounded-full bg-violet text-white hover:bg-violet/90 transition-colors duration-300"
        >
          <Download size={14} />
          Télécharger CV
        </a>
      </nav>

      {/* ═══ HERO ═══ */}
      <section
        id="hero"
        ref={heroRef}
        className="relative flex items-center justify-center min-h-[100dvh] overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1920&q=80"
            alt=""
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-vide/80 via-vide/60 to-vide" />
          <div className="absolute inset-0 bg-gradient-to-r from-violet/10 to-transparent" />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto">
          {/* Photo placeholder */}
          <div
            ref={heroPhotoRef}
            className="w-[140px] h-[140px] rounded-full border-2 border-golden/50 flex items-center justify-center mb-8 bg-graphite/80 backdrop-blur-sm"
            style={{ boxShadow: '0 0 40px rgba(212,175,55,0.2)' }}
          >
            <span className="font-sora text-sm font-semibold text-golden text-center leading-tight px-2">
              Disponible<br />pour des<br />nouvelles<br />opportunités
            </span>
          </div>

          {/* Name */}
          <h1
            ref={heroNameRef}
            className="font-sora text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-fantome glow-accent mb-4"
          >
            {profile.name}
          </h1>

          {/* Title */}
          <p
            ref={heroTitleRef}
            className="font-serif italic text-2xl md:text-3xl lg:text-4xl text-violet/90 mb-10"
          >
            {profile.title}
          </p>

          {/* Stats */}
          <div
            ref={heroStatsRef}
            className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mb-10"
          >
            {profile.stats.map((stat, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-fantome/60 font-mono text-sm"
              >
                <stat.icon size={16} className="text-violet" />
                <span>{stat.label}</span>
                {i < profile.stats.length - 1 && (
                  <span className="hidden md:inline text-white/20 ml-4">|</span>
                )}
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div ref={heroCtasRef} className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="/cv-placeholder.pdf"
              download
              className="magnetic-btn flex items-center gap-2 px-8 py-3 rounded-full bg-violet text-white font-semibold text-sm tracking-wide hover:bg-violet/90 transition-colors duration-300"
            >
              <Download size={18} />
              Télécharger CV
            </a>
            <button
              onClick={() => scrollTo('contact')}
              className="magnetic-btn flex items-center gap-2 px-8 py-3 rounded-full border border-fantome/20 text-fantome font-semibold text-sm tracking-wide hover:border-violet/50 hover:text-violet transition-colors duration-300"
            >
              <Send size={18} />
              Me contacter
            </button>
          </div>
        </div>
      </section>

      {/* ═══ À PROPOS ═══ */}
      <section
        id="about"
        ref={aboutRef}
        className="relative py-24 md:py-32 bg-fantome"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start">
            {/* Left column */}
            <div className="md:w-1/3 flex-shrink-0">
              <h2
                ref={aboutTitleRef}
                className="font-serif italic text-4xl md:text-5xl text-vide leading-tight"
              >
                À propos
              </h2>
            </div>

            {/* Vertical line */}
            <div
              ref={aboutLineRef}
              className="hidden md:block w-[2px] bg-violet origin-top"
              style={{ minHeight: '120px' }}
            />

            {/* Right column */}
            <div className="md:w-2/3">
              <p
                ref={aboutTextRef}
                className="text-vide/80 text-lg md:text-xl leading-relaxed font-sora font-light"
              >
                {profile.about}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ EXPÉRIENCE ═══ */}
      <section
        id="experience"
        ref={experienceRef}
        className="relative py-24 md:py-32 bg-vide"
      >
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-serif italic text-4xl md:text-5xl text-fantome text-center mb-16">
            Expérience
          </h2>

          <div className="relative">
            {/* Timeline line — desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-violet/30 -translate-x-1/2" />

            {/* Timeline line — mobile */}
            <div className="md:hidden absolute left-6 top-0 bottom-0 w-px bg-violet/30" />

            <div className="space-y-12 md:space-y-16">
              {profile.experiences.map((exp, i) => (
                <div
                  key={i}
                  className={`relative flex flex-col md:flex-row items-start md:items-center ${
                    i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Card */}
                  <div
                    ref={(el) => (expCardsRef.current[i] = el)}
                    className={`card-hover w-full md:w-[calc(50%-2rem)] rounded-[2rem] bg-graphite/60 p-6 md:p-8 border border-white/5 ${
                      i % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'
                    }`}
                  >
                    <span className="inline-block font-mono text-xs text-violet mb-3 px-3 py-1 rounded-full bg-violet/10">
                      {exp.period}
                    </span>
                    <h3 className="font-sora text-lg md:text-xl font-semibold text-fantome mb-1">
                      {exp.role}
                    </h3>
                    <p className="font-sora text-sm text-fantome/50 mb-4">
                      {exp.company}
                    </p>
                    <p className="font-sora text-sm text-fantome/70 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>

                  {/* Dot */}
                  <div
                    ref={(el) => (expDotsRef.current[i] = el)}
                    className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-violet items-center justify-center"
                    style={{ boxShadow: '0 0 12px rgba(123,97,255,0.5)' }}
                  >
                    <div className="w-2 h-2 rounded-full bg-fantome pulse-dot" />
                  </div>

                  {/* Mobile dot */}
                  <div
                    className="md:hidden absolute left-6 -translate-x-1/2 w-3 h-3 rounded-full bg-violet"
                    style={{ boxShadow: '0 0 8px rgba(123,97,255,0.5)' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ COMPÉTENCES ═══ */}
      <section
        id="skills"
        ref={skillsRef}
        className="relative py-24 md:py-32 bg-graphite/30"
      >
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-serif italic text-4xl md:text-5xl text-fantome text-center mb-6">
            Compétences
          </h2>
          <p className="text-center text-fantome/50 font-mono text-sm mb-16">
            Grille de Maîtrise — 5 domaines clés
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {profile.skills.map((skill, i) => (
              <SkillCard key={skill.name} skill={skill} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FORMATION ═══ */}
      <section
        id="education"
        ref={educationRef}
        className="relative py-24 md:py-32 bg-vide"
      >
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif italic text-4xl md:text-5xl text-fantome text-center mb-16">
            Formation
          </h2>

          <div className="space-y-6">
            {profile.education.map((edu, i) => (
              <div
                key={i}
                ref={(el) => (eduCardsRef.current[i] = el)}
                className="card-hover flex flex-col md:flex-row md:items-center gap-4 md:gap-8 rounded-[2rem] bg-graphite/60 p-6 md:p-8 border border-white/5"
              >
                <span className="inline-block font-mono text-sm text-violet px-4 py-2 rounded-full bg-violet/10 whitespace-nowrap">
                  {edu.year}
                </span>
                <div>
                  <h3 className="font-sora text-lg font-semibold text-fantome">
                    {edu.degree}
                  </h3>
                  <p className="font-sora text-sm text-fantome/50">
                    {edu.school}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section
        id="contact"
        ref={contactRef}
        className="relative py-24 md:py-32 bg-violet/10"
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif italic text-4xl md:text-6xl text-fantome mb-6">
            Travaillons ensemble
          </h2>
          <p className="font-sora text-fantome/60 text-lg mb-12 max-w-2xl mx-auto">
            Vous avez un projet en tête ? Discutons de la meilleure façon de le réaliser.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-12">
            {[
              {
                icon: Mail,
                label: 'Email',
                value: profile.contact.email,
                href: `mailto:${profile.contact.email}`,
              },
              {
                icon: Phone,
                label: 'Téléphone',
                value: profile.contact.phone,
                href: `tel:${profile.contact.phone}`,
              },
              {
                icon: Link,
                label: 'LinkedIn',
                value: 'Bendali Abdellah',
                href: `https://${profile.contact.linkedin}`,
              },
              {
                icon: Code,
                label: 'GitHub',
                value: 'bendali-abdellah',
                href: `https://${profile.contact.github}`,
              },
            ].map((item, i) => (
              <a
                key={item.label}
                ref={(el) => (contactIconsRef.current[i] = el)}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="lift-hover underline-anim flex items-center gap-4 rounded-[2rem] bg-graphite/60 p-5 border border-white/5 text-left group"
              >
                <div className="w-12 h-12 rounded-full bg-violet/10 flex items-center justify-center flex-shrink-0 group-hover:bg-violet/20 transition-colors duration-300">
                  <item.icon size={20} className="text-violet" />
                </div>
                <div>
                  <p className="font-mono text-xs text-fantome/40 mb-0.5">
                    {item.label}
                  </p>
                  <p className="font-sora text-sm text-fantome font-medium">
                    {item.value}
                  </p>
                </div>
                <ArrowUpRight
                  size={16}
                  className="ml-auto text-fantome/20 group-hover:text-violet transition-colors duration-300"
                />
              </a>
            ))}
          </div>

          <a
            href="/cv-placeholder.pdf"
            download
            className="magnetic-btn inline-flex items-center gap-3 px-10 py-4 rounded-full bg-violet text-white font-semibold text-base tracking-wide hover:bg-violet/90 transition-colors duration-300"
          >
            <Download size={20} />
            Télécharger mon CV
          </a>
        </div>
      </section>

      {/* ═══ PIED DE PAGE ═══ */}
      <footer
        ref={footerRef}
        className="relative bg-vide py-16 rounded-t-[4rem] border-t border-white/5"
      >
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="font-sora text-lg font-semibold text-fantome">
              {profile.name}
            </p>
            <p className="font-mono text-xs text-fantome/40">
              Fait avec le vibe coding — {new Date().getFullYear()}
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-graphite/60 border border-white/5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot" />
            <span className="font-mono text-xs text-fantome/60">
              En ligne
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
