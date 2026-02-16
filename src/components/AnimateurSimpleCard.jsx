export default function AnimateurSimpleCard({ animateur }) {
    return (
        <div className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-[#F25A38]">
            {/* Decorative gradient bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F25A38] via-[#F29057] to-[#F2B988]"></div>
            
            <div className="p-6">
                {/* Name with icon */}
                <div className="flex items-start gap-3 mb-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[#F25A38] to-[#F29057] rounded-full flex items-center justify-center shadow-md">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-900 group-hover:text-[#F25A38] transition-colors">
                            {animateur.name}
                        </h4>
                        {(animateur.city || animateur.region) && (
                            <div className="flex items-center gap-1 mt-1 text-sm text-gray-500">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                                <span>
                                    {[animateur.city, animateur.region].filter(Boolean).join(', ')}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Contact information */}
                <div className="space-y-3">
                    {animateur.phone && (
                        <a 
                            href={`tel:${animateur.phone.replace(/\s/g, '')}`}
                            className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-[#F25A38] hover:bg-[#F2B988]/5 transition-all group/item"
                        >
                            <div className="flex-shrink-0 w-8 h-8 bg-[#F2B988]/20 rounded-lg flex items-center justify-center group-hover/item:bg-[#F25A38] transition-colors">
                                <svg className="w-4 h-4 text-[#F25A38] group-hover/item:text-white transition-colors" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-gray-500 font-medium">Téléphone</p>
                                <p className="text-sm font-semibold text-gray-900 group-hover/item:text-[#F25A38] transition-colors">
                                    {animateur.phone}
                                </p>
                            </div>
                            <svg className="w-4 h-4 text-gray-400 group-hover/item:text-[#F25A38] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </a>
                    )}

                    {animateur.email && (
                        <a
                            href={`mailto:${animateur.email}`}
                            className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-[#F25A38] hover:bg-[#F2B988]/5 transition-all group/item"
                        >
                            <div className="flex-shrink-0 w-8 h-8 bg-[#F2B988]/20 rounded-lg flex items-center justify-center group-hover/item:bg-[#F25A38] transition-colors">
                                <svg className="w-4 h-4 text-[#F25A38] group-hover/item:text-white transition-colors" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-gray-500 font-medium">Email</p>
                                <p className="text-sm font-semibold text-gray-900 group-hover/item:text-[#F25A38] transition-colors truncate">
                                    {animateur.email}
                                </p>
                            </div>
                            <svg className="w-4 h-4 text-gray-400 group-hover/item:text-[#F25A38] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
