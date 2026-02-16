'use client';

import StageRegistrationModal from './StageRegistrationModal';
import { useState } from 'react';

export default function StageCard({ stage, onUpdate }) {
    const [showRegistrationModal, setShowRegistrationModal] = useState(false);

    return (
        <>
            <article className="rounded-2xl border border-slate-100 bg-white/70 p-5">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                        <h3 className="text-xl font-semibold text-slate-900">{stage.title}</h3>
                        {stage.country && (
                            <p className="mt-1 text-xs uppercase tracking-[0.25em] text-rose-400">{stage.country}</p>
                        )}
                    </div>
                </div>

                {/* Meta info */}
                <div className="mt-4 space-y-2 text-sm text-slate-600">
                    {stage.date && (
                        <div className="flex items-center gap-2">
                            <span className="font-medium text-slate-700">📅 Date :</span>
                            <span>{stage.date}</span>
                        </div>
                    )}
                    {stage.location && (
                        <div className="flex items-center gap-2">
                            <span className="font-medium text-slate-700">📍 Lieu :</span>
                            <span>{stage.location}</span>
                        </div>
                    )}
                    {stage.formatrice && (
                        <div className="flex items-center gap-2">
                            <span className="font-medium text-slate-700">👤 Formatrice :</span>
                            <span>{stage.formatrice}</span>
                        </div>
                    )}
                </div>

                {/* Description */}
                {stage.description && (
                    <p className="mt-3 text-sm text-slate-600">{stage.description}</p>
                )}

                {/* Contact */}
                <div className="mt-4 rounded-lg bg-[#F2B988]/10 p-3 text-sm text-slate-700">
                    <p className="font-medium text-slate-900">📞 Contact</p>
                    {stage.contact?.name && <p className="mt-1">{stage.contact.name}</p>}
                    {stage.email && <p>{stage.email}</p>}
                    {stage.phone && <p>{stage.phone}</p>}
                </div>

                {/* Registration Button */}
                <button
                    onClick={() => setShowRegistrationModal(true)}
                    className="mt-4 w-full rounded-lg bg-gradient-to-r from-[#F29057] to-[#F25A38] px-4 py-2 text-sm font-semibold text-white hover:shadow-lg transition-all"
                >
                    S\'inscrire au stage
                </button>
            </article>

            {showRegistrationModal && (
                <StageRegistrationModal
                    stage={stage}
                    onClose={() => setShowRegistrationModal(false)}
                    onSuccess={onUpdate}
                />
            )}
        </>
    );
}
