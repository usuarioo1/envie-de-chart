import UnifiedCalendar from '@/components/UnifiedCalendar';

export const metadata = {
    title: 'Calendrier - Ateliers & Formations | Envie de Chanter',
    description: 'Découvrez tous nos ateliers de chant et formations disponibles. Inscrivez-vous directement en ligne.',
};

export default function CalendrierPage() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-[#ABA0F2]/10 via-white to-[#F2B988]/20">
            <div className="mx-auto max-w-7xl px-4 py-12">
                {/* Hero Section */}
                <div className="mb-12 rounded-3xl border-2 border-[#F2B988] bg-gradient-to-br from-white via-[#F2B988]/20 to-[#ABA0F2]/10 p-8 shadow-[0_20px_50px_-20px_rgba(242,90,56,0.25)]">
                    <div className="flex items-center gap-3 mb-4">
                        <svg className="w-10 h-10 text-[#F25A38]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-xs uppercase tracking-[0.35em] text-[#F29057] font-semibold">
                            Envie de Chanter
                        </p>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Calendrier des Événements
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl">
                        Retrouvez tous nos ateliers de chant et formations en un seul endroit.
                        Filtrez par type d'événement et inscrivez-vous directement en ligne.
                    </p>

                    {/* Quick Info Pills */}
                    <div className="mt-6 flex flex-wrap gap-3">
                        <div className="flex items-center gap-2 rounded-full bg-white/80 border border-[#F2B988]/30 px-4 py-2">
                            <svg className="w-5 h-5 text-[#F29057]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-sm font-medium text-gray-700">Inscription en ligne</span>
                        </div>
                        <div className="flex items-center gap-2 rounded-full bg-white/80 border border-[#F2B988]/30 px-4 py-2">
                            <svg className="w-5 h-5 text-[#F29057]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-sm font-medium text-gray-700">Mise à jour en temps réel</span>
                        </div>
                        <div className="flex items-center gap-2 rounded-full bg-white/80 border border-[#F2B988]/30 px-4 py-2">
                            <svg className="w-5 h-5 text-[#F29057]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span className="text-sm font-medium text-gray-700">Pour tous niveaux</span>
                        </div>
                    </div>
                </div>

                {/* Calendar Component */}
                <UnifiedCalendar />
            </div>
        </main>
    );
}
