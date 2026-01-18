import agendaData from '@/utils/agenda/agenda.json';

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
    <span className="rounded-full border border-rose-100 bg-white/70 px-3 py-1 text-xs font-semibold text-rose-500">
        {children}
    </span>
);

const SectionCard = ({ eyebrow, title, children }) => (
    <section className="rounded-3xl border border-rose-100 bg-white/80 p-6 shadow-[0_20px_45px_-35px_rgba(15,23,42,0.35)]">
        <div className="mb-6 space-y-2">
            {eyebrow && <p className="text-xs uppercase tracking-[0.3em] text-rose-400">{eyebrow}</p>}
            <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
        </div>
        {children}
    </section>
);

export const metadata = {
    title: agendaData.meta.title,
    description: `${agendaData.meta.organisation} · ${agendaData.meta.periode}`,
};

export default function AgendaStagesEtFormationsPage() {
    const { meta, media, documents, formations, international, modules } = agendaData;

    return (
        <main className="px-4 py-12">
            <div className="mx-auto max-w-6xl space-y-10">
                <header className="rounded-3xl border border-rose-100 bg-gradient-to-br from-white via-rose-50/70 to-indigo-50/60 p-8 shadow-sm">
                    <p className="text-xs uppercase tracking-[0.35em] text-rose-400">{meta.organisation}</p>
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

                {media?.length ? (
                    <SectionCard eyebrow="À diffuser" title="Sélection média">
                        <div className="grid gap-4 md:grid-cols-2">
                            {media.map((entry) => (
                                <article
                                    key={entry.title}
                                    className="rounded-2xl border border-rose-50 bg-rose-50/60 p-5 text-sm text-slate-700"
                                >
                                    <div className="flex items-center justify-between text-xs uppercase text-rose-400">
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

                <SectionCard eyebrow="Programme principal" title="Formations & stages">
                    <div className="grid gap-5 lg:grid-cols-2">
                        {formations.map((item, index) => {
                            const dateLabel = formatDateLabel(item);
                            const locationLabel = formatLocation(item.location);
                            const key = `${item.title}-${dateLabel ?? 'na'}-${index}`;

                            return (
                                <article key={key} className="rounded-2xl border border-slate-100 bg-white/70 p-5">
                                    <div className="flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-widest text-rose-400">
                                        <span>{item.type?.replace(/-/g, ' ') ?? 'session'}</span>
                                        <span>{dateLabel}</span>
                                    </div>
                                    <h3 className="mt-3 text-xl font-semibold text-slate-900">{item.title}</h3>
                                    {item.description && <p className="mt-2 text-sm text-slate-600">{item.description}</p>}
                                    <dl className="mt-4 space-y-2 text-sm text-slate-700">
                                        {item.time && (
                                            <div className="flex items-center justify-between">
                                                <dt className="text-slate-500">Horaire</dt>
                                                <dd>{item.time}</dd>
                                            </div>
                                        )}
                                        {locationLabel && (
                                            <div className="flex items-center justify-between">
                                                <dt className="text-slate-500">Lieu</dt>
                                                <dd className="text-right">{locationLabel}</dd>
                                            </div>
                                        )}
                                        {item.formatrice && (
                                            <div className="flex items-center justify-between">
                                                <dt className="text-slate-500">Formatrice</dt>
                                                <dd>{item.formatrice}</dd>
                                            </div>
                                        )}
                                        {item.intervenants && (
                                            <div>
                                                <dt className="text-slate-500">Intervenants</dt>
                                                <dd className="mt-1 flex flex-col gap-1 text-right">
                                                    {Object.entries(item.intervenants).map(([role, name]) => (
                                                        <span key={role} className="capitalize">{role} · {name}</span>
                                                    ))}
                                                </dd>
                                            </div>
                                        )}
                                        {item.contact && (
                                            <div>
                                                <dt className="text-slate-500">Contact</dt>
                                                <dd className="mt-1 text-right">{formatContact(item.contact)}</dd>
                                            </div>
                                        )}
                                    </dl>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {item.qualifications?.map((qualification) => (
                                            <Pill key={qualification}>{qualification}</Pill>
                                        ))}
                                        {item.links?.map((link) => (
                                            <span
                                                key={link}
                                                className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600"
                                            >
                                                {link}
                                            </span>
                                        ))}
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </SectionCard>

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
        </main>
    );
}
