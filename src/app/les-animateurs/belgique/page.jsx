import belgiqueData from '@/utils/les animateurs/belgique.json';
import AnimateurCard from '@/components/AnimateurCard';

export default function BelgiquePage() {
    return (
        <div className="bg-gradient-to-b from-rose-50 via-white to-indigo-50 min-h-screen">
            <div className="container mx-auto px-4 py-10">
                <h1 className="text-4xl font-bold mb-4 text-slate-900">{belgiqueData.title}</h1>
                <p className="text-lg text-slate-600 mb-8">{belgiqueData.description}</p>

                <div className="grid gap-6 md:grid-cols-2">
                    {belgiqueData.animateurs.map((animateur, index) => (
                        <AnimateurCard key={index} animateur={animateur} />
                    ))}
                </div>
            </div>
        </div>
    );
}
