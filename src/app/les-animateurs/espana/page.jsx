import espanaData from '@/utils/les animateurs/espana.json';
import AnimateurCard from '@/components/AnimateurCard';

export default function EspanaPage() {
    return (
        <div className="bg-gradient-to-b from-[#ABA0F2]/10 via-white to-[#F2B988]/20 min-h-screen">
            <div className="container mx-auto px-4 py-10">
                <h1 className="text-4xl font-bold mb-4 text-slate-900">{espanaData.title}</h1>

                <div className="mb-8 p-6 bg-[#F2B988]/20 rounded-3xl border border-[#F2B988]">
                    <p className="text-slate-700 mb-4">{espanaData.introduction}</p>
                    <div className="mt-4 p-4 bg-white/60 rounded-xl">
                        <p className="font-semibold text-slate-900 mb-2">Contacto principal:</p>
                        <p className="text-slate-700">{espanaData.mainContact.name}</p>
                        <p className="text-slate-700">
                            Tel: <a href={`tel:${espanaData.mainContact.phone}`} className="text-[#F25A38] hover:text-[#732514]">{espanaData.mainContact.phone}</a>
                        </p>
                        <p className="text-slate-700">
                            Email: <a href={`mailto:${espanaData.mainContact.email}`} className="text-[#F25A38] hover:text-[#732514]">{espanaData.mainContact.email}</a>
                        </p>
                        <a href={espanaData.mainContact.website} target="_blank" rel="noopener noreferrer" className="text-[#F25A38] hover:text-[#732514] hover:underline">
                            {espanaData.mainContact.website}
                        </a>
                    </div>
                </div>

                {espanaData.regions.map((region, regionIndex) => (
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
