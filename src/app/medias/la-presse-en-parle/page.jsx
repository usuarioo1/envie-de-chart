import presseData from '@/utils/medias/laPresseEnParle.json';

export default function LaPresseEnParlePage() {
    return (
        <div className="bg-gradient-to-b from-[#ABA0F2]/10 via-white to-[#F2B988]/20 min-h-screen">
            <div className="container mx-auto px-4 py-10">
                <h1 className="text-4xl font-bold mb-8 text-slate-900">{presseData.title}</h1>

                <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                    {presseData.articles.map((article) => (
                        <div
                            key={article.id}
                            className={`p-8 border-2 rounded-3xl bg-white/80 shadow-[0_8px_30px_-15px_rgba(242,90,56,0.2)] hover:shadow-[0_20px_50px_-15px_rgba(242,90,56,0.3)] transition-all ${article.featured
                                ? 'border-[#F25A38] ring-2 ring-[#F29057] ring-opacity-50'
                                : 'border-[#F2B988]'
                                }`}
                        >
                            {/* Type Badge */}
                            <div className="mb-4">
                                <span className="inline-block px-3 py-1 text-xs font-semibold text-[#732514] bg-[#F2B988]/40 rounded-full">
                                    {article.type}
                                </span>
                            </div>

                            {/* Source & Program */}
                            <h2 className="text-2xl font-bold mb-2 text-slate-900">
                                {article.source}
                            </h2>
                            <h3 className="text-lg font-semibold text-[#F25A38] mb-4">
                                {article.program}
                            </h3>

                            {/* Description */}
                            <p className="text-slate-700 leading-relaxed mb-6">
                                {article.description}
                            </p>

                            {/* Listen Button */}
                            <div className="flex justify-center">
                                <button className="inline-flex items-center px-6 py-3 bg-[#F25A38] text-white rounded-full hover:bg-[#732514] transition-all">
                                    <svg
                                        className="w-5 h-5 mr-2"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    Écouter
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Info Banner */}
                <div className="mt-10 p-6 bg-[#ABA0F2]/10 rounded-3xl border-2 border-[#F29057]">
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
                                Vous avez des articles sur le chant prénatal ?
                            </h3>
                            <p className="text-slate-700">
                                N'hésitez pas à nous contacter pour partager vos publications ou interviews.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
