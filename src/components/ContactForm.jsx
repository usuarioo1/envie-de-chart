'use client';

import { useState } from 'react';

export default function ContactFormComponent() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        interest: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Error sending message');
            }

            setSubmitted(true);
            setFormData({
                name: '',
                email: '',
                subject: '',
                interest: '',
                message: ''
            });

            setTimeout(() => setSubmitted(false), 5000);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pt-6 border-t border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900 mb-6">Formulaire de Contact</h3>

            {submitted && (
                <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                    ✓ Votre message a été envoyé avec succès. Nous vous répondrons bientôt.
                </div>
            )}

            {error && (
                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                    ✕ {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                        Nom *
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Votre nom"
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F25A38] focus:border-transparent"
                    />
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                        Email *
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="votre@email.com"
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F25A38] focus:border-transparent"
                    />
                </div>

                {/* Subject */}
                <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                        Sujet *
                    </label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        placeholder="Sujet de votre message"
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F25A38] focus:border-transparent"
                    />
                </div>

                {/* Interest */}
                <div>
                    <label htmlFor="interest" className="block text-sm font-medium text-slate-700 mb-2">
                        En quoi êtes-vous intéressé(e) ?
                    </label>
                    <select
                        id="interest"
                        name="interest"
                        value={formData.interest}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F25A38] focus:border-transparent bg-white"
                    >
                        <option value="">-- Sélectionnez une option --</option>
                        <option value="ateliers">Atelier de chant prénatal en ligne</option>
                        <option value="prenatal">Atelier de chant prénatal Paris</option>
                        <option value="musique">Atelier de musique pour les enfants</option>
                        <option value="animateurs">Atelier collectif de chant</option>
                        <option value="stage">Stage Envie de chanter</option>
                        <option value="formation">Formation chant prénatal</option>
                        <option value="autre">Autre</option>
                    </select>
                </div>

                {/* Message */}
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                        Message *
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="5"
                        placeholder="Votre message..."
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F25A38] focus:border-transparent resize-none"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-6 py-3 bg-[#F25A38] text-white font-semibold rounded-lg hover:bg-[#E84A28] transition-colors disabled:bg-gray-400 shadow-md hover:shadow-lg"
                >
                    {loading ? 'Envoi en cours...' : 'Envoyer le message'}
                </button>
            </form>
        </div>
    );
}
