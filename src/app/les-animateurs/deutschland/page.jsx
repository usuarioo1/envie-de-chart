import AnimateursCountryPage from "@/components/AnimateursCountryPage";
import deutschlandData from "@/utils/les animateurs/deutschland.json";

export default function DeutschlandPage() {
  return (
    <AnimateursCountryPage
      country="deutschland"
      title="Animateure in Deutschland"
      sectionTitle="Unsere Animateure"
      emptyMessage="Derzeit keine Animateure verfügbar."
      introduction={
        <div className="mb-8 p-6 bg-[#F2B988]/20 rounded-3xl border border-[#F2B988]">
          <p className="text-slate-700">{deutschlandData.introduction}</p>
        </div>
      }
    />
  );
}
