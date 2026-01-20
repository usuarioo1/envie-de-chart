import portugalData from '@/utils/les animateurs/portugal.json';
import AnimateurCard from '@/components/AnimateurCard';

export default function PortugalPage() {
    return (
        <div className="bg-gradient-to-b from-[#ABA0F2]/10 via-white to-[#F2B988]/20 min-h-screen">
            <div className="container mx-auto px-4 py-10">
                <h1 className="text-4xl font-bold mb-4 text-slate-900">{portugalData.title}</h1>

                <div className="mb-8 p-6 bg-[#F2B988]/20 rounded-3xl border border-[#F2B988]">
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
