import chantPrenatalAteliersData from '@/utils/ateliers de chant/chantprenatalAteliers.json';
import Link from 'next/link';

export default function ChantPrenatalAteliersPage() {
    return (
        <div className="bg-gradient-to-b from-[#ABA0F2]/10 via-white to-[#F2B988]/20 min-h-screen">
            <div className="container mx-auto px-4 py-10">
                <h1 className="text-4xl font-bold mb-4 text-slate-900">{chantPrenatalAteliersData.title}</h1>
                <h2 className="text-2xl text-slate-600 mb-6">{chantPrenatalAteliersData.subtitle}</h2>

                <div className="mb-8">
                    {chantPrenatalAteliersData.description.map((paragraph, index) => (
                        <p key={index} className="mb-4 text-slate-700 leading-relaxed">
                            {paragraph}
                        </p>
                    ))}
                </div>

                <div className="mb-8 p-6 bg-[#F2B988]/20 rounded-3xl border border-[#F2B988] shadow-sm">
                    <h3 className="text-xl font-semibold mb-3 text-slate-900">Contact</h3>
                    <p className="mb-2 text-slate-700">
                        <strong>{chantPrenatalAteliersData.contact.name}</strong>
                    </p>
                    <p className="mb-2 text-slate-700">
                        <strong>Email :</strong>{' '}
                        <a href={`mailto:${chantPrenatalAteliersData.contact.email}`} className="text-[#F25A38] hover:text-[#732514] hover:underline">
                            {chantPrenatalAteliersData.contact.email}
                        </a>
                    </p>
                    <p className="mb-2 text-slate-700">
                        <strong>Téléphone :</strong> {chantPrenatalAteliersData.contact.phone}
                    </p>
                    {chantPrenatalAteliersData.contact.whatsapp && (
                        <p className="text-[#F25A38]">{chantPrenatalAteliersData.contact.whatsapp}</p>
                    )}
                </div>

                <div className="mb-8">
                    <h3 className="text-2xl font-semibold mb-4 text-slate-900">Ateliers</h3>
                    {chantPrenatalAteliersData.ateliers.map((atelier, index) => (
                        <div key={index}>
                            <div className="mb-6 p-6 border border-[#F2B988] rounded-3xl bg-white/80 shadow-[0_8px_30px_-15px_rgba(242,90,56,0.2)] hover:shadow-[0_20px_50px_-15px_rgba(242,90,56,0.3)] transition-shadow">
                                <h4 className="text-xl font-semibold mb-3 text-slate-900">{atelier.title}</h4>
                                <p className="mb-2 text-slate-700">
                                    <strong>Horaire :</strong> {atelier.schedule}
                                </p>
                               
                                {atelier.location && (
                                    <div className="mb-2 text-slate-700">
                                        {atelier.location.venue && <p><strong>Lieu :</strong> {atelier.location.venue}</p>}
                                        {atelier.location.address && <p><strong>Adresse :</strong> {atelier.location.address}</p>}
                                        {atelier.location.metro && <p><strong>Métro :</strong> {atelier.location.metro}</p>}
                                    </div>
                                )}
                                {atelier.contact && (
                                    <p className="mb-2 text-slate-700">
                                        <strong>Contact :</strong> {atelier.contact.name} - {atelier.contact.phone} -{' '}
                                        <a href={`mailto:${atelier.contact.email}`} className="text-[#F25A38] hover:text-[#732514] hover:underline">
                                            {atelier.contact.email}
                                        </a>
                                    </p>
                                )}
                            </div>
                            
                            {/* Botón especial para el atelier en ligne */}
                            {atelier.title === "Atelier collectif de chant prénatal en ligne" && (
                                <div className="flex justify-center mb-6">
                                    <Link 
                                        href="/agenda/calendrier"
                                        className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#ABA0F2] to-[#9B8FF2] text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span>Explorez le calendrier et inscrivez-vous au cours en ligne</span>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {chantPrenatalAteliersData.coursParticuliers && (
                    <div className="mb-8 p-6 bg-indigo-50/50 rounded-3xl border border-rose-100">
                        <h3 className="text-xl font-semibold mb-3 text-slate-900">{chantPrenatalAteliersData.coursParticuliers.title}</h3>
                        <ul className="list-disc list-inside ml-4 text-slate-700">
                            {chantPrenatalAteliersData.coursParticuliers.locations.map((location, index) => (
                                <li key={index} className="mb-2">
                                    {typeof location === 'string' ? location :
                                        `${location.address} - ${location.phone} - ${location.email}`
                                    }
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {chantPrenatalAteliersData.introduction && (
                    <div className="mb-8 p-6 border-2 border-[#F29057] rounded-3xl bg-white/80 shadow-sm">
                        <h3 className="text-xl font-semibold mb-3 text-slate-900">{chantPrenatalAteliersData.introduction.title}</h3>
                        
                        <p className="mb-2 text-slate-700">
                            <strong>Horaire :</strong> {chantPrenatalAteliersData.introduction.time}
                        </p>
                        <p className="mb-2 text-slate-700">
                            <strong>Format :</strong> {chantPrenatalAteliersData.introduction.format}
                        </p>
                        <p className="mb-4 text-slate-700">{chantPrenatalAteliersData.introduction.description}</p>
                        <p className="text-slate-700">
                            <strong>Contact :</strong> {chantPrenatalAteliersData.introduction.contact.email} -{' '}
                            {chantPrenatalAteliersData.introduction.contact.phone}
                        </p>
                    </div>
                )}

                {chantPrenatalAteliersData.groupes && (
                    <div className="mb-8 p-6 bg-[#F2B988]/20 rounded-3xl border border-[#F2B988]">
                        <h3 className="text-xl font-semibold mb-3 text-slate-900">{chantPrenatalAteliersData.groupes.title}</h3>
                        <p className="mb-2 text-slate-700">{chantPrenatalAteliersData.groupes.description}</p>
                        <p className="text-slate-600">{chantPrenatalAteliersData.groupes.note}</p>
                    </div>
                )}

                {chantPrenatalAteliersData.formation && (
                    <div className="mb-8 p-6 border border-[#F2B988] rounded-3xl bg-white/80 shadow-sm">
                        <h3 className="text-2xl font-semibold mb-4 text-slate-900">{chantPrenatalAteliersData.formation.title}</h3>
                        <p className="mb-2 text-slate-700">
                            <strong>Formatrice :</strong> {chantPrenatalAteliersData.formation.formatrice}
                        </p>
                        <p className="mb-4 text-slate-700">{chantPrenatalAteliersData.formation.structure}</p>
                        <div className="mb-4">
                            <h4 className="text-lg font-semibold mb-2 text-slate-900">Programme :</h4>
                            {chantPrenatalAteliersData.formation.stages.map((stage, index) => (
                                <div key={index} className="mb-2 pl-4 border-l-2 border-[#F29057]">
                                    <p className="text-slate-700">
                                        <strong>Stage {stage.number} :</strong> {stage.title} ({stage.duration})
                                    </p>
                                </div>
                            ))}
                        </div>
                        <p className="mb-2 text-slate-700">
                            <strong>Contact :</strong> {chantPrenatalAteliersData.formation.contact.email} -{' '}
                            {chantPrenatalAteliersData.formation.contact.phone}
                        </p>
                    </div>
                )}

                {chantPrenatalAteliersData.rencontre && (
                    <div className="mb-8 p-6 bg-[#F2B988]/20 rounded-3xl border border-[#F2B988]">
                        <h3 className="text-xl font-semibold mb-3 text-slate-900">{chantPrenatalAteliersData.rencontre.title}</h3>
                        <p className="mb-2 text-slate-700">
                            <strong>Lieu :</strong> {chantPrenatalAteliersData.rencontre.location}
                        </p>
                        <p className="text-slate-700">{chantPrenatalAteliersData.rencontre.occasion}</p>
                    </div>
                )}

                {chantPrenatalAteliersData.media && (
                    <div className="mb-8 p-6 bg-[#F2B988]/20 rounded-3xl border border-[#F2B988]">
                        <p className="mb-2 text-slate-900">
                            <strong>{chantPrenatalAteliersData.media.franceMusique.title}</strong>
                        </p>
                        <a
                            href={chantPrenatalAteliersData.media.franceMusique.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#F25A38] hover:text-[#732514] hover:underline break-all"
                        >
                            {chantPrenatalAteliersData.media.franceMusique.url}
                        </a>
                    </div>
                )}

                

                
            </div>
        </div>
    );
}
