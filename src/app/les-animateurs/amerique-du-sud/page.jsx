import AnimateursCountryPage from "@/components/AnimateursCountryPage";
import americaData from "@/utils/les animateurs/amerique-du-sud.json";

export default function AmeriqueDuSudPage() {
  return (
    <AnimateursCountryPage
      country="amerique-du-sud"
      title="Animateurs en Amérique du Sud"
      sectionTitle="Nos Animateurs"
      emptyMessage="Aucun animateur disponible pour le moment."
      introduction={
        <div className="mb-8 p-6 bg-[#F2B988]/20 rounded-3xl border border-[#F2B988]">
          <p className="text-slate-700 mb-4">{americaData.introduction.es}</p>
          <p className="text-slate-700">{americaData.introduction.pt}</p>
        </div>
      }
    />
  );
}
