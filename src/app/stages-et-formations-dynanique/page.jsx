'use client';

import { useState, useEffect } from 'react';
import StageCard from '@/components/StageCard';

export default function StagesPage() {
    const [stages, setStages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchStages();
    }, []);

    const fetchStages = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/stages?status=published');
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Error fetching stages');
            }

            setStages(data.data || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="px-4 py-12">
            <div className="mx-auto max-w-6xl space-y-10">
                {/* Header */}
                <header className="rounded-3xl border border-[#F2B988] bg-gradient-to-br from-white via-[#F2B988]/20 to-[#ABA0F2]/10 p-8 shadow-sm">
                    <p className="text-xs uppercase tracking-[0.35em] text-[#F29057]">Envie-de-chanter</p>
                    <h1 className="mt-3 text-3xl font-semibold text-slate-900">Stages et Formations 2026</h1>
                    <p className="mt-2 text-sm text-slate-600">Découvrez nos stages, formations et sessions spécialisées en chant prénatal et chant collectif.</p>
                </header>

                {/* Error */}
                {error && (
                    <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-700">
                        {error}
                    </div>
                )}

                {/* Loading */}
                {loading && (
                    <div className="text-center py-12">
                        <p className="text-slate-600">Chargement des stages...</p>
                    </div>
                )}

                {/* Empty State */}
                {!loading && stages.length === 0 && (
                    <div className="text-center py-12 rounded-xl border border-slate-200 bg-slate-50">
                        <p className="text-slate-600">Aucun stage disponible pour le moment.</p>
                    </div>
                )}

                {/* Stages List */}
                {!loading && stages.length > 0 && (
                    <section className="rounded-3xl border border-rose-100 bg-white/80 p-6">
                        <div className="mb-6">
                            <h2 className="text-2xl font-semibold text-slate-900">Stages disponibles</h2>
                            <p className="mt-1 text-sm text-slate-600">
                                {stages.length} {stages.length === 1 ? 'stage' : 'stages'} disponible{stages.length > 1 ? 's' : ''}
                            </p>
                        </div>

                        <div className="grid gap-5 lg:grid-cols-2">
                            {stages.map((stage) => (
                                <StageCard
                                    key={stage._id}
                                    stage={stage}
                                    onUpdate={fetchStages}
                                    source="stages-et-formations-dynanique"
                                />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </main>
    );
}
