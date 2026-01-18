import Rrss from '@/components/rrss';
import coursParticuliersData from '@/utils/ateliers de chant/coursParticuliers.json';

export default function CoursParticuliersPage() {
    return (
        <div className="bg-gradient-to-b from-rose-50 via-white to-indigo-50 min-h-screen">
            <div className="container mx-auto px-4 py-10">
                <h1 className="text-4xl font-bold mb-6 text-slate-900">{coursParticuliersData.title}</h1>

                <div className="mb-8 p-6 bg-rose-50 rounded-3xl border border-rose-100 shadow-sm">
                    <h2 className="text-2xl font-semibold mb-4 text-slate-900">{coursParticuliersData.subtitle}</h2>
                    <p className="mb-2 text-slate-700">
                        <strong>{coursParticuliersData.contact.name}</strong>
                    </p>
                    <p className="mb-2 text-slate-700">
                        <strong>Téléphone :</strong>{' '}
                        <a href={`tel:${coursParticuliersData.contact.phone}`} className="text-rose-500 hover:text-rose-600 hover:underline">
                            {coursParticuliersData.contact.phone}
                        </a>
                    </p>
                    <p className="text-slate-700">
                        <strong>Email :</strong>{' '}
                        <a href={`mailto:${coursParticuliersData.contact.email}`} className="text-rose-500 hover:text-rose-600 hover:underline">
                            {coursParticuliersData.contact.email}
                        </a>
                    </p>
                </div>

                <div className="mb-8">
                    <h3 className="text-2xl font-semibold mb-4 text-slate-900">Les cours particuliers ont lieu :</h3>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {coursParticuliersData.locations.map((location, index) => (
                            <div key={index} className="p-6 border border-rose-100 rounded-3xl bg-white/80 shadow-[0_8px_30px_-15px_rgba(15,23,42,0.2)] hover:shadow-[0_20px_50px_-15px_rgba(15,23,42,0.3)] hover:-translate-y-1 transition-all">
                                <h4 className="text-xl font-semibold mb-3 text-rose-500">{location.title}</h4>
                                {location.venue && (
                                    <p className="mb-2 text-slate-700">
                                        <strong>Lieu :</strong> {location.venue}
                                    </p>
                                )}
                                {location.address && (
                                    <p className="mb-2 text-slate-700">
                                        <strong>Adresse :</strong> {location.address}
                                    </p>
                                )}
                                {location.city && (
                                    <p className="mb-2 text-slate-700">{location.city}</p>
                                )}
                                {location.metro && (
                                    <p className="mb-2 text-slate-700">
                                        <strong>Métro :</strong> {location.metro}
                                    </p>
                                )}
                                {location.transport && (
                                    <p className="mb-2 text-slate-700">
                                        <strong>Transport :</strong> {location.transport}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div className='flex justify-center'>
                    <Rrss />
                </div>

            </div>
        </div>
    );
}


