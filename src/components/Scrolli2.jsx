'use client';

import Link from 'next/link';

export default function Scrolli2() {
    const sections = [
        {
            id: 1,
            number: "01",
            title: "Chant Prénatal",
            subtitle: "Découvrez les bienfaits du chant pendant la grossesse",
            description: "Le chant prénatal est une application particulière de la psychophonie. Pendant l'embrassade, le corps de la femme change, et sa voix aussi. Cantar permet à la femme de sentir son corps de manière plus ludique. Les exercices physiques se sonorisent : avec les vocalisations, on travaille la respiration, le tonus muscular, la dynamique des points d'appui.",
            highlights: [
                "Bien-être pendant toute la grossesse",
                "Communication avec le bébé in utero",
                "Accompagnement pour l'accouchement",
                "Période post-natale"
            ],
            link: "/chant-prenatal/canto-prenatal",
            color: "#F25A38",
            links: [
                { label: 'Prenatal Singing', href: '/chant-prenatal/prenatal-singing' },
                { label: 'Canto Prenatal', href: '/chant-prenatal/canto-prenatal' },
                { label: 'Canto Pré-natal em portugais', href: '/chant-prenatal/canto-pre-natal-portugais' },
                { label: 'Les formateurs', href: '/chant-prenatal/les-formateurs' },
            ]
        },
        {
            id: 2,
            number: "02",
            title: "Ateliers de Chant",
            subtitle: "Le corps est un instrument de musique",
            description: "Notre corps est à la fois émetteur et récepteur. Par sa fréquence, chaque son correspond à un lieu du corps et crée à cet endroit un micro-massage. C'est l'approche proposée par la psychophonie. Chanter agit aux niveaux physique et psychique, procure bien-être, joie et plaisir.",
            highlights: [
                "Chant collectif pour tous",
                "Chant maman-bébé",
                "Cours particuliers",
                "Ateliers de chant prénatal"
            ],
            link: "/ateliers-de-chant/chant-collectif",
            color: "#F29057",
            links: [
                { label: 'Chant prénatal – ateliers', href: '/ateliers-de-chant/chant-prenatal-ateliers' },
                { label: 'Chant maman bébé – adulte enfant', href: '/ateliers-de-chant/chant-maman-bebe' },
                { label: 'Chant collectif', href: '/ateliers-de-chant/chant-collectif' },
                { label: 'Cours particuliers', href: '/ateliers-de-chant/cours-particuliers' },
            ]
        },
        {
            id: 3,
            number: "03",
            title: "Stages et Formations",
            subtitle: "Formez-vous au chant prénatal et à la psychophonie",
            description: "Des formations professionnelles pour musiciens, chanteurs, musicothérapeutes, sages-femmes, professeurs de yoga prénatal, personnel de santé et toutes personnes intéressées par le travail de la voix depuis la prise de conscience corporelle et les bienfaits de la musique.",
            highlights: [
                "Formation au chant prénatal",
                "Introduction à la psychophonie",
                "Stages intensifs",
                "Formations éligibles Qualiopi"
            ],
            link: "/stages-et-formations",
            color: "#ABA0F2",
            links: [
                { label: 'Stages et Formations', href: '/stages-et-formations' },
            ]
        },
        {
            id: 4,
            number: "04",
            title: "Les Animateurs",
            subtitle: "Trouvez un animateur près de chez vous",
            description: "Un réseau international d'animateurs qualifiés en chant prénatal et psychophonie. Contactez directement l'animatrice ou l'animateur le plus proche de chez vous pour rejoindre un atelier ou organiser des sessions dans votre région.",
            highlights: [
                "France et région parisienne",
                "Belgique et Suisse",
                "Canada et Amérique du Sud",
                "Portugal, Espagne et Allemagne"
            ],
            link: "/les-animateurs/france",
            color: "#F2B988",
            links: [
                { label: 'France', href: '/les-animateurs/france' },
                { label: 'Canada', href: '/les-animateurs/canada' },
                { label: 'América del Sur', href: '/les-animateurs/amerique-du-sud' },
                { label: 'Belgique', href: '/les-animateurs/belgique' },
                { label: 'España', href: '/les-animateurs/espana' },
                { label: 'Portugal', href: '/les-animateurs/portugal' },
                { label: 'Suisse', href: '/les-animateurs/suisse' },
                { label: 'Deutschland', href: '/les-animateurs/deutschland' },
            ]
        },
        {
            id: 5,
            number: "05",
            title: "Agenda",
            subtitle: "Prochains ateliers et événements",
            description: "Consultez l'agenda complet des stages, formations et ateliers de chant prénatal et de psychophonie. Découvrez les dates des prochaines sessions en ligne et en présentiel partout dans le monde.",
            highlights: [
                "Calendrier des événements",
                "Prochains ateliers",
                "Stages et formations 2025-2026",
                "Inscriptions en ligne"
            ],
            link: "/agenda/calendrier",
            color: "#F25A38",
            links: [
                { label: 'Agenda des stages et formations', href: '/agenda/stages-et-formations' },
                { label: 'Agenda des prochains ateliers', href: '/agenda/prochains-ateliers' },
                { label: 'Calendrier des ateliers et stages', href: '/agenda/calendrier' },
            ]
        },
        {
            id: 6,
            number: "06",
            title: "Médias",
            subtitle: "Découvrez-nous dans la presse",
            description: "Retrouvez nos apparitions médiatiques, interviews et publications. Le chant prénatal et la psychophonie sont régulièrement mis en avant dans les médias français et internationaux pour leurs bienfaits sur la maternité et le bien-être.",
            highlights: [
                "France Musique",
                "Articles de presse",
                "Interviews et chroniques",
                "Publications spécialisées"
            ],
            link: "/medias/la-presse-en-parle",
            color: "#732514",
            links: [
                { label: 'Publications', href: '/medias/publications' },
                { label: 'La Presse en parle', href: '/medias/la-presse-en-parle' },
            ]
        }
    ];

    return (
        <section className="w-full py-20 px-4 bg-white/50">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-5xl font-serif font-bold text-[#732514] mb-3">
                        Nos Services - (Test layout)
                    </h2>
                    <div className="w-16 h-0.5 bg-[#F25A38] mx-auto mb-4"></div>
                    <p className="text-lg text-[#732514]/70 italic">
                        L'univers du chant prénatal et de la psychophonie
                    </p>
                </div>

                {/* Timeline Sections */}
                <div className="space-y-12">
                    {sections.map((section, index) => (
                        <ClassicCard key={section.id} section={section} isEven={index % 2 === 0} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ClassicCard({ section, isEven }) {
    return (
        <div className={`flex flex-col md:flex-row gap-6 items-start ${!isEven ? 'md:flex-row-reverse' : ''}`}>
            {/* Number Badge */}
            <div className="flex-shrink-0">
                <div 
                    className="w-20 h-20 rounded-full flex items-center justify-center border-4 bg-white shadow-sm"
                    style={{ borderColor: section.color }}
                >
                    <span 
                        className="text-2xl font-bold"
                        style={{ color: section.color }}
                    >
                        {section.number}
                    </span>
                </div>
            </div>

            {/* Content Card */}
            <div className="flex-1 bg-white rounded-lg shadow-md border border-[#732514]/10 p-8 hover:shadow-lg transition-shadow duration-300">
                {/* Title Section */}
                <div className="mb-4">
                    <h3 
                        className="text-2xl md:text-3xl font-serif font-bold mb-2"
                        style={{ color: section.color }}
                    >
                        {section.title}
                    </h3>
                    <p className="text-[#732514] italic text-sm md:text-base border-l-3 pl-3" 
                       style={{ borderLeftColor: section.color, borderLeftWidth: '3px' }}>
                        {section.subtitle}
                    </p>
                </div>

                {/* Decorative Line */}
                <div 
                    className="w-24 h-0.5 mb-4"
                    style={{ backgroundColor: section.color }}
                />

                {/* Description */}
                <p className="text-[#732514]/80 text-sm md:text-base leading-relaxed mb-5">
                    {section.description}
                </p>

                {/* Highlights Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                    {section.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start text-sm text-[#732514]/70">
                            <span 
                                className="mr-2 mt-0.5 flex-shrink-0 font-bold"
                                style={{ color: section.color }}
                            >
                                •
                            </span>
                            <span>{highlight}</span>
                        </div>
                    ))}
                </div>

                {/* Quick Links */}
                <div className="mb-6 p-4 bg-gradient-to-r from-[#F2B988]/10 to-transparent rounded-lg border-l-2" style={{ borderLeftColor: section.color }}>
                    <p className="text-xs font-semibold text-[#732514]/60 uppercase tracking-wide mb-2">
                        Accès rapide :
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {section.links.map((link, idx) => (
                            <Link key={idx} href={link.href}>
                                <span 
                                    className="inline-block px-3 py-1 text-xs font-medium rounded-full border transition-all duration-200 hover:shadow-md hover:scale-105"
                                    style={{ 
                                        borderColor: section.color,
                                        color: section.color 
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = section.color;
                                        e.currentTarget.style.color = 'white';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                        e.currentTarget.style.color = section.color;
                                    }}
                                >
                                    {link.label}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Button */}
                <Link href={section.link}>
                    <button
                        className="group relative px-6 py-2.5 text-white font-medium rounded overflow-hidden transition-all duration-300 hover:shadow-md"
                        style={{ backgroundColor: section.color }}
                    >
                        <span className="relative z-10">Plus d'informations →</span>
                        <div 
                            className="absolute inset-0 bg-[#732514] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"
                        />
                        <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 text-white">
                            Découvrir →
                        </span>
                    </button>
                </Link>
            </div>

            {/* Decorative Line (Hidden on mobile) */}
            <div className="hidden md:block flex-shrink-0 w-px h-full bg-gradient-to-b from-transparent via-[#732514]/20 to-transparent" />
        </div>
    );
}
