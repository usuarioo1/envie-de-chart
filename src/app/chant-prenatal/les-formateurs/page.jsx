import formatorsData from '@/utils/les formateurs/formateus.json';

const introHeading = formatorsData.intro;
const profiles = formatorsData.profiles.map((profile) => ({
    title: profile.name,
    body: profile.description,
}));

export const metadata = {
    title: 'Les formateurs',
    description: 'Portraits des formatrices et formateurs associés au chant prénatal et à la psychophonie.',
};

export default function LesFormateursPage() {
    return (
        <main className="px-4 py-12">
            <div className="mx-auto max-w-5xl space-y-10">
                <header className="rounded-3xl border border-rose-100 bg-gradient-to-br from-white via-rose-50/70 to-indigo-50/50 p-8 shadow-sm">
                    <p className="text-xs uppercase tracking-[0.35em] text-rose-400">Le Chant Prénatal</p>
                    <h1 className="mt-3 text-3xl font-semibold text-slate-900">Les formateurs</h1>
                    <p className="mt-2 text-sm text-slate-600">
                        Réseau de formatrices, formateurs et partenaires qui diffusent la psychophonie et le chant prénatal.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3 text-xs text-slate-500">
                        <span className="rounded-full border border-slate-200 px-3 py-1">Formation</span>
                        <span className="rounded-full border border-slate-200 px-3 py-1">Psychophonie</span>
                        <span className="rounded-full border border-slate-200 px-3 py-1">Réseau international</span>
                    </div>
                </header>

                <section className="rounded-3xl border border-rose-100 bg-white/85 p-8 shadow-[0_25px_60px_-40px_rgba(15,23,42,0.35)]">
                    {introHeading && (
                        <div className="flex items-center gap-3 pb-4 border-b-2 border-rose-200">
                            <svg className="h-6 w-6 text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-400">{introHeading}</p>
                        </div>
                    )}
                    <div className="mt-8 grid gap-6 md:grid-cols-2">
                        {profiles.map((profile) => (
                            <article key={profile.title} className="group rounded-2xl border border-slate-100 bg-gradient-to-br from-white to-rose-50/30 p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 rounded-full bg-rose-100 p-2">
                                        <svg className="h-5 w-5 text-rose-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h2 className="text-lg font-semibold text-slate-900 group-hover:text-rose-600 transition-colors">{profile.title}</h2>
                                        {profile.body && (
                                            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-slate-700">{profile.body}</p>
                                        )}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}
