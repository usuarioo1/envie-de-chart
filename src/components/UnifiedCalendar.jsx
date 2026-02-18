'use client';

import { useState, useEffect } from 'react';
import WorkshopCard from '@/components/WorkshopCard';
import StageCard from '@/components/StageCard';

const UnifiedCalendar = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('all'); // 'all', 'workshops', 'stages'
    const [viewMode, setViewMode] = useState('calendar'); // 'calendar', 'list'

    useEffect(() => {
        fetchAllEvents();
    }, []);

    const fetchAllEvents = async () => {
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
                    .filter(workshop => new Date(workshop.date) >= now)
                    .map(workshop => ({
                        ...workshop,
                        type: 'workshop',
                        startDate: new Date(workshop.date)
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
    };

    // Parse stage date string to Date object
    const parseStageDate = (dateString) => {
        // Handle various date formats from stages
        if (!dateString) return new Date();

        // Try to extract a date from the string
        const dateMatch = dateString.match(/(\d{1,2})[-\/](\d{1,2})[-\/](\d{4})/);
        if (dateMatch) {
            const [, day, month, year] = dateMatch;
            return new Date(year, month - 1, day);
        }

        // Try other formats
        const parsedDate = new Date(dateString);
        return isNaN(parsedDate) ? new Date() : parsedDate;
    };

    // Group events by month
    const groupEventsByMonth = () => {
        const grouped = {};

        events.forEach(event => {
            if (filter !== 'all' && event.type !== filter.slice(0, -1)) return;

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

    const groupedEvents = groupEventsByMonth();

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
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Calendrier</h1>
                    <p className="text-lg text-gray-600">
                        {events.length} événement{events.length > 1 ? 's' : ''} à venir
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
            </div>

            {/* Events by Month */}
            {Object.keys(groupedEvents).length === 0 ? (
                <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-200">
                    <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-gray-500 text-lg">Aucun événement disponible</p>
                </div>
            ) : (
                <div className="space-y-12">
                    {Object.entries(groupedEvents).map(([monthYear, monthEvents]) => (
                        <section key={monthYear} className="space-y-6">
                            {/* Month Header */}
                            <div className="flex items-center gap-4">
                                <h2 className="text-2xl font-bold text-gray-900 capitalize">
                                    {monthYear}
                                </h2>
                                <div className="flex-1 h-px bg-gradient-to-r from-[#F2B988]/50 to-transparent"></div>
                                <span className="text-sm font-semibold text-[#F29057] bg-[#F2B988]/20 px-4 py-1 rounded-full">
                                    {monthEvents.length} événement{monthEvents.length > 1 ? 's' : ''}
                                </span>
                            </div>

                            {/* Month Events Grid */}
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
                    ))}
                </div>
            )}
        </div>
    );
};

export default UnifiedCalendar;
