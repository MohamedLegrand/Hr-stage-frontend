export default function Bureaux({ onImageClick }) {
  const bureaux = [
    {
      id: 1,
      titre: "Salle de formation",
      description: "Espace moderne équipé pour les formations",
      image: "/images/phototheque/bureaux/bureau1.jpg"
    },
    {
      id: 2,
      titre: "Salle de formation",
      description: "Open space moderne pour travailler en équipe",
      image: "/images/phototheque/bureaux/bureau2.jpg"
    },
    {
      id: 3,
      titre: "Salle de formation",
      description: "Pause café et convivialité",
      image: "/images/phototheque/bureaux/bureau3.jpg"
    },
    {
      id: 4,
      titre: "Cuisine équipée",
      description: "Espace repas et convivialité",
      image: "/images/phototheque/bureaux/cuisine.jpg"
    },
    {
      id: 5,
      titre: "Fontaine à eau",
      description: "Hydratation à volonté pour toute l'équipe",
      image: "/images/phototheque/bureaux/eau.jpg"
    },
    {
      id: 6,
      titre: "Écran 64 pouces",
      description: "Écran géant pour les présentations et réunions",
      image: "/images/phototheque/bureaux/ecran.jpg"
    }
  ];

  return (
    <section id="bureaux" className="py-16 px-4 max-w-6xl mx-auto bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          🏢 Nos bureaux
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Découvrez nos espaces de travail modernes et conviviaux
        </p>
        <div className="w-24 h-1 bg-purple-600 mx-auto mt-4 rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Première ligne : Les 3 bureaux principaux */}
        {bureaux.slice(0, 3).map((bureau) => (
          <div
            key={bureau.id}
            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group"
            onClick={() => onImageClick({ ...bureau, type: "bureaux" })}
          >
            <div className="relative h-64 overflow-hidden bg-gradient-to-br from-purple-100 to-purple-200">
              <img
                src={bureau.image}
                alt={bureau.titre}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                onError={(e) => {
                  e.target.src = "https://placehold.co/400x400?text=Photo+à+venir";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
            </div>
            <div className="p-5 text-center">
              <h3 className="font-bold text-xl text-gray-800 mb-2">{bureau.titre}</h3>
              <p className="text-gray-500 text-sm">{bureau.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Deuxième ligne : Équipements et commodités */}
      <div className="mt-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
            🔧 Équipements & commodités
          </h3>
          <div className="w-16 h-1 bg-purple-400 mx-auto rounded-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {bureaux.slice(3).map((bureau) => (
            <div
              key={bureau.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group"
              onClick={() => onImageClick({ ...bureau, type: "bureaux" })}
            >
              <div className="relative h-56 overflow-hidden bg-gradient-to-br from-purple-100 to-purple-200">
                <img
                  src={bureau.image}
                  alt={bureau.titre}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  onError={(e) => {
                    e.target.src = "https://placehold.co/400x400?text=Photo+à+venir";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-bold text-lg text-gray-800 mb-1">{bureau.titre}</h3>
                <p className="text-gray-500 text-sm">{bureau.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}