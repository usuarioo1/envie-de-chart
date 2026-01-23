import Image from 'next/image';
import stagesData from '@/utils/stagesEtFormations/stages.json';

export default function StagesEtFormationsPage() {
    return (
        <div className="bg-gradient-to-b from-[#ABA0F2]/10 via-white to-[#F2B988]/20 min-h-screen">
            <div className="container mx-auto px-4 py-10">
                <div className="flex items-center justify-center mb-6">
                    <Image 
                        src="/assets/icon/icono.png" 
                        alt="Logo" 
                        width={60} 
                        height={60}
                        className="object-contain"
                    />
                </div>
                <h1 className="text-4xl font-bold mb-4 text-slate-900 text-center">{stagesData.title}</h1>

                <div className="mb-8 p-6 bg-[#F2B988]/20 rounded-3xl border border-[#F2B988]">
                    <p className="text-lg text-slate-700 mb-4">{stagesData.description}</p>
                    <p className="text-slate-700 font-semibold">{stagesData.requirement}</p>
                </div>

                {/* Certificación */}
                <div className="mb-8 flex items-center justify-center">
                    <div className="inline-flex items-center px-6 py-3 bg-[#ABA0F2]/10 rounded-full border border-[#F2B988]">
                        <svg
                            className="w-5 h-5 mr-2 text-[#F25A38]"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span className="text-slate-900 font-semibold">
                            Certifié {stagesData.certification}
                        </span>
                    </div>
                </div>

                {/* Formations Grid */}
                <div className="mb-10">
                    <h2 className="text-2xl font-semibold mb-6 text-slate-900">Nos formations disponibles</h2>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {stagesData.formations.map((formation) => (
                            <div
                                key={formation.id}
                                className="p-6 border border-[#F2B988] rounded-3xl bg-white/80 shadow-[0_8px_30px_-15px_rgba(242,90,56,0.2)] hover:shadow-[0_20px_50px_-15px_rgba(242,90,56,0.3)] hover:-translate-y-1 transition-all"
                            >
                                <div className="mb-3">
                                    <span className="inline-block px-3 py-1 text-xs font-semibold text-[#732514] bg-[#F2B988] rounded-full">
                                        {formation.type}
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold mb-2 text-slate-900">
                                    {formation.title}
                                </h3>
                                {formation.subtitle && (
                                    <p className="text-sm text-slate-600">{formation.subtitle}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Section */}
                <div className="p-8 bg-gradient-to-r from-[#ABA0F2]/10 to-[#F2B988]/20 rounded-3xl border border-[#F2B988]">
                    <h3 className="text-2xl font-semibold mb-4 text-slate-900 text-center">
                        Intéressé par une formation ?
                    </h3>
                    <p className="text-center text-slate-700 mb-6">
                        Contactez-nous pour organiser une formation sur mesure pour votre groupe
                    </p>
                    <div className="flex flex-col items-center space-y-3">
                        <div className="text-center">
                            <p className="font-semibold text-slate-900 text-lg">
                                {stagesData.contact.name}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 mt-3 justify-center">
                                <a
                                    href={`tel:${stagesData.contact.phone}`}
                                    className="inline-flex items-center justify-center px-6 py-3 bg-white border border-[#F29057] rounded-full text-slate-900 hover:bg-[#F2B988]/20 hover:border-[#F25A38] transition-all"
                                >
                                    <svg
                                        className="w-5 h-5 mr-2 text-[#F25A38]"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                        />
                                    </svg>
                                    {stagesData.contact.phone}
                                </a>
                                <a
                                    href={`mailto:${stagesData.contact.email}`}
                                    className="inline-flex items-center justify-center px-6 py-3 bg-[#F25A38] text-white rounded-full hover:bg-[#732514] transition-all"
                                >
                                    <svg
                                        className="w-5 h-5 mr-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                                    {stagesData.contact.email}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
