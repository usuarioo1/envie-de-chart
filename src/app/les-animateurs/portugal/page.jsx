import portugalData from '@/utils/les animateurs/portugal.json';
import AnimateurCard from '@/components/AnimateurCard';

export default function PortugalPage() {
    return (
        <div className="bg-gradient-to-b from-rose-50 via-white to-indigo-50 min-h-screen">
            <div className="container mx-auto px-4 py-10">
                <h1 className="text-4xl font-bold mb-4 text-slate-900">{portugalData.title}</h1>

                <div className="mb-8 p-6 bg-rose-50 rounded-3xl border border-rose-100">
                    <p className="text-slate-700">{portugalData.introduction}</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {portugalData.animateurs.map((animateur, index) => (
                        <AnimateurCard key={index} animateur={animateur} />
                    ))}
                </div>
            </div>
        </div>
    );
}
