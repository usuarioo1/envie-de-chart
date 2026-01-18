import chantPrenatalAteliersData from '@/utils/ateliers de chant/chantprenatalAteliers.json';

export default function ChantPrenatalAteliersPage() {
    return (
        <div className="bg-gradient-to-b from-rose-50 via-white to-indigo-50 min-h-screen">
            <div className="container mx-auto px-4 py-10">
                <h1 className="text-4xl font-bold mb-4 text-slate-900">{chantPrenatalAteliersData.title}</h1>
                <h2 className="text-2xl text-slate-600 mb-6">{chantPrenatalAteliersData.subtitle}</h2>

                {chantPrenatalAteliersData.media && (
                    <div className="mb-8 p-6 bg-rose-50 rounded-3xl border border-rose-100">
                        <p className="mb-2 text-slate-900">
                            <strong>{chantPrenatalAteliersData.media.franceMusique.title}</strong>
                        </p>
                        <a
                            href={chantPrenatalAteliersData.media.franceMusique.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-rose-500 hover:text-rose-600 hover:underline break-all"
                        >
                            {chantPrenatalAteliersData.media.franceMusique.url}
                        </a>
                    </div>
                )}

                <div className="mb-8">
                    {chantPrenatalAteliersData.description.map((paragraph, index) => (
                        <p key={index} className="mb-4 text-slate-700 leading-relaxed">
                            {paragraph}
                        </p>
                    ))}
                </div>

                <div className="mb-8 p-6 bg-rose-50 rounded-3xl border border-rose-100 shadow-sm">
                    <h3 className="text-xl font-semibold mb-3 text-slate-900">Contact</h3>
                    <p className="mb-2 text-slate-700">
                        <strong>{chantPrenatalAteliersData.contact.name}</strong>
                    </p>
                    <p className="mb-2 text-slate-700">
                        <strong>Email :</strong>{' '}
                        <a href={`mailto:${chantPrenatalAteliersData.contact.email}`} className="text-rose-500 hover:text-rose-600 hover:underline">
                            {chantPrenatalAteliersData.contact.email}
                        </a>
                    </p>
                    <p className="mb-2 text-slate-700">
                        <strong>Téléphone :</strong> {chantPrenatalAteliersData.contact.phone}
                    </p>
                    {chantPrenatalAteliersData.contact.whatsapp && (
                        <p className="text-rose-500">{chantPrenatalAteliersData.contact.whatsapp}</p>
                    )}
                </div>

                <div className="mb-8">
                    <h3 className="text-2xl font-semibold mb-4 text-slate-900">Ateliers</h3>
                    {chantPrenatalAteliersData.ateliers.map((atelier, index) => (
                        <div key={index} className="mb-6 p-6 border border-rose-100 rounded-3xl bg-white/80 shadow-[0_8px_30px_-15px_rgba(15,23,42,0.2)] hover:shadow-[0_20px_50px_-15px_rgba(15,23,42,0.3)] transition-shadow">
                            <h4 className="text-xl font-semibold mb-3 text-slate-900">{atelier.title}</h4>
                            <p className="mb-2 text-slate-700">
                                <strong>Horaire :</strong> {atelier.schedule}
                            </p>
                            <p className="mb-2 text-slate-700">
                                <strong>Prochaine séance :</strong> {atelier.nextSession}
                            </p>
                            {atelier.location && (
                                <div className="mb-2 text-slate-700">
                                    {atelier.location.venue && <p><strong>Lieu :</strong> {atelier.location.venue}</p>}
                                    {atelier.location.address && <p><strong>Adresse :</strong> {atelier.location.address}</p>}
                                    {atelier.location.metro && <p><strong>Métro :</strong> {atelier.location.metro}</p>}
                                </div>
                            )}
                            {atelier.contact && (
                                <p className="mb-2 text-slate-700">
                                    <strong>Contact :</strong> {atelier.contact.name} - {atelier.contact.phone} -{' '}
                                    <a href={`mailto:${atelier.contact.email}`} className="text-rose-500 hover:text-rose-600 hover:underline">
                                        {atelier.contact.email}
                                    </a>
                                </p>
                            )}
                        </div>
                    ))}
                </div>

                {chantPrenatalAteliersData.coursParticuliers && (
                    <div className="mb-8 p-6 bg-indigo-50/50 rounded-3xl border border-rose-100">
                        <h3 className="text-xl font-semibold mb-3 text-slate-900">{chantPrenatalAteliersData.coursParticuliers.title}</h3>
                        <ul className="list-disc list-inside ml-4 text-slate-700">
                            {chantPrenatalAteliersData.coursParticuliers.locations.map((location, index) => (
                                <li key={index} className="mb-2">
                                    {typeof location === 'string' ? location :
                                        `${location.address} - ${location.phone} - ${location.email}`
                                    }
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {chantPrenatalAteliersData.introduction && (
                    <div className="mb-8 p-6 border-2 border-rose-200 rounded-3xl bg-white/80 shadow-sm">
                        <h3 className="text-xl font-semibold mb-3 text-slate-900">{chantPrenatalAteliersData.introduction.title}</h3>
                        <p className="mb-2 text-slate-700">
                            <strong>Date :</strong> {chantPrenatalAteliersData.introduction.date}
                        </p>
                        <p className="mb-2 text-slate-700">
                            <strong>Horaire :</strong> {chantPrenatalAteliersData.introduction.time}
                        </p>
                        <p className="mb-2 text-slate-700">
                            <strong>Format :</strong> {chantPrenatalAteliersData.introduction.format}
                        </p>
                        <p className="mb-4 text-slate-700">{chantPrenatalAteliersData.introduction.description}</p>
                        <p className="text-slate-700">
                            <strong>Contact :</strong> {chantPrenatalAteliersData.introduction.contact.email} -{' '}
                            {chantPrenatalAteliersData.introduction.contact.phone}
                        </p>
                    </div>
                )}

                {chantPrenatalAteliersData.groupes && (
                    <div className="mb-8 p-6 bg-rose-50/60 rounded-3xl border border-rose-100">
                        <h3 className="text-xl font-semibold mb-3 text-slate-900">{chantPrenatalAteliersData.groupes.title}</h3>
                        <p className="mb-2 text-slate-700">{chantPrenatalAteliersData.groupes.description}</p>
                        <p className="text-slate-600">{chantPrenatalAteliersData.groupes.note}</p>
                    </div>
                )}

                {chantPrenatalAteliersData.formation && (
                    <div className="mb-8 p-6 border border-rose-100 rounded-3xl bg-white/80 shadow-sm">
                        <h3 className="text-2xl font-semibold mb-4 text-slate-900">{chantPrenatalAteliersData.formation.title}</h3>
                        <p className="mb-2 text-slate-700">
                            <strong>Formatrice :</strong> {chantPrenatalAteliersData.formation.formatrice}
                        </p>
                        <p className="mb-4 text-slate-700">{chantPrenatalAteliersData.formation.structure}</p>
                        <div className="mb-4">
                            <h4 className="text-lg font-semibold mb-2 text-slate-900">Programme :</h4>
                            {chantPrenatalAteliersData.formation.stages.map((stage, index) => (
                                <div key={index} className="mb-2 pl-4 border-l-2 border-rose-400">
                                    <p className="text-slate-700">
                                        <strong>Stage {stage.number} :</strong> {stage.title} ({stage.duration})
                                    </p>
                                </div>
                            ))}
                        </div>
                        <p className="mb-2 text-slate-700">
                            <strong>Contact :</strong> {chantPrenatalAteliersData.formation.contact.email} -{' '}
                            {chantPrenatalAteliersData.formation.contact.phone}
                        </p>
                    </div>
                )}

                {chantPrenatalAteliersData.rencontre && (
                    <div className="mb-8 p-6 bg-rose-50/60 rounded-3xl border border-rose-100">
                        <h3 className="text-xl font-semibold mb-3 text-slate-900">{chantPrenatalAteliersData.rencontre.title}</h3>
                        <p className="mb-2 text-slate-700">
                            <strong>Lieu :</strong> {chantPrenatalAteliersData.rencontre.location}
                        </p>
                        <p className="text-slate-700">{chantPrenatalAteliersData.rencontre.occasion}</p>
                    </div>
                )}

                {chantPrenatalAteliersData.publications && (
                    <div className="mb-8 p-6 bg-indigo-50/50 rounded-3xl border border-rose-100">
                        <p className="font-semibold text-slate-900">{chantPrenatalAteliersData.publications.title}</p>
                    </div>
                )}

                {chantPrenatalAteliersData.notes && chantPrenatalAteliersData.notes.length > 0 && (
                    <div className="mb-8 p-6 bg-rose-100/50 rounded-3xl border border-rose-200">
                        <h4 className="font-semibold mb-2 text-slate-900">Notes importantes :</h4>
                        {chantPrenatalAteliersData.notes.map((note, index) => (
                            <p key={index} className="mb-1 text-rose-700">• {note}</p>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
