import AnimateurSimpleCard from "@/components/AnimateurSimpleCard";
import JsonLd from "@/components/JsonLd";
import { getPublicAnimateurs } from "@/lib/publicData";
import { breadcrumbJsonLd, peopleJsonLd } from "@/lib/structuredData";

export default async function AnimateursCountryPage({
  country,
  title,
  sectionTitle,
  emptyMessage,
  introduction,
  groupByDepartment = false,
}) {
  const animateurs = await getPublicAnimateurs(country);
  const groups = groupByDepartment
    ? [...animateurs]
        .sort((a, b) =>
          (a.departement || "ZZZ").localeCompare(b.departement || "ZZZ")
        )
        .reduce((result, animateur) => {
          const department = animateur.departement || "Autres";
          result[department] ||= [];
          result[department].push(animateur);
          return result;
        }, {})
    : null;

  return (
    <div className="bg-gradient-to-b from-[#ABA0F2]/10 via-white to-[#F2B988]/20 min-h-screen">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Les animateurs", path: `/les-animateurs/${country}` },
          { name: title, path: `/les-animateurs/${country}` },
        ])}
      />
      <JsonLd data={peopleJsonLd(animateurs)} />

      <div className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-4 text-slate-900">{title}</h1>
        {introduction}

        <div className="mb-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">{sectionTitle}</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-[#F25A38] to-[#F2B988] rounded-full" />
        </div>

        {animateurs.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-200">
            <p className="text-gray-600">{emptyMessage}</p>
          </div>
        ) : groupByDepartment ? (
          <div className="space-y-8">
            {Object.entries(groups).map(([department, departmentAnimateurs]) => (
              <section key={department} className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-gradient-to-r from-[#F25A38] to-[#F29057] text-white px-4 py-2 rounded-lg shadow-md">
                    <h3 className="text-lg font-bold">
                      {department === "Autres" ? "Autres" : `Département ${department}`}
                    </h3>
                  </div>
                  <div className="flex-1 h-0.5 bg-gradient-to-r from-[#F2B988]/50 to-transparent rounded-full" />
                  <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {departmentAnimateurs.length} animateur{departmentAnimateurs.length > 1 ? "s" : ""}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {departmentAnimateurs.map((animateur) => (
                    <AnimateurSimpleCard key={animateur._id} animateur={animateur} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {animateurs.map((animateur) => (
              <AnimateurSimpleCard key={animateur._id} animateur={animateur} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
