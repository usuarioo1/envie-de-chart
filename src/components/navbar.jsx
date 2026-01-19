"use client";

import Link from 'next/link';
import { useState } from 'react';

const menuSections = [
    {
        title: 'Agenda',
        description: 'Planifie ateliers et formations à venir.',
        items: [
            { label: 'Agenda des stages et formations', href: '/agenda/stages-et-formations' },
            { label: 'Agenda des prochains ateliers', href: '/agenda/prochains-ateliers' },
            { label: 'Calendrier des ateliers et stages', href: '/agenda/calendrier' },
        ],
    },
    {
        title: 'Boutique',
        description: 'Boutique et services en ligne.',
        items: ['Boutique', 'Panier', 'Mon compte', 'Conditions générales de ventes'],
    },
    {
        title: 'Chant prénatal',
        description: 'Ressources par étapes et en plusieurs langues.',
        items: [
            {
                title: 'le Chant Prénatal et la Psychophonie',
                children: [
                    { label: 'Prenatal Singing', href: '/chant-prenatal/prenatal-singing' },
                    { label: 'Canto Prenatal', href: '/chant-prenatal/canto-prenatal' },
                    { label: 'Canto Pré-natal em portugais', href: '/chant-prenatal/canto-pre-natal-portugais' },
                ],
            },
            { label: 'Les formateurs', href: '/chant-prenatal/les-formateurs' },
        ],
    },
    {
        title: 'Ateliers de chant',
        description: 'Formats collectifs et individuels.',
        items: [
            { label: 'Chant prénatal – ateliers', href: '/ateliers-de-chant/chant-prenatal-ateliers' },
            { label: 'Chant maman bébé – adulte enfant', href: '/ateliers-de-chant/chant-maman-bebe' },
            { label: 'Chant collectif', href: '/ateliers-de-chant/chant-collectif' },
            { label: 'Cours particuliers', href: '/ateliers-de-chant/cours-particuliers' },
        ],
    },
    {
        title: 'Les animateurs',
        description: 'Liste des facilitateurs par région.',
        items: [
            { label: 'France', href: '/les-animateurs/france' },
            { label: 'Canada', href: '/les-animateurs/canada' },
            { label: 'América del Sur', href: '/les-animateurs/amerique-du-sud' },
            { label: 'Belgique', href: '/les-animateurs/belgique' },
            { label: 'España', href: '/les-animateurs/espana' },
            { label: 'Portugal', href: '/les-animateurs/portugal' },
            { label: 'Suisse', href: '/les-animateurs/suisse' },
            { label: 'Deutschland', href: '/les-animateurs/deutschland' },
        ],
    },
    {
        title: 'Stages et Formations',
        description: 'Programmes de spécialisation.',
        items: [
            { label: 'Stages et Formations', href: '/stages-et-formations' },
        ],
    },
    {
        title: 'Médias',
        description: 'Archives de presse et publications.',
        items: [
            { label: 'Publications', href: '/medias/publications' },
            { label: 'La Presse en parle', href: '/medias/la-presse-en-parle' },
            'Vidéo',
        ],
    },
    {
        title: 'Contact',
        description: 'Liens avec la communauté.',
        items: [
            { label: 'Liens', href: '/contact/liens' },
        ],
    },
];

export default function Navbar() {
    const [openSections, setOpenSections] = useState([]);
    const [openNested, setOpenNested] = useState([]);

    const toggleSection = (title) => {
        setOpenSections((prev) =>
            prev.includes(title) ? prev.filter((section) => section !== title) : [...prev, title]
        );
    };

    const toggleNested = (title) => {
        setOpenNested((prev) =>
            prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]
        );
    };

    const renderPrimaryItem = (item) => {
        if (typeof item === 'string') {
            return (
                <button
                    key={item}
                    type="button"
                    className="w-full rounded-xl border border-slate-100 bg-white px-4 py-3 text-left text-slate-700 transition hover:border-rose-200 hover:bg-rose-50"
                >
                    {item}
                </button>
            );
        }

        if (item.children) {
            const isNestedOpen = openNested.includes(item.title);
            return (
                <div key={item.title} className="rounded-2xl border border-slate-100 bg-rose-50/60 p-4">
                    <button
                        type="button"
                        onClick={() => toggleNested(item.title)}
                        className="flex w-full items-center justify-between text-xs uppercase tracking-wide text-rose-500"
                    >
                        {item.title}
                        <svg
                            className={`h-3.5 w-3.5 transition-transform ${isNestedOpen ? 'rotate-180' : ''}`}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <ul
                        className={`mt-3 space-y-1 text-sm text-slate-600 transition-all duration-200 ${isNestedOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}
                    >
                        {item.children?.map((child) => {
                            const childKey = typeof child === 'string' ? child : child.href ?? child.label ?? child.title;
                            return (
                                <li key={childKey}>
                                    {typeof child === 'string' ? (
                                        <button
                                            type="button"
                                            className="w-full rounded-lg px-3 py-2 text-left text-slate-600 transition hover:bg-white"
                                        >
                                            {child}
                                        </button>
                                    ) : (
                                        <Link
                                            href={child.href ?? '#'}
                                            className="block w-full rounded-lg px-3 py-2 text-left text-slate-600 transition hover:bg-white"
                                        >
                                            {child.label ?? child.title}
                                        </Link>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                    <div
                        className={`mt-2 flex flex-wrap gap-2 transition-all duration-200 ${isNestedOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}
                    >
                        {item.children?.map((child) => {
                            const childKey = typeof child === 'string' ? child : child.href ?? child.label ?? child.title;
                            return typeof child === 'string' ? (
                                <button
                                    key={childKey}
                                    type="button"
                                    className="rounded-full border border-rose-100 px-3 py-1 text-xs text-slate-600 transition hover:border-rose-300 hover:text-rose-500"
                                >
                                    {child}
                                </button>
                            ) : (
                                <Link
                                    key={childKey}
                                    href={child.href ?? '#'}
                                    className="rounded-full border border-rose-100 px-3 py-1 text-xs text-slate-600 transition hover:border-rose-300 hover:text-rose-500"
                                >
                                    {child.label ?? child.title}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            );
        }

        return (
            <Link
                key={item.href ?? item.label}
                href={item.href ?? '#'}
                className="block w-full rounded-xl border border-slate-100 bg-white px-4 py-3 text-left text-slate-700 transition hover:border-rose-200 hover:bg-rose-50"
            >
                {item.label ?? item.title}
            </Link>
        );
    };

    return (
        <nav className="bg-gradient-to-b from-rose-50 via-white to-indigo-50 text-slate-900">
            <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
                <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.35em] text-rose-400">Envie de Chanter</p>
                        <h1 className="mt-2 text-3xl font-semibold text-slate-900">Explorateur de contenus</h1>
                        <p className="mt-1 text-sm text-slate-500">
                            Accédez rapidement à chaque univers : agenda, ateliers, boutique et plus encore.
                        </p>
                    </div>
                </header>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {menuSections.map((section) => {
                        const isOpen = openSections.includes(section.title);
                        return (
                            <article
                                key={section.title}
                                className="rounded-3xl border border-rose-100 bg-white/80 p-5 shadow-[0_25px_60px_-35px_rgba(15,23,42,0.4)] transition hover:-translate-y-1 hover:border-rose-200"
                            >
                                <button
                                    type="button"
                                    onClick={() => toggleSection(section.title)}
                                    className="flex w-full items-start justify-between gap-3 text-left"
                                >
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h2 className="text-lg font-semibold text-slate-900">{section.title}</h2>
                                            <span className="text-rose-400">
                                                <svg
                                                    className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                >
                                                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </span>
                                        </div>
                                        <p className="text-sm text-slate-500">{section.description}</p>
                                    </div>
                                    <span className="rounded-full border border-rose-100 bg-rose-50 px-3 py-1 text-xs text-rose-500">
                                        {Array.isArray(section.items) ? section.items.length : 0}+
                                    </span>
                                </button>

                                <div
                                    className={`mt-4 space-y-2 text-sm text-slate-600 transition-all duration-300 ${isOpen ? 'opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}
                                >
                                    {section.items.map((item) => renderPrimaryItem(item))}
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}
