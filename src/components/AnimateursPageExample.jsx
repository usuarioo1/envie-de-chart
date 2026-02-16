'use client';
import { useState, useEffect } from 'react';
import AnimateurSimpleCard from '@/components/AnimateurSimpleCard';

export default function FranceAnimateursExample() {
    const [animateurs, setAnimateurs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAnimateurs();
    }, []);

    const fetchAnimateurs = async () => {
        try {
            const response = await fetch('/api/animateurs?country=france');
            const data = await response.json();
            if (data.success) {
                setAnimateurs(data.data);
            }
        } catch (error) {
            console.error('Error fetching animateurs:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gradient-to-b from-indigo-50 via-white to-blue-50 min-h-screen">
            <div className="container mx-auto px-4 py-10">
                <h1 className="text-4xl font-bold mb-4 text-gray-900">
                    Les animateurs de chant en France
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                    Contactez directement l'animatrice la plus proche de chez vous.
                </p>

                {loading ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500">Chargement...</p>
                    </div>
                ) : animateurs.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg shadow">
                        <p className="text-gray-500 text-lg">
                            Aucun animateur disponible pour le moment
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {animateurs.map((animateur) => (
                            <AnimateurSimpleCard 
                                key={animateur._id} 
                                animateur={animateur} 
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
