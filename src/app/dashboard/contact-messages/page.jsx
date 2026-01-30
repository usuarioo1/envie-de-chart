'use client';

import { useState, useEffect } from 'react';

export default function ContactMessagesPage() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedMessage, setSelectedMessage] = useState(null);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/contact');
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Error fetching messages');
            }

            setMessages(data.data || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const deleteMessage = async (messageId) => {
        if (!confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) {
            return;
        }

        try {
            const response = await fetch(`/api/contact?id=${messageId}`, {
                method: 'DELETE'
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Error deleting message');
            }

            // Remove message from list
            setMessages(messages.filter(msg => msg._id !== messageId));
            setSelectedMessage(null);
        } catch (err) {
            alert('Erreur : ' + err.message);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#F25A38]"></div>
                    <p className="mt-4 text-slate-600">Chargement des messages...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-b from-[#ABA0F2]/10 via-white to-[#F2B988]/20 min-h-screen">
            <div className="container mx-auto px-4 py-10">
                <h1 className="text-4xl font-bold mb-3 text-slate-900">Messages de Contact</h1>
                <p className="text-lg text-slate-600 mb-8">Gérez les messages reçus via le formulaire de contact</p>

                {error && (
                    <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                        {error}
                    </div>
                )}

                {messages.length === 0 ? (
                    <div className="bg-white rounded-lg shadow p-8 text-center">
                        <p className="text-slate-600">Aucun message pour le moment.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Messages List */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow">
                                <div className="p-4 border-b border-slate-200">
                                    <h2 className="text-lg font-semibold text-slate-900">Messages ({messages.length})</h2>
                                </div>
                                <div className="divide-y divide-slate-200 max-h-[600px] overflow-y-auto">
                                    {messages.map((message) => (
                                        <div
                                            key={message._id}
                                            onClick={() => setSelectedMessage(message)}
                                            className={`p-4 cursor-pointer hover:bg-slate-50 transition-colors ${selectedMessage?._id === message._id ? 'bg-blue-50 border-l-4 border-[#F25A38]' : ''
                                                }`}
                                        >
                                            <p className="font-semibold text-slate-900">{message.name}</p>
                                            <p className="text-sm text-slate-600 truncate">{message.email}</p>
                                            <p className="text-xs text-slate-500 mt-1">{formatDate(message.createdAt)}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Message Detail */}
                        <div className="lg:col-span-2">
                            {selectedMessage ? (
                                <div className="bg-white rounded-lg shadow p-6">
                                    <div className="mb-6 pb-6 border-b border-slate-200">
                                        <h2 className="text-2xl font-bold text-slate-900 mb-2">{selectedMessage.subject}</h2>
                                        <div className="space-y-2 text-slate-600">
                                            <p>
                                                <strong>De:</strong> {selectedMessage.name}
                                            </p>
                                            <p>
                                                <strong>Email:</strong>{' '}
                                                <a href={`mailto:${selectedMessage.email}`} className="text-[#F25A38] hover:underline">
                                                    {selectedMessage.email}
                                                </a>
                                            </p>
                                            <p>
                                                <strong>Date:</strong> {formatDate(selectedMessage.createdAt)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="prose prose-sm max-w-none">
                                        <div className="bg-slate-50 p-4 rounded-lg">
                                            <p className="text-slate-700 whitespace-pre-wrap">{selectedMessage.message}</p>
                                        </div>
                                    </div>

                                    <div className="mt-6 flex gap-3">
                                        <button
                                            onClick={() => window.location.href = `mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                                            className="px-4 py-2 bg-[#F25A38] text-white rounded-lg hover:bg-[#E84A28] transition-colors"
                                        >
                                            Répondre
                                        </button>
                                        <button
                                            onClick={() => deleteMessage(selectedMessage._id)}
                                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                        >
                                            Supprimer
                                        </button>
                                        <button
                                            onClick={() => setSelectedMessage(null)}
                                            className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
                                        >
                                            Fermer
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-white rounded-lg shadow p-8 text-center">
                                    <p className="text-slate-600">Sélectionnez un message pour voir les détails</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
