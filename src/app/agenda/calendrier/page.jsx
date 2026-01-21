'use client';
import { useState, useEffect } from 'react';
import agendaData from '@/utils/agenda/agenda.json';
import agendaNext from '@/utils/agenda/agendaProximosTaller.json';

const formatFormationDate = (item) => {
    if (item.date) return item.date;
    if (item.dates) {
        const { start, end } = item.dates;
        return end ? `${start} → ${end}` : start;
    }
    if (item.year) return `${item.year}`;
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
    if (location.metro) {
        const metro = Array.isArray(location.metro) ? location.metro.join(' / ') : location.metro;
        parts.push(`Métro ${metro}`);
    }
    return parts.join(' · ');
};

const TimelineCard = ({ eyebrow, title, date, children }) => (
    <article className="relative rounded-3xl border border-[#F2B988] bg-white/80 p-5">
        <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.35em] text-[#F29057]">
            <span>{eyebrow}</span>
            <span>{date}</span>
        </div>
        <h3 className="mt-3 text-xl font-semibold text-slate-900">{title}</h3>
        <div className="mt-2 text-sm text-slate-600">{children}</div>
    </article>
);

export default function AgendaCalendrierPage() {
    const formations = agendaData.formations;
    const ateliers = agendaNext.agenda;
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await fetch('/api/events');
            const data = await response.json();
            if (data.success) {
                setEvents(data.data);
            }
        } catch (err) {
            console.error('Error fetching events:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="px-4 py-12">
            <div className="mx-auto max-w-6xl space-y-10">
                <header className="rounded-3xl border border-[#F2B988] bg-gradient-to-br from-white via-[#F2B988]/20 to-[#ABA0F2]/10 p-8 shadow-sm">
                    <p className="text-xs uppercase tracking-[0.35em] text-[#F29057]">Envie de Chanter</p>
                    <h1 className="mt-3 text-3xl font-semibold text-slate-900">Calendrier des ateliers et stages</h1>
                    <p className="mt-2 text-sm text-slate-600">
                        Synthèse des programmes : retrouvez d&apos;un coup d&apos;œil les formations longues, les stages intensifs et les ateliers hebdomadaires.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3 text-xs text-slate-500">
                        <span className="rounded-full border border-slate-200 px-3 py-1">Formations</span>
                        <span className="rounded-full border border-slate-200 px-3 py-1">Ateliers hebdos</span>
                        <span className="rounded-full border border-slate-200 px-3 py-1">Rendez-vous en ligne</span>
                    </div>
                </header>

                <section className="space-y-6 rounded-3xl border border-[#F2B988] bg-white/80 p-6">
                    <div className="flex flex-col gap-2">
                        <p className="text-xs uppercase tracking-[0.35em] text-[#F29057]">Formations & stages</p>
                        <h2 className="text-2xl font-semibold text-slate-900">Parcours 2025-2026</h2>
                    </div>
                    <div className="grid gap-5 lg:grid-cols-2">
                        {formations.map((item) => (
                            <TimelineCard
                                key={`formation-${item.title}-${formatFormationDate(item)}`}
                                eyebrow={item.type?.replace(/-/g, ' ') ?? 'Session'}
                                date={formatFormationDate(item)}
                                title={item.title}
                            >
                                <div className="space-y-2">
                                    {item.description && <p>{item.description}</p>}
                                    {item.time && <p>Horaires : {item.time}</p>}
                                    {formatLocation(item.location) && <p>Lieu : {formatLocation(item.location)}</p>}
                                    {item.formatrice && <p>Avec {item.formatrice}</p>}
                                    {item.qualifications?.length && (
                                        <p className="text-[#F25A38]">{item.qualifications.join(' · ')}</p>
                                    )}
                                </div>
                            </TimelineCard>
                        ))}
                    </div>
                </section>

                <section className="space-y-6 rounded-3xl border border-[#F2B988] bg-white/80 p-6">
                    <div className="flex flex-col gap-2">
                        <p className="text-xs uppercase tracking-[0.35em] text-[#F29057]">Ateliers hebdomadaires</p>
                        <h2 className="text-2xl font-semibold text-slate-900">Planning à venir</h2>
                    </div>
                    <div className="space-y-4">
                        {ateliers.map((event, index) => (
                            <TimelineCard
                                key={`atelier-${event.title}-${event.date ?? event.day ?? index}`}
                                eyebrow={event.day ?? 'À confirmer'}
                                date={event.date ?? event.time ?? ''}
                                title={event.title}
                            >
                                <div className="space-y-2">
                                    {event.mode && <p>Format : {event.mode}</p>}
                                    {event.time && !Array.isArray(event.time) && <p>Horaire : {event.time}</p>}
                                    {Array.isArray(event.time) && <p>Horaires : {event.time.join(' / ')}</p>}
                                    {event.price && <p>Tarif : {event.price}</p>}
                                    {event.duration && <p>Durée : {event.duration}</p>}
                                    {event.note && <p>{event.note}</p>}
                                    {event.description && <p>{event.description}</p>}
                                    {formatLocation(event.location) && <p>Lieu : {formatLocation(event.location)}</p>}
                                    {event.contact && (
                                        <p>
                                            Contact : {[event.contact.email, event.contact.phone].filter(Boolean).join(' · ')}
                                        </p>
                                    )}
                                    {event.links?.length && (
                                        <p className="text-[#F25A38]">{event.links.join(' · ')}</p>
                                    )}
                                </div>
                            </TimelineCard>
                        ))}
                    </div>
                </section>

                {/* Events from Database */}
                <section className="space-y-6 rounded-3xl border border-[#F2B988] bg-white/80 p-6">
                    <div className="flex flex-col gap-2">
                        <p className="text-xs uppercase tracking-[0.35em] text-[#F29057]">Événements créés par les utilisateurs</p>
                        <h2 className="text-2xl font-semibold text-slate-900">Événements de la communauté</h2>
                    </div>
                    
                    {loading ? (
                        <p className="text-center text-gray-500">Chargement des événements...</p>
                    ) : events.length === 0 ? (
                        <p className="text-center text-gray-500">Aucun événement créé pour le moment. Créez-en un depuis le tableau de bord !</p>
                    ) : (
                        <div className="grid gap-5 lg:grid-cols-2">
                            {events.map((event) => (
                                <TimelineCard
                                    key={event._id}
                                    eyebrow="Événement communautaire"
                                    date={new Date(event.date).toLocaleDateString('fr-FR')}
                                    title={event.title}
                                >
                                    <div className="space-y-2">
                                        <p>{event.description}</p>
                                        <p>📍 Lieu : {event.location}</p>
                                        <p>💰 Tarif : {event.price}€</p>
                                        <p>📅 {new Date(event.date).toLocaleString('fr-FR', { 
                                            dateStyle: 'long', 
                                            timeStyle: 'short' 
                                        })}</p>
                                        {event.createdBy && (
                                            <p className="text-[#F25A38]">Créé par : {event.createdBy.name}</p>
                                        )}
                                    </div>
                                </TimelineCard>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}
