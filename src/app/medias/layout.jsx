export const metadata = {
    title: {
        default: 'Médias',
        template: '%s | Envie de Chanter',
    },
    description: 'Découvrez les publications, vidéos et interventions dans la presse consacrées au chant et à la psychophonie.',
};

export default function MediasLayout({ children }) {
    return (
        <div className="medias-layout">
            {children}
        </div>
    );
}
