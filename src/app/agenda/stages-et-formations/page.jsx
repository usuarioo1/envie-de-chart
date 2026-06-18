import agendaData from '@/utils/agenda/agenda.json';
import DynamicStagesSection from '@/components/DynamicStagesSection';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { getPublicStages } from '@/lib/publicData';
import { breadcrumbJsonLd, eventsJsonLd } from '@/lib/structuredData';

const formatDateLabel = (session) => {
    if (session.date) return session.date;
    if (session.dates) {
        const { start, end } = session.dates;
        return end ? `${start} → ${end}` : start;
    }
    if (session.year) return session.year;
    return 'Dates à confirmer';
};

const formatLocation = (location) => {
    if (!location) return null;
    if (typeof location === 'string') return location;
    const parts = [];
    if (location.place) parts.push(location.place);
    if (location.address) parts.push(location.address);
    const cityLine = [location.postalCode, location.city].filter(Boolean).join(' ');
    if (cityLine) parts.push(cityLine);
    if (location.transport) parts.push(location.transport);
    return parts.join(' · ');
};

const formatContact = (contact) => {
    if (!contact) return null;
    return [contact.email, contact.phone].filter(Boolean).join(' · ');
};

const Pill = ({ children }) => (
    <span className="rounded-full border border-[#F2B988] bg-white/70 px-3 py-1 text-xs font-semibold text-[#F25A38]">
        {children}
    </span>
);

const SectionCard = ({ eyebrow, title, children }) => (
    <section className="pb-8 mb-8 border-b border-[#F2B988]/30 last:border-b-0 last:pb-0 last:mb-0">
        <div className="mb-6 space-y-2">
            {eyebrow && <p className="text-xs uppercase tracking-[0.3em] text-[#F29057]">{eyebrow}</p>}
            <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
        </div>
        {children}
    </section>
);

export const metadata = {
    title: agendaData.meta.title,
    description: `${agendaData.meta.organisation} · ${agendaData.meta.periode}`,
    alternates: {
        canonical: '/agenda/stages-et-formations',
    },
};

export default async function AgendaStagesEtFormationsPage() {
    const { meta, media, documents, formations, international, modules } = agendaData;
    const stages = await getPublicStages();

    return (
        <main className="px-4 py-12 bg-gradient-to-b from-[#ABA0F2]/10 via-white to-[#F2B988]/20 min-h-screen">
            <JsonLd data={breadcrumbJsonLd([
                { name: 'Accueil', path: '/' },
                { name: 'Agenda', path: '/agenda/calendrier' },
                { name: 'Stages et formations', path: '/agenda/stages-et-formations' },
            ])} />
            <JsonLd data={eventsJsonLd([], stages)} />
            <div className="mx-auto max-w-6xl">
                {/* Contenedor unificado */}
                <div className="rounded-3xl border-2 border-[#F2B988] bg-white/80 shadow-[0_20px_50px_-20px_rgba(242,90,56,0.25)] overflow-hidden">

                    <header className="bg-gradient-to-br from-white via-[#F2B988]/20 to-[#ABA0F2]/10 p-8 border-b-2 border-[#F2B988]/30">
                        <p className="text-xs uppercase tracking-[0.35em] text-[#F29057]">{meta.organisation}</p>
                        <h1 className="mt-3 text-3xl font-semibold text-slate-900">{meta.title}</h1>
                        <p className="mt-1 text-sm text-slate-600">Programme {meta.periode}</p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            {documents?.map((doc) => (
                                <span key={doc.title} className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700">
                                    {doc.title} · {doc.type}
                                </span>
                            ))}
                        </div>
                    </header>

                    {/* Contenido interno */}
                    <div className="p-8 space-y-0">
                        {/* Botón para ver el calendario */}
                        <div className="flex justify-center mb-8 pb-8 border-b border-[#F2B988]/30">
                            <Link 
                                href="/agenda/calendrier"
                                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#F25A38] to-[#F29057] text-white font-semibold text-lg rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span>Voir toutes les dates au calendrier</span>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>

                        {/* Dynamic Stages from Database */}
                        <DynamicStagesSection initialStages={stages} />

                        {media?.length ? (
                            <SectionCard eyebrow="À diffuser" title="Sélection média">
                                <div className="grid gap-4 md:grid-cols-2">
                                    {media.map((entry) => (
                                        <article
                                            key={entry.title}
                                            className="rounded-2xl border border-[#F2B988] bg-[#F2B988]/20 p-5 text-sm text-slate-700"
                                        >
                                            <div className="flex items-center justify-between text-xs uppercase text-[#F29057]">
                                                <span>{entry.type}</span>
                                                {(entry.date || entry.time) && (
                                                    <span>
                                                        {[entry.date, entry.time].filter(Boolean).join(' · ')}
                                                    </span>
                                                )}
                                            </div>
                                            <h3 className="mt-2 text-lg font-semibold text-slate-900">{entry.title}</h3>
                                            <p className="mt-2 text-slate-600">{entry.description}</p>
                                            {entry.action && <Pill>{entry.action}</Pill>}
                                        </article>
                                    ))}
                                </div>
                            </SectionCard>
                        ) : null}

                        

                        {international?.length ? (
                            <SectionCard eyebrow="Présence internationale" title="Tournées & partenariats">
                                <div className="grid gap-4 md:grid-cols-2">
                                    {international.map((entry) => (
                                        <article key={entry.title} className="rounded-2xl border border-slate-100 bg-white/70 p-5">
                                            <div className="text-xs uppercase tracking-[0.35em] text-rose-400">
                                                {entry.country}
                                            </div>
                                            <h3 className="mt-2 text-lg font-semibold text-slate-900">{entry.title}</h3>
                                            <p className="text-sm text-slate-600">{[entry.city, entry.cities?.join(', '), entry.date, entry.year]
                                                .filter(Boolean)
                                                .join(' · ')}</p>
                                            {entry.description && <p className="mt-2 text-sm text-slate-600">{entry.description}</p>}
                                            {entry.contact && (
                                                <p className="mt-3 text-sm text-slate-500">{formatContact(entry.contact)}</p>
                                            )}
                                        </article>
                                    ))}
                                </div>
                            </SectionCard>
                        ) : null}

                        {modules?.length ? (
                            <SectionCard eyebrow="Parcours" title="Modules complémentaires">
                                <div className="grid gap-4 md:grid-cols-2">
                                    {modules.map((module) => (
                                        <article key={module.title} className="rounded-2xl border border-slate-100 bg-white/70 p-5">
                                            <div className="text-xs uppercase tracking-[0.35em] text-rose-400">
                                                {module.year ?? 'Cycle continu'}
                                            </div>
                                            <h3 className="mt-2 text-lg font-semibold text-slate-900">{module.title}</h3>
                                            <p className="text-sm text-slate-600">{[module.module, module.modules?.join(', '), module.mode]
                                                .filter(Boolean)
                                                .join(' · ')}</p>
                                            {module.condition && <p className="mt-2 text-sm text-slate-600">{module.condition}</p>}
                                            {module.location && (
                                                <p className="mt-2 text-sm text-slate-600">{formatLocation(module.location)}</p>
                                            )}
                                            <div className="mt-3 flex flex-wrap gap-2">
                                                {module.qualifications?.map((qualification) => (
                                                    <Pill key={qualification}>{qualification}</Pill>
                                                ))}
                                                {module.formatrice && (
                                                    <span className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600">
                                                        {module.formatrice}
                                                    </span>
                                                )}
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </SectionCard>
                        ) : null}
                    </div>
                </div>
            </div>
        </main>
    );
}
