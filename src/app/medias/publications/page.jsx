import publicationsData from '@/utils/medias/publications.json';

export default function PublicationsPage() {
    return (
        <div className="bg-gradient-to-b from-[#ABA0F2]/10 via-white to-[#F2B988]/20 min-h-screen">
            <div className="container mx-auto px-4 py-10">
                <h1 className="text-4xl font-bold mb-3 text-slate-900">
                    {publicationsData.title}
                </h1>
                <p className="text-lg text-slate-600 mb-10">{publicationsData.subtitle}</p>

                <div className="space-y-12">
                    {publicationsData.books.map((book) => (
                        <div
                            key={book.id}
                            className="p-8 border border-[#F2B988] rounded-3xl bg-white/80 shadow-[0_8px_30px_-15px_rgba(242,90,56,0.2)] hover:shadow-[0_20px_50px_-15px_rgba(242,90,56,0.3)] transition-all"
                        >
                            {/* Book Header */}
                            <div className="mb-6 border-b border-[#F2B988] pb-6">
                                <h2 className="text-3xl font-bold mb-2 text-slate-900">
                                    {book.title}
                                </h2>
                                {book.subtitle && (
                                    <p className="text-lg text-[#F25A38] font-semibold mb-2">
                                        {book.subtitle}
                                    </p>
                                )}
                                {book.tagline && (
                                    <p className="text-lg text-slate-700 italic mb-2">
                                        {book.tagline}
                                    </p>
                                )}
                                <p className="text-slate-600">par {book.author}</p>
                            </div>

                            {/* Book Description */}
                            <div className="mb-6 space-y-4">
                                {book.description.map((paragraph, index) => (
                                    <p key={index} className="text-slate-700 leading-relaxed">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>

                            {/* About Author */}
                            <div className="mb-6 p-6 bg-[#F2B988]/20 rounded-2xl">
                                <h3 className="font-semibold text-slate-900 mb-3">
                                    À propos de l'auteure
                                </h3>
                                <p className="text-slate-700 leading-relaxed mb-3">
                                    {book.about_author}
                                </p>
                                {book.conclusion && (
                                    <p className="text-slate-700 leading-relaxed">
                                        {book.conclusion}
                                    </p>
                                )}
                            </div>

                            {/* Recommendation */}
                            {book.recommendation && (
                                <div className="mb-6 p-4 bg-[#ABA0F2]/10 rounded-2xl border border-[#F2B988]">
                                    <div className="flex items-start">
                                        <svg
                                            className="w-5 h-5 text-[#F25A38] mr-2 flex-shrink-0 mt-0.5"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <p className="text-slate-700 font-semibold">
                                            {book.recommendation}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Book Details & Order */}
                            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pt-6 border-t border-[#F2B988]">
                                {/* Details Grid */}
                                <div className="grid grid-cols-2 gap-4 flex-grow">
                                    <div>
                                        <p className="text-sm text-slate-600 mb-1">Pages</p>
                                        <p className="font-semibold text-slate-900">
                                            {book.details.pages}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-600 mb-1">Format</p>
                                        <p className="font-semibold text-slate-900">
                                            {book.details.format}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-600 mb-1">ISBN</p>
                                        <p className="font-semibold text-slate-900">
                                            {book.details.isbn}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-600 mb-1">Prix</p>
                                        <p className="font-bold text-[#F25A38] text-xl">
                                            {book.details.price}
                                        </p>
                                    </div>
                                </div>

                                {/* Order Button */}
                                {book.order_link && (
                                    <a
                                        href={book.order_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center px-8 py-3 bg-[#F25A38] text-white rounded-full hover:bg-[#732514] transition-all whitespace-nowrap"
                                    >
                                        <svg
                                            className="w-5 h-5 mr-2"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                            />
                                        </svg>
                                        Commander le livre
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Contact Banner */}
                <div className="mt-10 p-6 bg-gradient-to-r from-[#ABA0F2]/10 to-[#F2B988]/20 rounded-3xl border border-[#F2B988]">
                    <div className="text-center">
                        <h3 className="font-semibold text-slate-900 mb-2 text-xl">
                            Intéressé par nos publications ?
                        </h3>
                        <p className="text-slate-700 mb-4">
                            Contactez-nous pour plus d'informations ou pour commander directement.
                        </p>
                        <a
                            href="mailto:marielaurepotel@orange.fr"
                            className="inline-flex items-center px-6 py-3 bg-white border border-[#F29057] rounded-full text-slate-900 hover:bg-[#F2B988]/20 hover:border-[#F25A38] transition-all"
                        >
                            <svg
                                className="w-5 h-5 mr-2 text-[#F25A38]"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                            </svg>
                            Nous contacter
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
