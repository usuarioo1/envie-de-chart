'use client';

import { useState } from 'react';
import Image from 'next/image';
import liensData from '@/utils/contact/liens.json';
import qualopi from '@/assets/qualiopi.png';
import qualopiCertificated from '@/assets/Qualiopi-certificated.jpg';


export default function LiensPage() {
    const [showCertificate, setShowCertificate] = useState(false);
    const { contact } = liensData;

    return (
        <div className="bg-gradient-to-b from-[#ABA0F2]/10 via-white to-[#F2B988]/20 min-h-screen">
            <div className="container mx-auto px-4 py-10">
                <h1 className="text-4xl font-bold mb-3 text-slate-900">
                    {liensData.title}
                </h1>
                <p className="text-lg text-slate-600 mb-10">{liensData.subtitle}</p>

                {/* Contact Card */}
                <div className="max-w-2xl mx-auto">
                    <div className="p-8 border-2 border-[#F2B988] rounded-3xl bg-white/80 shadow-[0_8px_30px_-15px_rgba(242,90,56,0.2)]">
                        <div className="flex items-center justify-center mb-6">
                            <Image
                                src="/assets/icon/icono.png"
                                alt="Logo"
                                width={60}
                                height={60}
                                className="object-contain"
                            />
                        </div>
                        <h2 className="text-3xl font-bold mb-6 text-slate-900 flex items-center justify-center">
                            <span className="inline-block w-1 h-10 bg-[#F25A38] rounded-full mr-4"></span>
                            {contact.name}
                        </h2>

                        {/* Contact Information */}
                        <div className="space-y-4 mb-8">
                            {/* Phone */}
                            <div className="flex items-center">
                                <svg className="w-6 h-6 text-[#F25A38] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="text-lg text-slate-700 hover:text-[#F25A38] transition-colors">
                                    {contact.phone}
                                </a>
                            </div>

                            {/* Email */}
                            <div className="flex items-center">
                                <svg className="w-6 h-6 text-[#F25A38] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <a href={`mailto:${contact.email}`} className="text-lg text-slate-700 hover:text-[#F25A38] transition-colors break-all">
                                    {contact.email}
                                </a>
                            </div>
                        </div>

                        {/* Social Networks */}




                        {/* Performance Indicators */}
                        <div className="pt-6 border-t border-slate-200">
                            <h3 className="text-lg font-semibold text-slate-900 mb-4">Indicateurs de Performance</h3>
                            <div className="space-y-3 text-slate-700 text-base mb-4">
                                <p><strong>Personnes formées en France en 2024 :</strong> 21</p>
                                <p><strong>Taux d&apos;assiduité :</strong> 100 %</p>
                                <p><strong>Satisfaction globale des stagiaires :</strong> 100 %</p>
                                <p className="pt-2"><strong>En cas d&apos;insatisfaction, contacter :</strong> <a href="mailto:admi.artsrencontres@gmail.com" className="text-[#F25A38] hover:underline">admi.artsrencontres@gmail.com</a></p>
                            </div>
                        </div>

                        {/* Qualiopi Certificate */}
                        <div className="pt-6 border-t border-slate-200 flex flex-col items-center mb-6">
                            <Image
                                src={qualopi}
                                alt="Qualiopi Certification"
                                width={350}
                                height={350}
                                className="object-contain mb-4"
                            />
                            <button
                                onClick={() => setShowCertificate(true)}
                                className="px-6 py-2 bg-[#F25A38] text-white font-semibold rounded-lg hover:bg-[#E84A28] transition-colors shadow-md hover:shadow-lg"
                            >
                                Voir le certificat
                            </button>
                        </div>

                        {/* Data Respect */}
                        <div className="pt-6 border-t border-slate-200">
                            <h3 className="text-lg font-semibold text-slate-900 mb-4">Respect de vos données confidentielles</h3>
                            <p className="text-slate-700 text-base mb-4">
                                Nous respectons la confidentialité de vos données personnelles et nous nous engageons à ne jamais porter à la connaissance de tiers les messages et informations relatives à votre vie privée.
                            </p>
                        </div>

                        {/* RGPD Regulation */}
                        <div className="pt-6 border-t border-slate-200">
                            <h3 className="text-lg font-semibold text-slate-900 mb-4">Réglementation RGPD*</h3>
                            <div className="space-y-4 text-slate-700 text-base">
                                <p>
                                    Les informations collectées par l&apos;ARE directement auprès de vous font l&apos;objet d&apos;un traitement automatisé ayant pour finalité la gestion des contrats. Il est fondé sur la mise en œuvre d&apos;un engagement contractuel dont vous êtes partie. Ces informations sont à destination exclusive des services habilités de l&apos;ARE et de ses prestataires participant à la bonne exécution du traitement. Les données seront conservées pendant cinq(5) ans après la fin de la relation contractuelle. Les données comptables seront archivées dix (10) ans afin de répondre aux obligations légales de l&apos;ARE.
                                </p>
                                <p>
                                    Conformément au Règlement (UE) 2016/679 relatif à la protection des données à caractère personnel, vous disposez des droits suivants sur vos données : droit d&apos;accès, droit de rectification, droit à l&apos;effacement (droit à l&apos;oubli), droit d&apos;opposition, droit à la limitation du traitement, droit à la portabilité. Vous pouvez également définir des directives relatives à la conservation, à l&apos;effacement et à la communication de vos données à caractère personnel après votre décès. Vous pouvez, pour des motifs tenant à votre situation particulière, vous opposer au traitement des données vous concernant. Pour exercer vos droits, veuillez adresser votre demande à <a href="mailto:admi.artsrencontres.rgpd@gmail.com" className="text-[#F25A38] hover:underline">admi.artsrencontres.rgpd@gmail.com</a>. Une copie de votre pièce d&apos;identité pourra vous être demandée.
                                </p>
                                <p>
                                    En cas de non-respect de ces obligations, vous avez la possibilité d&apos;introduire une réclamation auprès de la CNIL.
                                </p>
                                <p className="pt-2 text-sm italic">
                                    * RGPD = règlement général pour la protection des données personnelles
                                </p>
                            </div>
                        </div>

                        {/* Administrative Responsible */}
                        <div className="pt-6 border-t border-slate-200">
                            <h3 className="text-lg font-semibold text-slate-900 mb-4">Responsable Administrative</h3>
                            <div className="space-y-3 text-slate-700 text-base">
                                <p className="font-semibold">Justine Jakubowska</p>
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 text-[#F25A38] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <a href="mailto:admi.artsrencontres@gmail.com" className="text-slate-700 hover:text-[#F25A38] transition-colors">
                                        admi.artsrencontres@gmail.com
                                    </a>
                                </div>
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 text-[#F25A38] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <a href="tel:+33624098522" className="text-slate-700 hover:text-[#F25A38] transition-colors">
                                        06 24 09 85 22
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Certificate Modal */}
            {showCertificate && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="relative bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-auto">
                        <button
                            onClick={() => setShowCertificate(false)}
                            className="absolute top-4 right-4 text-slate-600 hover:text-slate-900 z-10"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <div className="p-6 flex justify-center">
                            <Image
                                src={qualopiCertificated}
                                alt="Qualiopi Certificat"
                                width={800}
                                height={800}
                                className="object-contain"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
