export const metadata = {
    title: {
        default: 'Agenda',
        template: '%s | Envie de Chanter',
    },
    description: 'Consultez les prochaines dates des ateliers, stages et formations proposés par Envie de Chanter.',
};

export const revalidate = 300;

export default function AgendaLayout({ children }) {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#ABA0F2]/10 via-white to-[#F2B988]/20 text-[#732514]">
            {children}
        </div>
    );
}
