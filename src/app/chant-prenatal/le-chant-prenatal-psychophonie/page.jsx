import Image from 'next/image';
import data from '@/utils/chantPrenatal/le-chant-prenatal.json';

export default function LeChantPrenatalPsychophoniePage() {
    const { presentation, ateliers, programme, inscription, origine, fondements, psychophonie, bibliographie } = data;

    return (
        <main className="px-4 py-12">
            <div className="mx-auto max-w-5xl space-y-10">
                {/* Header */}
                <header className="rounded-3xl border border-[#F2B988] bg-gradient-to-br from-white via-[#F2B988]/20 to-[#ABA0F2]/10 p-8 shadow-sm">
                    <div className="flex items-center justify-center mb-4">
                        <Image
                            src="/assets/icon/icono.png"
                            alt="Logo"
                            width={50}
                            height={50}
                            className="object-contain"
                        />
                    </div>
                    <p className="text-xs uppercase tracking-[0.35em] text-[#F29057] text-center">Le Chant Prénatal</p>
                    <h1 className="mt-3 text-3xl font-semibold text-slate-900 text-center">
                        {presentation.title}
                    </h1>
                    <p className="mt-2 text-sm text-slate-600 text-center">
                        Méthode d'harmonie vitale par l'étude consciente de la voix parlée et chantée
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3 text-xs text-slate-500 justify-center">
                        <span className="rounded-full border border-slate-200 px-3 py-1">Formation 2026</span>
                        <span className="rounded-full border border-slate-200 px-3 py-1">Psychophonie</span>

                    </div>
                </header>

                {/* Ateliers et Programme */}
                <section className="rounded-3xl border border-[#F2B988] bg-white/85 p-8 shadow-[0_25px_60px_-40px_rgba(242,90,56,0.35)]">
                    <div className="flex items-center gap-3 mb-6 pb-2 border-b border-[#F2B988]">
                        <svg className="h-5 w-5 flex-shrink-0 text-[#F29057]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <h2 className="text-2xl font-semibold text-slate-900">{ateliers.title}</h2>
                    </div>
                    <p className="text-slate-600 mb-6 text-sm">Formation {ateliers.formation_year}</p>

                    {/* Programme détaillé */}
                    <div className="mb-6 pl-8 pr-4 py-4 bg-gradient-to-r from-[#F2B988]/10 to-transparent rounded-lg border-l-2 border-[#F29057]">
                        <h3 className="text-base font-bold text-slate-900 mb-3">{programme.title}</h3>
                        <div className="grid md:grid-cols-2 gap-3 text-sm">
                            <div>
                                <p className="text-slate-700"><strong>Formatrice:</strong> {programme.formatrice}</p>
                                <p className="text-slate-700 mt-1">{programme.format}</p>
                            </div>
                            <div>
                                <p className="text-slate-700"><strong>Contact:</strong></p>
                                <p className="text-slate-700">{programme.contact.email}</p>
                                <p className="text-slate-700">{programme.contact.phone}</p>
                            </div>
                        </div>
                    </div>

                    {/* Sessions */}
                    <div className="space-y-3">
                        {programme.sessions.map((session) => (
                            <div key={session.numero} className="pl-8 pr-4 py-3 bg-gradient-to-r from-[#F2B988]/10 to-transparent rounded-lg border-l-2 border-[#F29057]">
                                <div className="flex items-start gap-3">
                                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-[#F25A38] text-white font-bold text-sm">
                                        {session.numero}
                                    </span>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-slate-900 text-sm mb-1">{session.title}</h4>
                                        {session.subtitle && (
                                            <p className="text-xs text-[#F25A38] mb-1">{session.subtitle}</p>
                                        )}
                                        <p className="text-xs text-slate-600">{session.duration}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Inscription */}
                <section className="rounded-3xl border border-[#F2B988] bg-white/85 p-8 shadow-[0_25px_60px_-40px_rgba(242,90,56,0.35)]">
                    <div className="flex items-center gap-3 mb-6 pb-2 border-b border-[#F2B988]">
                        <svg className="h-5 w-5 flex-shrink-0 text-[#F29057]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <h2 className="text-2xl font-semibold text-slate-900">{inscription.title}</h2>
                    </div>

                    <div className="space-y-4">
                        <div className="pl-8 pr-4 py-3 bg-gradient-to-r from-[#ABA0F2]/10 to-transparent rounded-lg border-l-2 border-[#ABA0F2]">
                            <h3 className="font-semibold text-slate-900 text-sm mb-1">{inscription.contact.name}</h3>
                            <p className="text-slate-700 text-sm">{inscription.contact.email}</p>
                            <p className="text-slate-700 text-sm">{inscription.contact.phone}</p>
                        </div>

                        <div className="pl-8 pr-4 py-3 bg-gradient-to-r from-[#F2B988]/10 to-transparent rounded-lg border-l-2 border-[#F29057]">
                            <h3 className="font-semibold text-slate-900 text-sm mb-1">Modalités :</h3>
                            <p className="text-slate-700 text-sm">{inscription.modalites}</p>
                        </div>

                        <div className="pl-8 pr-4 py-3 bg-gradient-to-r from-[#F2B988]/10 to-transparent rounded-lg border-l-2 border-[#F29057]">
                            <p className="text-slate-700 text-sm flex items-center gap-2">
                                <svg className="w-4 h-4 text-[#F25A38] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                {inscription.accessibilite}
                            </p>
                        </div>

                        <div className="pl-8 pr-4 py-3 bg-gradient-to-r from-[#F2B988]/10 to-transparent rounded-lg border-l-2 border-[#F29057]">
                            <h3 className="font-semibold text-slate-900 text-sm mb-1">Certification :</h3>
                            <p className="text-slate-700 text-sm"><strong>{inscription.certification.organisme}</strong> - {inscription.certification.reference}</p>
                            <p className="text-slate-700 text-sm mt-1">{inscription.certification.prise_en_charge}</p>
                        </div>

                        <div className="pl-8 pr-4 py-3 bg-gradient-to-r from-[#F2B988]/10 to-transparent rounded-lg border-l-2 border-[#F29057]">
                            <h3 className="font-semibold text-slate-900 text-sm mb-1">Responsable administrative :</h3>
                            <p className="text-slate-700 text-sm"><strong>{inscription.responsable_administrative.name}</strong></p>
                            <p className="text-slate-700 text-sm">{inscription.responsable_administrative.email}</p>
                            <p className="text-slate-700 text-sm">{inscription.responsable_administrative.phone}</p>
                        </div>
                    </div>
                </section>



                {/* Origine */}
                <section className="rounded-3xl border border-[#F2B988] bg-white/85 p-8 shadow-[0_25px_60px_-40px_rgba(242,90,56,0.35)]">
                    <div className="flex items-center gap-3 mb-6 pb-2 border-b border-[#F2B988]">
                        <svg className="h-5 w-5 flex-shrink-0 text-[#F29057]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <h2 className="text-2xl font-semibold text-slate-900">{origine.title}</h2>
                    </div>
                    <div className="pl-8 pr-4 py-3 bg-gradient-to-r from-[#F2B988]/10 to-transparent rounded-lg border-l-2 border-[#F29057] mb-4">
                        <p className="text-slate-700 leading-relaxed text-sm">{origine.description}</p>
                    </div>

                    {origine.histoire.map((item, index) => (
                        <div key={index} className="mb-4">
                            {item.paragraphe && (
                                <div className="pl-8 pr-4 py-3 bg-gradient-to-r from-[#F2B988]/10 to-transparent rounded-lg border-l-2 border-[#F29057]">
                                    <p className="text-slate-700 leading-relaxed text-sm">{item.paragraphe}</p>
                                </div>
                            )}
                            {item.evenement && (
                                <div className="flex gap-4 items-start p-4 bg-gradient-to-r from-[#ABA0F2]/10 to-transparent rounded-lg border-l-2 border-[#ABA0F2]">
                                    <span className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-[#F25A38] text-white font-bold text-sm">
                                        {item.annee}
                                    </span>
                                    <div className="flex-1 pt-1">
                                        <p className="text-slate-700 text-sm">{item.evenement}</p>
                                        {item.reference && (
                                            <p className="text-xs text-slate-600 mt-1 italic">({item.reference})</p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </section>

                {/* Fondements */}
                <section className="rounded-3xl border border-[#F2B988] bg-white/85 p-8 shadow-[0_25px_60px_-40px_rgba(242,90,56,0.35)]">
                    <div className="flex items-center gap-3 mb-6 pb-2 border-b border-[#F2B988]">
                        <svg className="h-5 w-5 flex-shrink-0 text-[#F29057]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <h2 className="text-2xl font-semibold text-slate-900">{fondements.title}</h2>
                    </div>
                    <div className="pl-8 pr-4 py-3 bg-gradient-to-r from-[#F2B988]/10 to-transparent rounded-lg border-l-2 border-[#F29057] mb-6">
                        <p className="text-slate-700 text-sm">{fondements.introduction}</p>
                    </div>

                    {/* Axes principaux */}
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                        {fondements.axes.map((axe, index) => (
                            <div key={index} className="pl-8 pr-4 py-3 bg-gradient-to-r from-[#F2B988]/10 to-transparent rounded-lg border-l-2 border-[#F29057]">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-[#F25A38] text-white font-bold text-sm">
                                        {index + 1}
                                    </span>
                                </div>
                                <p className="text-slate-700 font-medium text-sm">{axe}</p>
                            </div>
                        ))}
                    </div>

                    {/* Détails en 2 columnas */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="pl-8 pr-4 py-3 bg-gradient-to-r from-[#F2B988]/10 to-transparent rounded-lg border-l-2 border-[#F29057]">
                            <h3 className="text-base font-bold text-slate-900 mb-2">{fondements.details.bien_etre.title}</h3>
                            <p className="text-slate-700 text-sm mb-2">{fondements.details.bien_etre.description}</p>
                            <p className="text-slate-700 text-sm mb-2">{fondements.details.bien_etre.travail_voix}</p>
                            <ul className="list-disc list-inside space-y-1 text-slate-700 text-sm ml-2">
                                {fondements.details.bien_etre.exercices.map((exercice, index) => (
                                    <li key={index}>{exercice}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="pl-8 pr-4 py-3 bg-gradient-to-r from-[#ABA0F2]/10 to-transparent rounded-lg border-l-2 border-[#ABA0F2]">
                            <h3 className="text-base font-bold text-slate-900 mb-2">{fondements.details.lien_bebe.title}</h3>
                            {fondements.details.lien_bebe.paragraphes.map((para, index) => (
                                <p key={index} className="text-slate-700 text-sm mb-2 last:mb-0">{para}</p>
                            ))}
                        </div>

                        <div className="pl-8 pr-4 py-3 bg-gradient-to-r from-[#F2B988]/10 to-transparent rounded-lg border-l-2 border-[#F29057]">
                            <h3 className="text-base font-bold text-slate-900 mb-2">{fondements.details.naissance.title}</h3>
                            {fondements.details.naissance.paragraphes.map((para, index) => (
                                <p key={index} className="text-slate-700 text-sm mb-2 last:mb-0">{para}</p>
                            ))}
                        </div>

                        <div className="pl-8 pr-4 py-3 bg-gradient-to-r from-[#F2B988]/10 to-transparent rounded-lg border-l-2 border-[#F29057]">
                            <h3 className="text-base font-bold text-slate-900 mb-2">{fondements.details.post_natal.title}</h3>
                            {fondements.details.post_natal.paragraphes.map((para, index) => (
                                <p key={index} className="text-slate-700 text-sm mb-2 last:mb-0">{para}</p>
                            ))}
                        </div>
                    </div>
                </section>

                {/* La Psychophonie */}
                <section className="rounded-3xl border border-[#F2B988] bg-white/85 p-8 shadow-[0_25px_60px_-40px_rgba(242,90,56,0.35)]">
                    <div className="flex items-center gap-3 mb-6 pb-2 border-b border-[#F2B988]">
                        <svg className="h-5 w-5 flex-shrink-0 text-[#F29057]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <h2 className="text-2xl font-semibold text-slate-900">{psychophonie.title}</h2>
                    </div>

                    <div className="pl-8 pr-4 py-3 bg-gradient-to-r from-[#F2B988]/10 to-transparent rounded-lg border-l-2 border-[#F29057] mb-4">
                        <p className="text-slate-700 text-sm mb-2"><strong>Définition:</strong> {psychophonie.definition}</p>
                        <p className="text-slate-600 text-sm">{psychophonie.depot}</p>
                    </div>

                    <div className="pl-8 pr-4 py-3 bg-gradient-to-r from-[#ABA0F2]/10 to-transparent rounded-lg border-l-2 border-[#ABA0F2] mb-6 italic">
                        <p className="text-slate-700 text-sm">{psychophonie.citation}</p>
                    </div>



                    {/* Historique */}
                    <div className="mb-6">
                        <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                            <span className="w-1 h-6 bg-[#F29057] rounded-full"></span>
                            {psychophonie.historique.title}
                        </h3>

                        <div className="pl-8 pr-4 py-3 bg-gradient-to-r from-[#F2B988]/10 to-transparent rounded-lg border-l-2 border-[#F29057] mb-3">
                            <p className="text-slate-700 text-sm mb-1">
                                <strong>{psychophonie.historique.fondatrice.nom}</strong>
                                ({psychophonie.historique.fondatrice.naissance} - {psychophonie.historique.fondatrice.deces})
                            </p>
                            <p className="text-slate-600 text-sm">
                                {psychophonie.historique.fondatrice.profession}
                            </p>
                        </div>


                        {/* Imagen 1 */}
                        <div className="pl-8 mb-4 flex justify-center">
                            <div className="w-full max-w-[600px] aspect-[3/2] bg-slate-200 rounded-lg overflow-hidden">
                                <img
                                    src="https://via.placeholder.com/600x400"
                                    alt="Imagen histórica ilustrativa"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>


                        <div className="space-y-3">
                            <div className="pl-8 pr-4 py-3 bg-gradient-to-r from-[#F2B988]/10 to-transparent rounded-lg border-l-2 border-[#F29057]">
                                <p className="text-slate-700 leading-relaxed text-sm">
                                    {psychophonie.historique.decouverte}
                                </p>
                            </div>

                            <div className="pl-8 pr-4 py-3 bg-gradient-to-r from-[#F2B988]/10 to-transparent rounded-lg border-l-2 border-[#F29057]">
                                <p className="text-slate-700 leading-relaxed text-sm">
                                    {psychophonie.historique.correspondance}
                                </p>
                            </div>

                            {/* Imagen 2 */}
                            <div className="pl-8 my-4 flex justify-center">
                                <div className="w-full max-w-[600px] aspect-[3/2] bg-slate-200 rounded-lg overflow-hidden">
                                    <img
                                        src="https://via.placeholder.com/600x400"
                                        alt="Imagen pedagógica ilustrativa"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>


                            <div className="pl-8 pr-4 py-3 bg-gradient-to-r from-[#F2B988]/10 to-transparent rounded-lg border-l-2 border-[#F29057]">
                                <p className="text-slate-700 leading-relaxed text-sm">
                                    {psychophonie.historique.pedagogie}
                                </p>
                            </div>
                        </div>
                    </div>


                    {/* Présentation par Marie Louise Aucher */}
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-4">
                            {psychophonie.presentation_marie_louise.title}
                        </h3>

                        <div className="space-y-6 text-slate-700 leading-relaxed">

                            <p>
                                <strong>{psychophonie.presentation_marie_louise.definition_methode}</strong>
                            </p>

                            {/* Imagen 1 - Derecha */}
                            <div className="flex justify-center">
                                <div className="w-full max-w-[600px] aspect-[3/2] bg-slate-200 rounded-lg overflow-hidden">
                                    <img
                                        src="https://via.placeholder.com/600x400"
                                        alt="Illustration méthode"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>

                            <ul className="list-disc list-inside space-y-2 ml-4">
                                {psychophonie.presentation_marie_louise.aspects.map((aspect, index) => (
                                    <li key={index}>{aspect}</li>
                                ))}
                            </ul>

                            <p>{psychophonie.presentation_marie_louise.receptivite}</p>
                            <p>{psychophonie.presentation_marie_louise.conscience}</p>

                            {/* Imagen 2 - Izquierda */}
                            <div className="flex justify-center">
                                <div className="w-full max-w-[600px] aspect-[3/2] bg-slate-200 rounded-lg overflow-hidden">
                                    <img
                                        src="https://via.placeholder.com/600x400"
                                        alt="Illustration conscience corporelle"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>

                            <p>{psychophonie.presentation_marie_louise.sens_recepteurs}</p>

                            <p className="p-4 bg-[#ABA0F2]/10 rounded-xl">
                                {psychophonie.presentation_marie_louise.corps_instrument}
                            </p>

                            <p>{psychophonie.presentation_marie_louise.echelle_corps}</p>

                            {/* Imagen 3 - Derecha */}
                            <div className="flex justify-center">
                                <div className="w-full max-w-[600px] aspect-[3/2] bg-slate-200 rounded-lg overflow-hidden">
                                    <img
                                        src="https://via.placeholder.com/600x400"
                                        alt="Illustration souffle et voix"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>

                            <p className="p-4 bg-[#F2B988]/20 rounded-xl">
                                {psychophonie.presentation_marie_louise.acupuncture}
                            </p>

                            <p>{psychophonie.presentation_marie_louise.emission}</p>
                            <p>{psychophonie.presentation_marie_louise.souffle}</p>
                            <p>{psychophonie.presentation_marie_louise.plages_sensation}</p>
                            <p>{psychophonie.presentation_marie_louise.professeur_husson}</p>
                            <p>{psychophonie.presentation_marie_louise.onomatopees}</p>
                            <p>{psychophonie.presentation_marie_louise.respiration}</p>
                            <p>{psychophonie.presentation_marie_louise.neuropsychiatrie}</p>
                            <p>{psychophonie.presentation_marie_louise.hopitaux}</p>
                            <p>{psychophonie.presentation_marie_louise.collectivites}</p>

                            <p className="p-4 bg-gradient-to-r from-[#F2B988]/20 to-[#ABA0F2]/10 rounded-xl italic">
                                {psychophonie.presentation_marie_louise.conclusion}
                            </p>

                            <p className="text-center font-bold text-[#F25A38] text-lg p-4">
                                {psychophonie.presentation_marie_louise.pont}
                            </p>
                        </div>
                    </div>

                </section>

                {/* Bibliographie */}
                <section className="rounded-3xl border border-[#F2B988] bg-white/85 p-8 shadow-[0_25px_60px_-40px_rgba(242,90,56,0.35)]">
                    <div className="flex items-center gap-3 mb-6 pb-2 border-b border-[#F2B988]">
                        <svg className="h-5 w-5 flex-shrink-0 text-[#F29057]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <h2 className="text-2xl font-semibold text-slate-900">{bibliographie.title}</h2>
                    </div>
                    <div className="text-center mb-6">
                        <p className="text-base font-semibold text-[#F25A38]">{bibliographie.subtitle_1}</p>
                        <p className="text-sm text-slate-600 italic">{bibliographie.subtitle_2}</p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <span className="w-1 h-6 bg-[#F29057] rounded-full"></span>
                            Bibliographie
                        </h3>

                        <p className="text-base text-slate-700 mb-4 font-medium">{bibliographie.intro}</p>

                        <div className="grid md:grid-cols-2 gap-4 mb-8">
                            {bibliographie.livres.map((livre, index) => (
                                <div key={index} className={`p-3 bg-gradient-to-r ${index % 2 === 0 ? 'from-[#ABA0F2]/5' : 'from-[#F2B988]/10'} to-transparent rounded-xl border-l-4 ${index % 2 === 0 ? 'border-[#ABA0F2]' : 'border-[#F2B988]'}`}>
                                    <p className="font-semibold text-slate-800 text-sm">{livre.titre}</p>
                                    <p className="text-xs text-slate-600 mt-1">{livre.editeur}</p>
                                    <p className="text-xs text-slate-500 mt-1">ISBN {livre.isbn}</p>
                                </div>
                            ))}
                        </div>

                        <h3 className="text-lg font-bold text-slate-900 mb-4 mt-6 flex items-center gap-2">
                            <span className="w-1 h-6 bg-[#F29057] rounded-full"></span>
                            {bibliographie.autres_parutions.title}
                        </h3>

                        <div className="grid md:grid-cols-2 gap-4 mb-8">
                            {bibliographie.autres_parutions.livres.map((livre, index) => (
                                <div key={index} className="p-3 bg-gradient-to-r from-[#F29057]/5 to-transparent rounded-xl border-l-4 border-[#F29057]">
                                    <p className="font-semibold text-slate-800 text-sm">{livre.titre}</p>
                                    <p className="text-xs text-slate-700 mt-1">{livre.auteur}</p>
                                    {livre.direction && <p className="text-xs text-slate-600 italic mt-1">{livre.direction}</p>}
                                    {livre.editeur && <p className="text-xs text-slate-600 mt-1">{livre.editeur}</p>}
                                    {livre.isbn && <p className="text-xs text-slate-500 mt-1">ISBN {livre.isbn}</p>}
                                    {livre.note && <p className="text-xs text-slate-500 mt-1">{livre.note}</p>}
                                    {livre.lien && (
                                        <a href={livre.lien} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-[#F25A38] hover:text-[#732514] mt-2 font-medium">
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                                            </svg>
                                            {livre.lien_text}
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>

                        <h3 className="text-lg font-bold text-slate-900 mb-4 mt-6 flex items-center gap-2">
                            <span className="w-1 h-6 bg-[#F29057] rounded-full"></span>
                            {bibliographie.partitions.title}
                        </h3>

                        <div className="space-y-3">
                            {bibliographie.partitions.items.map((partition, index) => (
                                <div key={index} className="pl-8 pr-4 py-3 bg-gradient-to-r from-[#F2B988]/10 to-transparent rounded-lg border-l-2 border-[#F29057]">
                                    <p className="font-semibold text-slate-800 text-sm">{partition.titre}</p>
                                    <p className="text-xs text-slate-600 italic mt-1">{partition.description}</p>
                                    <p className="text-xs text-slate-700 mt-1">{partition.auteur}</p>
                                    <p className="text-xs text-slate-600 mt-1">{partition.editeur}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}

