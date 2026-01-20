import agendaNext from '@/utils/agenda/agendaProximosTaller.json';

const formatLocation = (location) => {
    if (!location) return null;
    const parts = [];
    if (location.place) parts.push(location.place);
    if (location.address) parts.push(location.address);
    const cityLine = [location.postalCode, location.city].filter(Boolean).join(' ');
    if (cityLine) parts.push(cityLine);
    if (location.metro) parts.push(`Métro ${Array.isArray(location.metro) ? location.metro.join(' / ') : location.metro}`);
    return parts.join(' · ');
};

const ContactBlock = ({ contact }) => (
    <div className="rounded-2xl border border-slate-100 bg-white/60 p-4 text-sm text-slate-600">
        <p className="text-xs uppercase tracking-[0.3em] text-[#F29057]">Contact</p>
        {contact?.name && <p className="mt-1 font-semibold text-slate-900">{contact.name}</p>}
        <p className="mt-2 space-y-1">
            {contact?.email && <span className="block">{contact.email}</span>}
            {contact?.phone && <span className="block">{contact.phone}</span>}
        </p>
    </div>
);

const Pill = ({ children }) => (
    <span className="rounded-full border border-[#F2B988] bg-[#F2B988]/20 px-3 py-1 text-xs font-semibold text-[#F25A38]">
        {children}
    </span>
);

export const metadata = {
    title: agendaNext.meta.title,
    description: agendaNext.meta.organisation,
};

export default function AgendaProchainsAteliersPage() {
    const { meta, media, contactGeneral, cours, agenda } = agendaNext;

    return (
        <main className="px-4 py-12">
            <div className="mx-auto max-w-6xl space-y-10">
                <header className="rounded-3xl border border-[#F2B988] bg-gradient-to-br from-white via-[#F2B988]/20 to-[#ABA0F2]/10 p-8 shadow-sm">
                    <p className="text-xs uppercase tracking-[0.35em] text-[#F29057]">{meta.organisation}</p>
                    <h1 className="mt-3 text-3xl font-semibold text-slate-900">{meta.title}</h1>
                    <p className="mt-2 text-sm text-slate-600">Agenda vivant des ateliers, cours et rendez-vous personnalisés.</p>
                    <div className="mt-6 grid gap-4 md:grid-cols-[2fr_1fr]">
                        <div className="rounded-2xl border border-slate-100 bg-white/60 p-4">
                            <p className="text-xs uppercase tracking-[0.3em] text-[#F29057]">Instagram</p>
                            <p className="mt-2 text-lg font-semibold text-slate-900">@{contactGeneral.instagram}</p>
                            <p className="mt-2 text-sm text-slate-600">Suivez les coulisses des ateliers, annonces de nouvelles dates et coulées sonores.</p>
                        </div>
                        <ContactBlock contact={contactGeneral.contact} />
                    </div>
                </header>

                {media?.length ? (
                    <section className="rounded-3xl border border-[#F2B988] bg-white/80 p-6">
                        <p className="text-xs uppercase tracking-[0.3em] text-[#F29057]">À écouter</p>
                        <h2 className="mt-2 text-2xl font-semibold text-slate-900">Sélection média</h2>
                        <div className="mt-6 grid gap-4 md:grid-cols-2">
                            {media.map((entry) => (
                                <article key={entry.title} className="rounded-2xl border border-[#F2B988] bg-[#F2B988]/20 p-5 text-sm text-slate-600">
                                    <h3 className="text-lg font-semibold text-slate-900">{entry.title}</h3>
                                    <p className="mt-2">{entry.description}</p>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {entry.type && <Pill>{entry.type}</Pill>}
                                        {entry.action && <Pill>{entry.action}</Pill>}
                                        {entry.linkLabel && (
                                            <span className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600">{entry.linkLabel}</span>
                                        )}
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>
                ) : null}

                <section className="rounded-3xl border border-rose-100 bg-white/80 p-6">
                    <div className="flex flex-col gap-2">
                        <p className="text-xs uppercase tracking-[0.3em] text-rose-400">Cours à la carte</p>
                        <h2 className="text-2xl font-semibold text-slate-900">Sessions individuelles</h2>
                        <p className="text-sm text-slate-600">Programmez votre rendez-vous et recevez un accompagnement sur-mesure.</p>
                    </div>
                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                        {cours.map((session) => (
                            <article key={session.title} className="rounded-2xl border border-slate-100 bg-white/70 p-5">
                                <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-rose-400">
                                    <span>{session.type}</span>
                                    <span>{session.mode}</span>
                                </div>
                                <h3 className="mt-3 text-xl font-semibold text-slate-900">{session.title}</h3>
                                <p className="mt-1 text-sm text-slate-600">{session.appointment}</p>
                                {session.contact && (
                                    <div className="mt-4 text-sm text-slate-600">
                                        <p>{session.contact.email}</p>
                                        <p>{session.contact.phone}</p>
                                    </div>
                                )}
                            </article>
                        ))}
                    </div>
                </section>

                <section className="rounded-3xl border border-rose-100 bg-white/80 p-6">
                    <div className="flex flex-col gap-2">
                        <p className="text-xs uppercase tracking-[0.3em] text-rose-400">Semaine type</p>
                        <h2 className="text-2xl font-semibold text-slate-900">Ateliers à venir</h2>
                        <p className="text-sm text-slate-600">Consultez les créneaux ouverts, les éléments pratiques et réservez votre place.</p>
                    </div>
                    <div className="mt-6 space-y-4">
                        {agenda.map((event) => {
                            const detailChips = [
                                Array.isArray(event.time) ? event.time.join(' / ') : event.time,
                                event.mode,
                                event.price,
                                event.duration,
                                event.note,
                            ].filter(Boolean);

                            return (
                                <article key={`${event.title}-${event.date ?? event.time ?? event.day}`} className="rounded-2xl border border-slate-100 bg-white/70 p-5">
                                    <div className="flex flex-wrap items-baseline justify-between gap-2 text-xs uppercase tracking-[0.25em] text-rose-400">
                                        <span>{event.day ?? 'Date à confirmer'}</span>
                                        <span>{event.date ?? ''}</span>
                                    </div>
                                    <h3 className="mt-3 text-xl font-semibold text-slate-900">{event.title}</h3>
                                    <div className="mt-1 text-sm text-slate-600">
                                        {detailChips.map((detail) => (
                                            <span key={detail} className="mr-3 inline-flex items-center gap-1 text-slate-500">
                                                {detail}
                                            </span>
                                        ))}
                                    </div>
                                    {formatLocation(event.location) && (
                                        <p className="mt-3 text-sm text-slate-600">{formatLocation(event.location)}</p>
                                    )}
                                    {event.description && <p className="mt-3 text-sm text-slate-600">{event.description}</p>}
                                    {event.partner && (
                                        <p className="mt-3 text-sm text-slate-500">Partenaire : {event.partner}</p>
                                    )}
                                    {event.info && <p className="mt-3 text-sm text-slate-500">{event.info}</p>}
                                    {event.contact && (
                                        <div className="mt-3 text-sm text-slate-600">
                                            {event.contact.email && <p>{event.contact.email}</p>}
                                            {event.contact.phone && <p>{event.contact.phone}</p>}
                                        </div>
                                    )}
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {event.links?.map((link) => (
                                            <Pill key={link}>{link}</Pill>
                                        ))}
                                        {event.inscription && <Pill>{event.inscription}</Pill>}
                                        {event.link && (
                                            <span className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600">Lien</span>
                                        )}
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </section>
            </div>
        </main>
    );
}
