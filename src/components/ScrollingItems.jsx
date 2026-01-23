'use client';
import ImageIcon from '@/assets/icon/icono.png';
import Image from 'next/image';

import Link from 'next/link';
import { useState } from 'react';

export default function ScrollingItems() {
    const sections = [
        {
            id: 1,
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
            bgColor: "from-[#F25A38]/10 to-[#F29057]/10",
            icon: <Image src={ImageIcon} alt="Icon" width={40} height={40} />,
            links: [
                { label: 'Le Chant Prénatal et la Psychophonie', href: '/chant-prenatal/le-chant-prenatal-psychophonie' },
                { label: 'Prenatal Singing', href: '/chant-prenatal/prenatal-singing' },
                { label: 'Canto Prenatal', href: '/chant-prenatal/canto-prenatal' },
                { label: 'Canto Pré-natal em portugais', href: '/chant-prenatal/canto-pre-natal-portugais' }
            ]
        },
        {
            id: 2,
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
            bgColor: "from-[#F29057]/10 to-[#F2B988]/10",
            icon: <Image src={ImageIcon} alt="Icon" width={40} height={40} />,
            links: [
                { label: 'Chant prénatal – ateliers', href: '/ateliers-de-chant/chant-prenatal-ateliers' },
                { label: 'Chant maman bébé – adulte enfant', href: '/ateliers-de-chant/chant-maman-bebe' },
                { label: 'Chant collectif', href: '/ateliers-de-chant/chant-collectif' },
                { label: 'Cours particuliers', href: '/ateliers-de-chant/cours-particuliers' },
            ]
        },
        {
            id: 3,
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
            bgColor: "from-[#ABA0F2]/10 to-[#F25A38]/10",
            icon: <Image src={ImageIcon} alt="Icon" width={40} height={40} />,
            links: [
                { label: 'Stages et Formations', href: '/stages-et-formations' },
            ]
        },
        {
            id: 4,
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
            bgColor: "from-[#F2B988]/10 to-[#ABA0F2]/10",
            icon: <Image src={ImageIcon} alt="Icon" width={40} height={40} />,
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
            bgColor: "from-[#F25A38]/10 to-[#F2B988]/10",
            icon: <Image src={ImageIcon} alt="Icon" width={40} height={40} />,
            links: [
                { label: 'Agenda des stages et formations', href: '/agenda/stages-et-formations' },
                { label: 'Agenda des prochains ateliers', href: '/agenda/prochains-ateliers' },
                { label: 'Calendrier des ateliers et stages', href: '/agenda/calendrier' },
            ]
        },
        {
            id: 6,
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
            bgColor: "from-[#ABA0F2]/10 to-[#F29057]/10",
            icon: <Image src={ImageIcon} alt="Icon" width={40} height={40} />,
            links: [
                { label: 'Publications', href: '/medias/publications' },
                { label: 'La Presse en parle', href: '/medias/la-presse-en-parle' },
            ]
        }
    ];

    return (
        <section className="w-full py-16 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-[#732514] mb-4">
                        Explorez nos Services
                    </h2>
                    <p className="text-lg md:text-xl text-[#732514]/80 max-w-3xl mx-auto">
                        Découvrez l'univers du chant prénatal et de la psychophonie
                    </p>
                    <div className="mt-6 w-24 h-1 bg-[#F25A38] rounded-full mx-auto"></div>
                </div>

                {/* Scrolling Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {sections.map((section, index) => (
                        <ScrollingCard key={section.id} section={section} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ScrollingCard({ section, index }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={`
                relative overflow-hidden rounded-2xl shadow-lg
                bg-gradient-to-br ${section.bgColor}
                border-2 border-[#732514]/10
                transition-all duration-500 ease-out
                ${isHovered ? 'scale-[1.02] shadow-2xl' : 'scale-100'}
            `}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Card Content */}
            <div className="relative p-8 bg-white/80 backdrop-blur-sm h-full flex flex-col">
                <div className="flex-grow">
                    {/* Icon */}
                    <div className="mb-4 transform transition-transform duration-500 ease-out flex items-center justify-center" 
                         style={{ 
                             transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                             fontSize: typeof section.icon === 'string' ? '3rem' : 'inherit'
                         }}>
                        {section.icon}
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-bold text-[#732514] mb-2">
                        {section.title}
                    </h3>

                    {/* Subtitle */}
                    <p className="text-sm md:text-base text-[#F25A38] font-semibold mb-4">
                        {section.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-[#732514]/80 text-sm md:text-base leading-relaxed mb-6">
                        {section.description}
                    </p>

                    {/* Highlights */}
                    <ul className="space-y-2 mb-6">
                        {section.highlights.map((highlight, idx) => (
                            <li key={idx} className="flex items-start text-sm text-[#732514]/70">
                                <span className="text-[#F25A38] mr-2 mt-1 flex-shrink-0">✓</span>
                                <span>{highlight}</span>
                            </li>
                        ))}
                    </ul>

                    {/* Quick Access Links */}
                    {section.links && section.links.length > 0 && (
                        <div className="mb-6 p-4 bg-white/80 rounded-xl border-2 border-[#F25A38]/20 shadow-sm">
                            <p className="text-xs font-bold text-[#732514] uppercase tracking-wide mb-3 flex items-center">
                                <span className="text-[#F25A38] mr-2">→</span>
                                Accès direct :
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {section.links.map((link, idx) => (
                                    <Link key={idx} href={link.href}>
                                        <span className="inline-block px-3 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-[#F25A38] to-[#F29057] rounded-lg hover:from-[#732514] hover:to-[#F25A38] transition-all duration-200 hover:shadow-lg hover:scale-105 cursor-pointer">
                                            {link.label}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Button */}
                <Link href={section.link} className="mt-auto">
                    <button
                        className={`
                            w-full py-3 px-6 rounded-xl font-semibold
                            text-white bg-gradient-to-r from-[#F25A38] to-[#F29057]
                            shadow-md
                            transition-all duration-300 ease-out
                            ${isHovered ? 'shadow-xl transform translate-y-[-2px]' : 'shadow-md'}
                            hover:from-[#732514] hover:to-[#F25A38]
                            focus:outline-none focus:ring-2 focus:ring-[#F25A38] focus:ring-offset-2
                        `}
                    >
                        Plus d'informations
                    </button>
                </Link>

                {/* Decorative Corner */}
                <div 
                    className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#F25A38]/20 to-transparent rounded-bl-full transition-all duration-500"
                    style={{
                        transform: isHovered ? 'scale(1.5)' : 'scale(1)',
                        opacity: isHovered ? 0.5 : 0.3
                    }}
                />
            </div>
        </div>
    );
}
