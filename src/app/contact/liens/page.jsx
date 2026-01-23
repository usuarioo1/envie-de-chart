import Image from 'next/image';
import liensData from '@/utils/contact/liens.json';

export default function LiensPage() {
    const { contact } = liensData;

    return (
        <div className="bg-gradient-to-b from-[#ABA0F2]/10 via-white to-[#F2B988]/20 min-h-screen">
            <div className="container mx-auto px-4 py-10">
                <h1 className="text-4xl font-bold mb-3 text-slate-900">
                    {liensData.title}
                </h1>
                <p className="text-lg text-slate-600 mb-10">{liensData.subtitle}</p>

                {/* Contact Card */}
                <div className="max-w-2xl mx-auto">
                    <div className="p-8 border-2 border-[#F2B988] rounded-3xl bg-white/80 shadow-[0_8px_30px_-15px_rgba(242,90,56,0.2)]">
                        <div className="flex items-center justify-center mb-6">
                            <Image 
                                src="/assets/icon/icono.png" 
                                alt="Logo" 
                                width={60} 
                                height={60}
                                className="object-contain"
                            />
                        </div>
                        <h2 className="text-3xl font-bold mb-6 text-slate-900 flex items-center justify-center">
                            <span className="inline-block w-1 h-10 bg-[#F25A38] rounded-full mr-4"></span>
                            {contact.name}
                        </h2>
                        
                        {/* Contact Information */}
                        <div className="space-y-4 mb-8">
                            {/* Phone */}
                            <div className="flex items-center">
                                <svg className="w-6 h-6 text-[#F25A38] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="text-lg text-slate-700 hover:text-[#F25A38] transition-colors">
                                    {contact.phone}
                                </a>
                            </div>
                            
                            {/* Email */}
                            <div className="flex items-center">
                                <svg className="w-6 h-6 text-[#F25A38] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <a href={`mailto:${contact.email}`} className="text-lg text-slate-700 hover:text-[#F25A38] transition-colors break-all">
                                    {contact.email}
                                </a>
                            </div>
                        </div>

                        {/* Social Networks */}
                        <div className="pt-6 border-t border-slate-200">
                            <h3 className="text-lg font-semibold text-slate-900 mb-4">Réseaux sociaux</h3>
                            <div className="flex gap-4">
                                {/* Facebook */}
                                {contact.socials.facebook && (
                                    <a 
                                        href={contact.socials.facebook} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 flex items-center justify-center rounded-full bg-[#1877F2] text-white hover:bg-[#166FE5] transition-colors shadow-md hover:shadow-lg"
                                        aria-label="Facebook"
                                    >
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                        </svg>
                                    </a>
                                )}
                                
                                {/* Instagram */}
                                {contact.socials.instagram && (
                                    <a 
                                        href={contact.socials.instagram} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white hover:scale-110 transition-transform shadow-md hover:shadow-lg"
                                        aria-label="Instagram"
                                    >
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                        </svg>
                                    </a>
                                )}
                                
                                {/* LinkedIn */}
                                {contact.socials.linkedin && (
                                    <a 
                                        href={contact.socials.linkedin} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 flex items-center justify-center rounded-full bg-[#0A66C2] text-white hover:bg-[#004182] transition-colors shadow-md hover:shadow-lg"
                                        aria-label="LinkedIn"
                                    >
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                        </svg>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
