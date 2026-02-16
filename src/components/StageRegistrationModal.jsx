'use client';

import { useState } from 'react';

export default function StageRegistrationModal({ stage, onClose, onSuccess }) {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const response = await fetch('/api/stage-registrations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    stageId: stage._id,
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone
                })
            });

            const data = await response.json();

            if (data.success) {
                setSuccess('✅ Inscription réussie!');
                setFormData({ name: '', email: '', phone: '' });
                setTimeout(() => {
                    onSuccess();
                    onClose();
                }, 1500);
            } else {
                setError(data.error || 'Erreur lors de l\'inscription');
            }
        } catch (err) {
            setError('Une erreur est survenue. Veuillez réessayer.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur">
            <div className="w-full max-w-md rounded-2xl border border-[#F2B988] bg-white p-6 shadow-xl">
                <h2 className="text-2xl font-bold text-slate-900">Inscription au stage</h2>
                <p className="mt-1 text-sm text-slate-600">{stage.title}</p>

                {error && (
                    <div className="mt-4 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-700">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mt-4 rounded-lg border border-green-300 bg-green-50 p-3 text-sm text-green-700">
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Nom *</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-[#F29057] focus:outline-none"
                            placeholder="Votre nom"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700">Email *</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-[#F29057] focus:outline-none"
                            placeholder="votre.email@exemple.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700">Téléphone *</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-[#F29057] focus:outline-none"
                            placeholder="06 12 34 56 78"
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                            disabled={loading}
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="flex-1 rounded-lg bg-[#F29057] px-4 py-2 text-sm font-medium text-white hover:bg-[#F25A38] disabled:opacity-50"
                            disabled={loading}
                        >
                            {loading ? 'Inscription...' : 'S\'inscrire'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
