import contentData from '@/utils/chantPrenatal/cantoprenatalPortugues.json';

const BlockRenderer = () => (
    <div className="space-y-6">
        {contentData.sections.map((section, index) =>
            section.type === 'heading' ? (
                <div key={`${index}-${section.content.slice(0, 20)}`} className="flex items-center gap-3 pt-4 pb-2 border-b border-rose-100">
                    <svg className="h-5 w-5 flex-shrink-0 text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <h3 className="text-xl font-semibold text-slate-900">
                        {section.content}
                    </h3>
                </div>
            ) : (
                <div key={`${index}-${section.content.slice(0, 20)}`} className="pl-8 pr-4 py-3 bg-gradient-to-r from-rose-50/30 to-transparent rounded-lg border-l-2 border-rose-200">
                    <p className="whitespace-pre-line text-base leading-relaxed text-slate-700">
                        {section.content}
                    </p>
                </div>
            )
        )}
    </div>
);

export const metadata = {
    title: 'Canto Pré-natal em portugais',
    description: 'Descrição em português das formações, fundamentos e psicofonia aplicada.',
};

export default function CantoPrenatalPortugaisPage() {
    return (
        <main className="px-4 py-12">
            <div className="mx-auto max-w-5xl space-y-10">
                <header className="rounded-3xl border border-rose-100 bg-gradient-to-br from-white via-rose-50/70 to-indigo-50/50 p-8 shadow-sm">
                    <p className="text-xs uppercase tracking-[0.35em] text-rose-400">Le Chant Prénatal</p>
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

                <section className="rounded-3xl border border-rose-100 bg-white/85 p-8 shadow-[0_25px_60px_-40px_rgba(15,23,42,0.35)]">
                    <BlockRenderer />
                </section>
            </div>
        </main>
    );
}
