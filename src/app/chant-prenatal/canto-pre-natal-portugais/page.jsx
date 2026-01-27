import contentData from '@/utils/chantPrenatal/cantoprenatalPortugues.json';

const BlockRenderer = () => {
    const sectionsToAddImageAfter = [
        'Origem',
        'Os laços com o bebé',
        'O pos-natal',
        'A psicofonia'
    ];

    return (
        <div className="space-y-8">
            {contentData.sections.map((section, index) => {
                const isHeading = section.type === 'heading';
                const shouldAddImage = isHeading && sectionsToAddImageAfter.includes(section.content);

                return (
                    <div key={`${index}-${section.content.slice(0, 20)}`}>
                        {isHeading ? (
                            <div className="mt-8 first:mt-0">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-1.5 h-8 bg-gradient-to-b from-[#F29057] to-[#ABA0F2] rounded-full"></div>
                                    <h3 className="text-2xl font-bold text-slate-900">
                                        {section.content}
                                    </h3>
                                </div>
                            </div>
                        ) : (
                            <div className="pl-6">
                                <p className="whitespace-pre-line text-base leading-relaxed text-slate-700">
                                    {section.content}
                                </p>
                            </div>
                        )}

                        {shouldAddImage && (
                            <div className="pl-6 mt-6 flex justify-center">
                                <div className="w-full max-w-[600px] aspect-[3/2] bg-slate-200 rounded-lg overflow-hidden">
                                    <img
                                        src="https://via.placeholder.com/600x400"
                                        alt={`Ilustração para ${section.content}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export const metadata = {
    title: 'Canto Pré-natal em portugais',
    description: 'Descrição em português das formações, fundamentos e psicofonia aplicada.',
};

export default function CantoPrenatalPortugaisPage() {
    return (
        <main className="px-4 py-12">
            <div className="mx-auto max-w-5xl space-y-10">
                <header className="rounded-3xl border border-[#F2B988] bg-gradient-to-br from-white via-[#F2B988]/20 to-[#ABA0F2]/10 p-8 shadow-sm">
                    <p className="text-xs uppercase tracking-[0.35em] text-[#F29057]">Le Chant Prénatal</p>
                    <h1 className="mt-3 text-3xl font-semibold text-slate-900">Canto Pré-natal (PT)</h1>
                    <p className="mt-2 text-sm text-slate-600">
                        Conteúdos sobre encontros no Brasil, fundamentos corporais e ligações com a psicofonia.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3 text-xs text-slate-500">
                        <span className="rounded-full border border-slate-200 px-3 py-1">Langue · Português</span>
                        <span className="rounded-full border border-slate-200 px-3 py-1">Formação</span>
                        <span className="rounded-full border border-slate-200 px-3 py-1">Bem-estar gestacional</span>
                    </div>
                </header>

                <section className="rounded-3xl border border-[#F2B988] bg-white/85 p-8 shadow-[0_25px_60px_-40px_rgba(242,90,56,0.35)]">
                    <BlockRenderer />
                </section>
            </div>
        </main>
    );
}
