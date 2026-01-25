import belgiqueData from '@/utils/les animateurs/belgique.json';
import AnimateurCard from '@/components/AnimateurCard';

export default function BelgiquePage() {
    return (
        <div className="bg-gradient-to-b from-[#ABA0F2]/10 via-white to-[#F2B988]/20 min-h-screen">
            <div className="container mx-auto px-4 py-10">
                <h1 className="text-4xl font-bold mb-4 text-slate-900">{belgiqueData.title}</h1>
                <p className="text-lg text-slate-600 mb-8">{belgiqueData.description}</p>

                <div className="space-y-0 divide-y divide-[#F2B988]/30">
                    {belgiqueData.animateurs.map((animateur, index) => (
                        <div key={index} className="py-6 px-4 hover:bg-[#F2B988]/5 transition-colors">
                            <AnimateurCard animateur={animateur} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
