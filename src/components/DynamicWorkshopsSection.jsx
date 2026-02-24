'use client';

import { useState, useEffect } from 'react';
import WorkshopCard from '@/components/WorkshopCard';
import { createDisplayDate } from '@/utils/dateUtils';

const DynamicWorkshopsSection = () => {
    const [workshops, setWorkshops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchWorkshops();
    }, []);

    const fetchWorkshops = async () => {
        try {
            const response = await fetch('/api/workshops');
            const data = await response.json();

            if (data.success) {
                // Filter only upcoming workshops
                const now = new Date();
                const upcomingWorkshops = data.data.filter(
                    workshop => createDisplayDate(workshop.date) >= now
                );
                setWorkshops(upcomingWorkshops);
            } else {
                setError('Erreur lors du chargement des ateliers');
            }
        } catch (err) {
            console.error('Error fetching workshops:', err);
            setError('Erreur de connexion');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <section className="rounded-3xl border border-[#F2B988] bg-gradient-to-br from-white via-[#F2B988]/10 to-[#ABA0F2]/10 p-6 animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-96 mb-6"></div>
                <div className="space-y-4">
                    <div className="h-32 bg-gray-200 rounded-2xl"></div>
                    <div className="h-32 bg-gray-200 rounded-2xl"></div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="rounded-3xl border border-red-200 bg-red-50 p-6">
                <p className="text-red-600 text-sm">{error}</p>
            </section>
        );
    }

    if (workshops.length === 0) {
        return null; // Don't show section if no workshops
    }

    return (
        <section className="rounded-3xl border border-[#F2B988] bg-gradient-to-br from-white via-[#F2B988]/10 to-[#ABA0F2]/10 p-8 shadow-sm">
            <div className="mb-8">
                <p className="text-xs uppercase tracking-[0.35em] text-[#F29057] mb-2">Prochains rendez-vous</p>
                <h2 className="text-3xl font-semibold text-gray-900 mb-3">Ateliers de la semaine</h2>
                <p className="text-sm text-gray-600">
                    Découvrez nos prochains ateliers de chant. Pour vous inscrire, veuillez remplir le formulaire.
                </p>
            </div>

            <div className="space-y-6">
                {workshops.map((workshop) => (
                    <WorkshopCard key={workshop._id} workshop={workshop} />
                ))}
            </div>
        </section>
    );
};

export default DynamicWorkshopsSection;
