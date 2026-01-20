"use client";

import Link from 'next/link';
import { useState } from 'react';

const menuSections = [
    {
        title: 'Agenda',
        items: [
            { label: 'Agenda des stages et formations', href: '/agenda/stages-et-formations' },
            { label: 'Agenda des prochains ateliers', href: '/agenda/prochains-ateliers' },
            { label: 'Calendrier des ateliers et stages', href: '/agenda/calendrier' },
        ],
    },
    {
        title: 'Boutique',
        items: ['Boutique', 'Panier', 'Mon compte', 'Conditions générales de ventes'],
    },
    {
        title: 'Chant prénatal',
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
        items: [
            { label: 'Chant prénatal – ateliers', href: '/ateliers-de-chant/chant-prenatal-ateliers' },
            { label: 'Chant maman bébé – adulte enfant', href: '/ateliers-de-chant/chant-maman-bebe' },
            { label: 'Chant collectif', href: '/ateliers-de-chant/chant-collectif' },
            { label: 'Cours particuliers', href: '/ateliers-de-chant/cours-particuliers' },
        ],
    },
    {
        title: 'Les animateurs',
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
        items: [
            { label: 'Stages et Formations', href: '/stages-et-formations' },
        ],
    },
    {
        title: 'Médias',
        items: [
            { label: 'Publications', href: '/medias/publications' },
            { label: 'La Presse en parle', href: '/medias/la-presse-en-parle' },
            'Vidéo',
        ],
    },
    {
        title: 'Contact',
        items: [
            { label: 'Liens', href: '/contact/liens' },
        ],
    },
];

export default function Navbar() {
    const [openMenu, setOpenMenu] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openSubMenu, setOpenSubMenu] = useState(null);

    const handleMouseEnter = (title) => {
        setOpenMenu(title);
    };

    const handleMouseLeave = () => {
        setOpenMenu(null);
        setOpenSubMenu(null);
    };

    const toggleSubMenu = (title) => {
        setOpenSubMenu(openSubMenu === title ? null : title);
    };

    const renderDropdownItem = (item) => {
        if (typeof item === 'string') {
            return (
                <button
                    key={item}
                    type="button"
                    className="block w-full px-4 py-2 text-left text-sm text-[#732514] hover:bg-[#F2B988]/20 hover:text-[#F25A38] transition"
                >
                    {item}
                </button>
            );
        }

        if (item.children) {
            const isSubMenuOpen = openSubMenu === item.title;
            return (
                <div
                    key={item.title}
                    className="border-t border-[#F2B988] pt-2 mt-2"
                    onMouseEnter={() => setOpenSubMenu(item.title)}
                    onMouseLeave={() => setOpenSubMenu(null)}
                >
                    <div
                        className="w-full px-4 py-2 text-xs font-semibold text-[#F29057] uppercase tracking-wide flex items-center justify-between hover:bg-[#F2B988]/10 transition cursor-pointer"
                    >
                        {item.title}
                        <svg
                            className={`h-3 w-3 transition-transform ${isSubMenuOpen ? 'rotate-180' : ''}`}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    {isSubMenuOpen && (
                        <div className="mt-1">
                            {item.children.map((child) => {
                                const childKey = typeof child === 'string' ? child : child.href ?? child.label ?? child.title;
                                return typeof child === 'string' ? (
                                    <button
                                        key={childKey}
                                        type="button"
                                        className="block w-full px-6 py-2 text-left text-sm text-[#732514] hover:bg-[#ABA0F2]/20 hover:text-[#F25A38] transition"
                                    >
                                        {child}
                                    </button>
                                ) : (
                                    <Link
                                        key={childKey}
                                        href={child.href ?? '#'}
                                        className="block px-6 py-2 text-sm text-[#732514] hover:bg-[#ABA0F2]/20 hover:text-[#F25A38] transition">

                                        {child.label ?? child.title}
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </div>
            );
        }

        return (
            <Link
                key={item.href ?? item.label}
                href={item.href ?? '#'}
                className="block px-4 py-2 text-sm text-[#732514] hover:bg-[#F2B988]/20 hover:text-[#F25A38] transition"
            >
                {item.label ?? item.title}
            </Link>
        );
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50 border-b-2 border-[#F2B988]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center">
                            <span className="text-2xl font-bold text-[#F25A38]">Envie de Chanter</span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex lg:items-center lg:space-x-1">
                        {menuSections.map((section) => (
                            <div
                                key={section.title}
                                className="relative"
                                onMouseEnter={() => handleMouseEnter(section.title)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <button
                                    type="button"
                                    className="px-3 py-2 text-sm font-medium text-[#732514] hover:text-[#F25A38] transition flex items-center gap-1"
                                >
                                    {section.title}
                                    <svg
                                        className={`h-4 w-4 transition-transform ${openMenu === section.title ? 'rotate-180' : ''}`}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>

                                {/* Dropdown */}
                                {openMenu === section.title && (
                                    <div className="absolute left-0 mt-0 w-64 bg-white rounded-lg shadow-lg border-2 border-[#F2B988] py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                                        {section.items.map((item) => renderDropdownItem(item))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden">
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-[#732514] hover:text-[#F25A38] hover:bg-[#F2B988]/20 transition"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {mobileMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden bg-white border-t-2 border-[#F2B988]">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {menuSections.map((section) => (
                            <div key={section.title} className="space-y-1">
                                <button
                                    type="button"
                                    onClick={() => setOpenMenu(openMenu === section.title ? null : section.title)}
                                    className="w-full flex items-center justify-between px-3 py-2 text-base font-medium text-[#732514] hover:text-[#F25A38] hover:bg-[#F2B988]/20 rounded-md transition"
                                >
                                    {section.title}
                                    <svg
                                        className={`h-4 w-4 transition-transform ${openMenu === section.title ? 'rotate-180' : ''}`}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                                {openMenu === section.title && (
                                    <div className="pl-4 space-y-1">
                                        {section.items.map((item) => {
                                            if (typeof item === 'string') {
                                                return (
                                                    <button
                                                        key={item}
                                                        type="button"
                                                        className="block w-full text-left px-3 py-2 text-sm text-[#732514] hover:text-[#F25A38] hover:bg-[#F2B988]/20 rounded-md transition"
                                                    >
                                                        {item}
                                                    </button>
                                                );
                                            }
                                            if (item.children) {
                                                return (
                                                    <div key={item.title} className="space-y-1">
                                                        <p className="px-3 py-1 text-xs font-semibold text-[#F29057] uppercase">
                                                            {item.title}
                                                        </p>
                                                        {item.children.map((child) => {
                                                            const childKey = typeof child === 'string' ? child : child.href ?? child.label;
                                                            return typeof child === 'string' ? (
                                                                <button
                                                                    key={childKey}
                                                                    type="button"
                                                                    className="block w-full text-left px-5 py-2 text-sm text-[#732514] hover:text-[#F25A38] hover:bg-[#ABA0F2]/20 rounded-md transition"
                                                                >
                                                                    {child}
                                                                </button>
                                                            ) : (
                                                                <Link
                                                                    key={childKey}
                                                                    href={child.href ?? '#'}
                                                                    className="block px-5 py-2 text-sm text-[#732514] hover:text-[#F25A38] hover:bg-[#ABA0F2]/20 rounded-md transition"
                                                                >
                                                                    {child.label ?? child.title}
                                                                </Link>
                                                            );
                                                        })}
                                                    </div>
                                                );
                                            }
                                            return (
                                                <Link
                                                    key={item.href ?? item.label}
                                                    href={item.href ?? '#'}
                                                    className="block px-3 py-2 text-sm text-[#732514] hover:text-[#F25A38] hover:bg-[#F2B988]/20 rounded-md transition"
                                                >
                                                    {item.label ?? item.title}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
