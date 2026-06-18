export const metadata = {
    title: {
        default: 'Stages et formations en psychophonie',
        template: '%s | Envie de Chanter',
    },
    description: 'Découvrez les stages et formations en chant, chant prénatal et psychophonie proposés par Envie de Chanter.',
    alternates: {
        canonical: '/stages-et-formations',
    },
};

export default function StagesEtFormationsLayout({ children }) {
    return (
        <div className="stages-et-formations-layout">
            {children}
        </div>
    );
}
