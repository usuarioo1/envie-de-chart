import AnimateursCountryPage from "@/components/AnimateursCountryPage";
import portugalData from "@/utils/les animateurs/portugal.json";

export default function PortugalPage() {
  return (
    <AnimateursCountryPage
      country="portugal"
      title="Animadores em Portugal"
      sectionTitle="Nossos Animadores"
      emptyMessage="Nenhum animador disponível no momento."
      introduction={
        <div className="mb-8 p-6 bg-[#F2B988]/20 rounded-3xl border border-[#F2B988]">
          <p className="text-slate-700">{portugalData.introduction}</p>
        </div>
      }
    />
  );
}
