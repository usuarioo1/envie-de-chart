'use client';

import { useState } from 'react';
import { createDisplayDate } from '@/utils/dateUtils';

const WorkshopCard = ({ workshop }) => {
    const workshopDate = createDisplayDate(workshop.date);
    const isUpcoming = workshopDate > new Date();
    const [showForm, setShowForm] = useState(false);
    const [showPaymentInfo, setShowPaymentInfo] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/workshop-registrations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    workshopId: workshop._id,
                    ...formData
                }),
            });

            const data = await response.json();

            if (data.success) {
                setSuccess(true);
                setFormData({ name: '', email: '', phone: '' });
                setTimeout(() => {
                    setShowForm(false);
                    setSuccess(false);
                }, 3000);
            } else {
                setError(data.error || 'Erreur lors de l\'inscription');
            }
        } catch (err) {
            setError('Une erreur s\'est produite. Veuillez réessayer.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className={`group relative overflow-hidden rounded-3xl border p-8 transition-all duration-300 hover:shadow-xl ${isUpcoming
                ? 'border-[#F2B988] bg-gradient-to-br from-white via-[#F2B988]/10 to-[#ABA0F2]/10 hover:scale-[1.02]'
                : 'border-gray-200 bg-gray-50/50 opacity-75'
                }`}
        >
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#F2B988]/0 via-transparent to-[#ABA0F2]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative z-10 flex flex-col md:flex-row gap-6">
                {/* Date Badge */}
                <div className="flex-shrink-0 mx-auto md:mx-0">
                    <div className="w-24 h-24 bg-gradient-to-br from-[#F25A38] to-[#F29057] rounded-2xl flex flex-col items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-shadow">
                        <span className="text-xs font-semibold uppercase tracking-widest opacity-90">
                            {workshop.dayOfWeek}
                        </span>
                        <span className="text-3xl font-bold mt-1">{workshopDate.getDate()}</span>
                        <span className="text-xs font-medium opacity-90">
                            {workshopDate.toLocaleDateString('fr-FR', { month: 'short' }).toUpperCase()}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 text-center md:text-left">
                    {/* Title */}
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3 group-hover:text-[#F25A38] transition-colors">
                        {workshop.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed mb-4">
                        {workshop.description}
                    </p>

                    {/* Price */}
                    {workshop.price && workshop.price > 0 && (
                        <div className="mb-4">
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#F25A38]/10 to-[#F29057]/10 border border-[#F29057]/30 text-[#F25A38] font-semibold text-lg">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {workshop.price.toFixed(2)} €
                            </span>
                        </div>
                    )}

                    {/* Date and Time */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                        <span className="flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 border border-[#F2B988]/30">
                            <svg className="w-4 h-4 text-[#F29057]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {workshopDate.toLocaleDateString('fr-FR', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </span>
                        <span className="flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 border border-[#F2B988]/30">
                            <svg className="w-4 h-4 text-[#F29057]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {workshopDate.toLocaleTimeString('fr-FR', {
                                hour: '2-digit',
                                minute: '2-digit'
                            })} <span className="text-xs opacity-75">(heure de Paris)</span>
                        </span>
                    </div>

                    {/* Inscription Button and Payment Info */}
                    {isUpcoming && !success && (
                        <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center md:justify-start">
                            <button
                                onClick={() => setShowForm(!showForm)}
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#F25A38] to-[#F29057] text-white font-semibold text-sm hover:shadow-lg transition-all duration-300 hover:scale-105"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                {showForm ? 'Fermer' : 'S\'inscrire'}
                            </button>
                            <button
                                onClick={() => setShowPaymentInfo(!showPaymentInfo)}
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white border-2 border-[#F25A38] text-[#F25A38] font-semibold text-sm hover:bg-[#F25A38] hover:text-white transition-all duration-300 hover:scale-105"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                </svg>
                                {showPaymentInfo ? 'Fermer' : 'Informations de paiement'}
                            </button>
                        </div>
                    )}

                    {success && (
                        <div className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-green-500 text-white font-semibold text-sm mx-auto md:mx-0">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Inscription réussie !
                        </div>
                    )}
                </div>
            </div>

            {/* Registration Form */}
            {showForm && isUpcoming && (
                <div className="relative z-10 mt-6 p-6 bg-white rounded-2xl border-2 border-[#F2B988] shadow-lg animate-slideDown">
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">Formulaire d'inscription</h4>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                Nom complet <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25A38] focus:border-transparent transition-all"
                                placeholder="Votre nom"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25A38] focus:border-transparent transition-all"
                                placeholder="votre.email@exemple.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                Téléphone <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                required
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25A38] focus:border-transparent transition-all"
                                placeholder="+33 6 12 34 56 78"
                            />
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 px-6 py-3 bg-gradient-to-r from-[#F25A38] to-[#F29057] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Inscription en cours...' : 'Confirmer l\'inscription'}
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all"
                            >
                                Annuler
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Payment Information Dialog */}
            {showPaymentInfo && isUpcoming && (
                <div className="relative z-10 mt-6 p-6 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/30 rounded-2xl border-2 border-[#F25A38] shadow-lg animate-slideDown">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#F25A38] to-[#F29057] rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                </svg>
                            </div>
                            <h4 className="text-xl font-semibold text-gray-900">Informations de paiement</h4>
                        </div>
                        <button
                            onClick={() => setShowPaymentInfo(false)}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="space-y-4">
                        <p className="text-sm text-gray-600">
                            Pour régler votre inscription par virement bancaire, utilisez les coordonnées suivantes :
                        </p>

                        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm space-y-3">
                            <div>
                                <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Bénéficiaire</p>
                                <p className="text-lg font-semibold text-gray-900">Arts Rencontres Echanges</p>
                            </div>

                            <div className="border-t border-gray-100 pt-3">
                                <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">IBAN</p>
                                <p className="text-base font-mono font-semibold text-gray-900 break-all">
                                    FR76 1027 8060 5000 0208 3550 116
                                </p>
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText('FR76102780605000020835501116');
                                    }}
                                    className="mt-2 text-xs text-[#F25A38] hover:text-[#F29057] font-medium flex items-center gap-1"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                    Copier l'IBAN
                                </button>
                            </div>

                            <div className="border-t border-gray-100 pt-3">
                                <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">BIC</p>
                                <p className="text-base font-mono font-semibold text-gray-900">CMCIFR2A</p>
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText('CMCIFR2A');
                                    }}
                                    className="mt-2 text-xs text-[#F25A38] hover:text-[#F29057] font-medium flex items-center gap-1"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                    Copier le BIC
                                </button>
                            </div>
                        </div>

                        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                            <div className="flex gap-3">
                                <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div className="text-sm text-blue-900">
                                    <p className="font-semibold mb-1">Note importante</p>
                                    <p className="text-blue-800">
                                        N'oubliez pas d'indiquer votre nom et le titre de l'atelier dans le libellé du virement.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}


            {/* Status indicator for past workshops */}
            {!isUpcoming && (
                <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-400 text-white">
                        Passé
                    </span>
                </div>
            )}
        </div>
    );
};

export default WorkshopCard;
