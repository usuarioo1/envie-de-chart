export const metadata = {
    title: {
        default: 'Chant prénatal et psychophonie',
        template: '%s | Envie de Chanter',
    },
    description: 'Découvrez le chant prénatal, ses bienfaits, ses origines et son lien avec la psychophonie.',
};

export default function ChantPrenatalLayout({ children }) {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#ABA0F2]/10 via-white to-[#F2B988]/20 text-[#732514]">
            {children}
        </div>
    );
}
