import AnimateursCountryPage from "@/components/AnimateursCountryPage";

export default function FrancePage() {
  return (
    <AnimateursCountryPage
      country="france"
      title="Animateurs en France"
      sectionTitle="Nos Animateurs"
      emptyMessage="Aucun animateur disponible pour le moment."
      introduction={<p className="text-lg text-slate-600 mb-8">Découvrez nos animateurs de chant prénatal en France.</p>}
      groupByDepartment
    />
  );
}
