'use client';

import { useState, useEffect, useCallback } from 'react';
import WorkshopCard from '@/components/WorkshopCard';
import StageCard from '@/components/StageCard';
import { createDisplayDate } from '@/utils/dateUtils';

function parseStageDate(dateString) {
    if (!dateString) return new Date();

    const dateMatch = dateString.match(/(\d{1,2})[-\/](\d{1,2})[-\/](\d{4})/);
    if (dateMatch) {
        const [, day, month, year] = dateMatch;
        return new Date(year, month - 1, day);
    }

    const parsedDate = new Date(dateString);
    return isNaN(parsedDate) ? new Date() : parsedDate;
}

function buildEvents(workshops, stages) {
    const now = new Date();
    return [
        ...workshops
            .filter(workshop => createDisplayDate(workshop.date) >= now)
            .map(workshop => ({
                ...workshop,
                type: 'workshop',
                startDate: createDisplayDate(workshop.date)
            })),
        ...stages.map(stage => ({
            ...stage,
            type: 'stage',
            startDate: parseStageDate(stage.date)
        }))
    ].sort((a, b) => a.startDate - b.startDate);
}

const UnifiedCalendar = ({ initialWorkshops = null, initialStages = null }) => {
    const hasInitialData = initialWorkshops !== null && initialStages !== null;
    const [events, setEvents] = useState(() => buildEvents(initialWorkshops || [], initialStages || []));
    const [loading, setLoading] = useState(!hasInitialData);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('all'); // 'all', 'workshops', 'stages'
    const [viewMode, setViewMode] = useState('calendar'); // 'calendar', 'list'
    const [selectedDayKey, setSelectedDayKey] = useState(null);

    const fetchAllEvents = useCallback(async () => {
        try {
            setLoading(true);

            // Fetch workshops and stages in parallel
            const [workshopsResponse, stagesResponse] = await Promise.all([
                fetch('/api/workshops'),
                fetch('/api/stages?status=published')
            ]);

            const workshopsData = await workshopsResponse.json();
            const stagesData = await stagesResponse.json();

            // Combine and normalize events
            const allEvents = [];

            // Add workshops
            if (workshopsData.success) {
                const now = new Date();
                const upcomingWorkshops = workshopsData.data
                    .filter(workshop => createDisplayDate(workshop.date) >= now)
                    .map(workshop => ({
                        ...workshop,
                        type: 'workshop',
                        startDate: createDisplayDate(workshop.date)
                    }));
                allEvents.push(...upcomingWorkshops);
            }

            // Add stages
            if (stagesData.success) {
                const normalizedStages = stagesData.data.map(stage => ({
                    ...stage,
                    type: 'stage',
                    startDate: parseStageDate(stage.date)
                }));
                allEvents.push(...normalizedStages);
            }

            // Sort by date
            allEvents.sort((a, b) => a.startDate - b.startDate);

            setEvents(allEvents);
        } catch (err) {
            console.error('Error fetching events:', err);
            setError('Erreur lors du chargement des événements');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (hasInitialData) return;
        fetchAllEvents();
    }, [fetchAllEvents, hasInitialData]);

    useEffect(() => {
        setSelectedDayKey(null);
    }, [filter]);

    const getDayKey = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const getMonthKey = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        return `${year}-${month}`;
    };

    const parseDayKey = (dayKey) => {
        const [year, month, day] = dayKey.split('-').map(Number);
        return new Date(year, month - 1, day);
    };

    const filteredEvents = events.filter(event => {
        if (filter === 'all') return true;
        return event.type === filter.slice(0, -1);
    });

    const groupEventsByMonth = (items) => {
        const grouped = {};

        items.forEach(event => {
            const monthYear = event.startDate.toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long'
            });

            if (!grouped[monthYear]) {
                grouped[monthYear] = [];
            }
            grouped[monthYear].push(event);
        });

        return grouped;
    };

    const groupedEvents = groupEventsByMonth(filteredEvents);

    const eventsByDay = filteredEvents.reduce((acc, event) => {
        const key = getDayKey(event.startDate);
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(event);
        return acc;
    }, {});

    const monthKeys = Array.from(new Set(filteredEvents.map(event => getMonthKey(event.startDate))))
        .sort((a, b) => new Date(`${a}-01`) - new Date(`${b}-01`));

    const buildMonthCells = (monthDate) => {
        const year = monthDate.getFullYear();
        const monthIndex = monthDate.getMonth();
        const firstDay = new Date(year, monthIndex, 1);
        const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
        const startOffset = (firstDay.getDay() + 6) % 7;
        const cells = [];

        for (let i = 0; i < startOffset; i += 1) {
            cells.push(null);
        }

        for (let day = 1; day <= daysInMonth; day += 1) {
            cells.push({
                date: new Date(year, monthIndex, day),
                dayNumber: day
            });
        }

        while (cells.length % 7 !== 0) {
            cells.push(null);
        }

        return cells;
    };

    if (loading) {
        return (
            <div className="space-y-8">
                <div className="animate-pulse">
                    <div className="h-12 bg-gray-200 rounded-lg w-64 mb-4"></div>
                    <div className="h-8 bg-gray-200 rounded-lg w-96 mb-8"></div>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-64 bg-gray-200 rounded-2xl"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
                <p className="text-red-600">{error}</p>
                <button
                    onClick={fetchAllEvents}
                    className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                    Réessayer
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header and Filters */}
            <div className="space-y-6">
                <div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-2">Calendrier</h2>
                    <p className="text-lg text-gray-600">
                        {filteredEvents.length} événement{filteredEvents.length > 1 ? 's' : ''} à venir
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all ${filter === 'all'
                            ? 'bg-gradient-to-r from-[#F25A38] to-[#F29057] text-white shadow-lg'
                            : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-[#F29057]'
                            }`}
                    >
                        Tous les événements
                    </button>
                    <button
                        onClick={() => setFilter('workshops')}
                        className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all ${filter === 'workshops'
                            ? 'bg-gradient-to-r from-[#F25A38] to-[#F29057] text-white shadow-lg'
                            : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-[#F29057]'
                            }`}
                    >
                        Ateliers
                    </button>
                    <button
                        onClick={() => setFilter('stages')}
                        className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all ${filter === 'stages'
                            ? 'bg-gradient-to-r from-[#F25A38] to-[#F29057] text-white shadow-lg'
                            : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-[#F29057]'
                            }`}
                    >
                        Stages & Formations
                    </button>
                </div>

                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={() => setViewMode('calendar')}
                        className={`px-5 py-2 rounded-full font-semibold text-xs uppercase tracking-wide transition-all ${viewMode === 'calendar'
                            ? 'bg-gray-900 text-white shadow-lg'
                            : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-gray-400'
                            }`}
                    >
                        Vue calendrier
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`px-5 py-2 rounded-full font-semibold text-xs uppercase tracking-wide transition-all ${viewMode === 'list'
                            ? 'bg-gray-900 text-white shadow-lg'
                            : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-gray-400'
                            }`}
                    >
                        Vue liste
                    </button>
                </div>
            </div>

            {/* Events by Month */}
            {filteredEvents.length === 0 ? (
                <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-200">
                    <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-gray-500 text-lg">Aucun événement disponible</p>
                </div>
            ) : (
                <div className="space-y-12">
                    {viewMode === 'calendar' ? (
                        monthKeys.map(monthKey => {
                            const [year, month] = monthKey.split('-').map(Number);
                            const monthDate = new Date(year, month - 1, 1);
                            const monthLabel = monthDate.toLocaleDateString('fr-FR', {
                                year: 'numeric',
                                month: 'long'
                            });
                            const monthEvents = filteredEvents.filter(event => getMonthKey(event.startDate) === monthKey);
                            const cells = buildMonthCells(monthDate);
                            const selectedDate = selectedDayKey ? parseDayKey(selectedDayKey) : null;
                            const isSelectedInMonth = selectedDate
                                && selectedDate.getFullYear() === year
                                && selectedDate.getMonth() === month - 1;
                            const selectedEvents = isSelectedInMonth ? (eventsByDay[selectedDayKey] || []) : [];

                            return (
                                <section key={monthKey} className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <h2 className="text-2xl font-bold text-gray-900 capitalize">
                                            {monthLabel}
                                        </h2>
                                        <div className="flex-1 h-px bg-gradient-to-r from-[#F2B988]/50 to-transparent"></div>
                                        <span className="text-sm font-semibold text-[#F29057] bg-[#F2B988]/20 px-4 py-1 rounded-full">
                                            {monthEvents.length} événement{monthEvents.length > 1 ? 's' : ''}
                                        </span>
                                    </div>

                                    <div className="rounded-3xl border border-[#F2B988]/40 bg-white/80 p-6 shadow-[0_20px_45px_-30px_rgba(242,90,56,0.3)]">
                                        <div className="grid grid-cols-7 text-xs uppercase tracking-widest text-gray-500 mb-3">
                                            {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => (
                                                <div key={day} className="text-center font-semibold">
                                                    {day}
                                                </div>
                                            ))}
                                        </div>

                                        <div className="grid grid-cols-7 gap-2">
                                            {cells.map((cell, index) => {
                                                if (!cell) {
                                                    return <div key={`empty-${index}`} className="h-24 rounded-2xl bg-gray-50/70" />;
                                                }

                                                const dayKey = getDayKey(cell.date);
                                                const dayEvents = eventsByDay[dayKey] || [];
                                                const isSelected = selectedDayKey === dayKey;
                                                const isToday = dayKey === getDayKey(new Date());

                                                return (
                                                    <button
                                                        type="button"
                                                        key={dayKey}
                                                        onClick={() => setSelectedDayKey(dayKey)}
                                                        className={`h-24 rounded-2xl border text-left p-2 transition-all ${isSelected
                                                            ? 'border-[#F25A38] bg-[#F2B988]/20 shadow-md'
                                                            : 'border-transparent bg-white hover:border-[#F2B988]/60 hover:bg-[#F2B988]/10'
                                                            }`}
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <span className={`text-sm font-semibold ${isToday ? 'text-[#F25A38]' : 'text-gray-700'}`}>
                                                                {cell.dayNumber}
                                                            </span>
                                                            {dayEvents.length > 0 && (
                                                                <span className="text-[10px] font-semibold text-[#F25A38]">{dayEvents.length}</span>
                                                            )}
                                                        </div>

                                                        <div className="mt-2 space-y-1">
                                                            {dayEvents.slice(0, 2).map(event => (
                                                                <div
                                                                    key={event._id}
                                                                    className={`truncate rounded-md px-2 py-0.5 text-[10px] font-semibold ${event.type === 'workshop'
                                                                        ? 'bg-[#F25A38]/10 text-[#F25A38]'
                                                                        : 'bg-[#ABA0F2]/20 text-[#5C4AD1]'
                                                                        }`}
                                                                >
                                                                    {event.title}
                                                                </div>
                                                            ))}
                                                            {dayEvents.length > 2 && (
                                                                <div className="text-[10px] text-gray-400">
                                                                    +{dayEvents.length - 2} autre{dayEvents.length - 2 > 1 ? 's' : ''}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {isSelectedInMonth && selectedEvents.length > 0 && (
                                        <div className="rounded-3xl border border-[#ABA0F2]/20 bg-white/80 p-6">
                                            <div className="flex items-center gap-3 mb-6">
                                                <span className="text-sm uppercase tracking-[0.3em] text-[#ABA0F2] font-semibold">
                                                    Détails
                                                </span>
                                                <h3 className="text-xl font-semibold text-gray-900">
                                                    {selectedDate.toLocaleDateString('fr-FR', {
                                                        weekday: 'long',
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </h3>
                                            </div>
                                            <div className="grid gap-6 md:grid-cols-2">
                                                {selectedEvents.map(event => (
                                                    event.type === 'workshop' ? (
                                                        <WorkshopCard key={event._id} workshop={event} />
                                                    ) : (
                                                        <StageCard
                                                            key={event._id}
                                                            stage={event}
                                                            onUpdate={fetchAllEvents}
                                                        />
                                                    )
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </section>
                            );
                        })
                    ) : (
                        Object.entries(groupedEvents).map(([monthYear, monthEvents]) => (
                            <section key={monthYear} className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <h2 className="text-2xl font-bold text-gray-900 capitalize">
                                        {monthYear}
                                    </h2>
                                    <div className="flex-1 h-px bg-gradient-to-r from-[#F2B988]/50 to-transparent"></div>
                                    <span className="text-sm font-semibold text-[#F29057] bg-[#F2B988]/20 px-4 py-1 rounded-full">
                                        {monthEvents.length} événement{monthEvents.length > 1 ? 's' : ''}
                                    </span>
                                </div>

                                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                                    {monthEvents.map(event => (
                                        event.type === 'workshop' ? (
                                            <WorkshopCard key={event._id} workshop={event} />
                                        ) : (
                                            <StageCard
                                                key={event._id}
                                                stage={event}
                                                onUpdate={fetchAllEvents}
                                            />
                                        )
                                    ))}
                                </div>
                            </section>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default UnifiedCalendar;
