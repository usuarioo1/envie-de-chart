import chantMamaData from '@/utils/ateliers de chant/chantmama.json';

export default function ChantMamanBebePage() {
    return (
        <div className="bg-gradient-to-b from-rose-50 via-white to-indigo-50 min-h-screen">
            <div className="container mx-auto px-4 py-10">
                <h1 className="text-4xl font-bold mb-4 text-slate-900">{chantMamaData.title}</h1>
                <h2 className="text-2xl text-slate-600 mb-6">{chantMamaData.subtitle}</h2>

                <div className="mb-8">
                    {chantMamaData.description.map((paragraph, index) => (
                        <p key={index} className="mb-4 text-slate-700 leading-relaxed">
                            {paragraph}
                        </p>
                    ))}
                </div>

                {chantMamaData.formation && (
                    <div className="mb-8 p-6 border-2 border-rose-200 rounded-3xl bg-white/80 shadow-sm">
                        <h3 className="text-2xl font-semibold mb-4 text-slate-900">{chantMamaData.formation.title}</h3>
                        <p className="mb-4 text-slate-700">{chantMamaData.formation.note}</p>
                        <p className="mb-2 text-slate-700">
                            <strong>Contact :</strong> {chantMamaData.formation.contact.email} -{' '}
                            {chantMamaData.formation.contact.phone}
                        </p>
                        <div className="mt-4">
                            <p className="font-semibold mb-2 text-slate-900">Documents :</p>
                            <ul className="list-disc list-inside ml-4 text-slate-700">
                                {chantMamaData.formation.documents.map((doc, index) => (
                                    <li key={index}>{doc}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                {chantMamaData.rencontre && (
                    <div className="mb-8 p-6 bg-rose-50 rounded-3xl border border-rose-100">
                        <h3 className="text-xl font-semibold mb-3 text-slate-900">{chantMamaData.rencontre.title}</h3>
                        <p className="mb-2 text-slate-700">
                            <strong>Date :</strong> {chantMamaData.rencontre.date}
                        </p>
                        <p className="text-slate-700">{chantMamaData.rencontre.document}</p>
                    </div>
                )}

                <div className="mb-8">
                    <h3 className="text-2xl font-semibold mb-4 text-slate-900">Ateliers</h3>
                    {chantMamaData.ateliers.map((atelier, index) => (
                        <div key={index} className="mb-6 p-6 border border-rose-100 rounded-3xl bg-white/80 shadow-[0_8px_30px_-15px_rgba(15,23,42,0.2)] hover:shadow-[0_20px_50px_-15px_rgba(15,23,42,0.3)] transition-shadow">
                            <h4 className="text-xl font-semibold mb-3 text-slate-900">{atelier.title}</h4>
                            <p className="mb-2 text-slate-700">
                                <strong>Horaire :</strong> {atelier.schedule}
                            </p>
                            {atelier.nextSession && (
                                <p className="mb-2 text-slate-700">
                                    <strong>Prochaine séance :</strong> {atelier.nextSession}
                                </p>
                            )}
                            {atelier.location && (
                                <div className="mb-3 text-slate-700">
                                    {atelier.location.venue && <p><strong>Lieu :</strong> {atelier.location.venue}</p>}
                                    {atelier.location.details && <p>{atelier.location.details}</p>}
                                    {atelier.location.address && <p><strong>Adresse :</strong> {atelier.location.address}</p>}
                                    {atelier.location.metro && <p><strong>Métro :</strong> {atelier.location.metro}</p>}
                                </div>
                            )}
                            {atelier.tarif && (
                                <p className="mb-2 text-slate-700">
                                    <strong>Tarif :</strong> {atelier.tarif}
                                    {atelier.duration && ` pour l'atelier d'${atelier.duration}`}
                                </p>
                            )}
                            {atelier.registration && (
                                <p className="mb-2 text-rose-500">{atelier.registration}</p>
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

                {chantMamaData.serviceIndividuel && (
                    <div className="mb-8 p-6 bg-rose-50/60 rounded-3xl border border-rose-100">
                        <h3 className="text-xl font-semibold mb-3 text-slate-900">{chantMamaData.serviceIndividuel.title}</h3>
                        <p className="mb-4 text-slate-700">{chantMamaData.serviceIndividuel.description}</p>
                        <div className="mb-4">
                            <p className="font-semibold mb-2 text-slate-900">Lieux :</p>
                            {chantMamaData.serviceIndividuel.locations.map((location, index) => (
                                <div key={index} className="mb-2 pl-4 border-l-2 border-rose-400">
                                    {location.venue && <p className="text-slate-900"><strong>{location.venue}</strong></p>}
                                    <p className="text-slate-700">{location.address}</p>
                                    {location.metro && <p className="text-slate-700">Métro : {location.metro}</p>}
                                </div>
                            ))}
                        </div>
                        <p className="mb-2 text-slate-700">
                            <strong>Contact :</strong> {chantMamaData.serviceIndividuel.contact.name} -{' '}
                            {chantMamaData.serviceIndividuel.contact.phone} -{' '}
                            <a href={`mailto:${chantMamaData.serviceIndividuel.contact.email}`} className="text-rose-500 hover:text-rose-600 hover:underline">
                                {chantMamaData.serviceIndividuel.contact.email}
                            </a>
                        </p>
                    </div>
                )}

                {chantMamaData.informationGenerale && (
                    <div className="mb-8 p-6 bg-indigo-50/50 rounded-3xl border border-rose-100">
                        <p className="mb-2 text-slate-700">{chantMamaData.informationGenerale.note}</p>
                        <p className="text-slate-600">{chantMamaData.informationGenerale.partenaire}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
