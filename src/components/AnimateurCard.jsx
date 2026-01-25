export default function AnimateurCard({ animateur }) {
    return (
        <div>
            <h4 className="text-xl font-bold mb-3 text-[#F25A38]">{animateur.name}</h4>

            {animateur.organization && (
                <p className="mb-2 text-slate-700">
                    <strong>Organisation:</strong> {animateur.organization}
                </p>
            )}

            {animateur.phone && (
                <p className="mb-2 text-slate-700">
                    <strong>Téléphone:</strong>{' '}
                    <a href={`tel:${animateur.phone.replace(/\s/g, '')}`} className="text-[#F25A38] hover:text-[#732514]">
                        {animateur.phone}
                    </a>
                </p>
            )}

            {animateur.phones && (
                <div className="mb-2 text-slate-700">
                    <strong>Téléphones:</strong>
                    {animateur.phones.map((phone, idx) => (
                        <span key={idx}>
                            {' '}
                            <a href={`tel:${phone.replace(/\s/g, '')}`} className="text-[#F25A38] hover:text-[#732514]">
                                {phone}
                            </a>
                            {idx < animateur.phones.length - 1 && ','}
                        </span>
                    ))}
                </div>
            )}

            {animateur.mobile && (
                <p className="mb-2 text-slate-700">
                    <strong>Mobile:</strong>{' '}
                    <a href={`tel:${animateur.mobile.replace(/\s/g, '')}`} className="text-[#F25A38] hover:text-[#732514]">
                        {animateur.mobile}
                    </a>
                </p>
            )}

            {animateur.whatsapp && (
                <p className="mb-2 text-slate-700">
                    <strong>WhatsApp:</strong> {animateur.whatsapp}
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

            {animateur.emails && (
                <div className="mb-2 text-slate-700">
                    <strong>Emails:</strong>
                    {animateur.emails.map((email, idx) => (
                        <div key={idx} className="ml-2">
                            <a href={`mailto:${email}`} className="text-[#F25A38] hover:text-[#732514] hover:underline text-sm">
                                {email}
                            </a>
                        </div>
                    ))}
                </div>
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
                        href={animateur.website.startsWith('http') ? animateur.website : `https://${animateur.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#F25A38] hover:text-[#732514] hover:underline text-sm"
                    >
                        {animateur.website}
                    </a>
                </p>
            )}

            {animateur.websites && (
                <div className="mb-2">
                    {Array.isArray(animateur.websites) ? (
                        animateur.websites.map((site, idx) => (
                            <a
                                key={idx}
                                href={site.startsWith('http') ? site : `https://${site}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block text-[#F25A38] hover:text-[#732514] hover:underline text-sm"
                            >
                                {site}
                            </a>
                        ))
                    ) : (
                        Object.entries(animateur.websites).map(([key, site], idx) => (
                            <a
                                key={idx}
                                href={site.startsWith('http') ? site : `https://${site}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block text-[#F25A38] hover:text-[#732514] hover:underline text-sm"
                            >
                                {key}: {site}
                            </a>
                        ))
                    )}

                    {animateur.facebook && (
                        <p className="mb-2">
                            <a
                                href={animateur.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#F25A38] hover:text-[#732514] hover:underline text-sm"
                            >
                                Facebook
                            </a>
                        </p>
                    )}

                    {animateur.instagram && (
                        <p className="mb-2 text-slate-700">
                            <strong>Instagram:</strong> {animateur.instagram}
                        </p>
                    )}

                    {animateur.socialMedia && (
                        <div className="mt-3 text-sm text-slate-600 p-3 bg-[#ABA0F2]/10 rounded-xl">
                            <p className="font-semibold mb-1 text-slate-900">Réseaux sociaux:</p>
                            {animateur.socialMedia.facebook && <p>📘 Facebook: {animateur.socialMedia.facebook}</p>}
                            {animateur.socialMedia.instagram && <p>📷 Instagram: {animateur.socialMedia.instagram}</p>}
                            {animateur.socialMedia.linkedin && <p>💼 LinkedIn: {animateur.socialMedia.linkedin}</p>}
                        </div>
                    )}

                    {animateur.locations && Array.isArray(animateur.locations) && (
                        <div className="mt-3">
                            <p className="font-semibold text-slate-900 mb-2">Lieux:</p>
                            {animateur.locations.map((location, locIndex) => (
                                <div key={locIndex} className="ml-4 mb-2 text-slate-700">
                                    {typeof location === 'string' ? (
                                        <p className="text-sm">• {location}</p>
                                    ) : (
                                        <div className="mb-2 p-2 bg-[#F2B988]/10 rounded-lg">
                                            {location.name && <p className="font-semibold text-slate-800">{location.name}</p>}
                                            {location.address && <p className="text-sm">{location.address}</p>}
                                            {location.metro && <p className="text-sm">Métro: {location.metro}</p>}
                                            {location.phone && <p className="text-sm">Tél: {location.phone}</p>}
                                            {location.services && <p className="text-sm text-[#F25A38]">{location.services}</p>}
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

                    {animateur.sessions && (
                        <div className="mt-3 p-3 bg-[#F2B988]/20 rounded-xl">
                            <p className="font-semibold text-slate-900 mb-2">Sessions:</p>
                            {animateur.sessions.map((session, idx) => (
                                <div key={idx} className="text-sm text-slate-700 mb-2">
                                    {typeof session === 'string' ? (
                                        <p>• {session}</p>
                                    ) : (
                                        <div>
                                            {session.location && <p className="font-semibold">{session.location}</p>}
                                            {session.dates && <p>Dates: {session.dates}</p>}
                                            {session.module && <p>Module: {session.module}</p>}
                                            {session.organizer && <p>Organisateur: {session.organizer}</p>}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {animateur.nextFormation && (
                        <p className="mt-3 text-[#F25A38] font-semibold">
                            Prochaine formation: {animateur.nextFormation}
                        </p>
                    )}

                    {animateur.note && (
                        <p className="mt-3 text-sm text-slate-600 italic">{animateur.note}</p>
                    )}
                </div>
            )}
        </div>
    );
}
