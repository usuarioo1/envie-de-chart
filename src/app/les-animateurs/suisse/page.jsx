import AnimateursCountryPage from "@/components/AnimateursCountryPage";
import suisseData from "@/utils/les animateurs/suisse.json";

export default function SuissePage() {
  return (
    <AnimateursCountryPage
      country="suisse"
      title="Animateurs en Suisse"
      sectionTitle="Nos Animateurs"
      emptyMessage="Aucun animateur disponible pour le moment."
      introduction={
        <div className="mb-8 p-6 bg-[#F2B988]/20 rounded-3xl border border-[#F2B988]">
          <p className="text-slate-700">{suisseData.introduction.de}</p>
        </div>
      }
    />
  );
}
