import liensData from '@/utils/contact/liens.json';

export default function LiensPage() {
    // Agrupar por categoría
    const groupedLinks = liensData.links.reduce((acc, link) => {
        if (!acc[link.category]) {
            acc[link.category] = [];
        }
        acc[link.category].push(link);
        return acc;
    }, {});

    return (
        <div className="bg-gradient-to-b from-[#ABA0F2]/10 via-white to-[#F2B988]/20 min-h-screen">
            <div className="container mx-auto px-4 py-10">
                <h1 className="text-4xl font-bold mb-3 text-slate-900">
                    {liensData.title}
                </h1>
                <p className="text-lg text-slate-600 mb-10">{liensData.subtitle}</p>

                {/* Grouped Links by Category */}
                <div className="space-y-8">
                    {Object.entries(groupedLinks).map(([category, links]) => (
                        <div key={category}>
                            <h2 className="text-2xl font-semibold mb-4 text-slate-900 flex items-center">
                                <span className="inline-block w-1 h-8 bg-[#F25A38] rounded-full mr-3"></span>
                                {category}
                            </h2>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {links.map((link) => (
                                    <div
                                        key={link.id}
                                        className="group p-6 border-2 border-[#F2B988] rounded-3xl bg-white/80 shadow-[0_8px_30px_-15px_rgba(242,90,56,0.2)] hover:shadow-[0_20px_50px_-15px_rgba(242,90,56,0.3)] hover:-translate-y-1 transition-all"
                                    >
                                        <div className="flex items-start justify-between">
                                            <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#F25A38] transition-colors">
                                                {link.name}
                                            </h3>
                                            {link.url ? (
                                                <svg
                                                    className="w-5 h-5 text-[#F25A38] flex-shrink-0 ml-2"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                                    />
                                                </svg>
                                            ) : (
                                                <span className="text-xs text-slate-400 italic ml-2">
                                                    Bientôt
                                                </span>
                                            )}
                                        </div>
                                        {link.url && (
                                            <a
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="mt-4 inline-flex items-center text-sm text-[#F25A38] hover:text-[#732514] font-semibold"
                                            >
                                                Visiter le site
                                                <svg
                                                    className="w-4 h-4 ml-1"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9 5l7 7-7 7"
                                                    />
                                                </svg>
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Info Banner */}
                <div className="mt-10 p-6 bg-gradient-to-r from-[#F2B988]/20 to-[#ABA0F2]/10 rounded-3xl border-2 border-[#F29057]">
                    <div className="flex items-start">
                        <svg
                            className="w-6 h-6 text-[#F25A38] mr-3 flex-shrink-0 mt-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <div>
                            <h3 className="font-semibold text-slate-900 mb-1">
                                Vous souhaitez apparaître dans cette liste ?
                            </h3>
                            <p className="text-slate-700">
                                Contactez-nous pour devenir partenaire ou pour nous suggérer d'autres ressources utiles.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
