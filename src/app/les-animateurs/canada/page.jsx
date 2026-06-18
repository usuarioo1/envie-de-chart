import AnimateursCountryPage from "@/components/AnimateursCountryPage";

export default function CanadaPage() {
  return (
    <AnimateursCountryPage
      country="canada"
      title="Animateurs au Canada"
      sectionTitle="Nos Animateurs"
      emptyMessage="Aucun animateur disponible pour le moment."
      introduction={<p className="text-lg text-slate-600 mb-8">Découvrez nos animateurs de chant prénatal au Canada.</p>}
    />
  );
}
