'use client';

import { useState, useEffect } from 'react';
import StageCard from '@/components/StageCard';

const DynamicStagesSection = () => {
    const [stages, setStages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchStages();
    }, []);

    const fetchStages = async () => {
        try {
            console.log('🔍 Fetching stages from API...');
            const response = await fetch('/api/stages?status=published');
            const data = await response.json();

            console.log('📦 API Response:', data);

            if (data.success) {
                console.log(`✅ Found ${data.data.length} stages`);
                setStages(data.data);
            } else {
                console.error('❌ API Error:', data.error);
                setError('Erreur lors du chargement des stages');
            }
        } catch (err) {
            console.error('💥 Error fetching stages:', err);
            setError('Erreur de connexion');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <section className="pb-8 mb-8 border-b border-[#F2B988]/30">
                <div className="mb-6 space-y-2">
                    <h2 className="text-2xl font-semibold text-slate-900">Stages & Formations</h2>
                </div>
                <div className="animate-pulse grid gap-5 lg:grid-cols-2">
                    <div className="h-64 bg-gray-200 rounded-2xl"></div>
                    <div className="h-64 bg-gray-200 rounded-2xl"></div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="pb-8 mb-8 border-b border-[#F2B988]/30">
                <div className="mb-6 space-y-2">

                    <h2 className="text-2xl font-semibold text-slate-900">Stages & Formations</h2>
                </div>
                <div className="text-center py-8 text-red-600">
                    <p>{error}</p>
                </div>
            </section>
        );
    }

    if (stages.length === 0) {
        return (
            <section className="pb-8 mb-8 border-b border-[#F2B988]/30">
                <div className="mb-6 space-y-2">
                    <p className="text-xs uppercase tracking-[0.3em] text-[#F29057]">Base de données</p>
                    <h2 className="text-2xl font-semibold text-slate-900">Stages & Formations</h2>
                </div>
                <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-200">
                    <p className="text-gray-500">Aucun stage disponible pour le moment</p>
                </div>
            </section>
        );
    }

    return (
        <section className="pb-8 mb-8 border-b border-[#F2B988]/30">
            <div className="mb-6 space-y-2">

                <h2 className="text-2xl font-semibold text-slate-900">Stages & Formations</h2>
                <p className="text-sm text-slate-600">
                    {stages.length} stage{stages.length > 1 ? 's' : ''} disponible{stages.length > 1 ? 's' : ''}
                </p>
            </div>
            <div className="grid gap-5 lg:grid-cols-2">
                {stages.map((stage) => (
                    <StageCard
                        key={stage._id}
                        stage={stage}
                        onUpdate={fetchStages}
                    />
                ))}
            </div>
        </section>
    );
};

export default DynamicStagesSection;
