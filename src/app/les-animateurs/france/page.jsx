import franceData from '@/utils/les animateurs/france.json';

export default function FrancePage() {
    return (
        <div className="bg-gradient-to-b from-[#ABA0F2]/10 via-white to-[#F2B988]/20 min-h-screen">
            <div className="container mx-auto px-4 py-10">
                <h1 className="text-4xl font-bold mb-4 text-slate-900">{franceData.title}</h1>
                <p className="text-lg text-slate-600 mb-8">{franceData.description}</p>

                {/* Areas */}
                {franceData.areas.map((area, areaIndex) => (
                    <div key={areaIndex} className="mb-10">
                        <h2 className="text-3xl font-bold mb-6 text-slate-900">{area.name}</h2>
                        {area.city && <h3 className="text-xl text-slate-600 mb-4">{area.city}</h3>}

                        <div className="space-y-0 divide-y divide-[#F2B988]/30">
                            {area.animateurs.map((animateur, index) => (
                                <div
                                    key={index}
                                    className="py-6 px-4 hover:bg-[#F2B988]/5 transition-colors"
                                >
                                    <h4 className="text-xl font-bold mb-3 text-[#F25A38]">{animateur.name}</h4>

                                    {animateur.organization && (
                                        <p className="mb-2 text-slate-700">
                                            <strong>Organisation:</strong> {animateur.organization}
                                        </p>
                                    )}

                                    {animateur.phone && (
                                        <p className="mb-2 text-slate-700">
                                            <strong>Téléphone:</strong>{' '}
                                            <a href={`tel:${animateur.phone}`} className="text-[#F25A38] hover:text-[#732514]">
                                                {animateur.phone}
                                            </a>
                                        </p>
                                    )}

                                    {animateur.alternativePhone && (
                                        <p className="mb-2 text-slate-700">
                                            <strong>Tél. alternatif:</strong> {animateur.alternativePhone}
                                        </p>
                                    )}

                                    {animateur.email && (
                                        <p className="mb-2 text-slate-700">
                                            <strong>Email:</strong>{' '}
                                            <a
                                                href={`mailto:${animateur.email}`}
                                                className="text-[#F25A38] hover:text-[#732514] hover:underline break-all"
                                            >
                                                {animateur.email}
                                            </a>
                                        </p>
                                    )}

                                    {animateur.address && (
                                        <p className="mb-2 text-slate-700">
                                            <strong>Adresse:</strong> {animateur.address}
                                        </p>
                                    )}

                                    {animateur.city && (
                                        <p className="mb-2 text-slate-700">
                                            <strong>Ville:</strong> {animateur.city}
                                        </p>
                                    )}

                                    {animateur.metro && (
                                        <p className="mb-2 text-slate-600">
                                            <strong>Métro:</strong> {animateur.metro}
                                        </p>
                                    )}

                                    {animateur.website && (
                                        <p className="mb-2">
                                            <a
                                                href={`https://${animateur.website}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[#F25A38] hover:text-[#732514] hover:underline"
                                            >
                                                {animateur.website}
                                            </a>
                                        </p>
                                    )}

                                    {animateur.facebook && (
                                        <p className="mb-2">
                                            <a
                                                href={animateur.facebook}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[#F25A38] hover:text-[#732514] hover:underline"
                                            >
                                                Facebook
                                            </a>
                                        </p>
                                    )}

                                    {animateur.socialMedia && (
                                        <div className="mt-3 text-sm text-slate-600">
                                            <p className="font-semibold mb-1">Réseaux sociaux:</p>
                                            {animateur.socialMedia.facebook && <p>Facebook: {animateur.socialMedia.facebook}</p>}
                                            {animateur.socialMedia.instagram && <p>Instagram: {animateur.socialMedia.instagram}</p>}
                                            {animateur.socialMedia.linkedin && <p>LinkedIn: {animateur.socialMedia.linkedin}</p>}
                                        </div>
                                    )}

                                    {animateur.locations && (
                                        <div className="mt-3">
                                            <p className="font-semibold text-slate-900 mb-2">Lieux:</p>
                                            {animateur.locations.map((location, locIndex) => (
                                                <div key={locIndex} className="ml-4 mb-2 text-slate-700">
                                                    {typeof location === 'string' ? (
                                                        <p>• {location}</p>
                                                    ) : (
                                                        <div className="mb-2">
                                                            <p className="font-semibold text-slate-800">{location.name}</p>
                                                            <p className="text-sm">{location.address}</p>
                                                            {location.metro && <p className="text-sm">Métro: {location.metro}</p>}
                                                            {location.website && (
                                                                <a
                                                                    href={location.website}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-[#F25A38] hover:underline text-sm"
                                                                >
                                                                    {location.website}
                                                                </a>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {animateur.ateliers && (
                                        <div className="mt-4 space-y-3">
                                            <p className="font-semibold text-slate-900">Ateliers:</p>
                                            {animateur.ateliers.map((atelier, atelierIndex) => (
                                                <div key={atelierIndex} className="ml-4 p-3 bg-[#F2B988]/20 rounded-xl">
                                                    <p className="font-semibold text-slate-800 mb-2">{atelier.type}</p>
                                                    {atelier.sessions &&
                                                        atelier.sessions.map((session, sessionIndex) => (
                                                            <div key={sessionIndex} className="text-sm text-slate-700 mb-2">
                                                                <p>
                                                                    {session.day} {session.time && `à ${session.time}`}
                                                                    {session.format && ` ${session.format}`}
                                                                </p>
                                                                {session.location && <p>{session.location}</p>}
                                                                {session.address && <p>{session.address}</p>}
                                                                {session.metro && <p>Métro: {session.metro}</p>}
                                                                {session.service && <p className="text-[#F25A38]">{session.service}</p>}
                                                            </div>
                                                        ))}
                                                    {atelier.format && <p className="text-sm text-slate-600">{atelier.format}</p>}
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {animateur.services && (
                                        <div className="mt-3">
                                            <p className="font-semibold text-slate-900 mb-2">Services:</p>
                                            <ul className="list-disc list-inside text-sm text-slate-700 ml-4">
                                                {animateur.services.map((service, serviceIndex) => (
                                                    <li key={serviceIndex}>{service}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
