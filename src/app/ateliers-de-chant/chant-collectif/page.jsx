import chantCollectifData from '@/utils/ateliers de chant/chantCollectif.json';

export default function ChantCollectifPage() {
    return (
        <div className="bg-gradient-to-b from-[#ABA0F2]/10 via-white to-[#F2B988]/20 min-h-screen">
            <div className="container mx-auto px-4 py-10">
                <h1 className="text-4xl font-bold mb-4 text-slate-900">{chantCollectifData.title}</h1>
                <h2 className="text-2xl text-slate-600 mb-6">{chantCollectifData.subtitle}</h2>

                <div className="mb-8">
                    {chantCollectifData.description.map((paragraph, index) => (
                        <p key={index} className="mb-4 text-slate-700 leading-relaxed">
                            {paragraph}
                        </p>
                    ))}
                </div>

                <div className="mb-8 p-6 bg-[#F2B988]/20 rounded-3xl border border-[#F2B988] shadow-sm">
                    <h3 className="text-xl font-semibold mb-3 text-slate-900">Contact</h3>
                    <p className="mb-2 text-slate-700">
                        <strong>Renseignements et inscriptions :</strong> {chantCollectifData.contact.name}
                    </p>
                    <p className="mb-2 text-slate-700">
                        <strong>Téléphone :</strong> {chantCollectifData.contact.phone}
                    </p>
                    <p className="text-slate-700">
                        <strong>Email :</strong>{' '}
                        <a href={`mailto:${chantCollectifData.contact.email}`} className="text-[#F25A38] hover:text-[#732514] hover:underline">
                            {chantCollectifData.contact.email}
                        </a>
                    </p>
                </div>

                <div className="mb-8">
                    <h3 className="text-2xl font-semibold mb-4 text-slate-900">Ateliers</h3>
                    {chantCollectifData.ateliers.map((atelier, index) => (
                        <div key={index} className="mb-6 p-6 border border-[#F2B988] rounded-3xl bg-white/80 shadow-[0_8px_30px_-15px_rgba(242,90,56,0.2)] hover:shadow-[0_20px_50px_-15px_rgba(242,90,56,0.3)] transition-shadow">
                            <h4 className="text-xl font-semibold mb-3 text-slate-900">{atelier.title}</h4>
                            <p className="mb-2 text-slate-700">
                                <strong>Horaire :</strong> {atelier.time}
                            </p>
                            {atelier.location.venue && (
                                <p className="mb-2 text-slate-700">
                                    <strong>Lieu :</strong> {atelier.location.venue}
                                </p>
                            )}
                            <p className="mb-2 text-slate-700">
                                <strong>Adresse :</strong> {atelier.location.address}
                            </p>
                            {atelier.location.metro && (
                                <p className="mb-2 text-slate-700">
                                    <strong>Métro :</strong> {atelier.location.metro}
                                </p>
                            )}
                            <p className="mb-2 text-slate-700">
                                <strong>Prochaine séance :</strong> {atelier.nextSession}
                            </p>
                            {atelier.pricing && (
                                <div className="mb-2 text-slate-700">
                                    <strong>Tarifs :</strong>
                                    <ul className="list-disc list-inside ml-4">
                                        <li>{atelier.pricing.perSession} la séance</li>
                                        <li>{atelier.pricing.package}</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {chantCollectifData.coursIndividuels && (
                    <div className="mb-8 p-6 bg-[#ABA0F2]/10 rounded-3xl border border-[#F2B988]">
                        <h3 className="text-xl font-semibold mb-3 text-slate-900">{chantCollectifData.coursIndividuels.title}</h3>
                        <p className="mb-4 text-slate-700">{chantCollectifData.coursIndividuels.availability}</p>
                        <p className="text-slate-700">
                            <strong>Contact :</strong> {chantCollectifData.coursIndividuels.contact.name} -{' '}
                            {chantCollectifData.coursIndividuels.contact.phone} -{' '}
                            <a href={`mailto:${chantCollectifData.coursIndividuels.contact.email}`} className="text-[#F25A38] hover:text-[#732514] hover:underline">
                                {chantCollectifData.coursIndividuels.contact.email}
                            </a>
                        </p>
                    </div>
                )}

                <div className="mb-8">
                    <h3 className="text-2xl font-semibold mb-4 text-slate-900">Stages de chant</h3>
                    {chantCollectifData.stages.map((stage, index) => (
                        <div key={index} className="mb-4 p-6 border border-[#F2B988] rounded-3xl bg-white/80">
                            <h4 className="text-lg font-semibold mb-2 text-slate-900">{stage.title}</h4>
                            {stage.subtitle && <p className="mb-2 text-slate-600">{stage.subtitle}</p>}
                            {stage.locations && (
                                <ul className="list-disc list-inside ml-4 text-slate-700">
                                    {stage.locations.map((location, idx) => (
                                        <li key={idx}>{location}</li>
                                    ))}
                                </ul>
                            )}
                            {stage.location && <p className="mb-2 text-slate-700">{stage.location}</p>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
