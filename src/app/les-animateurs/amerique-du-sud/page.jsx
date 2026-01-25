import americaData from '@/utils/les animateurs/amerique-du-sud.json';
import AnimateurCard from '@/components/AnimateurCard';

export default function AmeriqueDuSudPage() {
    return (
        <div className="bg-gradient-to-b from-[#ABA0F2]/10 via-white to-[#F2B988]/20 min-h-screen">
            <div className="container mx-auto px-4 py-10">
                <h1 className="text-4xl font-bold mb-4 text-slate-900">{americaData.title}</h1>

                <div className="mb-8 p-6 bg-[#F2B988]/20 rounded-3xl border border-[#F2B988]">
                    <p className="text-slate-700 mb-4">{americaData.introduction.es}</p>
                    <p className="text-slate-700">{americaData.introduction.pt}</p>
                </div>

                {americaData.countries.map((country, countryIndex) => (
                    <div key={countryIndex} className="mb-10">
                        <h2 className="text-3xl font-bold mb-6 text-slate-900">{country.name}</h2>

                        {country.nextFormation && (
                            <p className="mb-4 text-[#F25A38] font-semibold">
                                Próxima formación: {country.nextFormation}
                            </p>
                        )}

                        {country.contact && (
                            <div className="mb-6 p-4 bg-[#ABA0F2]/10 rounded-xl">
                                <p className="text-slate-700">
                                    <strong>Contacto:</strong> {country.contact.name} - {country.contact.phone}
                                </p>
                            </div>
                        )}

                        {country.animateurs && (
                            <div className="space-y-0 divide-y divide-[#F2B988]/30">
                                {country.animateurs.map((animateur, index) => (
                                    <div key={index} className="py-6 px-4 hover:bg-[#F2B988]/5 transition-colors">
                                        <AnimateurCard animateur={animateur} />
                                    </div>
                                ))}
                            </div>
                        )}

                        {country.states && country.states.map((state, stateIndex) => (
                            <div key={stateIndex} className="mt-8">
                                <h3 className="text-2xl font-semibold mb-4 text-slate-800">{state.name}</h3>
                                <div className="space-y-0 divide-y divide-[#F2B988]/30">
                                    {state.animateurs.map((animateur, index) => (
                                        <div key={index} className="py-6 px-4 hover:bg-[#F2B988]/5 transition-colors">
                                            <AnimateurCard animateur={animateur} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
