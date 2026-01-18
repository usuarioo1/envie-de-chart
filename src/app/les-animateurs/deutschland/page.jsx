import deutschlandData from '@/utils/les animateurs/deutschland.json';
import AnimateurCard from '@/components/AnimateurCard';

export default function DeutschlandPage() {
    return (
        <div className="bg-gradient-to-b from-rose-50 via-white to-indigo-50 min-h-screen">
            <div className="container mx-auto px-4 py-10">
                <h1 className="text-4xl font-bold mb-4 text-slate-900">{deutschlandData.title}</h1>

                <div className="mb-8 p-6 bg-rose-50 rounded-3xl border border-rose-100">
                    <p className="text-slate-700 mb-4">{deutschlandData.introduction}</p>
                    <p className="text-slate-700">{deutschlandData.target}</p>
                </div>

                {deutschlandData.regions.map((region, regionIndex) => (
                    <div key={regionIndex} className="mb-10">
                        <h2 className="text-3xl font-bold mb-6 text-slate-900">{region.name}</h2>
                        <div className="grid gap-6 md:grid-cols-2">
                            {region.animateurs.map((animateur, index) => (
                                <AnimateurCard key={index} animateur={animateur} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
