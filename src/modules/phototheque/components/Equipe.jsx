export default function Equipe({ onImageClick }) {
  const equipe = [
    {
      id: 1,
      nom: "Paul Stéphane ZOA ONDOBO",
      poste: "CEO / Responsable Juridique & DRH",
      image: "/images/phototheque/equipe/ceo.jpg"
    },
    {
      id: 2,
      nom: "Adelphe DOUA SODEA",
      poste: "CTO - Chief Technology Officer",
      image: "/images/phototheque/equipe/cto.jpg"
    },
    {
      id: 3,
      nom: "Oviane Arelle AZOUTSA ZONSOP",
      poste: "COO - Chief Operating Officer",
      image: "/images/phototheque/equipe/coo.jpg"
    },
    {
      id: 4,
      nom: "Franck Dimitri",
      poste: "CMO - Chief Marketing Officer",
      image: "/images/phototheque/equipe/cmo.jpg"
    },
    {
      id: 5,
      nom: "Mohamed TAKADJIO",
      poste: "Developpeur Full Stack/Lead UAT",
      image: "/images/phototheque/equipe/chef-uat.jpg"
    },
    {
      id: 6,
      nom: "Alex TAGNE Djimefo",
      poste: "Développeur Frontend / Admin BDD & Système",
      image: "/images/phototheque/equipe/dev-frontend.jpg"
    },
    {
      id: 7,
      nom: "Sarah Ophenya KIMAYE SANG",
      poste: "Community Manager / Responsable Coworking",
      image: "/images/phototheque/equipe/community-manager.jpg"
    }
  ];

  return (
    <section className="py-16 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          👥 Notre équipe
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Une équipe passionnée et compétente à votre service
        </p>
        <div className="w-24 h-1 bg-purple-600 mx-auto mt-4 rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {equipe.map((membre) => (
          <div
            key={membre.id}
            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group"
            onClick={() => onImageClick({ ...membre, type: "equipe" })}
          >
            <div className="relative h-64 overflow-hidden bg-gradient-to-br from-purple-100 to-purple-200">
              <img
                src={membre.image}
                alt={membre.nom}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                onError={(e) => {
                  e.target.src = "https://placehold.co/400x400?text=Photo+à+venir";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
            </div>
            <div className="p-5 text-center">
              <h3 className="font-bold text-lg text-gray-800 mb-1">{membre.nom}</h3>
              <p className="text-purple-600 text-sm font-medium">{membre.poste}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}