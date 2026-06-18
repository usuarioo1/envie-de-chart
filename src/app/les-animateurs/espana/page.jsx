import AnimateursCountryPage from "@/components/AnimateursCountryPage";

export default function EspanaPage() {
  return (
    <AnimateursCountryPage
      country="espana"
      title="Animadores en España"
      sectionTitle="Nuestros animadores"
      emptyMessage="No hay animadores disponibles por el momento."
      introduction={<p className="text-lg text-slate-600 mb-8">Descubre nuestros animadores de canto prenatal en España.</p>}
    />
  );
}
