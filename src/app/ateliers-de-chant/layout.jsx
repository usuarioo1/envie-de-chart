export const metadata = {
    title: {
        default: 'Ateliers de chant',
        template: '%s | Envie de Chanter',
    },
    description: 'Découvrez les ateliers de chant prénatal, chant maman-bébé, chant collectif et les cours particuliers.',
};

export default function AteliersDeChantLayout({ children }) {
    return (
        <div className="ateliers-de-chant-layout">
            {children}
        </div>
    );
}
