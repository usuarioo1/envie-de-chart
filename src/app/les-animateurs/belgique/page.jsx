import AnimateursCountryPage from "@/components/AnimateursCountryPage";

export default function BelgiquePage() {
  return (
    <AnimateursCountryPage
      country="belgique"
      title="Animateurs en Belgique"
      sectionTitle="Nos Animateurs"
      emptyMessage="Aucun animateur disponible pour le moment."
      introduction={<p className="text-lg text-slate-600 mb-8">Découvrez nos animateurs de chant prénatal en Belgique.</p>}
    />
  );
}
