import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Rrss from './rrss';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { label: 'Agenda', href: '/agenda/prochains-ateliers' },
        { label: 'Chant prénatal', href: '/chant-prenatal/canto-prenatal' },
        { label: 'Ateliers de chant', href: '/ateliers-de-chant/chant-collectif' },
        { label: 'Contact', href: '/contact' },
    ];

    return (
        <footer className="bg-gradient-to-b from-[#ABA0F2]/10 via-[#F2B988]/20 to-white border-t-2 border-[#F29057]">
            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="grid gap-8 md:grid-cols-3">
                    {/* À propos */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Image 
                                src="/assets/icon/icono.png" 
                                alt="Logo" 
                                width={40} 
                                height={40}
                                className="object-contain"
                            />
                            <h3 className="text-lg font-semibold text-slate-900">
                                Envie de Chanter
                            </h3>
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed mb-4">
                            Le chant prénatal et la psychophonie au service du bien-être et de l'épanouissement personnel.
                        </p>
                        <div className="text-slate-700">
                            <p className="text-sm mb-1">
                                <strong>Marie-Laure Potel</strong>
                            </p>
                            <p className="text-sm">
                                <a href="tel:0164409423" className="text-[#F25A38] hover:text-[#732514] hover:underline">
                                    01 64 40 94 23
                                </a>
                            </p>
                            <p className="text-sm">
                                <a href="mailto:marielaurepotel@orange.fr" className="text-[#F25A38] hover:text-[#732514] hover:underline">
                                    marielaurepotel@orange.fr
                                </a>
                            </p>
                        </div>
                    </div>

                    {/* Liens rapides */}
                    <div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-4">
                            Liens rapides
                        </h3>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-slate-600 hover:text-[#F25A38] text-sm transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Réseaux sociaux */}
                    <div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-4">
                            Suivez-nous
                        </h3>
                        <div className="mb-4">
                            <Rrss />
                        </div>
                        <p className="text-sm text-slate-600 mt-6">
                            Rejoignez notre communauté pour rester informé de nos actualités et événements.
                        </p>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 pt-8 border-t border-[#F2B988]">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-slate-600">
                            © {currentYear} <span className="font-semibold text-[#F25A38]">Envie de Chanter</span>. Tous droits réservés.
                        </p>
                        <div className="flex gap-4 text-sm">
                            {/* <Link href="/mentions-legales" className="text-slate-600 hover:text-rose-500 transition-colors">
                                Mentions légales
                            </Link>
                            <span className="text-slate-400">•</span>
                            <Link href="/politique-confidentialite" className="text-slate-600 hover:text-[#F25A38] transition-colors">
                                Politique de confidentialité
                            </Link> */}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
