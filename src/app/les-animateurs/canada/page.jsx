'use client';
import { useState, useEffect } from 'react';
import AnimateurSimpleCard from '@/components/AnimateurSimpleCard';

export default function CanadaPage() {
    const [animateurs, setAnimateurs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/animateurs?country=canada')
            .then(res => res.json())
            .then(data => {
                if (data.success) setAnimateurs(data.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <div className="bg-gradient-to-b from-[#ABA0F2]/10 via-white to-[#F2B988]/20 min-h-screen">
            <div className="container mx-auto px-4 py-10">
                <h1 className="text-4xl font-bold mb-4 text-slate-900">Animateurs au Canada</h1>
                <p className="text-lg text-slate-600 mb-8">Découvrez nos animateurs de chant prénatal au Canada.</p>

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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {animateurs.map(a => (
                            <AnimateurSimpleCard key={a._id} animateur={a} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
