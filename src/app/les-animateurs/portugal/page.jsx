'use client';
import { useState, useEffect } from 'react';
import AnimateurSimpleCard from '@/components/AnimateurSimpleCard';
import portugalData from '@/utils/les animateurs/portugal.json';
import AnimateurCard from '@/components/AnimateurCard';

export default function PortugalPage() {
    const [animateurs, setAnimateurs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/animateurs?country=portugal')
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
                <h1 className="text-4xl font-bold mb-4 text-slate-900">{portugalData.title}</h1>

                {/* NOVA SEÇÃO - Animateurs da BD */}
                <div className="mb-12">
                    <div className="mb-6">
                        <h2 className="text-3xl font-bold text-slate-900 mb-2">Nossos Animadores</h2>
                        <div className="h-1 w-24 bg-gradient-to-r from-[#F25A38] to-[#F2B988] rounded-full"></div>
                    </div>
                    {loading ? (
                        <div className="text-center py-12">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#F25A38] border-t-transparent"></div>
                            <p className="mt-4 text-gray-600">Carregando...</p>
                        </div>
                    ) : animateurs.length === 0 ? (
                        <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-200">
                            <p className="text-gray-600">Nenhum animador disponível no momento.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {animateurs.map(a => (
                                <AnimateurSimpleCard key={a._id} animateur={a} />
                            ))}
                        </div>
                    )}
                </div>

                {/* CONTEÚDO ANTIGO */}
                <div className="opacity-50">
                    <p className="text-sm text-red-600 font-bold mb-4">⚠️ CONTEÚDO ANTIGO - DELETAR:</p>

                <div className="mb-8 p-6 bg-[#F2B988]/20 rounded-3xl border border-[#F2B988]">
                    <p className="text-slate-700">{portugalData.introduction}</p>
                </div>

                <div className="space-y-0 divide-y divide-[#F2B988]/30">
                    {portugalData.animateurs.map((animateur, index) => (
                        <div key={index} className="py-6 px-4 hover:bg-[#F2B988]/5 transition-colors">
                            <AnimateurCard animateur={animateur} />
                        </div>
                    ))}
                </div>
                </div>
            </div>
        </div>
    );
}
