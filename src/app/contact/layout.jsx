export const metadata = {
    title: {
        default: 'Contact',
        template: '%s | Envie de Chanter',
    },
    description: 'Contactez Envie de Chanter pour obtenir des renseignements sur les ateliers, stages et formations.',
};

export default function ContactLayout({ children }) {
    return (
        <div className="contact-layout">
            {children}
        </div>
    );
}
