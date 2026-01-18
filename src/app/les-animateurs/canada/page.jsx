import canadaData from '@/utils/les animateurs/canada.json';
import AnimateurCard from '@/components/AnimateurCard';

export default function CanadaPage() {
    return (
        <div className="bg-gradient-to-b from-rose-50 via-white to-indigo-50 min-h-screen">
            <div className="container mx-auto px-4 py-10">
                <h1 className="text-4xl font-bold mb-4 text-slate-900">{canadaData.title}</h1>
                <p className="text-lg text-slate-600 mb-8">{canadaData.description}</p>

                {canadaData.areas.map((area, areaIndex) => (
                    <div key={areaIndex} className="mb-10">
                        <h2 className="text-3xl font-bold mb-6 text-slate-900">{area.name}</h2>
                        <div className="grid gap-6 md:grid-cols-2">
                            {area.animateurs.map((animateur, index) => (
                                <AnimateurCard key={index} animateur={animateur} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
