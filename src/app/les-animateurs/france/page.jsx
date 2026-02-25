'use client';
import { useState, useEffect, useMemo } from 'react';
import AnimateurSimpleCard from '@/components/AnimateurSimpleCard';

export default function FrancePage() {
    const [animateurs, setAnimateurs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/animateurs?country=france')
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    // Ordenar por departamento
                    const sorted = [...data.data].sort((a, b) => {
                        // Si ambos tienen departamento, ordenar alfabéticamente
                        if (a.departement && b.departement) {
                            return a.departement.localeCompare(b.departement);
                        }
                        // Los que tienen departamento van primero
                        if (a.departement && !b.departement) return -1;
                        if (!a.departement && b.departement) return 1;
                        // Si ninguno tiene departamento, mantener orden original
                        return 0;
                    });
                    setAnimateurs(sorted);
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    // Agrupar animadores por departamento
    const groupedAnimateurs = useMemo(() => {
        const groups = {};
        animateurs.forEach(animateur => {
            const dept = animateur.departement || 'Autres';
            if (!groups[dept]) {
                groups[dept] = [];
            }
            groups[dept].push(animateur);
        });
        return groups;
    }, [animateurs]);

    return (
        <div className="bg-gradient-to-b from-[#ABA0F2]/10 via-white to-[#F2B988]/20 min-h-screen">
            <div className="container mx-auto px-4 py-10">
                <h1 className="text-4xl font-bold mb-4 text-slate-900">Animateurs en France</h1>
                <p className="text-lg text-slate-600 mb-8">Découvrez nos animateurs de chant prénatal en France.</p>

                <div className="mb-6">
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">Nos Animateurs</h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-[#F25A38] to-[#F2B988] rounded-full"></div>
                </div>

                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#F25A38] border-t-transparent"></div>
                        <p className="mt-4 text-gray-600">Chargement...</p>
                    </div>
                ) : animateurs.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-200">
                        <p className="text-gray-600">Aucun animateur disponible pour le moment.</p>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {Object.entries(groupedAnimateurs).map(([departement, animateursGroup]) => (
                            <div key={departement} className="space-y-4">
                                {/* Encabezado del departamento */}
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-2 bg-gradient-to-r from-[#F25A38] to-[#F29057] text-white px-4 py-2 rounded-lg shadow-md">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                        </svg>
                                        <h3 className="text-lg font-bold">
                                            {departement === 'Autres' ? 'Autres' : `Département ${departement}`}
                                        </h3>
                                    </div>
                                    <div className="flex-1 h-0.5 bg-gradient-to-r from-[#F2B988]/50 to-transparent rounded-full"></div>
                                    <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                        {animateursGroup.length} {animateursGroup.length === 1 ? 'animateur' : 'animateurs'}
                                    </span>
                                </div>
                                
                                {/* Grid de tarjetas del departamento */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {animateursGroup.map(a => (
                                        <AnimateurSimpleCard key={a._id} animateur={a} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
