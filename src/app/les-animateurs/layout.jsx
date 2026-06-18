export const metadata = {
    title: {
        default: 'Animateurs de chant prénatal',
        template: '%s | Envie de Chanter',
    },
    description: 'Trouvez un animateur ou une animatrice de chant prénatal et de psychophonie dans votre pays.',
};

export const revalidate = 300;

export default function LesAnimateursLayout({ children }) {
    return (
        <div className="les-animateurs-layout">
            {children}
        </div>
    );
}
